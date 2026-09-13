import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Copy, 
  Check, 
  FileText, 
  Clock 
} from 'lucide-react';

export default function Contact1() {
  const [copied, setCopied] = useState(false);

  const email = "petraandikanatanael@gmail.com";
  const whatsappNumber = "628984187533";

  // Handler Copy Email
  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 text-white px-4 sm:px-6 md:px-12 bg-black relative overflow-hidden font-sans">
      
      {/* Import JetBrains Mono Font untuk elemen teknis */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
        .font-mono-tech { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
        
        {/* Header Section */}
        <div className="space-y-3 md:space-y-4 text-center border-b border-white/10 pb-6 md:pb-8">
          <div className="flex items-center justify-center gap-2">
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            Mari Berdiskusi & Berkolaborasi
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Tertarik berkolaborasi atau ingin diskusi soal AI Engineering, Machine Learning, dan Computer Vision? Hubungi saya secara langsung melalui kontak di bawah ini.
          </p>
        </div>

        {/* Layout Utama Informasi Kontak */}
        <div className="max-w-2xl mx-auto space-y-6 md:space-y-8 text-left">
          
          {/* List Kontak Utama */}
          <div className="space-y-3 md:space-y-4">
            
            {/* Email Item */}
            <div className="p-3.5 sm:p-4 rounded-2xl border border-white/10 bg-black hover:border-white/25 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-3 sm:gap-3.5 overflow-hidden">
                <div className="p-2 sm:p-2.5 bg-white/5 border border-white/10 rounded-xl text-white shrink-0">
                  <Mail size={18} />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] sm:text-[11px] font-mono-tech text-zinc-500 uppercase">Email</div>
                  <a 
                    href={`mailto:${email}`} 
                    className="text-xs sm:text-sm font-semibold text-white hover:underline truncate block"
                  >
                    {email}
                  </a>
                </div>
              </div>
              <button
                onClick={handleCopy}
                title="Salin Email"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 transition-colors cursor-pointer shrink-0"
              >
                {copied ? <Check size={14} className="text-white" /> : <Copy size={14} />}
              </button>
            </div>

            {/* WhatsApp Item */}
            <a 
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 sm:p-4 rounded-2xl border border-white/10 bg-black hover:border-white/25 transition-all flex items-center justify-between group block"
            >
              <div className="flex items-center gap-3 sm:gap-3.5">
                <div className="p-2 sm:p-2.5 bg-white/5 border border-white/10 rounded-xl text-white shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] font-mono-tech text-zinc-500 uppercase">WhatsApp / Telepon</div>
                  <div className="text-xs sm:text-sm font-semibold text-white group-hover:underline">
                    +62 898-4187-533
                  </div>
                </div>
              </div>
              <span className="font-mono-tech text-[9px] sm:text-[10px] text-zinc-400 uppercase border border-white/10 px-2 sm:px-2.5 py-1 rounded-md bg-white/5 shrink-0">
                Chat Now →
              </span>
            </a>

            {/* Location Item */}
            <div className="p-3.5 sm:p-4 rounded-2xl border border-white/10 bg-black flex items-center gap-3 sm:gap-3.5">
              <div className="p-2 sm:p-2.5 bg-white/5 border border-white/10 rounded-xl text-white shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <div className="text-[10px] sm:text-[11px] font-mono-tech text-zinc-500 uppercase">Lokasi</div>
                <div className="text-xs sm:text-sm font-semibold text-white">
                  D.I. Yogyakarta, Indonesia
                </div>
              </div>
            </div>

          </div>

          {/* Social Links & Download CV */}
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Tombol LinkedIn dengan SVG Lokal dari public/linkedin.svg */}
              <a
                href="https://linkedin.com/in/petraandhikanatanael"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2.5 p-3 rounded-xl border border-white/10 bg-black hover:bg-white/5 hover:border-white/25 text-xs text-white transition-all font-mono-tech"
              >
                <img src="/linkedin.svg" alt="LinkedIn Logo" className="w-4 h-4 invert" />
                <span>LinkedIn</span>
              </a>

              {/* Tombol GitHub */}
              <a
                href="https://github.com/Petraa3"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2.5 p-3 rounded-xl border border-white/10 bg-black hover:bg-white/5 hover:border-white/25 text-xs text-white transition-all font-mono-tech"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
            </div>

            <div className="pt-2 space-y-2">
              <div className="text-[11px] font-mono-tech text-zinc-500 uppercase tracking-wider text-center">
                Download Curriculum Vitae
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* CV Versi Indonesia */}
                <a
                  href="/cv_indo.pdf" 
                  download
                  className="flex items-center justify-center gap-2 p-3.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white hover:text-black text-white font-mono-tech text-xs tracking-wider uppercase transition-all shadow-md active:scale-[0.99]"
                >
                  <FileText size={15} />
                  <span>CV (Indonesia)</span>
                </a>

                {/* CV Versi Inggris */}
                <a
                  href="/Petra_Andhika_English_version.pdf" 
                  download
                  className="flex items-center justify-center gap-2 p-3.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white hover:text-black text-white font-mono-tech text-xs tracking-wider uppercase transition-all shadow-md active:scale-[0.99]"
                >
                  <FileText size={15} />
                  <span>CV (English)</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-8 md:pt-12 border-t border-white/10 text-center text-xs text-zinc-500 font-mono-tech">
          © {new Date().getFullYear()} Petra Andhika Natanael. Engineered with React, Tailwind CSS & Vite.
        </footer>

      </div>
    </section>
  );
}