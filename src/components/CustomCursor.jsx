import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Magnetic Target tracking state variables
  const [magneticTarget, setMagneticTarget] = useState(null);
  const [magneticRect, setMagneticRect] = useState(null);

  // Mouse coordinate values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Springs for smooth follow effect
  const springConfig = { damping: 30, stiffness: 280, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Handle magnetic pull offset calculations
      if (magneticTarget && magneticRect) {
        const centerX = magneticRect.left + magneticRect.width / 2;
        const centerY = magneticRect.top + magneticRect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        
        // Gently pull the element towards mouse pointer
        magneticTarget.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`;
        magneticTarget.style.transition = "none";
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const interactiveEl =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("interactive");

      if (interactiveEl) {
        setHovered(true);

        // Snap active ring to center of the target element
        const actualTarget =
          target.closest("a") ||
          target.closest("button") ||
          target.closest('[role="button"]') ||
          target;

        setMagneticTarget(actualTarget);
        setMagneticRect(actualTarget.getBoundingClientRect());
      } else {
        setHovered(false);
        if (magneticTarget) {
          magneticTarget.style.transform = "translate(0px, 0px)";
          magneticTarget.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
        }
        setMagneticTarget(null);
        setMagneticRect(null);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (!target || !magneticTarget) return;

      // Reset target position on mouseout
      if (target === magneticTarget || !magneticTarget.contains(target)) {
        magneticTarget.style.transform = "translate(0px, 0px)";
        magneticTarget.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
        setMagneticTarget(null);
        setMagneticRect(null);
        setHovered(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY, isVisible, magneticTarget, magneticRect]);

  if (!isVisible) return null;

  // Render snap coordinates if target is active
  const isSnapped = !!(magneticTarget && magneticRect);
  const targetX = isSnapped ? magneticRect.left + magneticRect.width / 2 : cursorXSpring;
  const targetY = isSnapped ? magneticRect.top + magneticRect.height / 2 : cursorYSpring;

  return (
    <>
      {/* Outer Ring (snaps to element center or follows cursor via spring physics) */}
      <motion.div
        className="fixed top-0 left-0 border border-white/60 pointer-events-none z-[9998] mix-blend-difference hidden md:block"
        style={{
          x: targetX,
          y: targetY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isSnapped ? magneticRect.width + 12 : hovered ? 56 : 24,
          height: isSnapped ? magneticRect.height + 12 : hovered ? 56 : 24,
          borderRadius: isSnapped ? "8px" : "50%",
          backgroundColor: isSnapped ? "rgba(255, 255, 255, 0.05)" : hovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
          borderColor: isSnapped ? "rgba(255, 255, 255, 0.8)" : hovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.6)",
        }}
        transition={{
          type: "spring",
          stiffness: isSnapped ? 250 : 350,
          damping: isSnapped ? 22 : 28,
        }}
      />
    </>
  );
}
