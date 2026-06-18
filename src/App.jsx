import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const About = lazy(() => import("./components/About"));
const Projects = lazy(() => import("./components/Projects"));
const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));
const Education = lazy(() => import("./components/Education"));
const GithubDashboard = lazy(() => import("./components/GithubDashboard"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

const SectionFallback = () => <div className="min-h-screen bg-black" />;

// Sleek layout section helper
function Section({ id, title, subtitle, children }) {
  return (
    <section
      id={id}
      className="min-h-screen py-32 px-6 md:px-12 border-t border-neutral-900 flex flex-col justify-between bg-black relative"
    >
      {/* Structural layout grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
        <div className="lg:col-span-4 flex flex-col gap-3">
          <span className="font-mono text-xs text-neutral-600 tracking-[0.3em] uppercase">
            [ SECTION {id.toUpperCase()} ]
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-white uppercase">
            {title}
          </h2>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6">
          <p className="text-neutral-400 font-light text-base md:text-xl max-w-2xl font-sans leading-relaxed">
            {subtitle}
          </p>
          <div className="mt-8 text-neutral-500 font-mono text-sm tracking-wide">
            {children || (
              <div className="border border-neutral-900 rounded-lg p-8 bg-neutral-950/50 flex flex-col gap-4">
                <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                  // Content details block pending developer custom modules
                </p>
                <div className="h-2 w-32 bg-neutral-900 rounded" />
                <div className="h-2 w-48 bg-neutral-900 rounded" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="flex justify-between items-center font-mono text-[9px] text-neutral-600 tracking-[0.2em] mt-24">
        <span>NITHEESH // CSE STUDENT PORTFOLIO</span>
        <span>026 // © ALL RIGHTS RESERVED</span>
      </div>
    </section>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis Smooth Scroll on mount (after loading screen)
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponent transition easing
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Anchor smooth scroll helper for local link clicks
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetEl = document.querySelector(href);
        if (targetEl) {
          lenis.scrollTo(targetEl, { offset: 0 });
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => anchor.addEventListener("click", handleAnchorClick));

    return () => {
      anchors.forEach((anchor) => anchor.removeEventListener("click", handleAnchorClick));
      lenis.destroy();
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <main className="relative bg-black min-h-screen text-white select-none overflow-x-hidden">
          {/* Background Ambient Layers */}
          <div className="noise-overlay" />
          <div className="beam-light-1" />
          <div className="beam-light-2" />

          {/* Persistent Navbar */}
          <Navbar />

          {/* Hero Section */}
          <Hero />

          {/* Below-the-fold content wrapped in Suspense for lazy load optimizations */}
          <Suspense fallback={<SectionFallback />}>
            <About />
            <Projects />
            <Skills />
            <Experience />
            <Education />
            <GithubDashboard />
            <Contact />
            <Footer />
          </Suspense>
        </main>
      )}
    </>
  );
}
