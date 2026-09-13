import { useState } from "react";
import PetraAssistant from "./Chatbot";
import "./ChatbotWidget.css"; // CSS baru khusus tombol floating

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="petra-chat-popup">
          <PetraAssistant />
        </div>
      )}

      <div className="petra-trigger-wrapper">
        {/* Tooltip / Badge ajakan sebelum dipencet */}
        {!open && (
          <div className="petra-tooltip">
            <span className="sparkle">✨</span> Tanya Petra Assistant!
          </div>
        )}

        <button
          onClick={() => setOpen((o) => !o)}
          className={`petra-floating-btn ${open ? "open" : ""}`}
          aria-label="Toggle Chatbot"
        >
          {/* Ring Animasi Pulse di Belakang Tombol */}
          <span className="pulse-ring"></span>
          <span className="pulse-ring delay"></span>

          {/* Icon Bot / Close */}
          <span className="btn-icon">{open ? "✕" : "🤖"}</span>
        </button>
      </div>
    </>
  );
}