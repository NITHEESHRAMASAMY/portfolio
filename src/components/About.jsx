import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import avatarVideo from "../assets/avatar-video.mp4";

export default function About() {
  const videoRef = useRef(null);
  const [hoveredStoryIdx, setHoveredStoryIdx] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  const stories = [
    {
      num: "01",
      title: "Introduction",
      text: "I am a Computer Science & Engineering student at Dr. N.G.P. Institute of Technology, Coimbatore. Committed to developing innovative and efficient solutions that drive progress, I am eager to apply my diverse technical skillset in high-impact environments to enhance productivity and growth.",
    },
    {
      num: "02",
      title: "Areas of Interest",
      text: "My primary areas of interest include Full Stack Development (MERN), Software Development & Application Design, Generative-AI, and Data Structures & Algorithms.",
    },
    {
      num: "03",
      title: "Current Focus",
      text: "Currently building intelligent agent workflows, prompt engineering systems, and responsive web platforms. My tech stack includes Java, Spring Boot, Python, MongoDB, PostgreSQL, LLM APIs, and REST APIs.",
    },
    {
      num: "04",
      title: "Certifications",
      text: "Certified in Fullstack Development by Maiyyam, recognized at the Coding Premier League (Kumaraguru) and Ideathon (Bannari Amman Institute), along with Learnathon 2023 and 2024 certificates.",
    },
  ];

  // Toggle or force unmute audio
  const toggleSound = (e) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      const nextMutedState = !isMuted;
      videoRef.current.muted = nextMutedState;
      videoRef.current.volume = 1.0;
      setIsMuted(nextMutedState);
      videoRef.current.play().catch(() => {});
    }
  };

  const handleCardClick = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;
        setIsMuted(false);
        videoRef.current.play().catch(() => {});
      } else {
        toggleSound();
      }
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }

    // Auto-unmute on first user interaction anywhere on the window if muted
    const handleFirstInteraction = () => {
      if (videoRef.current && isMuted) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;
        videoRef.current.play().then(() => {
          setIsMuted(false);
        }).catch(() => {});
      }
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen py-32 px-6 md:px-12 border-t border-neutral-900 bg-black flex flex-col justify-between relative overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
        {/* Left Column: Heading and Video Portrait */}
        <div className="lg:col-span-5 flex flex-col gap-8 sticky top-28">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-accent tracking-[0.3em] uppercase">
              [ WHO AM I ]
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-semibold tracking-tight text-white uppercase leading-none">
              WHO AM I?
            </h2>
          </div>

          {/* Clean Video Portrait Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              type: "spring",
              stiffness: 110,
              damping: 14,
              delay: 0.2,
            }}
            whileHover={{ scale: 1.02 }}
            onClick={handleCardClick}
            className="relative w-full aspect-square max-w-[320px] md:max-w-[360px] mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-neutral-800 hover:border-accent/40 bg-neutral-900 shadow-2xl transition-all duration-500 cursor-pointer group"
          >
            <video
              ref={videoRef}
              src={avatarVideo}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            >
              <source src={avatarVideo} type="video/mp4" />
              <source src="/avatar-video.mp4" type="video/mp4" />
            </video>

            {/* Sound Toggle Button Overlay */}
            <button
              onClick={toggleSound}
              type="button"
              className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] tracking-wider uppercase hover:border-accent hover:text-accent transition-all duration-300 shadow-lg"
              title={isMuted ? "Click to enable sound" : "Click to mute sound"}
            >
              {isMuted ? (
                <>
                  <VolumeX size={13} className="text-neutral-400" />
                  <span>UNMUTE</span>
                </>
              ) : (
                <>
                  <Volume2 size={13} className="text-accent animate-pulse" />
                  <span className="text-accent">SOUND ON</span>
                </>
              )}
            </button>

            {/* Tap to Unmute Hint at bottom if muted */}
            <AnimatePresence>
              {isMuted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full font-mono text-[9px] text-neutral-300 tracking-wider uppercase pointer-events-none select-none flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span>TAP TO UNMUTE VOICE</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right Column: Story items */}
        <div className="lg:col-span-7 flex flex-col gap-6 md:gap-10 mt-10 lg:mt-0">
          <div className="flex flex-col gap-8">
            {stories.map((story, index) => (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredStoryIdx(index)}
                onMouseLeave={() => setHoveredStoryIdx(null)}
                className="group border border-neutral-900 hover:border-accent/30 rounded-lg p-6 md:p-8 bg-neutral-950/40 hover:bg-neutral-950/70 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start relative overflow-hidden"
              >
                {/* Decorative border line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-accent/0 group-hover:bg-accent/25 transition-all duration-500" />

                {/* Horizontal slide elements */}
                <div className="font-mono text-sm text-accent tracking-wider">
                  {story.num}
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="text-white font-display font-medium text-xl md:text-2xl group-hover:text-accent transition-colors duration-300">
                    {story.title}
                  </h3>
                  <p className="text-neutral-400 font-sans font-light text-sm md:text-base leading-relaxed">
                    {story.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tagline Graphic Block */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="border-t border-neutral-900 pt-12 mt-16 w-full text-center"
      >
        <h4 className="text-[17px] sm:text-2xl md:text-3xl lg:text-4xl font-serif font-light text-neutral-200 italic tracking-wide leading-none">
          "Creating intelligent solutions for a digital future"
        </h4>
        <p className="font-mono text-[9px] text-accent tracking-[0.25em] uppercase mt-4">
          // NITHEESH ENGINEERING CREED
        </p>
      </motion.div>

      {/* Footer copyright anchor */}
      <div className="flex justify-between items-center font-mono text-[9px] text-neutral-600 tracking-[0.2em] mt-24">
        <span>[SPEC] ABOUT // STORY LAB</span>
        <span>026 // © NITHEESH R</span>
      </div>
    </section>
  );
}
