import { ArrowUp } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { name: "GITHUB", href: "https://github.com" },
    { name: "LINKEDIN", href: "https://linkedin.com" },
    { name: "EMAIL", href: "mailto:nitheesh.developer@example.com" },
    { name: "RESUME", href: "#/resume" },
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  const handleBackToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-black border-t border-neutral-900 px-6 py-20 md:px-12 md:py-24 flex flex-col gap-16 relative overflow-hidden select-none">
      {/* Decorative blurred backdrop glow */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Left Side: Large brand representation */}
        <div className="md:col-span-6 flex flex-col gap-4">
          <h3 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight uppercase leading-none">
            NITHEESH
          </h3>
          <p className="font-mono text-xs text-neutral-500 tracking-[0.25em] uppercase">
            Full Stack Developer // Java Developer
          </p>
          <span className="text-neutral-600 text-xs font-sans font-light max-w-sm mt-2">
            Engineering solid backends, responsive interfaces, and interactive systems.
          </span>
        </div>

        {/* Right Side: Navigation grid columns */}
        <div className="md:col-span-6 grid grid-cols-2 gap-8 font-mono text-[11px] tracking-wider">
          <div className="flex flex-col gap-4">
            <span className="text-neutral-600 uppercase tracking-widest">// Quick Links</span>
            <div className="flex flex-col gap-2.5">
              {quickLinks.slice(0, 4).map((link) => (
                <a key={link.name} href={link.href} className="text-neutral-400 hover:text-white transition-colors duration-300 w-fit">
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-8 md:mt-0">
            <span className="text-neutral-600 uppercase tracking-widest">// Navigation</span>
            <div className="flex flex-col gap-2.5">
              {quickLinks.slice(4).map((link) => (
                <a key={link.name} href={link.href} className="text-neutral-400 hover:text-white transition-colors duration-300 w-fit">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Center Line separating */}
      <div className="w-full h-[1px] bg-neutral-900" />

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
        {/* Copyright info */}
        <div>
          © {new Date().getFullYear()} Nitheesh R. Engineered under Advanced CSE Standards.
        </div>

        {/* Social connections and Back-to-Top button */}
        <div className="flex flex-wrap items-center gap-6 md:gap-8 justify-center">
          <div className="flex gap-6">
            {socialLinks.map((soc) => (
              <a
                key={soc.name}
                href={soc.href}
                target={soc.href.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                {soc.name}
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <a
            href="#home"
            onClick={handleBackToTop}
            className="flex items-center gap-1.5 border border-neutral-900 hover:border-neutral-700 bg-neutral-950 px-3.5 py-2 rounded-full transition-all duration-300 text-neutral-400 hover:text-white"
            title="Back to top"
          >
            <span>TOP</span>
            <ArrowUp size={10} />
          </a>
        </div>
      </div>
    </footer>
  );
}
