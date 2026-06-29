import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

function CGPACounter({ value, decimals = 2, duration = 2000 }) {
  const [count, setCount] = useState(0.0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const startValue = 0.0;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + easeOutCubic * (value - startValue);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-display font-semibold tabular-nums text-accent">
      {count.toFixed(decimals)}
    </span>
  );
}

export default function Education() {
  return (
    <section
      id="education"
      className="min-h-screen py-32 px-6 md:px-12 border-t border-neutral-900 bg-black flex flex-col justify-between relative overflow-hidden blueprint-grid"
    >
      {/* Title */}
      <div className="flex flex-col gap-2 mb-16">
        <span className="font-mono text-xs text-accent tracking-[0.3em] uppercase">
          [ ACADEMICS ]
        </span>
        <h2 className="text-4xl md:text-6xl font-display font-semibold tracking-tight text-white uppercase leading-none">
          EDUCATION CREDENTIALS
        </h2>
      </div>

      {/* Split-screen layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch w-full flex-1">
        
        {/* Left Panel: Both Education Details Stacked */}
        <div className="flex flex-col gap-12 w-full justify-center">
          
          {/* Undergraduate details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs text-accent tracking-widest uppercase">
                01 // Undergraduate Degree & Major
              </span>
              <h3 className="text-3xl md:text-4xl font-display text-white font-semibold leading-tight uppercase">
                B.E. Computer Science & Engineering
              </h3>
            </div>

            <div className="flex flex-col gap-1 border-l-2 border-accent/30 pl-6 py-1">
              <span className="font-mono text-xs text-accent/60 uppercase tracking-widest">
                Institution
              </span>
              <h4 className="text-lg md:text-xl font-mono text-neutral-300">
                Dr. N.G.P. Institute of Technology
              </h4>
              <span className="text-xs text-neutral-500 font-sans font-light mt-1">
                Coimbatore, Tamil Nadu, India
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                Academic Period
              </span>
              <span className="text-lg md:text-xl font-mono text-white">
                Sep 2023 – Apr 2027 // B.E. Student
              </span>
            </div>
          </motion.div>

          {/* Separator / Blueprint Line */}
          <div className="w-full h-[1px] bg-neutral-900" />

          {/* HSC details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs text-accent tracking-widest uppercase">
                02 // Higher Secondary Education
              </span>
              <h3 className="text-3xl md:text-4xl font-display text-white font-semibold leading-tight uppercase">
                Higher Secondary Course (HSC)
              </h3>
            </div>

            <div className="flex flex-col gap-1 border-l-2 border-accent/30 pl-6 py-1">
              <span className="font-mono text-xs text-accent/60 uppercase tracking-widest">
                Institution
              </span>
              <h4 className="text-lg md:text-xl font-mono text-neutral-300">
                Shri Vigneswara Vidhalaya Matric.Hr.Sec School
              </h4>
              <span className="text-xs text-neutral-500 font-sans font-light mt-1">
                Perumanallur, Tiruppur, Tamil Nadu, India
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                Academic Period
              </span>
              <span className="text-lg md:text-xl font-mono text-white">
                Completed 2023 // HSC Graduate
              </span>
            </div>
          </motion.div>

        </div>

        {/* Right Panel: Double Record Dashboard Stacked */}
        <div className="flex flex-col gap-8 justify-center items-center w-full relative">
          
          {/* Undergraduate Card */}
          <div className="w-full max-w-sm relative">
            <div className="absolute font-display font-bold text-[8rem] text-neutral-950 select-none tracking-tighter -z-10 -top-12 -left-6 opacity-30 pointer-events-none">
              CSE
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="border border-neutral-900 hover:border-accent/35 bg-neutral-950/40 p-6 md:p-8 rounded-2xl flex flex-col justify-between gap-4 w-full relative shadow-2xl transition-colors duration-300"
            >
              {/* Corner visual marks */}
              <div className="absolute top-3 left-3 font-mono text-[8px] text-accent/50 uppercase">
                Academic Record Node
              </div>
              <div className="absolute bottom-3 right-3 font-mono text-[8px] text-accent/50 uppercase">
                University Scaling
              </div>

              <div className="flex flex-col gap-1 items-center justify-center py-4">
                <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase">
                  Cumulative CGPA
                </span>
                <div className="text-5xl md:text-6xl tracking-tighter">
                  <CGPACounter value={8.28} decimals={2} />
                  <span className="text-xl text-neutral-600 font-mono">/10.0</span>
                </div>
              </div>

              <div className="border-t border-neutral-900 pt-3 flex flex-col gap-1 font-mono text-[9px] text-neutral-500">
                <div className="flex justify-between">
                  <span>Academic Standing:</span>
                  <span className="text-white">No backlogs</span>
                </div>
                <div className="flex justify-between">
                  <span>Syllabus focus:</span>
                  <span className="text-white">Computer Science</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* HSC Card */}
          <div className="w-full max-w-sm relative">
            <div className="absolute font-display font-bold text-[8rem] text-neutral-950 select-none tracking-tighter -z-10 -top-12 -left-6 opacity-30 pointer-events-none">
              HSC
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="border border-neutral-900 hover:border-accent/35 bg-neutral-950/40 p-6 md:p-8 rounded-2xl flex flex-col justify-between gap-4 w-full relative shadow-2xl transition-colors duration-300"
            >
              {/* Corner visual marks */}
              <div className="absolute top-3 left-3 font-mono text-[8px] text-accent/50 uppercase">
                Secondary Education Node
              </div>
              <div className="absolute bottom-3 right-3 font-mono text-[8px] text-accent/50 uppercase">
                State Board Scaling
              </div>

              <div className="flex flex-col gap-1 items-center justify-center py-4">
                <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase">
                  Computer Science Score
                </span>
                <div className="text-5xl md:text-6xl tracking-tighter">
                  <CGPACounter value={83.0} decimals={1} />
                  <span className="text-xl text-neutral-600 font-mono">%</span>
                </div>
              </div>

              <div className="border-t border-neutral-900 pt-3 flex flex-col gap-1 font-mono text-[9px] text-neutral-500">
                <div className="flex justify-between">
                  <span>Focus Subject:</span>
                  <span className="text-white">Computer Science</span>
                </div>
                <div className="flex justify-between">
                  <span>Board:</span>
                  <span className="text-white">Matriculation</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>

      {/* Footer copyright */}
      <div className="flex justify-between items-center font-mono text-[9px] text-neutral-600 tracking-[0.2em] mt-24">
        <span>[SPEC] ACADEMICS // EDUCATION LAB</span>
        <span>026 // © NITHEESH R</span>
      </div>
    </section>
  );
}
