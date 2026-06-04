import { useState } from "react";
import { ChapterPill, Starfield } from "../SHAREDCOMPONENTS/Starfield";

/* ═══════════════════════════════════════════════
   CHAPTER 6 — Food Memories
═══════════════════════════════════════════════ */
const FOODS = [
  {
    id: "dosa",
    icon: "🫓",
    name: "The Legendary Dosa",
    color: "#e07030",
    memory:
      "त्या जुन्या हॉटेलमधला  dosa. Gracefully & Emratti खाण्याचा try केलास. failed. Beautifully.",
  },
  {
    id: "imarrati",
    icon: "🍩",
    name: "Nashta सकाळी",
    color: "#d4a017",
    memory:
      "सकाळी 10 वाजता mast tu anlela majhya sathi nashta गरम, कुरकुरीत. परफेक्ट सुरुवात!",
  },
  {
    id: "vada",
    icon: "🍽️",
    name: "Samosa Rice",
    color: "#f4a261",
    memory:
      "Sambhar मध्ये पडलेला Samosa and rice. तरी आपण आनंदाने share केला. तो एक चांगला दिवस होता.",
  },
  {
    id: "lassi",
    icon: "🥛",
    name: "3 Pinapple, Coconut, Lassi ---- bhaji mandi",
    color: "#b19cd9",
    memory:
      "Extra thick, extra sweet. full unhat bhajimandi sakali 10 vajta kiti sar khalla hot apan",
  },
];

export const Chapter6 = ({ onNext, onAchieve }) => {
  const [flipped, setFlipped] = useState([]);

  const flip = (id) => {
    if (flipped.includes(id)) return;
    const next = [...flipped, id];
    setFlipped(next);
    if (next.length === 3) onAchieve("Chai Champion ☕", "☕");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg,#fff8f0 0%,#fff0e0 50%,#fff8f0 100%)",
        padding: "70px 16px 50px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Starfield count={20} />
      <div
        style={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(244,162,97,.2) 0%,transparent 70%)",
          top: "-5%",
          left: "-5%",
          pointerEvents: "none",
        }}
      />

      <div
        className="anim-fadeup"
        style={{ textAlign: "center", marginBottom: 36 }}
      >
        <ChapterPill num="06" color="var(--warm)" />
        <h1
          className="fc"
          style={{
            fontSize: "clamp(26px,6vw,52px)",
            color: "var(--ink)",
            fontWeight: 700,
          }}
        >
          Food Memories 🍽️
        </h1>
        <p
          style={{
            color: "var(--muted)",
            fontSize: 13,
            marginTop: 6,
            fontStyle: "italic",
          }}
        >
          प्रत्येक card tap करून आठवण उघड...
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))",
          gap: 20,
          maxWidth: 580,
          margin: "0 auto 28px",
        }}
      >
        {FOODS.map((f, fi) => (
          <div
            key={f.id}
            onClick={() => flip(f.id)}
            className="lift-card"
            style={{
              borderRadius: 20,
              height: 210,
              position: "relative",
              perspective: 800,
              animationDelay: `${fi * 0.1}s`,
            }}
          >
            {/* Front */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(135deg,${f.color}18,${f.color}35)`,
                border: `2px solid ${f.color}55`,
                borderRadius: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backfaceVisibility: "hidden",
                transition: "transform .55s ease",
                transform: flipped.includes(f.id)
                  ? "rotateY(180deg)"
                  : "rotateY(0deg)",
                boxShadow: `0 8px 28px ${f.color}20`,
              }}
            >
              <div style={{ fontSize: 56, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: f.color }}>
                {f.name}
              </div>
              <div
                style={{ color: "var(--muted)", fontSize: 11, marginTop: 6 }}
              >
                Tap to remember ✨
              </div>
            </div>
            {/* Back */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(135deg,${f.color}28,${f.color}45)`,
                border: `2px solid ${f.color}`,
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backfaceVisibility: "hidden",
                transition: "transform .55s ease",
                transform: flipped.includes(f.id)
                  ? "rotateY(0deg)"
                  : "rotateY(-180deg)",
                padding: 20,
                boxShadow: `0 8px 28px ${f.color}30`,
              }}
            >
              <p
                style={{
                  color: "var(--ink)",
                  fontSize: 13,
                  lineHeight: 1.6,
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                {f.memory}
              </p>
            </div>
          </div>
        ))}
      </div>

      {flipped.length === FOODS.length && (
        <div className="anim-fadeup" style={{ textAlign: "center" }}>
          <button
            onClick={onNext}
            style={{
              background: "linear-gradient(135deg,var(--warm),var(--gold))",
              border: "none",
              color: "#fff",
              padding: "13px 38px",
              borderRadius: 50,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14,
              boxShadow: "0 8px 24px rgba(244,162,97,.4)",
            }}
          >
            Chapter 7 →
          </button>
        </div>
      )}
    </div>
  );
};
