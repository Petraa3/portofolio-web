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
  GitCommit,
  GitBranch
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
    keyStats: [
      { label: 'Durasi Khidmat', value: '1 Tahun' },
      { label: 'Redesign Portal', value: 'WordPress' },
      { label: 'Peningkatan UX', value: 'Signifikan' }
    ],
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
    <section id="experience" className="relative py-24 text-[#c9d1d9] px-6 md:px-12 overflow-hidden bg-transparent">
      
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header & GitHub Tab Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#ffff] pb-8">
          <div className="space-y-2">
            <h2 style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-[#f0f6fc]">
              Pengalaman Professional
            </h2>
          </div>

          {/* Tab Filter Button ala GitHub Sub-nav */}
          <div className="flex items-center gap-1 bg-[#161b22] p-1 rounded-xl border border-[#ffff] w-fit">
            <button
              onClick={() => setActiveTab('all')}
              style={{ fontFamily: "Arial, sans-serif" }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTab === 'all' 
                  ? 'bg-[#21262d] text-[#f0f6fc] border border-[#8b949e]/40' 
                  : 'text-[#8b949e] hover:text-[#c9d1d9]'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setActiveTab('tech')}
              style={{ fontFamily: "Arial, sans-serif" }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTab === 'tech' 
                  ? 'bg-[#21262d] text-[#f0f6fc] border border-[#8b949e]/40' 
                  : 'text-[#8b949e] hover:text-[#c9d1d9]'
              }`}
            >
              AI & Tech
            </button>
            <button
              onClick={() => setActiveTab('leadership')}
              style={{ fontFamily: "Arial, sans-serif" }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
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
        <div className="relative border-l-2 border-[#30363d] ml-3 md:ml-6 space-y-10 pl-6 md:pl-10">
          
          <AnimatePresence mode="wait">
            {filteredExperiences.map((exp) => {
              const IconComponent = exp.icon;

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
                  <div className="absolute -left-[31px] md:-left-[47px] top-0 p-2 rounded-xl border border-[#30363d] bg-[#0d1117] text-[#238636] shadow-md">
                    <GitCommit size={18} />
                  </div>

                  {/* CARD KONTEN UTAMA (GitHub Dark Box) */}
                  <div className="bg-[#0d1117] border border-[#30363d] hover:border-[#8b949e]/50 rounded-2xl p-6 md:p-8 space-y-6 transition-all duration-200 shadow-xl">
                    
                    {/* Header Card */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#30363d] pb-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-[#f0f6fc] pt-1">{exp.role}</h3>
                        <p className="text-sm font-semibold text-[#8b949e]">{exp.company}</p>
                      </div>

                      {/* Info Waktu & Lokasi */}
                      <div className="text-left md:text-right text-xs font-mono text-[#8b949e] space-y-1">
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
                    <p className="text-[#c9d1d9] text-sm md:text-base leading-relaxed">
                      {exp.shortSummary}
                    </p>

                    {/* Key Stats Box (GitHub Sub-canvas Box) */}
                    <div className="grid grid-cols-3 gap-3 pt-1">
                      {exp.keyStats.map((stat, idx) => (
                        <div key={idx} className="bg-[#161b22] border border-[#30363d] rounded-xl p-3.5 text-center">
                          <div className="text-lg md:text-2xl font-bold text-[#f0f6fc] font-mono">
                            {stat.value}
                          </div>
                          <div className="text-[10px] text-[#8b949e] font-mono tracking-wider uppercase mt-0.5">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Soft Skill Framing Quote */}
                    {exp.framingQuote && (
                      <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] text-xs text-[#8b949e] italic">
                        "{exp.framingQuote}"
                      </div>
                    )}

                    {/* Tech Badges & Action Button */}
                    <div className="pt-4 border-t border-[#30363d] flex flex-wrap items-center justify-between gap-4">
                      
                      {/* Tech Badges (GitHub Topic Pills) */}
                      <div className="flex flex-wrap gap-1.5 max-w-xl">
                        {exp.tags.map((tag, idx) => (
                          <span key={idx} className="text-[11px] font-mono bg-[#388bfd]/10 border border-[#388bfd]/30 text-[#58a6ff] px-2.5 py-0.5 rounded-full hover:bg-[#388bfd]/20 transition-colors">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Button Action (GitHub Commit Green Button) */}
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

      {/* MODAL POPUP (GitHub Modal Dark Sheet) */}
      <AnimatePresence>
        {selectedModalData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/75 backdrop-blur-sm">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="bg-[#0d1117] border border-[#30363d] rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 space-y-8 shadow-2xl relative text-[#c9d1d9]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedModalData(null)}
                className="absolute top-6 right-6 p-1.5 rounded-lg bg-[#21262d] border border-[#30363d] text-[#8b949e] hover:text-[#f0f6fc] hover:border-[#8b949e] transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              {/* Modal Header */}
              <div className="space-y-2 border-b border-[#30363d] pb-6 pr-10">
                <h3 className="text-2xl font-bold text-[#f0f6fc] pt-1">{selectedModalData.role}</h3>
                <p className="text-xs text-[#8b949e] font-mono">{selectedModalData.company} — {selectedModalData.period}</p>
              </div>

              {/* Loop Sub-Projects */}
              <div className="space-y-6">
                {selectedModalData.subProjects.map((sub, idx) => (
                  <div key={idx} className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 md:p-6 space-y-4">
                    
                    <h4 className="text-base font-bold text-[#f0f6fc]">
                      {sub.title}
                    </h4>

                    {/* Tujuan */}
                    <div className="text-xs text-[#8b949e] leading-relaxed bg-[#0d1117] p-3 rounded-lg border border-[#30363d]">
                      <strong className="text-[#c9d1d9] font-mono">Tujuan:</strong> {sub.problem}
                    </div>

                    {/* Alur Kerja Teknikal */}
                    <div className="space-y-2 pt-1">
                      <div className="text-xs font-mono font-semibold text-[#58a6ff] flex items-center gap-1.5">
                        Alur Kerja Teknikal:
                      </div>
                      <ul className="space-y-2 pl-2">
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