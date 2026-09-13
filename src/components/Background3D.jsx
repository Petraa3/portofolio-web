import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

// 1. Komponen Objek 3D Interaktif & Bercahaya
function VibrantFloatingItem({ position, type, color, size = 1, speed = 1.5 }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotasi Objek 3D
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.4;

      // Parallax Interaktif: Objek merespons gerakan kursor mouse
      const { x, y } = state.pointer;
      meshRef.current.position.x = position[0] + x * 0.8;
      meshRef.current.position.y = position[1] + y * 0.8;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={2} floatIntensity={2.5}>
      <mesh ref={meshRef} position={position}>
        {/* Geometri 3D Kompleks & Berbobot Visual */}
        {type === "torusKnot" && <torusKnotGeometry args={[0.7 * size, 0.25 * size, 128, 32]} />}
        {type === "dodecahedron" && <dodecahedronGeometry args={[0.9 * size]} />}
        {type === "octahedron" && <octahedronGeometry args={[1 * size]} />}
        {type === "icosahedron" && <icosahedronGeometry args={[0.95 * size, 0]} />}
        {type === "torus" && <torusGeometry args={[0.8 * size, 0.3 * size, 16, 100]} />}

        {/* Material Metallic Physical dengan Pantulan Cahaya Tinggi */}
        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.85}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          wireframe={false} // Solid agar bentuk 3D terlihat jelas & berdimensi
        />
      </mesh>
    </Float>
  );
}

// 2. Canvas Utama Latar Belakang 3D
export default function Background3D() {
  // Daftar posisi, jenis geometri, warna neon, dan skala ukuran
  const items = [
    { position: [-5.5, 3.5, -2], type: "torusKnot", color: "#db0606", size: 1.1, speed: 1.8 },
    { position: [5.5, 2.5, -3], type: "dodecahedron", color: "#06b6d4", size: 1.2, speed: 1.5 },
    { position: [-6, -2.5, -1], type: "octahedron", color: "#a855f7", size: 1.0, speed: 2.0 },
    { position: [6, -3.5, -2], type: "torusKnot", color: "#3b82f6", size: 0.9, speed: 1.6 },
    { position: [-1.5, 4.5, -4], type: "icosahedron", color: "#10b981", size: 1.3, speed: 1.2 },
    { position: [2, -4.5, -3], type: "torus", color: "#ec4899", size: 1.1, speed: 1.4 },
    { position: [-7, 0.5, -3], type: "dodecahedron", color: "#6366f1", size: 0.8, speed: 2.2 },
    { position: [7, 0, -4], type: "octahedron", color: "#053144", size: 1.1, speed: 1.7 },
  ];

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#000000]">
      {/* 1. TEKSTUR GRID MESH TACTICAL */}
      <div 
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          opacity: 0.45, // Opacity dinaikkan dari 0.15 ke 0.45 agar tegas
          backgroundImage: `
            linear-gradient(to right, rgba(6, 182, 212, 0.25) 1.5px, transparent 6.5px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.25) 1.5px, transparent 6.5px)
          `,
          backgroundSize: '60px 60px' // Ukuran kotak grid diperbesar agar tidak kekecilan
        }}
      />
      <div className="absolute inset-0 z-2 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[8, 8, 5]} intensity={55} color="#06B6D4" />
          <pointLight position={[-8, -6, 5]} intensity={45} color="#3B82F6" />
          <pointLight position={[0, -8, -2]} intensity={35} color="#6366F1" />

          {items.map((item, idx) => (
            <VibrantFloatingItem
              key={idx}
              position={item.position}
              type={item.type}
              color={item.color}
              size={item.size}
              speed={item.speed}
            />
          ))}
        </Canvas>
      </div>

    </div>
  );
}