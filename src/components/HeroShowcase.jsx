import { useEffect, useState } from "react";

// Taruh gambar di folder public/demo/
const slides = [
  { src: "/demo/python.jpg"},
  { src: "/demo/deeplearning.jpg"},
  { src: "/demo/ultralytics.png"},
  { src: "/demo/download.jpg"},
  { src: "/demo/ai_agent.webp"}
];

export default function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActive((p) => (p + 1) % slides.length);
    }, 3000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.label}
          loading={i === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <span className="absolute left-3 top-3 rounded-md bg-black/60 px-2 py-1 text-xs text-white/90 backdrop-blur">
        {slides[active].label}
      </span>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-6 bg-white" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
