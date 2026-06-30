import { useEffect, useRef, useState } from "react";

// ─── 6 Phase Definitions ──────────────────────────────────────────────────
const PHASES = [
  {
    start: 0,   end: 1.5,
    label:   "GREETING & ATTENTION",
    imgKey:  "wave",
    motion:  "wave",       // animation profile
    color:   [0, 240, 255],
  },
  {
    start: 1.5, end: 3.4,
    label:   "INTRODUCING HIMSELF",
    imgKey:  "talk",
    motion:  "talk",
    color:   [139, 92, 246],
  },
  {
    start: 3.4, end: 5.3,
    label:   "EXPLAINING PASSION",
    imgKey:  "passion",
    motion:  "passion",
    color:   [20, 184, 166],
  },
  {
    start: 5.3, end: 7.2,
    label:   "MAKING A KEY POINT",
    imgKey:  "point",
    motion:  "point",
    color:   [245, 158, 11],
  },
  {
    start: 7.2, end: 9.1,
    label:   "PERSONAL CONNECTION",
    imgKey:  "sincere",
    motion:  "sincere",
    color:   [239, 68, 68],
  },
  {
    start: 9.1, end: 12,
    label:   "CLOSING & CALL TO ACTION",
    imgKey:  "thumbsup",
    motion:  "thumbsup",
    color:   [0, 240, 255],
  },
];

function getPhase(t) {
  return PHASES.find((p) => t >= p.start && t < p.end) || PHASES[PHASES.length - 1];
}

// ─── Multi-frequency organic noise ────────────────────────────────────────
function noise(t, freq = 1, seed = 0) {
  return (
    Math.sin(t * freq * (1.1 + seed * 0.4)) * 0.5 +
    Math.cos(t * freq * (0.7 + seed * 0.3)) * 0.3 +
    Math.sin(t * freq * (2.3 + seed * 0.6)) * 0.2
  );
}

// ─── Motion profiles: returns {dx, dy, scale, rotation, eyeClose} ────────
function getMotion(profile, t, speechT) {
  const base = {
    dx: 0, dy: 0, scale: 1.0, rotation: 0,
    headDx: 0, headDy: 0, headScale: 1.0,
    shoulderBob: 0, breathScale: 1.0,
    mouthOpen: 0,
  };

  // Global breathing (always active during speech)
  const breathCycle = Math.sin(t * 0.9) * 0.5 + Math.sin(t * 1.7) * 0.3;
  base.breathScale = 1.0 + breathCycle * 0.004;
  base.dy = breathCycle * 1.8;

  // Mouth openness driven by speech rhythm
  base.mouthOpen = Math.max(0,
    Math.sin(t * 14) * 0.6 +
    Math.sin(t * 8.3) * 0.3 +
    noise(t, 5, 0.2) * 0.15
  );

  switch (profile) {
    case "wave": {
      // Energetic upper-body bob, cheerful swaying
      base.headDx = Math.sin(t * 2.8) * 4.5 + noise(t, 1.3, 0.1) * 2;
      base.headDy = Math.abs(Math.sin(t * 2)) * -3 + breathCycle * 2;
      base.shoulderBob = Math.sin(t * 3) * 2.5;
      base.rotation = Math.sin(t * 1.8) * 0.012;
      // Wave arm bob: The arm image already has wave - we animate scale to mimic arm movement
      base.scale = base.breathScale + Math.abs(Math.sin(t * 2.5)) * 0.006;
      break;
    }
    case "talk": {
      // Natural speaking head nods
      base.headDx = noise(t, 1.1, 0.2) * 3 + Math.sin(t * 1.9) * 2;
      base.headDy = Math.sin(t * 2.4) * 2.5;
      base.rotation = noise(t, 0.9, 0.1) * 0.01;
      base.scale = base.breathScale;
      // Slight forward lean on emphasis
      const emphasisT = (t % 1.8) / 1.8;
      base.dy += Math.sin(emphasisT * Math.PI) * -1.5;
      break;
    }
    case "passion": {
      // Wide expansive movements - excited body language
      base.headDx = Math.sin(t * 1.5) * 5 + noise(t, 2, 0.3) * 2;
      base.headDy = Math.cos(t * 1.8) * 3;
      base.rotation = Math.sin(t * 1.2) * 0.015;
      base.shoulderBob = Math.sin(t * 2.2) * 3.5;
      base.scale = base.breathScale + Math.abs(Math.sin(t * 1.8)) * 0.008;
      base.dy += Math.sin(t * 2.2) * 2;
      break;
    }
    case "point": {
      // Sharp confident movements, slight forward emphasis
      base.headDx = noise(t, 1.4, 0.05) * 2.5;
      base.headDy = Math.sin(t * 2.1) * 2 + noise(t, 3, 0.2) * 0.8;
      base.rotation = noise(t, 0.8, 0.15) * 0.009;
      // Rhythmic pointing pulse - slight scale beat
      base.scale = base.breathScale + (Math.sin(t * 3.5) > 0.6 ? 0.005 : 0);
      break;
    }
    case "sincere": {
      // Slow calm gentle swaying
      base.headDx = Math.sin(t * 0.9) * 2 + noise(t, 0.6, 0.1) * 1.5;
      base.headDy = Math.sin(t * 1.1) * 1.5;
      base.rotation = Math.sin(t * 0.7) * 0.008;
      base.scale = base.breathScale + Math.sin(t * 1.2) * 0.003;
      // Eyes close periodically (sincere phase has eyes closed in image already)
      base.dy += Math.sin(t * 0.9) * 1.5;
      break;
    }
    case "thumbsup": {
      // Bouncy, celebratory energy
      const bounce = Math.abs(Math.sin(t * 3.5));
      base.headDy = bounce * -4 + breathCycle * 1.5;
      base.headDx = Math.sin(t * 2.2) * 3;
      base.shoulderBob = bounce * 3;
      base.scale = base.breathScale + bounce * 0.01;
      base.rotation = Math.sin(t * 2.2) * 0.01;
      base.dy += bounce * -2;
      break;
    }
    default:
      break;
  }
  return base;
}

// ─── Blink state machine ──────────────────────────────────────────────────
class BlinkController {
  constructor() {
    this.state = "open";    // open | closing | closed | opening
    this.progress = 0;      // 0=open, 1=closed
    this.nextBlink = 2 + Math.random() * 3; // seconds until next blink
    this.elapsed = 0;
  }
  update(dt) {
    this.elapsed += dt;
    if (this.state === "open" && this.elapsed >= this.nextBlink) {
      this.state = "closing";
      this.elapsed = 0;
    }
    if (this.state === "closing") {
      this.progress = Math.min(1, this.progress + dt * 10); // 100ms to close
      if (this.progress >= 1) { this.state = "closed"; this.elapsed = 0; }
    }
    if (this.state === "closed") {
      if (this.elapsed > 0.08) { this.state = "opening"; } // hold 80ms
    }
    if (this.state === "opening") {
      this.progress = Math.max(0, this.progress - dt * 8); // 125ms to open
      if (this.progress <= 0) {
        this.state = "open";
        this.elapsed = 0;
        this.nextBlink = 2.5 + Math.random() * 3.5;
      }
    }
    return this.progress; // 0=open, 1=fully closed
  }
}

// ─── Canvas drawing helpers ───────────────────────────────────────────────
function drawImageAnimated(ctx, img, W, H, motion, t) {
  if (!img) return;
  const { dx, dy, scale, rotation, headDx, headDy, breathScale } = motion;

  // Ken Burns: slow creep zoom on the whole frame
  const kb = 1.0 + Math.sin(t * 0.12) * 0.015;

  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.scale(scale * kb * breathScale, scale * kb * breathScale);
  ctx.rotate(rotation);
  ctx.translate(dx + headDx * 0.3, dy + headDy * 0.3);
  ctx.translate(-W / 2, -H / 2);

  ctx.drawImage(img, 0, 0, W, H);
  ctx.restore();
}

function drawBlinkOverlay(ctx, img, W, H, blinkProgress, motion) {
  if (!img || blinkProgress <= 0) return;
  const { dx, dy, scale, rotation, headDx, headDy } = motion;

  ctx.save();
  ctx.translate(W / 2 + dx + headDx * 0.3, H / 2 + dy + headDy * 0.3);
  ctx.scale(scale, scale);
  ctx.rotate(rotation);
  ctx.translate(-W / 2, -H / 2);

  // Eyelid skin tone blend
  ctx.fillStyle = "rgba(48, 30, 20, 0.96)";

  const ly = 124;
  const lx = 174;
  const rx = 226;
  const rX = 11;
  const rY = 7 * blinkProgress;

  // Left eye lid
  ctx.beginPath();
  ctx.ellipse(lx, ly - 7 + rY, rX, rY, 0, 0, Math.PI * 2);
  ctx.fill();

  // Right eye lid
  ctx.beginPath();
  ctx.ellipse(rx, ly - 7 + rY, rX, rY, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawMouthAnimation(ctx, img, W, H, mouthOpen, motion) {
  if (!img || mouthOpen <= 0) return;

  const mX = 200, mY = 153;
  const mRX = 13, mRY = 6;

  ctx.save();
  ctx.translate(W / 2 + motion.dx + motion.headDx * 0.3, H / 2 + motion.dy + motion.headDy * 0.3);
  ctx.scale(motion.scale * motion.breathScale, motion.scale * motion.breathScale);
  ctx.rotate(motion.rotation);
  ctx.translate(-W / 2, -H / 2);

  const scaleX = img.naturalWidth  / W;
  const scaleY = img.naturalHeight / H;

  // Source mouth crop from image
  const srcX = (mX - mRX) * scaleX;
  const srcY = (mY - mRY) * scaleY;
  const srcW = (mRX * 2) * scaleX;
  const srcH = (mRY * 2) * scaleY;

  // Dest mouth stretch
  const destX = mX - mRX;
  const destY = mY - mRY - (mouthOpen * 2.5);
  const destW = mRX * 2;
  const destH = mRY * 2 + (mouthOpen * 5);

  // Clip to ellipse to blend naturally
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(mX, mY, mRX * 1.1, mRY * 1.4 * (1 + mouthOpen * 0.4), 0, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(img, srcX, srcY, srcW, srcH, destX, destY, destW, destH);
  ctx.restore();

  ctx.restore();
}

// ─── Voice waveform bars ─────────────────────────────────────────────────
function drawVoiceWave(ctx, W, H, t, color) {
  const [r, g, b] = color;
  ctx.save();
  ctx.translate(W / 2, H * 0.875);
  const bars = 13;
  const bW = 3, gap = 2.5;
  const totalW = bars * bW + (bars - 1) * gap;
  const startX = -totalW / 2;
  for (let i = 0; i < bars; i++) {
    const center = (i - (bars - 1) / 2) / ((bars - 1) / 2);
    const env = 1 - Math.abs(center) * 0.35;
    const h = (3 + Math.abs(Math.sin(t * 13 + i * 0.65)) * 16 + noise(t, 6, i * 0.3) * 4) * env;
    const x = startX + i * (bW + gap);
    const alpha = 0.6 + env * 0.4;
    ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
    ctx.lineWidth = bW;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x + bW / 2, -h / 2);
    ctx.lineTo(x + bW / 2, h / 2);
    ctx.stroke();
  }
  ctx.restore();
}

// ─── Phase progress bar ──────────────────────────────────────────────────
function drawProgressBar(ctx, W, H, phase, speechT, color) {
  const [r, g, b] = color;
  const barY = H - 6;
  const barX = 12;
  const barW = W - 24;
  const phaseDur = phase.end - phase.start;
  const phaseFill = Math.min(1, (speechT - phase.start) / phaseDur);
  const totalFill = Math.min(1, speechT / 11);

  // Total progress (dim)
  ctx.fillStyle = `rgba(${r},${g},${b},0.15)`;
  ctx.fillRect(barX, barY, barW, 2);
  // Phase progress (bright)
  const grad = ctx.createLinearGradient(barX, 0, barX + barW * phaseFill, 0);
  grad.addColorStop(0, `rgba(${r},${g},${b},0.9)`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0.5)`);
  ctx.fillStyle = grad;
  ctx.fillRect(barX, barY, barW * phaseFill, 2);

  // Small dot at current position
  ctx.beginPath();
  ctx.arc(barX + barW * phaseFill, barY + 1, 3, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${r},${g},${b},1)`;
  ctx.fill();
}

// ─── Ambient glow overlay ─────────────────────────────────────────────────
function drawAmbientGlow(ctx, W, H, t, color) {
  const [r, g, b] = color;
  ctx.save();
  ctx.globalCompositeOperation = "screen";

  // Dynamic glow orb following "energy" of speech
  const gX = W * (0.5 + Math.sin(t * 0.5) * 0.12);
  const gY = H * (0.35 + Math.cos(t * 0.4) * 0.08);
  const gR = 120 + Math.sin(t * 1.2) * 25;
  const g1 = ctx.createRadialGradient(gX, gY, 0, gX, gY, gR);
  g1.addColorStop(0, `rgba(${r},${g},${b},0.18)`);
  g1.addColorStop(0.5, `rgba(${r},${g},${b},0.07)`);
  g1.addColorStop(1, `rgba(0,0,0,0)`);
  ctx.fillStyle = g1;
  ctx.beginPath();
  ctx.arc(gX, gY, gR, 0, Math.PI * 2);
  ctx.fill();

  // Secondary ambient
  const g2X = W * 0.75 + Math.cos(t * 0.3) * 20;
  const g2Y = H * 0.6 + Math.sin(t * 0.6) * 15;
  const g2 = ctx.createRadialGradient(g2X, g2Y, 0, g2X, g2Y, 90);
  g2.addColorStop(0, `rgba(${r},${g},${b},0.1)`);
  g2.addColorStop(1, `rgba(0,0,0,0)`);
  ctx.fillStyle = g2;
  ctx.beginPath();
  ctx.arc(g2X, g2Y, 90, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// ─── HUD labels ──────────────────────────────────────────────────────────
function drawHUD(ctx, isSpeaking, phase, speechT, t, color) {
  if (!isSpeaking) return;
  const [r, g, b] = color;
  ctx.fillStyle = `rgba(${r},${g},${b},0.4)`;
  ctx.font = "6px monospace";
  ctx.fillText(`● ${phase.label}`, 12, 18);
  ctx.fillStyle = `rgba(${r},${g},${b},0.25)`;
  ctx.fillText(`T+${speechT.toFixed(1)}s  FPS:60`, 12, 27);
}

// ─── Scan line ───────────────────────────────────────────────────────────
let scanLineY = 0;
function drawScanLine(ctx, W, H) {
  scanLineY = (scanLineY + 1.2) % H;
  ctx.strokeStyle = "rgba(0,240,255,0.07)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, scanLineY);
  ctx.lineTo(W, scanLineY);
  ctx.stroke();
}

// ─── Cross-fade manager ──────────────────────────────────────────────────
class CrossFader {
  constructor() {
    this.alpha = 1.0;
    this.prevImg = null;
    this.curPhaseIdx = -1;
  }
  update(imgs, isSpeaking, phase, PHASES) {
    const newIdx = isSpeaking ? PHASES.indexOf(phase) : -99;
    if (newIdx !== this.curPhaseIdx) {
      // Get old image
      if (this.curPhaseIdx === -99 || this.curPhaseIdx === -1) {
        this.prevImg = imgs.coding || null;
      } else if (PHASES[this.curPhaseIdx]) {
        this.prevImg = imgs[PHASES[this.curPhaseIdx].imgKey] || null;
      }
      this.curPhaseIdx = newIdx;
      this.alpha = 0.0;  // Reset: new image starts at 0 opacity
    }
    if (this.alpha < 1.0) this.alpha = Math.min(1.0, this.alpha + 0.04);
    return { prevImg: this.prevImg, alpha: this.alpha };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function LiveAvatar({ isSpeaking, hoveredStoryIdx, speechTime = 0 }) {
  const canvasRef    = useRef(null);
  const imgsRef      = useRef({});
  const [loaded, setLoaded] = useState(false);

  // ── Load all images ──────────────────────────────────────────────────
  useEffect(() => {
    const sources = {
      coding:   "/developer-coding.png",
      wave:     "/developer-character.png",
      talk:     "/developer-talking.png",
      passion:  "/developer-passion.png",
      point:    "/developer-pointing.png",
      sincere:  "/developer-sincere.png",
      thumbsup: "/developer-thumbsup.png",
      talkAlt:  "/developer-talking-alt.png",
    };
    let n = 0;
    const total = Object.keys(sources).length;
    Object.entries(sources).forEach(([key, src]) => {
      const img = new Image();
      img.onload  = () => { imgsRef.current[key] = img; if (++n === total) setLoaded(true); };
      img.onerror = () => { if (++n === total) setLoaded(true); };
      img.src = src;
    });
  }, []);

  // ── Sync refs to avoid breaking the canvas loop when props change ──────
  const speechTimeRef = useRef(speechTime);
  const isSpeakingRef = useRef(isSpeaking);
  const hoveredStoryIdxRef = useRef(hoveredStoryIdx);

  useEffect(() => {
    speechTimeRef.current = speechTime;
  }, [speechTime]);

  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
  }, [isSpeaking]);

  useEffect(() => {
    hoveredStoryIdxRef.current = hoveredStoryIdx;
  }, [hoveredStoryIdx]);

  // ── Render loop ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const W = 400, H = 400;
    let animId;
    let lastTs   = 0;
    const globalStart = Date.now();
    const blink  = new BlinkController();
    const fader  = new CrossFader();

    const render = (ts) => {
      if (!lastTs) lastTs = ts;
      const dt = Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;
      const gt = (Date.now() - globalStart) / 1000;  // global time

      ctx.clearRect(0, 0, W, H);

      const imgs = imgsRef.current;
      const curSpeaking = isSpeakingRef.current;
      const curSpeechTime = speechTimeRef.current;
      const curHoveredStoryIdx = hoveredStoryIdxRef.current;

      // Current phase and image
      const phase    = curSpeaking ? getPhase(curSpeechTime) : null;
      const curImg   = curSpeaking ? (imgs[phase.imgKey] || imgs.talk) : imgs.coding;
      const color    = curSpeaking ? phase.color : [100, 100, 120];
      const profile  = curSpeaking ? phase.motion : "idle";
      const motion   = getMotion(profile, gt, curSpeechTime);

      // Cross-fade
      const { prevImg, alpha } = fader.update(imgs, curSpeaking, phase, PHASES);

      // Blink
      const blinkP = blink.update(dt);

      // ── Outer body sway ──
      ctx.save();
      if (curHoveredStoryIdx !== null) ctx.translate(4, -2);

      // ── Draw previous (fading out) ──
      if (prevImg && alpha < 1.0) {
        ctx.save();
        ctx.globalAlpha = 1.0 - alpha;
        // Previous image with minimal motion
        ctx.translate(W / 2, H / 2);
        ctx.scale(1.0, 1.0);
        ctx.translate(-W / 2, -H / 2);
        ctx.drawImage(prevImg, 0, 0, W, H);
        ctx.restore();
      }

      // ── Draw current image (animated) ──
      ctx.save();
      ctx.globalAlpha = alpha;
      drawImageAnimated(ctx, curImg, W, H, motion, gt);
      ctx.restore();

      ctx.globalAlpha = 1.0;

      // ── Blink overlay ──
      if (blinkP > 0 && curImg) {
        drawBlinkOverlay(ctx, curImg, W, H, blinkP, motion);
      }

      // ── Mouth animation during speech ──
      if (curSpeaking && curImg && motion.mouthOpen > 0) {
        ctx.save();
        ctx.globalAlpha = alpha * 0.9;
        drawMouthAnimation(ctx, curImg, W, H, motion.mouthOpen, motion);
        ctx.restore();
      }

      // ── Phase transition flash ──
      if (curSpeaking && alpha < 0.15) {
        const [r, g, b] = color;
        ctx.save();
        ctx.globalAlpha = (0.15 - alpha) * 4 * 0.12;
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(0, 0, W, H);
        ctx.restore();
      }

      // ── Ambient glow ──
      if (curSpeaking) {
        drawAmbientGlow(ctx, W, H, gt, color);
      }

      // ── Scan line ──
      drawScanLine(ctx, W, H);

      // ── Voice waveform ──
      if (curSpeaking) {
        drawVoiceWave(ctx, W, H, gt, color);
      }

      // ── Progress bar ──
      if (curSpeaking && phase) {
        drawProgressBar(ctx, W, H, phase, curSpeechTime, color);
      }

      // ── HUD ──
      if (curSpeaking && phase) {
        drawHUD(ctx, curSpeaking, phase, curSpeechTime, gt, color);
      }

      // ── Laptop desk glow (idle) ──
      if (!curSpeaking) {
        const gA = 0.045 + noise(gt, 8, 0.9) * 0.02;
        ctx.fillStyle = `rgba(0,200,255,${gA})`;
        ctx.beginPath();
        ctx.ellipse(200, 312, 75, 12, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore(); // outer body sway

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [loaded]);

  // ── Phase label (HTML badge above canvas) ────────────────────────────
  const phase = isSpeaking ? getPhase(speechTime) : null;
  const [r, g, b] = phase ? phase.color : [100, 100, 120];

  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-950 relative overflow-hidden">
      {/* Loading shimmer */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            border: "2px solid rgba(0,240,255,0.15)",
            borderTop: "2px solid rgba(0,240,255,0.7)",
            animation: "spin 1s linear infinite",
          }} />
        </div>
      )}

      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="w-full h-full object-cover"
        style={{ display: loaded ? "block" : "none" }}
      />

      {/* Live phase badge */}
      {isSpeaking && phase && (
        <div
          className="absolute top-2 left-2 right-2 flex items-center gap-1.5 pointer-events-none"
          style={{ zIndex: 10 }}
        >
          <div
            key={phase.label}
            style={{
              fontFamily: "monospace",
              fontSize: "7px",
              letterSpacing: "0.18em",
              color: `rgb(${r},${g},${b})`,
              background: "rgba(0,0,0,0.6)",
              border: `1px solid rgba(${r},${g},${b},0.35)`,
              borderRadius: "3px",
              padding: "3px 8px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              animation: "phaseBadgeIn 0.35s ease forwards",
            }}
          >
            <span style={{
              width: 5, height: 5, borderRadius: "50%",
              background: `rgb(${r},${g},${b})`,
              display: "inline-block",
              animation: "pulse 1s ease-in-out infinite",
            }} />
            {phase.label}
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes phaseBadgeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.75); }
        }
      `}</style>
    </div>
  );
}
