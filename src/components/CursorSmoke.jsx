import React, { useEffect, useRef } from "react";

export default function CursorSmoke() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    // Menyesuaikan ukuran canvas dengan jendela layar
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Palet warna asap neon AI (Cyan, Blue, Purple, Magenta)
    const colors = ["#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#10b981"];

    // Kelas untuk 1 partikel asap
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        // Kecepatan menyebar ke segala arah
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5 - 0.5; // Mengambang sedikit ke atas
        this.size = Math.random() * 12 + 8; // Ukuran awal gumpalan asap
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = 0.7; // Transparansi awal
        this.decay = Math.random() * 0.02 + 0.015; // Kecepatan menghilang
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.size += 0.4; // Asap mengembang seiring waktu
        this.alpha -= this.decay; // Perlahan memudar
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.beginPath();
        
        // Efek gradasi pendaran (glow effect)
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Mendengarkan gerakan kursor mouse
    const handleMouseMove = (e) => {
      // Buat 2-3 partikel setiap kali kursor bergeser
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Loop animasi render canvas
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Hapus partikel jika transparasinya sudah habis
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
}