import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Eye, Code, Cpu, Compass } from "lucide-react";

export default function MissionVision() {
  const [mode, setMode] = useState("interface"); // 'interface' or 'schema'

  const missionText = "To create products where thoughtful engineering meets purposeful innovation, delivering solutions that truly matter.";
  const visionText = "To become a software engineer known not by the number of applications built, but by the meaningful impact those applications create.";



  return (
    <section
      id="vision-mission"
      className="min-h-[80vh] py-24 px-6 md:px-12 border-t border-neutral-900 bg-black flex flex-col justify-between relative overflow-hidden blueprint-grid"
    >
      {/* Absolute Coordinate Overlays */}
      <div className="absolute top-4 left-4 font-mono text-[8px] text-neutral-600 select-none">
        LOC: [SEC_02] // COORD: [43.46, -3.22]
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[8px] text-neutral-600 select-none">
        SYS_STATUS: ACTIVE // ACCENT_CODE: #00F0FF
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-between">
        {/* Header toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16 border-b border-neutral-900 pb-6 blueprint-header-line">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-accent tracking-[0.3em] uppercase">
              [ SYSTEM CORE ]
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-white uppercase leading-none">
              NITHEESH'S BLUEPRINT
            </h2>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 p-1 bg-neutral-950 border border-neutral-900 rounded-lg">
            <button
              onClick={() => setMode("interface")}
              className={`flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider rounded-md transition-all duration-300 ${
                mode === "interface"
                  ? "bg-accent text-black font-medium"
                  : "text-neutral-500 hover:text-white"
              }`}
            >
              <Eye size={12} />
              <span>INTERFACE</span>
            </button>
            <button
              onClick={() => setMode("schema")}
              className={`flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider rounded-md transition-all duration-300 ${
                mode === "schema"
                  ? "bg-accent text-black font-medium"
                  : "text-neutral-500 hover:text-white"
              }`}
            >
              <Code size={12} />
              <span>SCHEMA.json</span>
            </button>
          </div>
        </div>

        {/* Display Container with morph animation */}
        <div className="flex-1 flex items-center justify-center min-h-[350px]">
          <AnimatePresence mode="wait">
            {mode === "interface" ? (
              <motion.div
                key="interface"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
              >
                {/* Mission Panel */}
                <div className="border border-neutral-900 hover:border-accent/40 bg-neutral-950/40 p-8 rounded-xl relative flex flex-col justify-between group transition-colors duration-300 min-h-[260px]">
                  {/* Decorative corner ticks */}
                  <span className="absolute top-2 left-2 text-accent/30 font-mono text-[9px] select-none">+</span>
                  <span className="absolute top-2 right-2 text-accent/30 font-mono text-[9px] select-none">+</span>
                  <span className="absolute bottom-2 left-2 text-accent/30 font-mono text-[9px] select-none">+</span>
                  <span className="absolute bottom-2 right-2 text-accent/30 font-mono text-[9px] select-none">+</span>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-accent">
                        <Cpu size={16} />
                      </div>
                      <span className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
                        SPEC_ID: 01 // OBJECTIVE
                      </span>
                    </div>
                    
                    <h3 className="text-3xl font-display font-medium text-white tracking-tight mt-2 uppercase">
                      MISSION
                    </h3>
                    
                    <p className="text-neutral-400 font-sans font-light text-base md:text-lg leading-relaxed mt-2">
                      {missionText}
                    </p>
                  </div>

                  <div className="font-mono text-[9px] text-neutral-600 mt-6 tracking-widest border-t border-neutral-900/60 pt-4 flex justify-between">
                    <span>BUILD // DEPLOY_ACTIVE</span>
                    <span>CREED_01</span>
                  </div>
                </div>

                {/* Vision Panel */}
                <div className="border border-neutral-900 hover:border-accent/40 bg-neutral-950/40 p-8 rounded-xl relative flex flex-col justify-between group transition-colors duration-300 min-h-[260px]">
                  {/* Decorative corner ticks */}
                  <span className="absolute top-2 left-2 text-accent/30 font-mono text-[9px] select-none">+</span>
                  <span className="absolute top-2 right-2 text-accent/30 font-mono text-[9px] select-none">+</span>
                  <span className="absolute bottom-2 left-2 text-accent/30 font-mono text-[9px] select-none">+</span>
                  <span className="absolute bottom-2 right-2 text-accent/30 font-mono text-[9px] select-none">+</span>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-accent">
                        <Compass size={16} />
                      </div>
                      <span className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
                        SPEC_ID: 02 // DIRECTION
                      </span>
                    </div>
                    
                    <h3 className="text-3xl font-display font-medium text-white tracking-tight mt-2 uppercase">
                      VISION
                    </h3>
                    
                    <p className="text-neutral-400 font-sans font-light text-base md:text-lg leading-relaxed mt-2">
                      {visionText}
                    </p>
                  </div>

                  <div className="font-mono text-[9px] text-neutral-600 mt-6 tracking-widest border-t border-neutral-900/60 pt-4 flex justify-between">
                    <span>INDEX // METRIC_IMPACT</span>
                    <span>CREED_02</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="schema"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full font-mono text-xs md:text-sm text-neutral-400 bg-neutral-950/90 border border-neutral-900 rounded-xl p-6 md:p-8 relative max-w-4xl mx-auto shadow-2xl overflow-x-auto scrollbar-thin keep-dark"
              >
                {/* IDE-like title bar */}
                <div className="flex items-center justify-between border-b border-neutral-900 pb-4 mb-4 select-none">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                    <span className="text-[10px] text-neutral-500 ml-2">src/config/creed.json</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Terminal size={12} className="text-accent" />
                    <span className="text-[10px] text-accent">JSON SOURCE</span>
                  </div>
                </div>

                {/* Preformatted json layout with color formatting */}
                <pre className="text-neutral-300 leading-relaxed select-text whitespace-pre-wrap md:whitespace-pre">
                  <code>
                    {"{\n"}
                    {`  `}
                    <span className="text-accent">"developer"</span>: <span className="text-neutral-400">"NITHEESH R"</span>,
                    {"\n  "}
                    <span className="text-accent">"blueprint"</span>: {"{\n    "}
                    <span className="text-accent">"mission"</span>: {"{\n      "}
                    <span className="text-accent">"strategy"</span>: <span className="text-neutral-400">"thoughtful_engineering + purposeful_innovation"</span>,
                    {"\n      "}
                    <span className="text-accent">"objective"</span>: <span className="text-neutral-400">"deliver_solutions_that_matter"</span>,
                    {"\n      "}
                    <span className="text-accent">"statement"</span>: <span className="text-neutral-400">"{missionText}"</span>
                    {"\n    },\n    "}
                    <span className="text-accent">"vision"</span>: {"{\n      "}
                    <span className="text-accent">"metric"</span>: <span className="text-neutral-400">"meaningful_impact"</span>,
                    {"\n      "}
                    <span className="text-accent">"target"</span>: <span className="text-neutral-400">"known_by_value_created_not_count_of_apps"</span>,
                    {"\n      "}
                    <span className="text-accent">"statement"</span>: <span className="text-neutral-400">"{visionText}"</span>
                    {"\n    }\n  }\n}"}
                  </code>
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer label */}
        <div className="flex justify-between items-center font-mono text-[9px] text-neutral-600 tracking-[0.2em] mt-16 border-t border-neutral-900/60 pt-6">
          <span>SPEC // MISSION_VISION_MODULE</span>
          <span>026 // © NITHEESH R</span>
        </div>
      </div>
    </section>
  );
}
