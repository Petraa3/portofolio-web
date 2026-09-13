import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  MapPin, 
  Cpu, 
  ExternalLink, 
  X, 
  CheckCircle2,
  GitCommit
} from 'lucide-react';

const experiencesData = [
  {
    id: 'beehive-drone',
    category: 'tech',
    role: 'AI Engineer Intern',
    company: 'PT. Aerotek Global Inovasi (Beehive Drone)',
    location: 'Yogyakarta, Indonesia',
    period: 'Feb 2026 – Mei 2026',
    icon: Cpu,
    shortSummary: 'Mengembangkan model Computer Vision untuk klasifikasi kematangan bunga sawit otomatis pada drone dan pipeline multi-threading scanner logistik gudang real-time.',
    keyStats: [
      { label: 'Akurasi Sawit', value: '92.6%' },
      { label: 'Model YOLO', value: '3 Architecture' },
      { label: 'Multi-OCR', value: '3 Engine' }
    ],
    tags: ['YOLOv8/v11/26', 'Raspberry Pi 5', 'Sony IMX500', 'Roboflow', 'OpenCV', 'EasyOCR', 'PaddleOCR', 'pyzbar', 'CLAHE'],
    hasDetailModal: true,
    subProjects: [
      {
        title: '1. Klasifikasi Kematangan Bunga Kelapa Sawit (Drone Autonomous)',
        problem: 'Mendukung proses penyerbukan otomatis berbasis drone di perkebunan sawit secara presisi.',
        flow: [
          'Annotating & labeling 4 fase kematangan bunga sawit via Roboflow.',
          'Benchmarking & training 3 arsitektur: YOLOv8, YOLOv11, dan YOLO26.',
          'Deployment Edge AI ke Raspberry Pi 5 + Kamera AI Sony IMX500.'
        ],
        result: 'Mencapai akurasi mAP tertinggi sebesar 92.6% untuk eksekusi penyerbukan tepat sasaran.',
        tech: ['YOLOv8', 'YOLOv11', 'YOLO26', 'Roboflow', 'Raspberry Pi 5', 'Sony IMX500']
      },
      {
        title: '2. Scanner Logistik Gudang Multi-Threading (Barcode, QR & OCR Expired Date)',
        problem: 'Mempercepat verifikasi stok gudang logistik otomatis via kamera yang terpasang pada drone.',
        flow: [
          'Arsitektur Multi-Threading (Python, OpenCV, YOLO) untuk pemrosesan simultan tanpa delay.',
          'Decoding cepat barcode/QR Code via pyzbar dan zxing-cpp.',
          'Ekstraksi tanggal kadaluarsa (Expired Date) dengan kombinasi EasyOCR, PaddleOCR, & Tesseract.',
          'Image Enhancement (CLAHE & Super-Resolution) untuk mengatasi kontras pencahayaan ekstrem gudang.'
        ],
        result: 'Data hasil scan terekam otomatis ke CSV Database + UI Panel Interaktif tanpa latency.',
        tech: ['Python', 'OpenCV', 'YOLO', 'pyzbar', 'zxing-cpp', 'EasyOCR', 'PaddleOCR', 'CLAHE']
      }
    ]
  },
  {
    id: 'bem-usd',
    category: 'leadership',
    role: 'Staf Komunikasi & Informasi',
    company: 'BEM Universitas Sanata Dharma',
    location: 'Yogyakarta, Indonesia',
    period: 'Des 2023 – Des 2024',
    icon: Users,
    shortSummary: 'Bertanggung jawab atas perencanaan, produksi media digital, serta perancangan ulang situs web resmi untuk meningkatkan efektivitas komunikasi publik organisasi.',
    tags: ['Figma', 'Canva', 'CapCut', 'WordPress', 'UX Redesign', 'Content Strategy'],
    framingQuote: 'Pengalaman ini melatih kemampuan komunikasi publik, manajemen proyek, dan kolaborasi tim di luar konteks teknis.',
    hasDetailModal: false
  }
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedModalData, setSelectedModalData] = useState(null);

  const filteredExperiences = experiencesData.filter(item => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  return (
    <section id="experience" className="relative py-16 md:py-24 text-[#c9d1d9] px-4 sm:px-6 md:px-12 overflow-hidden bg-transparent">
      
      <div className="max-w-5xl mx-auto space-y-10 md:space-y-12">
        
        {/* Section Header & GitHub Tab Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6 md:pb-8">
          <div className="space-y-2">
            <h2 
              style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
              className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-[#f0f6fc]"
            >
              Pengalaman Professional
            </h2>
          </div>

          {/* Tab Filter Button ala GitHub Sub-nav */}
          <div className="flex items-center gap-1 bg-[#161b22] p-1 rounded-xl border border-white/10 w-fit">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'all' 
                  ? 'bg-[#21262d] text-[#f0f6fc] border border-[#8b949e]/40' 
                  : 'text-[#8b949e] hover:text-[#c9d1d9]'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setActiveTab('tech')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'tech' 
                  ? 'bg-[#21262d] text-[#f0f6fc] border border-[#8b949e]/40' 
                  : 'text-[#8b949e] hover:text-[#c9d1d9]'
              }`}
            >
              AI & Tech
            </button>
            <button
              onClick={() => setActiveTab('leadership')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'leadership' 
                  ? 'bg-[#21262d] text-[#f0f6fc] border border-[#8b949e]/40' 
                  : 'text-[#8b949e] hover:text-[#c9d1d9]'
              }`}
            >
              Leadership
            </button>
          </div>
        </div>

        {/* Timeline Container (Gaya GitHub Commit Line) */}
        <div className="relative border-l-2 border-[#30363d] ml-3 md:ml-6 space-y-8 md:space-y-10 pl-5 sm:pl-6 md:pl-10">
          
          <AnimatePresence mode="wait">
            {filteredExperiences.map((exp) => {
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  {/* Timeline Node Icon (GitHub Commit Icon Node) */}
                  <div className="absolute -left-[27px] sm:-left-[31px] md:-left-[47px] top-0 p-1.5 sm:p-2 rounded-xl border border-[#30363d] bg-[#0d1117] text-[#238636] shadow-md">
                    <GitCommit size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>

                  {/* CARD KONTEN UTAMA (GitHub Dark Box) */}
                  <div className="bg-[#0d1117] border border-[#30363d] hover:border-[#8b949e]/50 rounded-2xl p-5 sm:p-6 md:p-8 space-y-5 md:space-y-6 transition-all duration-200 shadow-xl">
                    
                    {/* Header Card */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 border-b border-[#30363d] pb-4 md:pb-5">
                      <div className="space-y-1">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#f0f6fc] pt-1">{exp.role}</h3>
                        <p className="text-xs sm:text-sm font-semibold text-[#8b949e]">{exp.company}</p>
                      </div>

                      {/* Info Waktu & Lokasi */}
                      <div className="text-left md:text-right text-[11px] sm:text-xs font-mono text-[#8b949e] space-y-1">
                        <div className="flex items-center md:justify-end gap-1.5 text-[#c9d1d9]">
                          <Calendar size={13} className="text-[#8b949e]" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center md:justify-end gap-1.5">
                          <MapPin size={13} className="text-[#8b949e]" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Ringkasan Peran */}
                    <p className="text-[#c9d1d9] text-xs sm:text-sm md:text-base leading-relaxed">
                      {exp.shortSummary}
                    </p>

                    {/* Soft Skill Framing Quote */}
                    {exp.framingQuote && (
                      <div className="p-3.5 sm:p-4 rounded-xl bg-[#161b22] border border-[#30363d] text-xs text-[#8b949e] italic">
                        "{exp.framingQuote}"
                      </div>
                    )}

                    {/* Tech Badges & Action Button */}
                    <div className="pt-3 sm:pt-4 border-t border-[#30363d] flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                      
                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1.5 max-w-xl">
                        {exp.tags.map((tag, idx) => (
                          <span key={idx} className="text-[10px] sm:text-[11px] font-mono bg-[#388bfd]/10 border border-[#388bfd]/30 text-[#58a6ff] px-2.5 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Button Action */}
                      {exp.hasDetailModal && (
                        <button
                          onClick={() => setSelectedModalData(exp)}
                          className="inline-flex items-center gap-2 bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-xs px-4 py-2 rounded-xl border border-[#3fb950]/40 transition-all duration-200 active:scale-95 shrink-0 shadow-sm cursor-pointer"
                        >
                          <span>Detail Arsitektur</span>
                          <ExternalLink size={13} />
                        </button>
                      )}

                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

        </div>

      </div>

      {/* MODAL POPUP */}
      <AnimatePresence>
        {selectedModalData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/75 backdrop-blur-sm">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="bg-[#0d1117] border border-[#30363d] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-5 sm:p-6 md:p-8 space-y-6 shadow-2xl relative text-[#c9d1d9]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedModalData(null)}
                className="absolute top-5 right-5 p-1.5 rounded-lg bg-[#21262d] border border-[#30363d] text-[#8b949e] hover:text-[#f0f6fc] transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              {/* Modal Header */}
              <div className="space-y-1.5 border-b border-[#30363d] pb-5 pr-10">
                <h3 className="text-xl sm:text-2xl font-bold text-[#f0f6fc]">{selectedModalData.role}</h3>
                <p className="text-xs text-[#8b949e] font-mono">{selectedModalData.company} — {selectedModalData.period}</p>
              </div>

              {/* Loop Sub-Projects */}
              <div className="space-y-5">
                {selectedModalData.subProjects.map((sub, idx) => (
                  <div key={idx} className="bg-[#161b22] border border-[#30363d] rounded-xl p-4 sm:p-5 space-y-3.5">
                    
                    <h4 className="text-sm sm:text-base font-bold text-[#f0f6fc]">
                      {sub.title}
                    </h4>

                    {/* Tujuan */}
                    <div className="text-xs text-[#8b949e] leading-relaxed bg-[#0d1117] p-3 rounded-lg border border-[#30363d]">
                      <strong className="text-[#c9d1d9] font-mono">Tujuan:</strong> {sub.problem}
                    </div>

                    {/* Alur Kerja Teknikal */}
                    <div className="space-y-2 pt-1">
                      <div className="text-xs font-mono font-semibold text-[#58a6ff]">
                        Alur Kerja Teknikal:
                      </div>
                      <ul className="space-y-1.5 pl-2">
                        {sub.flow.map((step, stepIdx) => (
                          <li key={stepIdx} className="text-xs text-[#c9d1d9] flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] shrink-0 mt-1.5" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Hasil Terukur */}
                    <div className="p-3 rounded-lg bg-[#238636]/10 border border-[#238636]/30 text-xs text-[#3fb950] flex items-center gap-2">
                      <CheckCircle2 size={15} className="shrink-0 text-[#3fb950]" />
                      <span><strong>Hasil Terukur:</strong> {sub.result}</span>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {sub.tech.map((t, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono bg-[#0d1117] border border-[#30363d] text-[#8b949e] px-2.5 py-0.5 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>

                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-[#30363d] flex justify-end">
                <button
                  onClick={() => setSelectedModalData(null)}
                  className="bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] text-xs font-semibold px-5 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}