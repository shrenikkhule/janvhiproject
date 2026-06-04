import { useEffect, useState } from "react";
import { ChapterPill, Starfield } from "../SHAREDCOMPONENTS/Starfield";

/* ═══════════════════════════════════════════════
   CHAPTER 7 — Goga Baba Hill
═══════════════════════════════════════════════ */
const MEM_LIST = [
  "वारा परफेक्ट होता",
  "तुझे केस उडत होते",
  "सूर्यास्तापर्यंत थांबलो",
  "mandir chya moth mothlya lock chya keys fakt aplya javal",
  "निघायचंच नव्हतं",
  "Best view = you 🌅",
  "staires vr kiss",
];

export const Chapter7 = ({ onNext }) => {
  const [mems, setMems] = useState([]);
  useEffect(() => {
    let idx = 0;
    const iv = setInterval(() => {
      if (idx < MEM_LIST.length) {
        setMems((m) => [...m, MEM_LIST[idx]]);
        idx++;
      } else clearInterval(iv);
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        padding: "70px 16px 50px",
      }}
    >
      {/* Sunset gradient */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "linear-gradient(180deg,#87ceeb 0%,#b0d4e8 15%,#d4a8c0 40%,#e8856a 65%,#f4a261 80%,#ffd700 100%)",
          zIndex: 0,
        }}
      />
      <Starfield count={20} />

      <div style={{ position: "relative", zIndex: 2 }}>
        <div
          className="anim-fadeup"
          style={{ textAlign: "center", marginBottom: 32 }}
        >
          <ChapterPill num="07" color="#7a3a60" />
          <h1
            className="fc"
            style={{
              fontSize: "clamp(26px,6vw,52px)",
              color: "#3a1a30",
              fontWeight: 700,
            }}
          >
            Verul treak Hill
          </h1>
          <p
            style={{
              color: "#6a3a50",
              fontSize: 13,
              marginTop: 6,
              fontStyle: "italic",
            }}
          >
            जिथे आकाश आणि आठवणी एकत्र होतात
          </p>
        </div>

        {/* SVG hill scene */}
        <div
          style={{
            maxWidth: 600,
            margin: "0 auto 24px",
            position: "relative",
            height: 250,
          }}
        >
          <svg
            width="100%"
            height="250"
            viewBox="0 0 600 250"
            style={{ position: "absolute", bottom: 0 }}
          >
            <defs>
              <linearGradient id="hillG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3d7a3d" />
                <stop offset="100%" stopColor="#1a4a1a" />
              </linearGradient>
            </defs>
            {/* Hill */}
            <path
              d="M0,250 L0,190 Q80,110 180,125 Q280,140 370,72 Q470,5 600,45 L600,250 Z"
              fill="url(#hillG)"
            />
            {/* Trees on hill */}
            <text x="70" y="185" fontSize="20" opacity=".8">
              🌲
            </text>
            <text x="140" y="175" fontSize="16" opacity=".7">
              🌳
            </text>
            <text x="520" y="100" fontSize="18" opacity=".7">
              🌲
            </text>
            {/* Couple silhouette */}
            <g transform="translate(378,68)">
              <circle cx="0" cy="-26" r="7" fill="#2a1a1a" />
              <rect
                x="-4"
                y="-19"
                width="9"
                height="20"
                rx="3"
                fill="#2a1a1a"
              />
              <circle cx="14" cy="-24" r="6" fill="#2a1a1a" />
              <rect
                x="10"
                y="-18"
                width="8"
                height="19"
                rx="3"
                fill="#2a1a1a"
              />
              {/* Heart above */}
              <text x="3" y="-32" fontSize="10" opacity=".8">
                ❤️
              </text>
            </g>
            {/* Bike */}
            <text x="200" y="200" fontSize="22" opacity=".7">
              🏍️
            </text>
          </svg>
        </div>

        {/* Floating memory pills */}
        <div
          style={{
            maxWidth: 500,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
          }}
        >
          {mems.map((m, i) => (
            <div
              key={i}
              className="anim-scaleIn glass"
              style={{
                padding: "8px 16px",
                borderRadius: 50,
                fontSize: 13,
                fontStyle: "italic",
                color: "#3a1a30",
                fontWeight: 600,
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.8)",
                animation: "scaleIn .4s cubic-bezier(.34,1.4,.64,1) both",
                animationDelay: `${i * 0.1}s`,
                boxShadow: "0 4px 14px rgba(120,60,80,.15)",
              }}
            >
              ✨ {m}
            </div>
          ))}
        </div>

        {mems.length === MEM_LIST.length && (
          <div
            className="anim-fadeup"
            style={{ textAlign: "center", marginTop: 28 }}
          >
            <p
              className="fc"
              style={{
                color: "#3a1a30",
                fontSize: 19,
                fontStyle: "italic",
                marginBottom: 18,
                textShadow: "0 1px 4px rgba(255,255,255,.4)",
              }}
            >
              "जग सुंदर होतं. पण तू त्याला अधिक सुंदर केलंस."
            </p>
            <button
              onClick={onNext}
              style={{
                background: "linear-gradient(135deg,#7a3a60,var(--warm))",
                border: "none",
                color: "#fff",
                padding: "13px 38px",
                borderRadius: 50,
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 14,
                boxShadow: "0 8px 24px rgba(122,58,96,.4)",
              }}
            >
              Chapter 8 →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
