import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap 
} from 'lucide-react';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  return (
    <section id="about" className="relative py-16 md:py-24 text-white px-4 sm:px-6 md:px-12 overflow-hidden bg-transparent">
      
      {/* Background Glow Effect */}
      <div className="absolute top-1/4 left-0 w-72 h-72 md:w-96 md:h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-72 h-72 md:w-96 md:h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto space-y-12 md:space-y-16"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h2 
            style={{ fontFamily: "'Trebuchet MS', sans-serif" }} 
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-100 uppercase"
          >
            About Me
          </h2>
        </motion.div>

        {/* UTAMA: Grid 2 Kolom (Foto Profil Kiri | Ringkasan Taktis Kanan) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-stretch">
          
          {/* FOTO PROFIL (KOLOM KIRI - 5 Spasium) */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-yellow-500 bg-slate-900/60 shadow-2xl group cursor-pointer">
              
              {/* Glow Behind Photo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-purple-600/20 opacity-50 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              
              <img 
                src="/profile.png" 
                alt="Petra Andhika Natanael" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Overlay Glassmorphic Footnote */}
              <div 
                style={{ fontFamily: "Verdana, sans-serif" }}
                className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 p-3.5 sm:p-4 rounded-2xl bg-slate-950/80 border border-yellow-500 backdrop-blur-md flex items-center justify-between text-xs"
              >
                <span className="text-slate-300 flex items-center gap-2">
                  Yogyakarta, ID
                </span>
                <span className="text-[#ffff] font-semibold">Sanata Dharma 2022</span>
              </div>
            </div>
          </motion.div>

          {/* RINGKASAN PROFIL RINGKAS & ELEGANT (KOLOM KANAN - 7 Spasium) */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-7 bg-[#0b1329]/70 border border-yellow-500 rounded-3xl p-6 sm:p-8 md:p-10 space-y-5 backdrop-blur-md shadow-2xl flex flex-col justify-between h-full"
          >
            {/* Kampus & Status Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-yellow-500 pb-5 md:pb-6">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-900 border border-yellow-500 text-cyan-400 shrink-0">
                  <GraduationCap size={28} className="sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h3 
                    style={{ fontFamily: "'Trebuchet MS', sans-serif" }} 
                    className="text-lg sm:text-xl md:text-2xl font-bold text-slate-100"
                  >
                    Universitas Sanata Dharma
                  </h3>
                  <p 
                    style={{ fontFamily: "Consolas, monospace" }} 
                    className="text-xs sm:text-sm text-slate-400 mt-0.5"
                  >
                    S1 Informatika — Peminatan Artificial Intelligence
                  </p>
                </div>
              </div>
            </div>

            {/* Paragraf Ringkas Taktis */}
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p 
                style={{ fontFamily: "'Segoe UI', sans-serif" }} 
                className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed"
              >
                Saya lulusan Informatika Universitas Sanata Dharma, Yogyakarta (2022–2026), dengan fokus peminatan Computer Vision dan Deep Learning, dalam lingkup kecerdasan buatan (AI) yang lebih luas mencakup machine learning, natural language processing, large language models (LLM) dan RAG (Retrieval-Augmented Generation). Saya tertarik pada bagaimana mesin dapat "melihat" dan memahami dunia visual, memahami serta menghasilkan bahasa manusia, hingga mengambil keputusan dari data kompleks. 
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/60 border border-yellow-500 space-y-2">
                  <div 
                    style={{ fontFamily: "Verdana, sans-serif" }} 
                    className="text-xs sm:text-sm text-cyan-400 font-bold flex items-center gap-2"
                  >
                   Academic Research
                  </div>
                  <p 
                    style={{ fontFamily: "Verdana, sans-serif" }} 
                    className="text-xs sm:text-sm text-slate-100 leading-relaxed"
                  >
                    Pengembangan arsitektur TrackNetV3 untuk pelacakan objek presisi tinggi (shuttlecock trajectory) tanpa blurred frame.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/60 border border-yellow-500 space-y-2">
                  <div 
                    style={{ fontFamily: "Verdana, sans-serif" }}
                    className="text-xs sm:text-sm text-blue-400 font-bold flex items-center gap-2"
                  >
                  Industrial Deployment
                  </div>
                  <p 
                    style={{ fontFamily: "'Segoe UI', sans-serif" }} 
                    className="text-xs sm:text-sm text-slate-100 leading-relaxed"
                  >
                    Ex-AI Engineer Intern di Beehive Drone, merancang sistem deteksi berbasis YOLO & men-deploy-nya ke perangkat Edge AI untuk otomatisasi industri.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}