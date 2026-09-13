import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { 
  FolderGit2, 
  Sparkles, 
  Camera, 
  CheckCircle2, 
  ScanLine, 
  Upload, 
  VideoOff,
  Cpu,
  Maximize2,
  Minimize2
} from 'lucide-react';

export default function Projects1() {
  const [activeInteractiveMode, setActiveInteractiveMode] = useState('yolo');
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [modelLoadingError, setModelLoadingError] = useState(null);
  
  // State untuk Fitur Expand/Fullscreen Frame Kamera
  const [isExpanded, setIsExpanded] = useState(false);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const tracknetVideoRef = useRef(null);

  // Konfigurasi Video Kamera (Responsif & HD)
  const videoConstraints = {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: "user"
  };

  // Autoplay video TrackNetV3 (Fallback handler)
  useEffect(() => {
    if (tracknetVideoRef.current) {
      tracknetVideoRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    let animationFrameId;

    if (isCameraOn && activeInteractiveMode === 'yolo') {
      setIsModelLoaded(false);
      setModelLoadingError(null);

      // Dynamic import — baru di-download saat kamera dinyalakan
      import('../utils/yoloInference').then(({ loadYoloModel, detectObjects }) => {
        loadYoloModel('/models/yolo26s.onnx')
          .then(() => {
            setIsModelLoaded(true);

            const runDetection = async () => {
              if (
                webcamRef.current &&
                webcamRef.current.video &&
                webcamRef.current.video.readyState === 4 &&
                canvasRef.current
              ) {
                const video = webcamRef.current.video;
                const canvas = canvasRef.current;
                await detectObjects(video, canvas, 0.45);
              }
              animationFrameId = requestAnimationFrame(runDetection);
            };

            runDetection();
          })
          .catch((err) => {
            console.error("Gagal memuat model ONNX:", err);
            setModelLoadingError("Model ONNX tidak ditemukan atau gagal dimuat.");
          });
      });
    } else {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isCameraOn, activeInteractiveMode]);

  // Sakelar Kamera On/Off
  const toggleCamera = () => {
    setIsCameraOn(prev => !prev);
  };

  return (
    <section id="projects" className="relative py-28 text-white px-6 md:px-12 overflow-hidden bg-transparent">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="space-y-3 text-left border-b border-stone-800/80 pb-8">
          <h2 
          style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
          className="text-3xl md:text-5xl font-black tracking-tight text-stone-100">
            Proyek & Riset AI Utama
          </h2>
        </div>

        {/* ================= 1. SHOWCASE UTAMA SKRIPSI: TRACKNETV3 ================= */}
        <div className="bg-[#1a2c38] border rounded-3xl  rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* DESKRIPSI TEKS (KOLOM KIRI) */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="space-y-3">
                <h3 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
                  TrackNetV3 — Shuttlecock Tracking
                </h3>
              </div>

              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                Pelacakan objek shuttlecock berkecepatan tinggi pada video pertandingan bulutangkis menggunakan arsitektur gabungan: Tracking Module (U-Net Conv2D) dan Rectification Module (InpaintNet Conv1D).
              </p>

              {/* Metrik Hasil Evaluasi Eksperimen (Monokrom High Contrast) */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-[#14141b] border border-white/10 p-3.5 rounded-2xl text-center">
                  <div className="text-lg md:text-2xl font-black text-white font-mono">91.75%</div>
                  <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mt-0.5">Akurasi</div>
                </div>
                <div className="bg-[#14141b] border border-white/10 p-3.5 rounded-2xl text-center">
                  <div className="text-lg md:text-2xl font-black text-white font-mono">94.11%</div>
                  <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mt-0.5">Recall</div>
                </div>
                <div className="bg-[#14141b] border border-white/10 p-3.5 rounded-2xl text-center">
                  <div className="text-lg md:text-2xl font-black text-white font-mono">95.11%</div>
                  <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mt-0.5">F1-Score</div>
                </div>
              </div>

              {/* Tech Badges (Pills Monokrom Minimalis) */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['TrackNetV3', 'U-Net Conv2D', 'InpaintNet Conv1D', 'PyTorch', 'OpenCV'].map((t, i) => (
                  <span key={i} className="text-xs font-mono bg-[#14141b] border border-white/10 text-zinc-300 px-3 py-1 rounded-xl hover:border-white/30 transition-colors">
                    {t}
                  </span>
                ))}
              </div>
    </div>


            {/* FRAME PEMUTAR VIDEO LANGSUNG (KOLOM KANAN) */}
            <div className="lg:col-span-6 relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-stone-800 shadow-2xl flex items-center justify-center">
              <video 
                ref={tracknetVideoRef}
                controls 
                autoPlay 
                loop 
                muted 
                playsInline 
                preload="auto"
                className="w-full h-full object-contain"
              >
                <source src="/output_h264.mp4" type="video/mp4" />
                <source src="/output.mp4" type="video/mp4" />
                Browser kamu tidak mendukung pemutaran video HTML5.
              </video>
              <div className="absolute top-3 left-3 bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-[10px] font-mono px-2.5 py-1 rounded-md backdrop-blur-md">
                LIVE DEMO RESULT
              </div>
            </div>

          </div>
        </div>


        {/* ================= 2. INTERACTIVE AI VISION LAB ================= */}
        <div className="bg-[#1a2c38] border rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          
          {/* Lab Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800/80 pb-6">
            <div className="flex items-center gap-3">
              <div className="text-left">
                <h3 style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
                className="text-xl font-bold text-stone-100" >Interactive AI Vision Lab </h3>
                <p style={{ fontFamily: "'Trebuchet MS', sans-serif" }} 
                className="text-xs text-stone-400 font-mono">Uji coba pemindaian & inferensi objek real-time di browser kamu</p>
              </div>
            </div>
          </div>

          {/* KETERANGAN KETERBATASAN PERFORMA BROWSER */}
          <div style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
          className="mt-4 p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-200/90 text-[14px] font-mono text-left space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-amber-400">
              <span>⚠️</span> Catatan Performa Client-Side Inference:
            </p>
            <p className="leading-relaxed text-stone-300">
              Mohon maaf apabila deteksi terasa kurang halus (delay/FPS terbatas) atau ada objek kecil yang terlewat. 
              Inferensi model YOLO ini dieksekusi <strong>100% secara lokal di browser pengguna</strong> (menggunakan ONNX Runtime Web via CPU/WebGL) tanpa server GPU dedicated, sehingga performa menyesuaikan spesifikasi perangkat Anda.
            </p>
          </div>

        {/* MODE DEMO: REALTIME OBJECT DETECTION */}
        <div style={{ fontFamily: "'Trebuchet MS', sans-serif" }}
        className="bg-slate-950 border border-stone-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[320px] text-center space-y-4">
          {isCameraOn ? (
            <div className="space-y-4 w-full flex flex-col items-center">
              
              <div className="flex items-center gap-2 text-xs font-mono">
                <Cpu size={14} className={isModelLoaded ? "text-amber-400" : "text-amber-400 animate-spin"} />
                <span className={isModelLoaded ? "text-amber-400 font-bold" : "text-amber-400"}>
                  {isModelLoaded 
                    ? "ONNX Model Ready & Inferencing" 
                    : modelLoadingError || "Memuat Model ONNX (/models/best.onnx)..."}
                </span>
              </div>

              {/* FRAME KAMERA WEBCAM (Dengan Fitur Expand Modal) */}
              <div className={`relative transition-all duration-300 rounded-xl overflow-hidden border border-amber-500/50 bg-black ${
                isExpanded 
                  ? 'fixed inset-4 z-50 max-w-5xl mx-auto my-auto h-[85vh] flex items-center justify-center shadow-2xl ring-1 ring-amber-500' 
                  : 'w-full max-w-xl aspect-video'
              }`}>
                
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  className="w-full h-full object-cover"
                />
                
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                />

                <span className="absolute top-3 left-3 bg-amber-950/90 text-amber-400 text-[10px] font-mono px-2.5 py-1 rounded border border-amber-800 z-20">
                  YOLO INFERENCE ACTIVE
                </span>

                {/* Tombol Expand / Minimize Screen Kamera */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-slate-950/80 border border-stone-800 text-stone-300 hover:text-white z-20 transition-all hover:bg-amber-950"
                  title={isExpanded ? "Kecilkan Layar" : "Perbesar Layar Kamera"}
                >
                  {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
              </div>

              {/* Overlay Backdrop saat Mode Expanded Aktif */}
              {isExpanded && (
                <div 
                  onClick={() => setIsExpanded(false)} 
                  className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-40" 
                />
              )}

              <div className="flex items-center gap-3">
                <button
                  onClick={toggleCamera}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold text-xs px-6 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-red-500/20 active:scale-95"
                >
                  <VideoOff size={14} />
                  Matikan Kamera
                </button>
              </div>

            </div>
          ) : (
            <div className="space-y-3 max-w-md">
              <Camera size={36} className="text-amber-400 mx-auto" />
              <h4 className="text-base font-bold text-stone-200">Real-time YOLO Browser Inference</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Menjalankan model YOLO (.onnx) langsung di browser kamu untuk mendeteksi objek dan merender bounding box secara instan.
              </p>
              <button
                onClick={toggleCamera}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-6 py-3 rounded-full transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center gap-2 mx-auto"
              >
                <Camera size={14} />
                Nyalakan Kamera Web
              </button>
            </div>
          )}
        </div>        
        </div>
      </div>

    </section>
  );
}