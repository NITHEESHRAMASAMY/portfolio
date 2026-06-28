import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const About = lazy(() => import("./components/About"));
const MissionVision = lazy(() => import("./components/MissionVision"));
const Projects = lazy(() => import("./components/Projects"));
const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));
const Education = lazy(() => import("./components/Education"));
const GithubDashboard = lazy(() => import("./components/GithubDashboard"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

const SectionFallback = () => <div className="min-h-screen bg-black" />;



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
      if (href && href.startsWith("#") && !href.startsWith("#/")) {
        e.preventDefault();
        const targetEl = document.querySelector(href);
        if (targetEl) {
          lenis.scrollTo(targetEl, { offset: 0 });
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]:not([href^="#/"])');
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
        <main className="relative bg-black min-h-screen text-white select-none overflow-x-hidden blueprint-grid">
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
            <MissionVision />
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
