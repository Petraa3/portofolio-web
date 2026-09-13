import { useState, useRef, useEffect } from "react";
import { marked } from "marked";
import { Sparkles, User, Paperclip, Send } from "lucide-react";
import "./PetraAssistant.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const QUICK_PROMPTS = [
  { label: "👋 Kenalan dulu", text: "Halo, kenalan dulu yuk!" },
  { label: "💼 Pengalaman & Skill", text: "Ceritakan pengalaman kerja dan skill utama Petra Andhika Natanael." },
  { label: "🖼️ Proyek AI Petra", text: "Proyek AI atau computer vision apa saja yang pernah dikerjakan Petra Andhika Natanael?" },
  { label: "🔬 Riset TrackNetV3", text: "Ceritakan riset skripsi TrackNetV3 milik Petra Andhike Natanael." },
];

export default function PetraAssistant() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Halo! Saya **Petra Assistant** 👋 Saya di sini buat cerita soal Petra Andhika Natanael — latar belakang, proyek-proyek AI/computer vision yang pernah dikerjakan, sampai riset skripsinya. Atau sekadar ngobrol juga boleh!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [online, setOnline] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  useEffect(() => {
    fetch(`${API_BASE}/api/chat`, { method: "OPTIONS" })
      .then((res) => setOnline(res.ok || res.status === 405))
      .catch(() => setOnline(false));
  }, []);

  const sendMessage = async (text) => {
    const query = text ?? input;
    if (!query.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Terjadi kesalahan");
      setMessages((prev) => [...prev, { role: "assistant", text: data.answer }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", text: err.message, isError: true }]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/upload`, { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload gagal");
      setMessages((prev) => [...prev, { role: "assistant", text: `📄 ${data.message}` }]);
      setFile(null);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", text: err.message, isError: true }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div className="petra-widget">
      <div className="app-header">
        <div className="brand">
          <div className="brand-avatar">🤖</div>
          <div className="brand-info">
            <h1>Petra Assistant <span className="badge-v">AI</span></h1>
            <p>Tanya apa saja tentang saya</p>
          </div>
        </div>
        <div className={`status ${online ? "online" : "offline"}`}>
          <span className="status-dot" />
          {online ? "Server Aktif" : "Server Terputus"}
        </div>
      </div>

      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            <div className="avatar">{m.role === "user" ? <User size={15} /> : <Sparkles size={15} />}</div>
            <div className="bubble-wrapper">
              <span className="sender-name">{m.role === "user" ? "Anda" : "Petra Assistant"}</span>
              {m.role === "assistant" ? (
                <div
                  className={`bubble${m.isError ? " error" : ""}`}
                  dangerouslySetInnerHTML={{ __html: marked.parse(m.text) }}
                />
              ) : (
                <div className="bubble">{m.text}</div>
              )}
            </div>
          </div>
        ))}

        {messages.length === 1 && (
          <div className="suggestion-container" style={{ marginLeft: 40 }}>
            <div className="suggestion-pills">
              {QUICK_PROMPTS.map((p) => (
                <button key={p.label} className="pill" onClick={() => sendMessage(p.text)}>{p.label}</button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="msg assistant">
            <div className="avatar"><Sparkles size={15} /></div>
            <div className="bubble-wrapper">
              <div className="bubble loading"><span className="dot" /><span className="dot" /><span className="dot" /></div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="composer-container">
        <div className="composer">
          <label className="upload-btn" style={{ cursor: "pointer" }}>
            <Paperclip size={15} />
            <input type="file" accept=".pdf,.docx,.txt" hidden onChange={(e) => setFile(e.target.files[0])} />
          </label>
          <div className="input-wrapper">
            <textarea
              id="petra-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tulis pertanyaan Anda di sini..."
              rows={1}
            />
          </div>
          {file ? (
            <button className="send-btn" onClick={handleUpload} disabled={loading}>📄 Upload</button>
          ) : (
            <button className="send-btn" onClick={() => sendMessage()} disabled={loading}>
              <Send size={14} /> Kirim
            </button>
          )}
        </div>
      </div>
    </div>
  );
}