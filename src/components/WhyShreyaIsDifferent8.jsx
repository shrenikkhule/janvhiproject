import { useState } from "react";
import { ChapterPill, FloatingPetals, Starfield } from "../SHAREDCOMPONENTS/Starfield";

/* ═══════════════════════════════════════════════
   CHAPTER 8 — Why Shreya Is Different
═══════════════════════════════════════════════ */
const REASONS = [
  { icon: "🏍️", text: "कधीही bike ride साठी तयार असते" },
  { icon: "🌟", text: "प्रत्येक वेड्या adventure ला support करते" },
  { icon: "💪", text: "स्वतःला जितकं वाटतं त्यापेक्षा खूप मजबूत आहे" },
  { icon: "😂", text: "तिचं हास्य जगातला सर्वोत्तम आवाज आहे" },
  { icon: "💖", text: "पूर्ण मनाने प्रेम करते, अर्धवट नाही" },
  { icon: "🌙", text: "Midnight ला सर्वात जिवंत वाटायला लावते" },
  { icon: "🎯", text: "कठीण असलं तरी नेहमी honest असते" },
  { icon: "🌸", text: "छोट्या गोष्टींमध्ये सौंदर्य शोधते" },
  { icon: "🔥", text: "प्रत्येक खोलीत उबदारपणा आणते" },
];

export const Chapter8 = ({ onNext }) => {
  const [revealed, setRevealed] = useState([]);
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg,#fff5fb 0%,#f5e8ff 50%,#fff0f5 100%)",
        padding: "70px 16px 50px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Starfield count={22} />
      <FloatingPetals />

      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(196,168,212,.25) 0%,transparent 70%)",
          top: "5%",
          right: "-8%",
          pointerEvents: "none",
        }}
      />

      <div
        className="anim-fadeup"
        style={{ textAlign: "center", marginBottom: 36 }}
      >
        <ChapterPill num="08" color="var(--lavender)" />
        <h1
          className="fc"
          style={{
            fontSize: "clamp(22px,5vw,48px)",
            color: "var(--ink)",
            fontWeight: 700,
          }}
        >
          Shreya वेगळी का आहे?
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 6 }}>
          प्रत्येक card tap कर आणि जाण ✨
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))",
          gap: 14,
          maxWidth: 680,
          margin: "0 auto 28px",
        }}
      >
        {REASONS.map((r, i) => (
          <div
            key={i}
            onClick={() =>
              setRevealed((rv) => (rv.includes(i) ? rv : [...rv, i]))
            }
            className="lift-card"
            style={{
              background: revealed.includes(i)
                ? "linear-gradient(135deg,rgba(249,221,212,.9),rgba(245,232,255,.9))"
                : "rgba(255,255,255,0.5)",
              border: `1px solid ${revealed.includes(i) ? "rgba(196,168,212,.6)" : "rgba(255,255,255,.8)"}`,
              borderRadius: 16,
              padding: 18,
              textAlign: "center",
              minHeight: 110,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              backdropFilter: "blur(12px)",
              boxShadow: revealed.includes(i)
                ? "0 8px 24px rgba(196,112,106,.15)"
                : "0 4px 14px rgba(0,0,0,.05)",
              transition: "all .3s cubic-bezier(.34,1.2,.64,1)",
            }}
          >
            <div
              style={{
                fontSize: 30,
                transition: "transform .3s",
                transform: revealed.includes(i) ? "scale(1.2)" : "scale(1)",
              }}
            >
              {revealed.includes(i) ? r.icon : "💝"}
            </div>
            {revealed.includes(i) ? (
              <p
                style={{
                  color: "var(--ink)",
                  fontSize: 12,
                  lineHeight: 1.55,
                  fontWeight: 500,
                }}
              >
                {r.text}
              </p>
            ) : (
              <p style={{ color: "#c0a898", fontSize: 11 }}>Tap to reveal</p>
            )}
          </div>
        ))}
      </div>

      {revealed.length === REASONS.length && (
        <div className="anim-fadeup" style={{ textAlign: "center" }}>
          <p
            className="fc"
            style={{
              color: "var(--deep)",
              fontSize: 19,
              fontStyle: "italic",
              marginBottom: 18,
            }}
          >
            "...आणि अजून लाखो कारणे जी मी शब्दात मांडू शकत नाही."
          </p>
          <button
            onClick={onNext}
            style={{
              background: "linear-gradient(135deg,var(--deep),var(--lavender))",
              border: "none",
              color: "#fff",
              padding: "13px 38px",
              borderRadius: 50,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14,
              boxShadow: "0 8px 24px rgba(196,112,106,.35)",
            }}
          >
            The Final Chapter →
          </button>
        </div>
      )}
    </div>
  );
};
