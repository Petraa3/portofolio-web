import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Globe, Mail } from "lucide-react";
import HeroShowcase from "./HeroShowcase";

const FULL_TEXT = "Petra Andhika Natanael";

export default function Hero() {
  const containerRef = useRef(null);
  const cvMenuRef = useRef(null);

  const [showCvMenu, setShowCvMenu] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Animasi mengetik nama
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= FULL_TEXT.length) {
        setDisplayText(FULL_TEXT.slice(0, index));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 70);
    return () => clearInterval(timer);
  }, []);

  // Tutup menu CV saat klik di luar
  useEffect(() => {
    if (!showCvMenu) return;
    const handleClick = (e) => {
      if (cvMenuRef.current && !cvMenuRef.current.contains(e.target)) {
        setShowCvMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showCvMenu]);

  // Efek saat scroll ke bawah
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const textX = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] pt-12 md:pt-20 pb-16 flex items-center justify-center text-white px-4 sm:px-6 md:px-12 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* KOLOM KIRI: Teks */}
        <motion.div
          style={{ x: textX, opacity: heroOpacity }}
          className="lg:col-span-7 space-y-6 md:space-y-12"
        >
        <p className="text-xs sm:text-sm font-medium tracking-wider text-slate-500 uppercase !mb-8">
          AI Engineer <span className="font-extrabold mx-3">|</span> Computer Vision & Deep Learning
        </p>

          {/* Nama */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-stone-100 leading-[1.1]"
            style={{ fontFamily: "'Abel', sans-serif" }}
          >
            {displayText}
            <span className={`caret ${isTyping ? "" : "caret-blink"}`} />
          </motion.h1>

          {/* Garis pemisah */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full h-1 bg-gradient-to-r from-slate-100 via-slate-400 to-transparent rounded-full origin-left"
          />

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-5 text-stone-400"
          >
            <a
              href="https://github.com/Petraa3"
              target="_blank"
              rel="noreferrer"
              title="GitHub"
              className="hover:text-white hover:scale-110 transition-all duration-300"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/petraandhikanatanael"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              className="hover:text-white hover:scale-110 transition-all duration-300"
            >
              <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href="mailto:petraandikanatanael@gmail.com"
              title="Email"
              className="hover:text-white hover:scale-110 transition-all duration-300"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </motion.div>

          {/* Tombol aksi */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-wrap gap-3.5"
          >
            <a
              href="#projects"
              className="group bg-white hover:bg-stone-100 text-black px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 shadow-lg active:scale-95"
            >
              <span>Lihat Proyek</span>
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </a>

            <div className="relative" ref={cvMenuRef}>
              <button
                onClick={() => setShowCvMenu((v) => !v)}
                className="bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-300 px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 active:scale-95 backdrop-blur-md flex items-center gap-2"
              >
                <span>Download CV</span>
                <span className="text-[10px] bg-stone-800 border border-stone-700 px-2 py-0.5 rounded-full text-stone-400">
                  ID / EN
                </span>
              </button>

              <AnimatePresence>
                {showCvMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-2 w-44 rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl backdrop-blur-xl z-50 p-1.5"
                  >
                    <a
                      href="/cv_indo.pdf"
                      download="CV_Petra_Andhika_ID.pdf"
                      onClick={() => setShowCvMenu(false)}
                      className="flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <span>Bahasa Indonesia</span>
                      <span className="text-[9px] text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">PDF</span>
                    </a>
                    <a
                      href="/Petra_Andhika_English_version.pdf"
                      download="Petra_Andhika_English_version.pdf"
                      onClick={() => setShowCvMenu(false)}
                      className="flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <span>English Version</span>
                      <span className="text-[9px] text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">PDF</span>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        {/* KOLOM KANAN: Slide hasil proyek */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ opacity: heroOpacity }}
          className="lg:col-span-5 w-full"
        >
          <HeroShowcase />
        </motion.div>
      </div>
    </section>
  );
}