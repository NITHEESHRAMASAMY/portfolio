import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subTextRef = useRef(null);
  const progressBarRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    // Animate progress percentage counter
    let startTime = Date.now();
    const duration = 2200; // 2.2 seconds total loading duration

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
      className="fixed inset-0 bg-black z-[99999] flex flex-col justify-between p-8 md:p-16 select-none"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      {/* Top Header info */}
      <div className="flex justify-between items-start font-mono text-[9px] md:text-xs tracking-[0.25em] text-white/40 uppercase">
        <div>B.E. Computer Science & Engineering</div>
        <div>Final Year Student</div>
      </div>

      {/* Main visual - Large character stagger reveal */}
      <div className="flex flex-col items-center justify-center text-center">
        <h1
          ref={textRef}
          className="text-6xl md:text-9xl font-display font-semibold tracking-tight text-white mb-6 flex overflow-hidden"
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

        <div className="overflow-hidden">
          <motion.div
            ref={subTextRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-xs md:text-sm tracking-[0.4em] text-neutral-400 uppercase"
          >
            Full Stack Developer
          </motion.div>
        </div>
      </div>

      {/* Progress Bar & Loader indicators */}
      <div ref={bottomRef} className="flex flex-col gap-4">
        <div className="flex justify-between items-end font-mono text-[10px] md:text-xs tracking-[0.2em] text-neutral-400">
          <div className="animate-pulse">LOADING EXPERIENCE...</div>
          <div className="font-semibold text-white tabular-nums">{progress}%</div>
        </div>

        {/* Outer and Inner Progress Bar */}
        <div className="w-full h-[1px] bg-neutral-900 relative overflow-hidden">
          <div
            ref={progressBarRef}
            className="absolute top-0 left-0 h-full bg-white transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
