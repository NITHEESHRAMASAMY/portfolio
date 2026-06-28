import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const logTemplates = [
  { threshold: 0, text: "system init: bootstrapping portfolio build pipeline..." },
  { threshold: 6, text: "system: node environment validated (production mode)" },
  { threshold: 12, text: "import: loading modules [React, Framer Motion, GSAP, Lenis]" },
  { threshold: 20, text: "style: parsing Tailwind CSS v4 directives..." },
  { threshold: 28, text: "theme: importing Clash Display and Satoshi fonts..." },
  { threshold: 35, text: "config: setting system accent to #00f0ff (cyan)" },
  { threshold: 42, text: "blueprint: drawing grid overlays and coordinates..." },
  { threshold: 50, text: "db: reading portfolio schemas..." },
  { threshold: 58, text: "query: fetching mission statement from repository..." },
  { threshold: 64, text: "mission: 'thoughtful engineering meets purposeful innovation'" },
  { threshold: 72, text: "query: fetching vision statement..." },
  { threshold: 78, text: "vision: 'known by the meaningful impact applications create'" },
  { threshold: 84, text: "morph: injecting code-to-interface rendering engines" },
  { threshold: 90, text: "build: compile successful in 1180ms" },
  { threshold: 95, text: "server: pipeline listening on http://localhost:5173" },
  { threshold: 100, text: "success: deployment online. launching developer portfolio..." },
];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subTextRef = useRef(null);
  const progressBarRef = useRef(null);
  const bottomRef = useRef(null);
  const logsEndRef = useRef(null);

  useEffect(() => {
    // Animate progress percentage counter
    let startTime = Date.now();
    const duration = 2400; // 2.4 seconds loading duration

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const percent = Math.min(Math.floor((elapsed / duration) * 100), 100);
      
      setProgress(percent);

      if (percent < 100) {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  const visibleLogs = logTemplates
    .filter((log) => progress >= log.threshold)
    .map((log) => log.text);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [progress]);

  useEffect(() => {
    if (progress === 100) {
      // Trigger Exit GSAP Timeline
      const tl = gsap.timeline({
        onComplete: onComplete,
      });

      tl.to(subTextRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      })
      .to(textRef.current.children, {
        y: -100,
        opacity: 0,
        stagger: 0.03,
        duration: 0.5,
        ease: "power3.in",
      }, "-=0.2")
      .to(bottomRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      }, "-=0.4")
      .to(containerRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.8,
        ease: "power4.inOut",
      }, "-=0.1");
    }
  }, [progress, onComplete]);

  const name = "NITHEESH";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-[99999] flex flex-col justify-between p-8 md:p-16 select-none blueprint-grid"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      {/* Top Header info */}
      <div className="flex justify-between items-start font-mono text-[9px] md:text-xs tracking-[0.25em] text-white/40 uppercase relative z-10">
        <div>B.E. Computer Science & Engineering</div>
        <div className="text-accent animate-pulse">// SYSTEM: UNDER CONSTRUCTION</div>
      </div>

      {/* Main visual - Large character stagger reveal */}
      <div className="flex flex-col items-center justify-center text-center relative z-10 my-auto">
        <h1
          ref={textRef}
          className="text-6xl md:text-9xl font-display font-semibold tracking-tight text-white mb-4 flex overflow-hidden"
        >
          {name.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                delay: index * 0.06,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1], // easeOutExpo
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <div className="overflow-hidden mb-6">
          <motion.div
            ref={subTextRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-xs md:text-sm tracking-[0.4em] text-neutral-400 uppercase"
          >
            Full Stack & AI Engineer
          </motion.div>
        </div>

        {/* Console Box for Build Logs */}
        <div className="w-full max-w-2xl mx-auto p-4 rounded-lg bg-neutral-950/80 border border-neutral-900 font-mono text-[9px] md:text-xs text-neutral-400 h-[160px] overflow-hidden flex flex-col gap-1 text-left relative keep-dark">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-2 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neutral-800" />
              <span className="w-2 h-2 rounded-full bg-neutral-800" />
              <span className="w-2 h-2 rounded-full bg-neutral-800" />
              <span className="text-[9px] text-neutral-500 ml-2">portfolio-build.sh</span>
            </div>
            <span className="text-[9px] text-accent/50 select-none">[RUNNING]</span>
          </div>
          <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-1 leading-relaxed select-text scrollbar-thin">
            {visibleLogs.map((log, index) => {
              const isSuccess = log.includes("success") || log.includes("mission:") || log.includes("vision:");
              const isAccent = log.includes("system:") || log.includes("config:");
              let color = "text-neutral-400";
              if (isSuccess) color = "text-accent";
              else if (isAccent) color = "text-neutral-200";

              return (
                <div key={index} className={color}>
                  <span className="text-neutral-600 mr-2 select-none">&gt;</span>
                  {log}
                </div>
              );
            })}
            <div ref={logsEndRef} />
          </div>
        </div>
      </div>

      {/* Progress Bar & Loader indicators */}
      <div ref={bottomRef} className="flex flex-col gap-4 relative z-10 w-full max-w-2xl mx-auto">
        <div className="flex justify-between items-end font-mono text-[10px] md:text-xs tracking-[0.2em] text-neutral-400">
          <div className="animate-pulse">ASSEMBLING INTERFACES...</div>
          <div className="font-semibold text-accent tabular-nums">{progress}%</div>
        </div>

        {/* Outer and Inner Progress Bar */}
        <div className="w-full h-[1px] bg-neutral-900 relative overflow-hidden">
          <div
            ref={progressBarRef}
            className="absolute top-0 left-0 h-full bg-accent transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

