import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Globe, Mail } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

// Komponen Robot AI 3D Interaktif
function AIRobotHead() {
  const groupRef = useRef();
  const visorRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotasi mengambang otomatis
      groupRef.current.rotation.y += delta * 0.4;
      
      // Mengikuti gerakan mouse
      const { x, y } = state.pointer;
      groupRef.current.rotation.x = -y * 0.4;
      groupRef.current.rotation.y += x * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <group ref={groupRef} scale={1.1}>
        {/* Kepala Utama Robot (Metallic Sphere) */}
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial
            color="#0f172a"
            roughness={0.2}
            metalness={0.9}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Visor Mata Menyala (Cyan Glow) */}
        <mesh ref={visorRef} position={[0, 0.1, 0.75]}>
          <boxGeometry args={[1.2, 0.35, 0.4]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={3}
            roughness={0.1}
          />
        </mesh>

        {/* Cincin Neural Orbit Kanan-Kiri */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.4, 0.03, 16, 100]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1.5} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[1.6, 0.02, 16, 100]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1} />
        </mesh>
      </group>
    </Float>
  );
}

export default function Hero() {
  const containerRef = useRef(null);

  // State untuk kontrol menu dropdown CV
  const [showCvMenu, setShowCvMenu] = useState(false);

  // Animasi Mengetik Nama
  const fullText = "Petra Andhika Natanael";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 90);

    return () => clearInterval(timer);
  }, []);

  // Mengambil progress scroll khusus untuk section Hero ini
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transformasi saat Scroll Kebawah (disesuaikan agar tidak terlalu ekstrem di layar besar):
  const textX = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] pt-12 md:pt-20 pb-16 flex items-center justify-center text-white px-4 sm:px-6 md:px-12 overflow-hidden bg-transparent">
      
      {/* Background Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-tr from-blue-600/20 via-emerald-500/20 to-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Container Utama Grid 2 Kolom */}
      <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* KOLOM KIRI: Teks & Konten */}
        <motion.div 
          style={{ x: textX, opacity: heroOpacity }}
          className="lg:col-span-7 text-left space-y-6 md:space-y-8"
        >
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/90 border border-slate-700/60 text-slate-200 shadow-xl backdrop-blur-md"
          >
            <span className="text-xs sm:text-sm font-medium tracking-wider text-slate-100 uppercase">
              AI Engineer <span className="text-white font-extrabold mx-1.5">|</span> Computer Vision & Deep Learning
            </span>
          </motion.div>

          {/* Nama & Headline Utama */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-3 w-full" 
            style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-100 leading-[1.1] w-full">
              {displayText}
              <span className="animate-pulse text-slate-400 font-normal ml-1">|</span>
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full h-1 bg-gradient-to-r from-slate-100 via-slate-400 to-transparent rounded-full origin-left my-4"
          />

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-5 pt-1 text-stone-400"
          >
            <a href="https://github.com/Petraa3" target="_blank" rel="noreferrer" className="hover:text-white hover:scale-110 transition-all duration-300" title="GitHub Profile">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/petraandhikanatanael" target="_blank" rel="noreferrer" className="hover:text-white hover:scale-110 transition-all duration-300" title="LinkedIn Profile">
              <Globe size={22} className="sm:w-6 sm:h-6" />
            </a>
            <a href="mailto:petraandikanatanael@gmail.com" className="hover:text-white hover:scale-110 transition-all duration-300" title="Send Email">
              <Mail size={22} className="sm:w-6 sm:h-6" />
            </a>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-wrap gap-3.5 pt-2"
          >
            <a
              href="#projects"
              className="group relative bg-white hover:bg-stone-100 text-black px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 shadow-lg active:scale-95"
            >
              <span>Lihat Proyek</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            
            <div className="relative">
              <button
                onClick={() => setShowCvMenu(!showCvMenu)}
                className="bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-300 px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 active:scale-95 backdrop-blur-md flex items-center gap-2 cursor-pointer"
              >
                <span>Download CV</span>
                <span className="text-[10px] bg-stone-800 border border-stone-700 px-2 py-0.5 rounded-full text-stone-400">ID / EN</span>
              </button>

              {/* Dropdown Menu Pilihan CV */}
              {showCvMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 mt-2 w-44 rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl backdrop-blur-xl z-50 overflow-hidden p-1.5"
                >
                  <a
                    href="/cv_indo.pdf"
                    download="CV_Petra_Andhika_ID.pdf"
                    onClick={() => setShowCvMenu(false)}
                    className="flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    <span>Bahasa Indonesia</span>
                    <span className="text-[9px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-800">PDF</span>
                  </a>
                  <a
                    href="/Petra_Andhika_English_version.pdf"
                    download="Petra_Andhika_English_version.pdf"
                    onClick={() => setShowCvMenu(false)}
                    className="flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    <span>English Version</span>
                    <span className="text-[9px] bg-blue-950 text-blue-400 px-1.5 py-0.5 rounded border border-blue-800">PDF</span>
                  </a>
                </motion.div>
              )}
            </div>
          </motion.div>

        </motion.div>

        {/* KOLOM KANAN: ROBOT AI 3D INTERAKTIF */}
        <motion.div 
          style={{ scale: photoScale, opacity: heroOpacity, y: photoY }}
          className="lg:col-span-5 flex justify-center lg:justify-end relative"
        >
          {/* Pendaran Cahaya */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/25 via-blue-600/25 to-purple-600/25 rounded-3xl blur-2xl -z-10 animate-pulse" />
          
          {/* Frame Canvas 3D Mengambang */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            whileHover={{ scale: 1.02 }}
            className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-[380px] rounded-3xl overflow-hidden border border-slate-700/80 bg-slate-950/70 shadow-2xl shrink-0 group cursor-pointer backdrop-blur-md"
          >
            {/* Canvas Three.js Robot */}
            <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={40} color="#06b6d4" />
              <pointLight position={[-10, -10, -5]} intensity={30} color="#3b82f6" />
              <AIRobotHead />
            </Canvas>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}