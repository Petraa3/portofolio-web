import Navbar from './components/Navbar1';
import Hero from './components/Hero1';
import About from './components/About1';
import Experience from './components/Experience1';
import Projects from './components/Projects1';
import Contact from './components/Contact1';
import ChatbotWidget from "./components/ChatbotWidget";
import "./App.css";

export default function App() {
  return (
    <div className="relative w-full min-h-screen font-sans antialiased selection:bg-white selection:text-black bg-[#020617] text-white">
      <Navbar />
      
      {/* Konten Utama */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <ChatbotWidget />
    </div>
  );
}