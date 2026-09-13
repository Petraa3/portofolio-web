import React, { useState } from 'react';
import { Home, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Tentang', href: '#about' },
    { name: 'Pengalaman', href: '#experience' },
    { name: 'Proyek ML/AI', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 font-sans">
      {/* Container Utuh Floating Pill */}
      <div className="bg-black/80 backdrop-blur-md border border-white/10 text-white rounded-full p-2 shadow-2xl flex items-center justify-between gap-4 md:gap-8 max-w-fit w-full transition-all duration-300">
        
        {/* Logo / Icon Home */}
        <a 
          href="#" 
          className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shrink-0 hover:scale-105 transition-transform duration-200 shadow-md"
          aria-label="Home"
        >
          <Home size={18} className="stroke-[2.5]" />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6 px-3">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-10 h-10 rounded-full bg-white/10 border border-white/10 text-zinc-300 flex items-center justify-center hover:text-white focus:outline-none ml-auto cursor-pointer"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-20 left-4 right-4 bg-black border border-white/10 rounded-3xl p-5 shadow-2xl lg:hidden flex flex-col gap-4 text-center z-50">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-zinc-300 hover:text-white font-medium py-2 text-xs sm:text-sm border-b border-white/5 last:border-none"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}