import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";

// Custom Github brand icon
const Github = ({ size = 16, className }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const projectsData = [
  {
    id: 1,
    num: "01",
    name: "Code Logic Validator",
    tagline: "AI Orchestration Logic Evaluation Engine",
    description: "An AI-powered agent designed for the Smart India Hackathon (SIH) Education & Skilling domain. Evaluates a beginner's problem-solving logic written in plain text without revealing the actual code solutions. Utilizes LLM orchestration to assess correctness, provide targeted hints, and guide reasoning steps autonomously.",
    tech: ["Python", "LLM APIs", "Prompt Engineering"],
    github: "https://github.com/NITHEESHRAMASAMY",
    live: "https://github.com/NITHEESHRAMASAMY",
    visual: "validator",
  },
  {
    id: 2,
    num: "02",
    name: "Techiegram",
    tagline: "Short Technical Video Reels Platform",
    description: "A web platform to share short technical video reels with features like user uploads, video feeds, likes, and categorized content. Implements smooth video delivery on the frontend and custom REST APIs on the backend.",
    tech: ["HTML/CSS", "JavaScript", "Java", "REST APIs", "MongoDB"],
    github: "https://github.com/NITHEESHRAMASAMY",
    live: "https://github.com/NITHEESHRAMASAMY",
    visual: "techiegram",
  },
  {
    id: 3,
    num: "03",
    name: "Smart Leaf Scanner",
    tagline: "CNN Plant Disease Detection System",
    description: "A deep learning Convolutional Neural Network (CNN) designed to detect and classify plant diseases from leaf images with high accuracy. Includes a clean, interactive Streamlit web dashboard for real-time predictions and visualizations.",
    tech: ["Python", "CNN", "TensorFlow", "OpenCV", "Streamlit"],
    github: "https://github.com/NITHEESHRAMASAMY",
    live: "https://github.com/NITHEESHRAMASAMY",
    visual: "scanner",
  },
  {
    id: 4,
    num: "04",
    name: "ContextKey-Logger",
    tagline: "OS-Level Context-Aware Keystroke Analyzer",
    description: "A Python-based keystroke capture tool utilizing pynput to log keystrokes. Integrates OS-level window focus detection (Windows API / ctypes) to associate logged strokes with their active application context securely.",
    tech: ["Python", "Pynput", "ctypes", "Windows API"],
    github: "https://github.com/NITHEESHRAMASAMY",
    live: "https://github.com/NITHEESHRAMASAMY",
    visual: "keylogger",
  },
];

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);

  // 3D perspective mouse hover tracking
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    // Calculate relative mouse coordinates (-0.5 to 0.5)
    const relX = (e.clientX - rect.left) / width - 0.5;
    const relY = (e.clientY - rect.top) / height - 0.5;
    
    // Scale for gentle tilt intensity
    setTilt({
      x: relX * 20, // max 10 deg tilt
      y: -relY * 20,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="projects"
      className="min-h-screen py-32 px-6 md:px-12 border-t border-neutral-900 bg-black flex flex-col justify-between relative blueprint-grid"
    >
      <div className="flex flex-col gap-2 mb-16">
        <span className="font-mono text-xs text-accent tracking-[0.3em] uppercase">
          [ SELECTED WORKS ]
        </span>
        <h2 className="text-4xl md:text-6xl font-display font-semibold tracking-tight text-white uppercase leading-none">
          PROJECT CASE STUDIES
        </h2>
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start w-full">
        {/* Left column: Projects table list */}
        <div className="lg:col-span-7 flex flex-col">
          {projectsData.map((project, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={project.id}
                onMouseEnter={() => setActiveIdx(idx)}
                className="border-b border-neutral-900 py-8 first:border-t flex flex-col gap-4 relative group"
              >
                {/* Visual indicator slide overlay */}
                <div className="absolute inset-0 bg-neutral-950/20 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out -z-10" />

                <div className="flex justify-between items-start gap-4">
                  {/* Number & Name block */}
                  <div className="flex gap-6 items-start">
                    <span className="font-mono text-xs text-neutral-600 pt-2">
                      {project.num}
                    </span>
                    <div className="flex flex-col">
                      <h3 className="text-2xl md:text-4xl font-display font-medium text-white transition-colors duration-300 group-hover:text-neutral-200">
                        {project.name}
                      </h3>
                      <span className="font-mono text-xs text-neutral-500 tracking-wide mt-1">
                        {project.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Desktop active caret or arrow */}
                  <div className="hidden md:block">
                    <motion.div
                      animate={{
                        x: isActive ? 4 : 0,
                        opacity: isActive ? 1 : 0.2,
                        scale: isActive ? 1.1 : 1,
                      }}
                      className="text-white"
                    >
                      <ArrowUpRight size={20} />
                    </motion.div>
                  </div>
                </div>

                {/* Details layout: reveals on hover, always open on mobile */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isActive ? "auto" : "0px",
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden md:pl-10 flex flex-col gap-5 pr-4"
                >
                  <p className="text-neutral-400 font-light text-sm leading-relaxed max-w-xl font-sans mt-2">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[9px] tracking-wider text-neutral-400 border border-neutral-800 bg-neutral-950 px-2 py-1 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 font-mono text-[10px] tracking-widest text-neutral-400 mt-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-white transition-colors"
                    >
                      <Github size={12} />
                      <span>GITHUB</span>
                    </a>
                    <span>/</span>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-white transition-colors"
                    >
                      <ExternalLink size={12} />
                      <span>LIVE DEMO</span>
                    </a>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Right column: 3D perspective dashboard visualization preview (desktop only) */}
        <div className="hidden lg:col-span-5 lg:flex flex-col justify-center items-center h-full sticky top-36">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full aspect-square max-w-[420px] relative rounded-xl border border-neutral-800 bg-neutral-950/40 p-4 transition-all duration-500 ease-out flex items-center justify-center cursor-none"
            style={{
              perspective: "1000px",
            }}
          >
            <motion.div
              animate={{
                rotateY: tilt.x,
                rotateX: tilt.y,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
              className="w-full h-full bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden relative shadow-2xl shadow-black"
            >
              {/* Dynamic visual previews based on active index */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-col justify-between p-6 bg-black"
                >
                  {/* Top Bar decoration */}
                  <div className="flex justify-between items-center border-b border-neutral-900 pb-4">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                    </div>
                    <span className="font-mono text-[9px] tracking-widest text-neutral-600 uppercase">
                      Case Study {projectsData[activeIdx].num}
                    </span>
                  </div>

                  {/* Mid visual content: custom vector drawings of dashboards/networks/code */}
                  <div className="flex-1 flex items-center justify-center relative overflow-hidden py-4">
                    {/* Visual 1: Code Logic Validator */}
                    {activeIdx === 0 && (
                      <div className="w-full flex flex-col gap-2.5 font-mono text-[8px] text-neutral-500">
                        <div className="flex justify-between text-[10px] text-neutral-400 font-bold border-b border-neutral-900 pb-1">
                          <span>AGENT LOGIC COGNITION</span>
                          <span className="text-green-500 animate-pulse">ACTIVE</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Prompt Orchestration:</span>
                          <span className="text-white">SIH-Ed-System-v2</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cognitive Parser:</span>
                          <span className="text-neutral-300">LLM_API_ROUTING</span>
                        </div>
                        <div className="p-2.5 border border-neutral-900 bg-neutral-950 rounded text-neutral-400 text-[7px] leading-normal">
                          <p className="text-green-400 font-bold">// USER INPUT SENTENCE:</p>
                          <p>"I want to find prime numbers using a sieve."</p>
                          <p className="text-white mt-1">// TARGETED AGENT HINT GENERATED:</p>
                          <p>"Try initializing a boolean array of size N..."</p>
                        </div>
                      </div>
                    )}

                    {/* Visual 2: Techiegram */}
                    {activeIdx === 1 && (
                      <div className="w-full h-full flex items-center justify-center relative p-2">
                        <div className="w-[120px] h-full border border-neutral-800 rounded-xl relative bg-neutral-950 p-2 flex flex-col justify-between">
                          <div className="flex justify-between items-center text-[7px] border-b border-neutral-900 pb-1">
                            <span className="text-white font-bold">Techiegram App</span>
                            <span className="text-neutral-500">1080p</span>
                          </div>
                          <div className="flex-1 flex items-center justify-center my-2 border border-dashed border-neutral-900 rounded relative overflow-hidden bg-neutral-900">
                            {/* Reel icon vector placeholder */}
                            <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                            <div className="absolute bottom-1 right-1 font-mono text-[6px] text-neutral-500">
                              PLAY_DRAFT
                            </div>
                          </div>
                          <div className="flex justify-between text-[6px] text-neutral-400">
                            <span>Likes: 12.4k</span>
                            <span>MDB Status: UP</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Visual 3: Smart Leaf Scanner */}
                    {activeIdx === 2 && (
                      <div className="w-full flex flex-col gap-2 font-mono text-[8px] text-neutral-500">
                        <div className="flex justify-between text-[10px] text-neutral-400 font-bold border-b border-neutral-900 pb-1">
                          <span>CNN IMAGERY PROCESSOR</span>
                          <span className="text-white">SCANNING</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Classification Model:</span>
                          <span className="text-white">TensorFlow // CNN</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Resolution:</span>
                          <span className="text-neutral-400">224 x 224 x 3</span>
                        </div>
                        <div className="pl-3 border-l border-neutral-800 flex flex-col gap-1 mt-1 text-[7px]">
                          <div className="flex justify-between">
                            <span>Target Leaf Status:</span>
                            <span className="text-green-500 font-bold">96.8% Rust Detected</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Streamlit View:</span>
                            <span className="text-white">RENDERED</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Visual 4: ContextKey-Logger */}
                    {activeIdx === 3 && (
                      <div className="w-full flex flex-col gap-2 font-mono text-[8px] text-neutral-500 keep-dark">
                        <div className="flex justify-between text-[10px] text-neutral-400 font-bold border-b border-neutral-900 pb-1">
                          <span>WINDOWS KERNEL AUDIT</span>
                          <span className="text-red-500">LOGGING</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Active Window Hook:</span>
                          <span className="text-white">chrome.exe</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Buffer Registry:</span>
                          <span className="text-neutral-400">ctypes.wintypes</span>
                        </div>
                        <div className="p-2 border border-neutral-900 bg-neutral-950 rounded text-neutral-400 text-[6px] font-mono leading-tight max-h-[60px] overflow-hidden">
                          <p>[22:42:01] Hook Focus: vscode.exe</p>
                          <p>[22:42:04] Keys: import sys\n</p>
                          <p>[22:42:09] Hook Focus: chrome.exe</p>
                          <p>[22:42:15] Keys: github.com</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom title info */}
                  <div className="border-t border-neutral-900 pt-4 flex justify-between items-end">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[8px] text-accent uppercase">[PREVIEW SPEC]</span>
                      <h4 className="text-sm font-display text-white font-semibold uppercase tracking-wider group-hover:text-accent transition-colors duration-300">
                        {projectsData[activeIdx].name}
                      </h4>
                    </div>
                    <ArrowUpRight size={14} className="text-accent" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="flex justify-between items-center font-mono text-[9px] text-neutral-600 tracking-[0.2em] mt-24">
        <span>[SPEC] PROJECTS // WORKS LAB</span>
        <span>026 // © NITHEESH R</span>
      </div>
    </section>
  );
}
