import React, { useState } from 'react';
import { Home, Copy, Check, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Tentang', href: '#about' },
    { name: 'Pengalaman', href: '#experience' },
    { name: 'Proyek ML/AI', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className="fixed top-8 left-0 right-0 z-30 flex justify-center px-4">
      {/* Container Utuh Floating Pill */}
      <div className="bg-[#1e1e1e]/90 backdrop-blur-md border border-stone-800 text-white rounded-full p-2 shadow-2xl shadow-black/60 flex items-center justify-between gap-4 md:gap-8 max-w-fit w-full transition-all duration-300">
        
        {/* Logo / Icon Planet */}
        <a 
          href="#" 
          className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shrink-0 hover:scale-105 transition-transform duration-200"
          aria-label="Home"
        >
          <Home size={20} className="stroke-[2.5]" />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6 px-2">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-sm font-medium text-stone-300 hover:text-white transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-10 h-10 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center hover:text-white focus:outline-none ml-auto"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-4 right-4 bg-[#1e1e1e] border border-stone-800 rounded-2xl p-5 shadow-2xl lg:hidden flex flex-col gap-4 text-center">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-stone-300 hover:text-white font-medium py-1 text-sm"
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