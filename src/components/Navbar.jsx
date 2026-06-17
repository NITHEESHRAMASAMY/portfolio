import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";

// Inline brand icon SVGs to replace removed lucide-react brand icons
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

const Linkedin = ({ size = 16, className }) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll to Hide/Reveal Navbar
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Keep navbar visible at the very top of the page
      if (currentScrollY < 50) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down -> hide navbar
        setVisible(false);
      } else {
        // Scrolling up -> show navbar
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  // Track active section in viewport
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // triggers when section is in middle of viewport
      threshold: 0,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.href.replace("#", ""));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const logoLetters = "NITHEESH".split("");

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-40 px-6 py-4 md:px-12 flex items-center justify-between border-b border-white/[0.05] bg-black/40 backdrop-blur-md glass-panel"
      >
        {/* Left Side: Animated Logo */}
        <a href="#home" className="flex items-center gap-1 group relative">
          <div className="font-display font-semibold text-lg md:text-xl tracking-wider text-white flex overflow-hidden">
            {logoLetters.map((letter, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                whileHover={{ y: -4, color: "#a3a3a3" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          <span className="w-1.5 h-1.5 bg-white rounded-full ml-1 animate-pulse" />
        </a>

        {/* Center Side: Main Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 font-mono text-[11px] tracking-widest uppercase">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.name}
                href={item.href}
                className="relative text-neutral-400 hover:text-white transition-colors duration-300 py-1"
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Side: Social Media / Action buttons */}
        <div className="hidden md:flex items-center gap-5 font-mono text-[10px] tracking-wider text-neutral-400">
          <a
            href="#/resume"
            className="flex items-center gap-1.5 border border-white/10 hover:border-white hover:text-white px-3 py-1.5 rounded-full transition-all duration-300 bg-neutral-900/40"
          >
            <FileText size={12} />
            <span>RESUME</span>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
            title="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
            title="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
        </div>

        {/* Mobile Menu Toggle button */}
        <div className="lg:hidden flex items-center gap-3">
          <a
            href="#/resume"
            className="flex items-center gap-1 border border-white/10 hover:border-white hover:text-white px-2.5 py-1.5 rounded-full transition-all duration-300 bg-neutral-900/40 font-mono text-[9px] tracking-wider text-neutral-300"
          >
            <FileText size={10} />
            <span>RESUME</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white hover:text-neutral-400 transition-colors p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[65px] bg-neutral-950/95 backdrop-blur-lg z-30 border-b border-white/[0.05] p-6 lg:hidden flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4 font-mono text-[13px] tracking-widest uppercase">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`transition-colors py-2 border-b border-white/[0.02] flex justify-between items-center ${
                      isActive ? "text-white font-bold" : "text-neutral-400"
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </a>
                );
              })}
            </div>

            {/* Mobile Socials */}
            <div className="flex justify-around items-center pt-2 font-mono text-xs text-neutral-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white"
              >
                <Github size={16} />
                <span>GITHUB</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white"
              >
                <Linkedin size={16} />
                <span>LINKEDIN</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
