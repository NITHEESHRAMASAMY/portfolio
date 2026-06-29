import { useEffect, useRef, useState } from "react";

export default function LiveAvatar({ isSpeaking, hoveredStoryIdx }) {
  const canvasRef = useRef(null);
  const imgCodingRef = useRef(null);
  const imgTalkingRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = 2;
    const onImgLoad = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setImagesLoaded(true);
      }
    };

    const imgCoding = new Image();
    imgCoding.src = "/developer-coding.png";
    imgCoding.onload = () => {
      imgCodingRef.current = imgCoding;
      onImgLoad();
    };

    const imgTalking = new Image();
    imgTalking.src = "/developer-talking.png";
    imgTalking.onload = () => {
      imgTalkingRef.current = imgTalking;
      onImgLoad();
    };
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let startTime = Date.now();
    let speakingStartTime = null;
    
    // Controlled Randomness & Physics Parameters
    let postureTimer = 0;
    let currentPostureX = 0;
    let currentPostureY = 0;
    let targetPostureX = 0;
    let targetPostureY = 0;

    let scanY = 0;

    // Multi-frequency noise function for organic movements
    const getOrganicNoise = (t, seed) => {
      return (
        Math.sin(t * (1.2 + seed)) * 0.5 +
        Math.cos(t * (0.7 - seed)) * 0.35 +
        Math.sin(t * (2.5 + seed * 2)) * 0.15
      );
    };

    const render = () => {
      const time = (Date.now() - startTime) / 1000;
      
      // Clear canvas
      ctx.clearRect(0, 0, 400, 400);

      // 1. Natural Sitting Posture Weight-Shifting (every 6-10s)
      postureTimer += 16.7;
      if (postureTimer > 7000 + Math.random() * 4000) {
        targetPostureX = (Math.random() - 0.5) * 5; 
        targetPostureY = (Math.random() - 0.5) * 3; 
        postureTimer = 0;
      }
      currentPostureX += (targetPostureX - currentPostureX) * 0.02;
      currentPostureY += (targetPostureY - currentPostureY) * 0.02;

      // 2. Breathing sway
      const breathingDepth = 2.0 + Math.sin(time * 0.25) * 0.6;
      const bodySwayY = getOrganicNoise(time * 1.3, 0.1) * breathingDepth + currentPostureY;
      const bodySwayX = getOrganicNoise(time * 0.65, 0.45) * 1.5 + currentPostureX;

      ctx.save();
      ctx.translate(bodySwayX, bodySwayY);

      // Leans toward stories on hover
      if (hoveredStoryIdx !== null) {
        ctx.translate(6, -2);
      }

      // --- 3. DRAW PRIMARY POSES (100% OPAQUE - PREVENTS BLURRY GHOSTING OVERLAPS) ---
      // We draw only one image at a time with 100% opacity. This guarantees the image remains 100% sharp and clear.
      
      let activeImg = imgCodingRef.current;
      let talkTime = 0;

      if (!isSpeaking) {
        speakingStartTime = null;
        // IDLE STATE: Coder looking down and typing
        ctx.save();
        // Keyboard typing hands wiggle
        const typingX = (Math.random() - 0.5) * 0.65;
        const typingY = (Math.random() - 0.5) * 0.65;
        ctx.translate(typingX, typingY);
        
        ctx.drawImage(imgCodingRef.current, 0, 0, 400, 400);
        ctx.restore();
      } else {
        if (!speakingStartTime) {
          speakingStartTime = Date.now();
        }
        talkTime = (Date.now() - speakingStartTime) / 1000;

        activeImg = imgTalkingRef.current;

        // TALKING STATE: Presenter looking forward and gesturing
        ctx.save();
        // Pivot head/shoulders centered: cx=200, cy=235
        ctx.translate(200, 235);
        const headTilt = getOrganicNoise(time * 1.8, 0.15) * 0.012;
        const headShake = getOrganicNoise(time * 0.8, 0.6) * 0.009;
        ctx.rotate(headTilt + headShake);
        ctx.translate(-200, -235);
        
        ctx.drawImage(activeImg, 0, 0, 400, 400);

        // --- 4. SEAMLESS CIRCULAR MOUTH OVERLAY (No Rectangular Borders) ---
        // We crop the lips region and draw it within a circular clipping mask centered on the mouth.
        // This ensures the edges blend perfectly with his mustache and chin beard.
        ctx.save();
        ctx.beginPath();
        // Circular clip path centered directly over the lips: x=200, y=149, radius=12
        ctx.arc(200, 149, 12, 0, 2 * Math.PI);
        ctx.clip();

        const mouthScale = 1.0 + Math.sin(time * 18) * 0.28;
        const mouthH = 10 * mouthScale;
        const mouthOffset = (mouthH - 10) / 2;

        const scaleX = activeImg.naturalWidth / 400;
        const scaleY = activeImg.naturalHeight / 400;

        ctx.drawImage(
          activeImg,
          188 * scaleX, 144 * scaleY, 24 * scaleX, 10 * scaleY, // source mouth area
          188, 144 - mouthOffset, 24, mouthH // destination stretched mouth area
        );
        ctx.restore(); // restore circular mouth clip

        ctx.restore(); // restore talking state head translate
      }

      // --- 5. UNIQUE AMBIENT LIQUID PLASMA BACKGROUND OVERLAY ---
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      // Nebula 1: Moving Purple Aurora (top-left)
      const n1X = 60 + Math.sin(time * 0.5) * 40;
      const n1Y = 70 + Math.cos(time * 0.6) * 30;
      const g1 = ctx.createRadialGradient(n1X, n1Y, 0, n1X, n1Y, 160);
      g1.addColorStop(0, "rgba(139, 92, 246, 0.28)");
      g1.addColorStop(0.5, "rgba(99, 102, 241, 0.12)");
      g1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g1;
      ctx.beginPath();
      ctx.arc(n1X, n1Y, 160, 0, 2 * Math.PI);
      ctx.fill();

      // Nebula 2: Moving Emerald/Teal Aurora (top-right)
      const n2X = 340 + Math.cos(time * 0.4) * 30;
      const n2Y = 80 + Math.sin(time * 0.5) * 40;
      const g2 = ctx.createRadialGradient(n2X, n2Y, 0, n2X, n2Y, 180);
      g2.addColorStop(0, "rgba(20, 184, 166, 0.24)");
      g2.addColorStop(0.5, "rgba(6, 182, 212, 0.1)");
      g2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g2;
      ctx.beginPath();
      ctx.arc(n2X, n2Y, 180, 0, 2 * Math.PI);
      ctx.fill();

      // Nebula 3: Moving Gold Accent Flare (upper center)
      const n3X = 200 + Math.sin(time * 0.7) * 50;
      const n3Y = 60 + Math.cos(time * 0.5) * 20;
      const g3 = ctx.createRadialGradient(n3X, n3Y, 0, n3X, n3Y, 130);
      g3.addColorStop(0, "rgba(245, 158, 11, 0.18)");
      g3.addColorStop(0.6, "rgba(217, 70, 239, 0.05)");
      g3.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g3;
      ctx.beginPath();
      ctx.arc(n3X, n3Y, 130, 0, 2 * Math.PI);
      ctx.fill();

      ctx.restore();

      // Laser scanner sweep grid line
      scanY = (scanY + 1.2) % 400;
      ctx.strokeStyle = "rgba(0, 240, 255, 0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(10, scanY);
      ctx.lineTo(390, scanY);
      ctx.stroke();

      // Corners System text HUD logs
      ctx.fillStyle = "rgba(0, 240, 255, 0.35)";
      ctx.font = "6px monospace";
      ctx.fillText(`SYS.STATUS: ${isSpeaking ? "ACTIVE_PRESENTER" : "STANDBY_COMPILE"}`, 25, 45);
      ctx.fillText(`SYS.CPU_UTIL: ${(42 + Math.sin(time * 2.8) * 8).toFixed(1)}%`, 25, 55);

      if (isSpeaking) {
        let activePhaseName = "GREETING_ATTENTION";
        if (talkTime >= 9.1) activePhaseName = "CLOSING_CTA";
        else if (talkTime >= 7.2) activePhaseName = "PERSONAL_CONNECTION";
        else if (talkTime >= 5.3) activePhaseName = "MAKING_KEY_POINT";
        else if (talkTime >= 3.4) activePhaseName = "EXPLAINING_PASSION";
        else if (talkTime >= 1.5) activePhaseName = "INTRODUCING_HIMSELF";
        ctx.fillText(`SYS.PHASE: ${activePhaseName}`, 25, 65);
      }

      ctx.fillText(`POSTURE: X:${currentPostureX.toFixed(2)} Y:${currentPostureY.toFixed(2)}`, 270, 45);
      ctx.fillText(`FPS: 60.0`, 270, 55);

      // --- 6. SPEECH HUD OVERLAYS ---
      ctx.save();
      if (isSpeaking) {
        ctx.translate(200, 235);
        const headTilt = getOrganicNoise(time * 1.8, 0.15) * 0.012;
        const headShake = getOrganicNoise(time * 0.8, 0.6) * 0.009;
        ctx.rotate(headTilt + headShake);
        ctx.translate(-200, -235);
      }

      // Speaking voice wave overlay at bottom (pulsing indicator)
      if (isSpeaking) {
        ctx.save();
        ctx.translate(200, 340);
        ctx.strokeStyle = "#00f0ff";
        ctx.lineWidth = 1.5;
        const waveBars = 9;
        const barWidth = 3;
        const gap = 3;
        const totalW = waveBars * barWidth + (waveBars - 1) * gap;
        const startX = -totalW / 2;

        const speechEnvelope = Math.sin(time * 3) > 0.88 ? 0.05 : 1.0;

        for (let i = 0; i < waveBars; i++) {
          const h = (4 + Math.abs(Math.sin(time * 18 + i * 0.8)) * 14) * speechEnvelope;
          const x = startX + i * (barWidth + gap);
          ctx.beginPath();
          ctx.moveTo(x, -h / 2);
          ctx.lineTo(x, h / 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      ctx.restore(); // Head group/face overlay restore

      // Laptop terminal flickering reflection on table
      const glowAlpha = 0.05 + getOrganicNoise(time * 8, 0.9) * 0.025;
      ctx.fillStyle = `rgba(0, 240, 255, ${glowAlpha})`;
      ctx.beginPath();
      ctx.ellipse(200, 310, 80, 15, 0, 0, 2 * Math.PI);
      ctx.fill();

      ctx.restore(); // Body group restore

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [imagesLoaded, isSpeaking, hoveredStoryIdx]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-950">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
