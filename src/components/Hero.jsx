import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import HeroBackground from "./HeroBackground";

const roles = ["FULL STACK DEVELOPER", "JAVA & PYTHON DEVELOPER", "AI WORKFLOW ENGINEER"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  // Auto-rotate roles for the premium digital agency typewriter/slider effect
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Parallax scroll linking
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.92]);
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);

  // Framer Motion presets for text reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.9,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 1.1,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black px-6 md:px-12 py-20"
    >
      {/* Background Interactive Canvas */}
      <HeroBackground />

      {/* Main Hero Container */}
      <motion.div
        style={{ y, scale, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center text-center max-w-5xl"
      >
        {/* Sub Header / Eyebrow */}
        <div className="overflow-hidden mb-2">
          <motion.p
            variants={itemVariants}
            className="font-mono text-xs md:text-sm tracking-[0.3em] text-neutral-500 uppercase"
          >
            B.E. Computer Science & Engineering Student
          </motion.p>
        </div>

        {/* Large Typography: Name */}
        <div className="overflow-hidden mb-1">
          <motion.h1
            variants={itemVariants}
            className="text-7xl sm:text-8xl md:text-9xl font-display font-bold text-white tracking-tight uppercase leading-none"
          >
            NITHEESH <span className="ml-4 sm:ml-6 md:ml-8">R</span>
          </motion.h1>
        </div>

        {/* Rotating Roles Reveal */}
        <div className="h-[40px] md:h-[60px] overflow-hidden mb-6 flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={roleIndex}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl sm:text-2xl md:text-4xl font-mono font-medium tracking-[0.25em] text-neutral-300 uppercase select-none"
            >
              {roles[roleIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <motion.p
          variants={subtitleVariants}
          className="text-neutral-400 text-sm md:text-xl font-light tracking-wide max-w-xl mb-12 font-sans"
        >
          Code. Create. Innovate. Repeat.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={buttonVariants}
          className="flex flex-col sm:flex-row gap-5 items-center justify-center font-mono text-xs tracking-widest"
        >
          {/* Download Resume Button (Contrast Fill) */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 border border-white hover:bg-white hover:text-black px-8 py-4 rounded-full transition-all duration-300 overflow-hidden"
          >
            <span>DOWNLOAD RESUME</span>
            <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-300" />
          </a>

          {/* Contact Me Button */}
          <a
            href="#contact"
            className="group flex items-center gap-2 bg-white text-black hover:bg-transparent hover:text-white border border-white px-8 py-4 rounded-full transition-all duration-300"
          >
            <span>CONTACT ME</span>
            <span className="w-1.5 h-1.5 bg-current rounded-full group-hover:scale-150 transition-transform duration-300" />
          </a>
        </motion.div>
      </motion.div>

      {/* Floating Bottom Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase text-neutral-500 pointer-events-none"
      >
        <span>SCROLL DOWN</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-neutral-700"
        />
      </motion.div>
    </section>
  );
}
