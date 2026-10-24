import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative py-16 md:py-24 text-white px-4 sm:px-6 md:px-12 overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto space-y-12 md:space-y-16"
      >
        {/* Judul */}
        <motion.h2
          variants={itemVariants}
          style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-100 uppercase"
        >
          About Me
        </motion.h2>

        {/* Grid: foto kiri | ringkasan kanan */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
          {/* FOTO */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-yellow-500 bg-slate-900/60 shadow-2xl group">
              <img
                src="/profile.png"
                alt="Petra Andhika Natanael"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              <div
                style={{ fontFamily: "Verdana, sans-serif" }}
                className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 p-3.5 sm:p-4 rounded-2xl bg-slate-950/80 border border-yellow-500 backdrop-blur-md flex items-center justify-between text-xs"
              >
                <span className="text-slate-300">Yogyakarta, ID</span>
                <span className="text-white font-semibold">Sanata Dharma 2022</span>
              </div>
            </div>
          </motion.div>

          {/* RINGKASAN */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 bg-[#0b1329]/70 border border-yellow-500 rounded-3xl p-6 sm:p-8 md:p-10 space-y-6 backdrop-blur-md shadow-2xl"
          >
            {/* Header kampus */}
            <div className="flex items-center gap-3.5 sm:gap-4 border-b border-slate-700 pb-5 md:pb-6">
              <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-900 border border-yellow-500 text-orange-400 shrink-0">
                <GraduationCap size={28} className="sm:w-8 sm:h-8" />
              </div>
              <div>
                <h3
                  style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
                  className="text-lg sm:text-xl md:text-2xl font-bold text-orange-400"
                >
                  Universitas Sanata Dharma
                </h3>
                <p
                  style={{ fontFamily: "Consolas, monospace" }}
                  className="text-xs sm:text-sm text-slate-400 mt-0.5"
                >
                  S1 Informatika | Peminatan Artificial Intelligence
                </p>
              </div>
            </div>

            {/* Paragraf */}
            <p
              style={{ fontFamily: "'Segoe UI', sans-serif" }}
              className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed"
            >
              Saya lulusan Informatika Universitas Sanata Dharma, Yogyakarta (2022–2026), dengan fokus peminatan Computer Vision dan Deep Learning, dalam lingkup kecerdasan buatan (AI) yang lebih luas mencakup machine learning, natural language processing, large language models (LLM) dan RAG (Retrieval-Augmented Generation). Saya tertarik pada bagaimana mesin dapat "melihat" dan memahami dunia visual, memahami serta menghasilkan bahasa manusia, hingga mengambil keputusan dari data kompleks.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}