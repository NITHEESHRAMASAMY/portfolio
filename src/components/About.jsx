import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LiveAvatar from "./LiveAvatar";

export default function About() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hoveredStoryIdx, setHoveredStoryIdx] = useState(null);
  const [speechTime, setSpeechTime] = useState(0);
  const hasSpokenRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    let animId;
    if (isSpeaking) {
      const startTime = Date.now();
      const update = () => {
        setSpeechTime((Date.now() - startTime) / 1000);
        animId = requestAnimationFrame(update);
      };
      animId = requestAnimationFrame(update);
    } else {
      setSpeechTime(0);
    }
    return () => cancelAnimationFrame(animId);
  }, [isSpeaking]);

  const speak = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const text = "Hi! I'm Nitheesh. I'm a passionate developer. I love building solutions. I focus on clean code. I always enjoy learning. Let's build something amazing together!";
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const englishVoices = voices.filter(v => v.lang.includes("en-US") || v.lang.includes("en-GB") || v.lang.includes("en-IN"));
    
    const scoredVoices = englishVoices.map(v => {
      const name = v.name.toLowerCase();
      let score = 0;
      
      if (name.includes("male")) score += 100;
      
      const maleNames = ["david", "daniel", "aaron", "arthur", "gordon", "rishi", "fred", "james", "john", "robert", "michael", "william", "george", "thomas", "mark", "paul", "richard", "joseph", "andrew", "brian", "kevin"];
      for (const mName of maleNames) {
        if (name.includes(mName)) {
          score += 80;
          break;
        }
      }
      
      const femaleNames = ["female", "zira", "hazel", "samantha", "susan", "heera", "tessa", "haruka", "moira", "veena", "karen", "mary", "elizabeth", "jennifer", "maria", "linda", "patricia", "barbara", "sarah", "jessica", "katherine", "ashley", "emily", "lisa", "anna", "nicole", "luna", "victoria", "siri", "cortana", "alexa"];
      for (const fName of femaleNames) {
        if (name.includes(fName)) {
          score -= 90;
          break;
        }
      }
      
      return { voice: v, score };
    });

    scoredVoices.sort((a, b) => b.score - a.score);

    const bestVoice = scoredVoices.length > 0 ? scoredVoices[0].voice : null;
    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const getSubtitleText = (time) => {
    if (time < 1.5) return "Hi! I'm Nitheesh.";
    if (time < 3.4) return "I'm a passionate developer.";
    if (time < 5.3) return "I love building solutions...";
    if (time < 7.2) return "I focus on clean code...";
    if (time < 9.1) return "I always enjoy learning...";
    return "Let's build something amazing together!";
  };

  const stories = [
    {
      num: "01",
      title: "Introduction",
      text: "I am a Computer Science & Engineering student at Dr. N.G.P. Institute of Technology, Coimbatore. I am committed to developing innovative and efficient software solutions, eager to apply my diverse technical skill set to enhance productivity and growth.",
    },
    {
      num: "02",
      title: "Areas of Interest",
      text: "My primary interests lie in Full Stack Development (MERN), Software Development & Application Design, Machine Learning, Computer Vision, and Data Structures & Algorithms.",
    },
    {
      num: "03",
      title: "Current Focus",
      text: "Currently building intelligent agent workflows, prompt engineering systems, and responsive web platforms. Experienced in Python, Java, MongoDB, PostgreSQL, and LLM-based orchestration.",
    },
    {
      num: "04",
      title: "Certifications",
      text: "Certified in Fullstack Development and UI-UX Design by Maiyyam, recognized at the Coding Premier League (Kumaraguru) and Ideathon (Bannari Amman Institute), along with Learnathon 2023 and 2024 certificates.",
    },
  ];

  return (
    <motion.section
      id="about"
      onViewportEnter={() => {
        if (!hasSpokenRef.current) {
          speak();
          hasSpokenRef.current = true;
        }
      }}
      viewport={{ once: true, margin: "-200px" }}
      className="min-h-screen py-32 px-6 md:px-12 border-t border-neutral-900 bg-black flex flex-col justify-between relative overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
        {/* Left Column: Heading and Portrait */}
        <div className="lg:col-span-5 flex flex-col gap-8 sticky top-28">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-accent tracking-[0.3em] uppercase">
              [ WHO AM I ]
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-semibold tracking-tight text-white uppercase leading-none">
              WHO AM I?
            </h2>
          </div>

          {/* Liquid Morph Profile Blob Container */}
          <div className="relative w-full aspect-square max-w-[320px] md:max-w-[360px] mx-auto lg:mx-0 group">
            {/* Dashed blueprint border morphing behind the card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 0.4, scale: 1.04 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
              className="absolute inset-0 border border-dashed border-accent liquid-profile-blob -z-10 pointer-events-none scale-105"
              style={{ animationDelay: "-2s" }}
            />

            {/* Speak/Listen button overlay */}
            <AnimatePresence>
              {!isSpeaking && (
                <motion.button
                  key="speak-btn"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  onClick={speak}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-neutral-950/80 border border-neutral-800 text-neutral-400 hover:text-white hover:border-accent/40 transition-all duration-300 font-mono text-[9px] flex items-center gap-1.5 shadow-lg select-none z-30"
                  title="Click to hear introduction speech"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span>TAP TO HEAR ME</span>
                </motion.button>
              )}
            </AnimatePresence>
            
            {/* Morphing Image Frame (Zoom-In Reveal Entrance) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                type: "spring",
                stiffness: 110,
                damping: 14,
                delay: 0.2
              }}
              whileHover={{ scale: 1.05 }}
              className="relative w-full h-full bg-neutral-900 border border-neutral-800 overflow-hidden cursor-pointer liquid-profile-blob shadow-2xl transition-transform duration-500"
            >
              {/* HTML5 Canvas Live Avatar Puppeteer (Blinking, talking, and swaying on a single CGI photo) */}
              <LiveAvatar isSpeaking={isSpeaking} hoveredStoryIdx={hoveredStoryIdx} />
              
              {/* Dark glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-40 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-accent tracking-widest uppercase keep-dark select-none whitespace-nowrap z-10">
                {hoveredStoryIdx !== null 
                  ? `[ PRESENTER // POINTING TO STORY 0${hoveredStoryIdx + 1} ]`
                  : isSpeaking 
                  ? "[ NITHEESH // SPEECH ACTIVE ]" 
                  : "[ NITHEESH // CODING WORKSPACE ]"}
              </div>
            </motion.div>

            {/* Speaking subtitle bubble overlay */}
            <AnimatePresence>
              {isSpeaking && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -bottom-16 left-4 right-4 bg-neutral-950/95 border border-accent/25 rounded-lg p-3 font-mono text-[9px] text-neutral-300 leading-relaxed text-left keep-dark select-none shadow-2xl z-20"
                >
                  <span className="text-accent animate-pulse mr-1">&gt; NITHEESH_VOICE:</span>
                  "{getSubtitleText(speechTime)}"
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Story items */}
        <div className="lg:col-span-7 flex flex-col gap-6 md:gap-10">
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
                  ease: [0.16, 1, 0.3, 1], // easeOutExpo
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
          // NITHEESH DESIGN CREED
        </p>
      </motion.div>

      {/* Footer copyright anchor */}
      <div className="flex justify-between items-center font-mono text-[9px] text-neutral-600 tracking-[0.2em] mt-24">
        <span>[SPEC] ABOUT // STORY LAB</span>
        <span>026 // © NITHEESH R</span>
      </div>
    </motion.section>
  );
}
