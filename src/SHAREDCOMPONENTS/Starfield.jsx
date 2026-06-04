import { useRef } from "react";

export const Starfield = ({ count = 40 }) => {
  const stars = useRef(
    Array.from({ length: count }, (_, k) => ({
      k,
      l: `${Math.random() * 100}%`,
      t: `${Math.random() * 100}%`,
      s: Math.random() * 3 + 2,
      dur: `${Math.random() * 2 + 2}s`,
      del: `${Math.random() * 3}s`,
      col: ["#e8a598", "#c4a8d4", "#a8c8e8", "#d4a017", "#8aad8a"][
        Math.floor(Math.random() * 5)
      ],
    })),
  );
  return (
    <>
      {stars.current.map((s) => (
        <div
          key={s.k}
          className="star-dot"
          style={{
            left: s.l,
            top: s.t,
            width: s.s,
            height: s.s,
            background: s.col,
            animationDuration: s.dur,
            animationDelay: s.del,
          }}
        />
      ))}
    </>
  );
};

// Floating petals bg
export const FloatingPetals = () => {
  const petals = useRef(
    Array.from({ length: 8 }, (_, k) => ({
      k,
      l: `${Math.random() * 90}%`,
      size: Math.random() * 10 + 8,
      dur: `${Math.random() * 4 + 5}s`,
      del: `${Math.random() * 3}s`,
    })),
  );
  return (
    <>
      {petals.current.map((p) => (
        <div
          key={p.k}
          className="petal"
          style={{
            left: p.l,
            top: "-20px",
            width: p.size,
            height: p.size,
            background: `hsl(${340 + Math.random() * 25},78%,${76 + Math.random() * 10}%)`,
            opacity: 0.5,
            animationDuration: p.dur,
            animationDelay: p.del,
          }}
        />
      ))}
    </>
  );
};

// Achievement badge
export const AchievementBadge = ({ name, icon, onClose }) => (
  <div
    className="ach-toast glass-rose"
    style={{
      position: "fixed",
      bottom: 24,
      right: 16,
      zIndex: 9500,
      borderRadius: 18,
      padding: "14px 18px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      minWidth: 260,
      maxWidth: "90vw",
    }}
  >
    <span style={{ fontSize: 28 }}>{icon}</span>
    <div>
      <div
        style={{
          fontSize: 9,
          color: "var(--deep)",
          fontFamily: "'DM Sans',sans-serif",
          letterSpacing: 2,
          fontWeight: 700,
          textTransform: "uppercase",
        }}
      >
        Achievement Unlocked
      </div>
      <div
        style={{
          fontWeight: 700,
          fontSize: 14,
          color: "var(--ink)",
          marginTop: 2,
        }}
      >
        {name}
      </div>
    </div>
    <button
      onClick={onClose}
      style={{
        marginLeft: "auto",
        background: "none",
        border: "none",
        color: "var(--muted)",
        cursor: "pointer",
        fontSize: 18,
      }}
    >
      ×
    </button>
  </div>
);

// Chapter header pill
export const ChapterPill = ({ num, color = "var(--deep)" }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      background: "rgba(255,255,255,0.7)",
      borderRadius: 50,
      padding: "5px 14px",
      marginBottom: 12,
      border: `1px solid ${color}33`,
      backdropFilter: "blur(10px)",
    }}
  >
    <span
      style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: color,
        display: "inline-block",
      }}
    />
    <span
      style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: 2,
        color,
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      CHAPTER {num}
    </span>
  </div>
);
