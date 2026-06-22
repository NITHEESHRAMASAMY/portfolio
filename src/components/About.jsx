import { motion } from "framer-motion";

export default function About() {
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
    <section
      id="about"
      className="min-h-screen py-32 px-6 md:px-12 border-t border-neutral-900 bg-black flex flex-col justify-between relative overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
        {/* Left Column: Heading and Portrait */}
        <div className="lg:col-span-5 flex flex-col gap-8 sticky top-28">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-neutral-600 tracking-[0.3em] uppercase">
              [ WHO AM I ]
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-semibold tracking-tight text-white uppercase leading-none">
              WHO AM I?
            </h2>
          </div>

          {/* Premium Image Frame with Hover Zoom & Scroll Reveal */}
          <motion.div
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0 }}
            whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[4/5] max-w-[360px] md:max-w-full rounded bg-neutral-900 border border-neutral-800 overflow-hidden group"
          >
            <motion.img
              src="/profile-updated.png"
              alt="Nitheesh"
              className="w-full h-full object-cover filter grayscale contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Dark glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="absolute bottom-4 left-4 font-mono text-[9px] text-white/50 tracking-widest uppercase">
              Nitheesh // Dev Profile Portrait
            </div>
          </motion.div>
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
                className="group border border-neutral-900 hover:border-neutral-800 rounded-lg p-6 md:p-8 bg-neutral-950/40 hover:bg-neutral-950/70 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start"
              >
                {/* Horizontal slide elements */}
                <div className="font-mono text-sm text-neutral-600 tracking-wider">
                  {story.num}
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="text-white font-display font-medium text-xl md:text-2xl group-hover:text-neutral-200 transition-colors">
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
        <p className="font-mono text-[9px] text-neutral-500 tracking-[0.25em] uppercase mt-4">
          // Nitheesh Design Creed
        </p>
      </motion.div>

      {/* Footer copyright anchor */}
      <div className="flex justify-between items-center font-mono text-[9px] text-neutral-600 tracking-[0.2em] mt-24">
        <span>ABOUT // STORY LAB</span>
        <span>026 // © NITHEESH R</span>
      </div>
    </section>
  );
}
