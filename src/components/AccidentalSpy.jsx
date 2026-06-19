import { useState } from "react";
import { ChapterPill, Starfield } from "../SHAREDCOMPONENTS/Starfield";

/* ═══════════════════════════════════════════════
   CHAPTER 3 — Accidental Spy
═══════════════════════════════════════════════ */
export const Chapter3 = ({ onNext, onAchieve }) => {
  const [stage, setStage] = useState(0);
  const stages = [
    {
      icon: "📱",
      title: "The Conversation",
      text: "एक सुंदर Night. खोल गप्पा. laugh. Romance.",
    },
    {
      icon: "😬",
      title: "The Fatal Mistake",
      text: "आणि मग... बोटाचा एक चुकीचा स्पर्श स्क्रीनवर...",
    },
    {
      icon: "📞",
      title: "Pappa DETECTED 🚨",
      text: "फोन वाजला. Ring झाली. दुसऱ्या बाजूला Pappa होते.",
    },
    {
      icon: "😱",
      title: "MISSION COMPROMISED",
      text: "Pappa ने उचलला. शांतपणे ऐकत राहिले. 10 Min.",
    },
    {
      icon: "💀",
      title: "Realisation",
      text: "Screen पाहिली तेव्हा दिसलं... ACTIVE CALL: Pappa — 10:12 min 💀",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg,#fff5f0 0%,#ffe8e0 50%,#fff0f5 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "70px 16px 50px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Starfield count={15} />

      <div
        className="anim-fadeup"
        style={{ textAlign: "center", marginBottom: 32 }}
      >
        <ChapterPill num="03" color="#e05050" />
        <h1
          className="fc"
          style={{
            fontSize: "clamp(24px,6vw,52px)",
            color: "var(--ink)",
            fontWeight: 700,
          }}
        >
          The Spy Mission 😱
        </h1>
        <p
          style={{
            color: "var(--muted)",
            fontSize: 13,
            marginTop: 6,
            fontStyle: "italic",
          }}
        >
          "Operation Papa-Class Fail"
        </p>
      </div>

      {/* FBI file */}
      <div
        className="anim-scalein"
        style={{
          background: "#faf6ed",
          color: "#1a1a1a",
          borderRadius: 16,
          padding: 22,
          width: "100%",
          maxWidth: 460,
          marginBottom: 24,
          boxShadow: "0 12px 40px rgba(0,0,0,.15)",
          border: "1px solid #e0d8c8",
          fontFamily: "'DM Sans',monospace",
          animationDelay: ".1s",
        }}
      >
        <div
          style={{
            textAlign: "center",
            borderBottom: "3px double #8a7050",
            paddingBottom: 10,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: 3,
              color: "#8a7050",
              fontWeight: 700,
            }}
          >
            CLASSIFIED — CASE FILE #0318
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>
            ⚠️ INCIDENT REPORT ⚠️
          </div>
        </div>
        <div style={{ fontSize: 12, lineHeight: 2 }}>
          <div>
            <strong>STATUS:</strong>{" "}
            <span style={{ color: "#c00", fontWeight: 700 }}>COMPROMISED</span>
          </div>
          <div>
            <strong>SUBJECTS:</strong> Shreya &amp; Shrenik
          </div>
          <div>
            <strong>THREAT LEVEL:</strong> 🔴 Pappa-CLASS
          </div>
          <div>
            <strong>DURATION EXPOSED:</strong> 10 min 12 sec
          </div>
          <div
            style={{
              marginTop: 8,
              padding: 8,
              background: "rgba(200,0,0,0.07)",
              borderLeft: "3px solid #c00",
              borderRadius: 4,
            }}
          >
            🔴 ALERT: Pappa & Mummy LISTENING DETECTED At night 12AM
          </div>
        </div>
      </div>

      {stages.slice(0, stage + 1).map((s, i) => (
        <div
          key={i}
          className="anim-fadeup glass"
          style={{
            borderRadius: 16,
            padding: "18px 22px",
            maxWidth: 460,
            width: "100%",
            marginBottom: 10,
            textAlign: "center",
            animationDelay: `${i * 0.08}s`,
            borderLeft:
              i === stages.length - 1 ? "4px solid var(--deep)" : undefined,
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 6 }}>{s.icon}</div>
          <div
            style={{
              fontWeight: 700,
              color: "var(--deep)",
              marginBottom: 4,
              fontSize: 14,
            }}
          >
            {s.title}
          </div>
          <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.6 }}>
            {s.text}
          </p>
        </div>
      ))}

      {stage < stages.length - 1 && (
        <button
          onClick={() => setStage((s) => s + 1)}
          style={{
            background: "linear-gradient(135deg,#c44040,#e07070)",
            border: "none",
            color: "#fff",
            padding: "12px 30px",
            borderRadius: 50,
            cursor: "pointer",
            fontWeight: 700,
            marginTop: 14,
            fontSize: 13,
            boxShadow: "0 6px 20px rgba(196,64,64,.3)",
          }}
        >
          {stage === 0 ? "मग काय झालं? 😬" : "Next... 😱"}
        </button>
      )}

      {stage === stages.length - 1 && (
        <div style={{ marginTop: 18, textAlign: "center" }}>
          <div
            className="anim-scalein glass-rose"
            style={{
              borderRadius: 16,
              padding: "14px 22px",
              display: "inline-block",
              marginBottom: 18,
            }}
          >
            <div
              style={{ color: "var(--gold)", fontWeight: 700, fontSize: 16 }}
            >
              🏆 Achievement Unlocked!
            </div>
            <div style={{ color: "var(--deep)", fontSize: 13, marginTop: 4 }}>
              "Mission Failed Successfully" 😂
            </div>
          </div>
          <br />
          <button
            onClick={() => {
              onAchieve("Mummy Spy Incident 😱", "🕵️");
              onNext();
            }}
            style={{
              background: "linear-gradient(135deg,var(--warm),var(--gold))",
              border: "none",
              color: "#fff",
              padding: "13px 38px",
              borderRadius: 50,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14,
              boxShadow: "0 8px 24px rgba(244,162,97,.35)",
            }}
          >
            Chapter 4 →
          </button>
        </div>
      )}
    </div>
  );
};
