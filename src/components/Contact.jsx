import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Loader } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");

    // Pull from environment variables (fallback to simulated mode if missing)
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // Demo mode simulation to demonstrate full premium success animations
      setTimeout(() => {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      }, 1800);
      return;
    }

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: formData.name,
            reply_to: formData.email,
            message: formData.message,
          },
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Could not deliver email.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong.");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen py-32 px-6 md:px-12 border-t border-neutral-900 bg-black flex flex-col justify-between relative"
    >
      {/* Title */}
      <div className="flex flex-col gap-2 mb-16">
        <span className="font-mono text-xs text-neutral-600 tracking-[0.3em] uppercase">
          [ GET IN TOUCH ]
        </span>
        <h2 className="text-4xl md:text-6xl font-display font-semibold tracking-tight text-white uppercase leading-none">
          LET'S BUILD SOMETHING AMAZING
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start w-full flex-1">
        {/* Left Side: Contact Info */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">// Connection Details</span>
            <p className="text-neutral-400 font-sans font-light text-base leading-relaxed">
              Have an opening in your software engineering team? Want to collaborate on a full-stack project, or just discuss core Java concepts? Shoot me a message.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5 border-l border-neutral-900 pl-6">
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">Email Address</span>
              <a href="mailto:nitheesh.developer@example.com" className="text-white hover:text-neutral-400 transition-colors text-lg font-mono">
                nitheesh.developer@example.com
              </a>
            </div>

            <div className="flex flex-col gap-1.5 border-l border-neutral-900 pl-6">
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">Current Location</span>
              <span className="text-neutral-300 text-lg font-mono">Coimbatore, Tamil Nadu, India</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form panel with Success anim */}
        <div className="lg:col-span-7 border border-neutral-900 bg-neutral-950/40 p-8 md:p-10 rounded-2xl relative overflow-hidden min-h-[460px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] rounded-full blur-2xl pointer-events-none" />

          <AnimatePresence mode="wait">
            {status !== "success" ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                {/* Name field */}
                <div className="flex flex-col gap-1 relative group">
                  <label htmlFor="name" className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status === "loading"}
                    className="border-b border-neutral-800 focus:border-white bg-transparent outline-none py-3 text-white transition-all duration-300 font-sans focus:shadow-[0_2px_12px_rgba(255,255,255,0.02)]"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email field */}
                <div className="flex flex-col gap-1 relative group">
                  <label htmlFor="email" className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status === "loading"}
                    className="border-b border-neutral-800 focus:border-white bg-transparent outline-none py-3 text-white transition-all duration-300 font-sans focus:shadow-[0_2px_12px_rgba(255,255,255,0.02)]"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Message field */}
                <div className="flex flex-col gap-1 relative group">
                  <label htmlFor="message" className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    disabled={status === "loading"}
                    className="border-b border-neutral-800 focus:border-white bg-transparent outline-none py-3 text-white transition-all duration-300 font-sans resize-none focus:shadow-[0_2px_12px_rgba(255,255,255,0.02)]"
                    placeholder="Enter your message"
                  />
                </div>

                {/* Send button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative flex items-center justify-center gap-2 border border-white hover:bg-white hover:text-black py-4 rounded-full transition-all duration-300 font-mono tracking-widest text-xs uppercase cursor-none w-full mt-4"
                >
                  {status === "loading" ? (
                    <>
                      <Loader className="animate-spin" size={14} />
                      <span>SENDING MESSAGE...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <Send size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

                {status === "error" && (
                  <span className="font-mono text-[9px] text-red-500 tracking-wider uppercase text-center mt-2">
                    // Error: {errorMessage}
                  </span>
                )}
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 gap-4"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.2 }}
                  className="text-white mb-2"
                >
                  <CheckCircle size={64} strokeWidth={1} />
                </motion.div>

                <h3 className="text-2xl font-display font-semibold text-white uppercase tracking-wider">
                  MESSAGE SENT SUCCESSFULLY
                </h3>
                
                <p className="text-neutral-400 font-sans font-light text-sm max-w-sm leading-relaxed">
                  Thank you for reaching out! Nitheesh will inspect your transmission and reply as soon as possible.
                </p>

                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 border border-white/20 hover:border-white hover:text-white text-neutral-400 font-mono text-[9px] tracking-widest uppercase py-2 px-6 rounded-full transition-colors cursor-none"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="flex justify-between items-center font-mono text-[9px] text-neutral-600 tracking-[0.2em] mt-24">
        <span>CONTACT // COMMS SEC</span>
        <span>026 // © NITHEESH R</span>
      </div>
    </section>
  );
}
