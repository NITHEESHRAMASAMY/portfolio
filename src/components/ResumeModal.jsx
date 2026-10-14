import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, FileText, CheckCircle2 } from "lucide-react";

export default function ResumeModal({ isOpen, onClose }) {
  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.__lenis?.stop();
    } else {
      document.body.style.overflow = "unset";
      window.__lenis?.start();
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.__lenis?.start();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        data-lenis-prevent="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.96, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.96, y: 20, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          data-lenis-prevent="true"
          className="relative w-full max-w-5xl h-[92vh] flex flex-col bg-[#050608] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl text-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* TOP BAR / HEADER */}
          <div className="flex items-center justify-between gap-3 px-5 py-3.5 bg-neutral-950 border-b border-neutral-800/80 shrink-0 z-20">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-accent/10 border border-accent/30 text-accent font-semibold tracking-wider flex items-center gap-1.5">
                <FileText size={12} />
                RESUME
              </span>
              <div>
                <h3 className="font-display font-semibold text-base sm:text-lg text-white tracking-wide">
                  Nitheesh R
                </h3>
                <p className="text-[11px] text-neutral-400 font-mono hidden sm:block">
                  Full Stack & Java Developer · Final-Year CSE
                </p>
              </div>
            </div>

            {/* Actions: Download & Open in New Tab & Close */}
            <div className="flex items-center gap-2">
              <a
                href="/resume.pdf?v=2"
                download="Nitheesh_R_Resume.pdf"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-accent text-black font-mono text-xs font-semibold hover:bg-white transition-all shadow-md"
                title="Download updated resume PDF"
              >
                <Download size={13} />
                <span className="hidden sm:inline">DOWNLOAD PDF</span>
                <span className="sm:hidden">DOWNLOAD</span>
              </a>

              <a
                href="/resume.pdf?v=2"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition hidden sm:flex items-center justify-center"
                title="Open PDF in new tab"
              >
                <ExternalLink size={15} />
              </a>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition"
                title="Close (Esc)"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* EMBEDDED PDF VIEWER / DOCUMENT CONTAINER */}
          <div className="flex-1 w-full h-full bg-[#111317] relative overflow-hidden flex flex-col">
            <object
              data="/resume.pdf?v=2#toolbar=1&navpanes=0&scrollbar=1"
              type="application/pdf"
              className="w-full h-full border-0"
            >
              {/* Fallback if browser doesn't embed PDF */}
              <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <FileText size={32} />
                </div>
                <div>
                  <h4 className="text-xl font-display font-semibold mb-1">
                    Nitheesh R — Full Stack & Java Developer Resume
                  </h4>
                  <p className="text-sm text-neutral-400 max-w-md mx-auto">
                    Featuring Code Logic Validator, Techiegram, and AI system implementations.
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="/resume.pdf?v=2"
                    download="Nitheesh_R_Resume.pdf"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-black font-mono text-xs font-semibold hover:bg-white transition"
                  >
                    <Download size={14} />
                    <span>DOWNLOAD RESUME (PDF)</span>
                  </a>
                  <a
                    href="/resume.pdf?v=2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 border border-neutral-800 text-white font-mono text-xs hover:border-neutral-700 transition"
                  >
                    <ExternalLink size={14} />
                    <span>OPEN IN NEW TAB</span>
                  </a>
                </div>
              </div>
            </object>
          </div>

          {/* BOTTOM QUICK FOOTER */}
          <div className="px-5 py-2.5 bg-neutral-950 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-500 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Latest Version · Updated October 2026</span>
            </div>
            <div className="flex items-center gap-4">
              <span>nitheesh25bls@gmail.com</span>
              <span>+91 9042861184</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
