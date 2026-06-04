import { useState, useEffect, useRef, useCallback } from "react";
import {
  AchievementBadge,
  FloatingPetals,
  Starfield,
} from "./SHAREDCOMPONENTS/Starfield";
import { Chapter1 } from "./components/KrantiChowk";
import { Chapter4 } from "./components/MidnightAdventures";
import { Chapter5 } from "./components/BhadramarutiHorror5";
import { Chapter3 } from "./components/AccidentalSpy";
import { Chapter2 } from "./components/EndlessConversations";
import { Chapter6 } from "./components/FoodMemories";
import { Chapter7 } from "./components/GogaBabaHill7";
import { Chapter8 } from "./components/WhyShreyaIsDifferent8";
import { MiniGames } from "./games/MiniGames";
import FirstKissPage from "./components/first";

/* ═══════════════════════════════════════════════════════
   GLOBAL STYLES — Light Romantic Theme
═══════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=Caveat:wght@400;600;700&family=Noto+Sans+Devanagari:wght@300;400;600&display=swap');

:root {
  --cream:   #fdf6ee;
  --blush:   #f9ddd4;
  --rose:    #e8a598;
  --deep:    #c4706a;
  --warm:    #f4a261;
  --gold:    #d4a017;
  --sage:    #8aad8a;
  --sky:     #a8c8e8;
  --lavender:#c4a8d4;
  --ink:     #3a2820;
  --muted:   #8a7060;
  --white:   #ffffff;
  --shadow:  rgba(60,30,20,0.12);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'DM Sans', sans-serif;
  background: var(--cream);
  color: var(--ink);
  overflow-x: hidden;
  scroll-behavior: smooth;
}

/* ── Typography ── */
.fc  { font-family: 'Cormorant Garamond', serif; }
.fh  { font-family: 'Caveat', cursive; }
.fmar{ font-family: 'Noto Sans Devanagari', sans-serif; }

/* ── Glass ── */
.glass {
  background: rgba(255,255,255,0.55);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255,255,255,0.8);
  box-shadow: 0 8px 32px var(--shadow);
}
.glass-rose {
  background: rgba(249,221,212,0.55);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(232,165,152,0.4);
  box-shadow: 0 8px 32px rgba(200,100,80,0.12);
}
.glass-gold {
  background: rgba(255,240,200,0.55);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(212,160,23,0.3);
}

/* ── Animations ── */
@keyframes fadeUp   { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
@keyframes floatY   { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
@keyframes scaleIn  { from { opacity:0; transform:scale(0.85); } to { opacity:1; transform:scale(1); } }
@keyframes slideRight { from { opacity:0; transform:translateX(-20px); } to { opacity:1; transform:translateX(0); } }
@keyframes slideLeft  { from { opacity:0; transform:translateX(20px); }  to { opacity:1; transform:translateX(0); } }
@keyframes shimmer  { 0%,100%{opacity:.6} 50%{opacity:1} }
@keyframes spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes heartbeat{ 0%,100%{transform:scale(1)} 30%{transform:scale(1.15)} 60%{transform:scale(1.05)} }
@keyframes petal    { 0%{transform:translateY(-5vh) rotate(0deg) translateX(0);opacity:1} 100%{transform:translateY(105vh) rotate(540deg) translateX(60px);opacity:0} }
@keyframes roadMove { from{transform:translateX(0)} to{transform:translateX(-80px)} }
@keyframes bikeBounce{ 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-4px) rotate(1deg)} }
@keyframes ghostDrift{ 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-12px) rotate(2deg)} }
@keyframes radarSweep{ from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes twinkleS { 0%,100%{opacity:.15;transform:scale(.8)} 50%{opacity:.9;transform:scale(1.1)} }
@keyframes confettiFall{ 0%{transform:translateY(-8px) rotate(0deg);opacity:1} 100%{transform:translateY(100vh) rotate(800deg);opacity:0} }
@keyframes bubblePop{ 0%{opacity:0;transform:scale(.4) translateY(12px)} 70%{transform:scale(1.05) translateY(-2px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
@keyframes achieveIn{ 0%{opacity:0;transform:translateX(120px)} 60%{transform:translateX(-8px)} 100%{opacity:1;transform:translateX(0)} }
@keyframes typeBlnk { 0%,100%{opacity:1} 50%{opacity:0} }

.anim-fadeup   { animation: fadeUp .6s cubic-bezier(.16,1,.3,1) both; }
.anim-scalein  { animation: scaleIn .5s cubic-bezier(.34,1.4,.64,1) both; }
.anim-floaty   { animation: floatY 3s ease-in-out infinite; }
.anim-heartbeat{ animation: heartbeat 2s ease-in-out infinite; }
.anim-shimmer  { animation: shimmer 2s ease-in-out infinite; }
.cursor-blink  { animation: typeBlnk .7s step-end infinite; display:inline-block; }

/* ── Card hover ── */
.lift-card {
  transition: transform .3s cubic-bezier(.34,1.4,.64,1), box-shadow .3s ease;
  cursor: pointer;
}
.lift-card:hover {
  transform: translateY(-6px) rotate(.5deg);
  box-shadow: 0 20px 40px rgba(180,80,60,.18);
}

/* ── Petals ── */
.petal {
  position: fixed;
  pointer-events: none;
  border-radius: 50% 0 50% 0;
  animation: petal linear forwards;
  z-index: 9990;
}

/* ── Confetti ── */
.cpiece {
  position: fixed;
  pointer-events: none;
  animation: confettiFall linear forwards;
  z-index: 9990;
}

/* ── Starfield ── */
.star-dot {
  position: absolute;
  border-radius: 50%;
  background: #d4a8c0;
  animation: twinkleS ease-in-out infinite;
  pointer-events: none;
}

/* ── Chat bubble ── */
.chat-bub { animation: bubblePop .4s cubic-bezier(.34,1.56,.64,1) both; }

/* ── Achievement ── */
.ach-toast { animation: achieveIn .5s cubic-bezier(.34,1.2,.64,1) both; }

/* ── Nav button ── */
.nav-pill {
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: .4px;
  transition: all .25s;
  white-space: nowrap;
  padding: 6px 12px;
}
.nav-pill:hover { transform: translateY(-1px); }

/* ── Road ── */
.road-dash { animation: roadMove .4s linear infinite; }

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #f9ddd4; }
::-webkit-scrollbar-thumb { background: var(--rose); border-radius: 4px; }

button:focus, input:focus { outline: none; }
`;

// Inject CSS once
function useGlobalCSS() {
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);
}

// Typewriter hook
function useTypewriter(text, speed = 45, active = true) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active) {
      setOut("");
      setDone(false);
      return;
    }
    setOut("");
    setDone(false);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        setDone(true);
        clearInterval(iv);
      }
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed, active]);
  return { out, done };
}

// Confetti burst
function triggerConfetti() {
  const wrap = document.getElementById("fx-layer");
  if (!wrap) return;
  const colors = [
    "#e8a598",
    "#f4a261",
    "#ffd700",
    "#c4a8d4",
    "#8aad8a",
    "#a8c8e8",
    "#f9ddd4",
  ];
  for (let i = 0; i < 90; i++) {
    const el = document.createElement("div");
    el.className = "cpiece";
    const size = Math.random() * 9 + 4;
    el.style.cssText = `left:${Math.random() * 100}%;top:-10px;width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random() * colors.length)]};border-radius:${Math.random() > 0.5 ? "50%" : "3px"};animation-duration:${Math.random() * 2 + 1.8}s;animation-delay:${Math.random() * 0.6}s;`;
    wrap.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  }
}

// Petals shower
function triggerPetals() {
  const wrap = document.getElementById("fx-layer");
  if (!wrap) return;
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const el = document.createElement("div");
      el.className = "petal";
      const size = Math.random() * 14 + 8;
      el.style.cssText = `left:${Math.random() * 100}%;top:-20px;width:${size}px;height:${size}px;background:hsl(${340 + Math.random() * 30},80%,${75 + Math.random() * 10}%);opacity:.8;animation-duration:${Math.random() * 3 + 4}s;`;
      wrap.appendChild(el);
      setTimeout(() => el.remove(), 8000);
    }, i * 150);
  }
}

/* ═══════════════════════════════════════════════
   VERIFY GATE
═══════════════════════════════════════════════ */
const VerifyGate = ({ onPass }) => {
  const [name, setName] = useState("");
  const [err, setErr] = useState(false);
  const [shake, setShake] = useState(false);
  const { out } = useTypewriter("Who dares enter this story?", 80, true);

  const attempt = () => {
    if (name.toLowerCase().includes("mandabadak")) {
      triggerPetals();
      setTimeout(onPass, 600);
    } else {
      setErr(true);
      setShake(true);
      setTimeout(() => {
        setErr(false);
        setShake(false);
      }, 2200);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #fdf6ee 0%, #fce8e0 40%, #f5d5e8 100%)",
        position: "relative",
        overflow: "hidden",
        padding: 20,
      }}
    >
      <Starfield count={35} />
      <FloatingPetals />

      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232,165,152,.25) 0%, transparent 70%)",
          top: "-10%",
          right: "-10%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(196,168,212,.2) 0%, transparent 70%)",
          bottom: "5%",
          left: "-5%",
          pointerEvents: "none",
        }}
      />

      <div
        className="glass anim-scalein"
        style={{
          borderRadius: 28,
          padding: "48px 40px",
          maxWidth: 400,
          width: "90%",
          textAlign: "center",
          animation: shake ? "none" : undefined,
          transform: shake ? "translateX(0)" : undefined,
        }}
      >
        {/* Rose decoration */}
        <div
          className="anim-heartbeat"
          style={{ fontSize: 52, marginBottom: 16 }}
        >
          🌹
        </div>

        <h2
          className="fc"
          style={{
            fontSize: 32,
            marginBottom: 6,
            color: "var(--deep)",
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          {out}
          <span className="cursor-blink" style={{ color: "var(--rose)" }}>
            |
          </span>
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontSize: 13,
            marginBottom: 28,
            fontStyle: "italic",
          }}
        >
          "The story only for One Special Person..."
        </p>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && attempt()}
          placeholder="Say Your Name..."
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.8)",
            border: `2px solid ${err ? "var(--deep)" : "rgba(232,165,152,0.4)"}`,
            borderRadius: 14,
            padding: "12px 16px",
            color: "var(--ink)",
            fontSize: 15,
            marginBottom: 14,
            textAlign: "center",
            fontFamily: "'DM Sans',sans-serif",
            transition: "border-color .3s",
          }}
        />

        <button
          onClick={attempt}
          style={{
            background:
              "linear-gradient(135deg, var(--deep) 0%, var(--warm) 100%)",
            border: "none",
            color: "#fff",
            padding: "14px 0",
            borderRadius: 50,
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 15,
            width: "100%",
            letterSpacing: 0.5,
            boxShadow: "0 8px 24px rgba(196,112,106,.35)",
            transition: "transform .2s, box-shadow .2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 12px 30px rgba(196,112,106,.45)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "";
            e.target.style.boxShadow = "0 8px 24px rgba(196,112,106,.35)";
          }}
        >
          Enter ❤️
        </button>

        {err && (
          <p
            className="anim-fadeup"
            style={{ color: "var(--deep)", fontSize: 13, marginTop: 10 }}
          >
            Wrong Person! Onlye Shreya Can Enter 💔
          </p>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   FINAL SCENE
═══════════════════════════════════════════════ */
const FinalScene = () => {
  useEffect(() => {
    triggerConfetti();
    triggerPetals();
    const t1 = setTimeout(() => {
      triggerConfetti();
      triggerPetals();
    }, 1000);
    const t2 = setTimeout(triggerConfetti, 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const { out: l1, done: d1 } = useTypewriter(
    "Kranti Chowk पासून...",
    65,
    true,
  );
  const { out: l2, done: d2 } = useTypewriter(
    "...प्रत्येक रात्रीच्या chai पर्यंत...",
    52,
    d1,
  );
  const { out: l3, done: d3 } = useTypewriter(
    "...प्रत्येक bike ride पर्यंत...",
    52,
    d2,
  );
  const { out: l4, done: d4 } = useTypewriter(
    "...प्रत्येक आठवणीपर्यंत...",
    52,
    d3,
  );
  const { out: l5 } = useTypewriter("हे साहस अजूनही सुरू आहे. ❤️", 42, d4);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg,#fff5fb 0%,#fce8e0 40%,#fff8f0 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 36,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Starfield count={40} />
      <FloatingPetals />

      {/* Big decorative circles */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(232,165,152,.2) 0%,transparent 70%)",
          top: "-10%",
          right: "-10%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(196,168,212,.15) 0%,transparent 70%)",
          bottom: "-5%",
          left: "-5%",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 580, position: "relative", zIndex: 2 }}>
        <div
          className="anim-heartbeat"
          style={{ fontSize: 60, marginBottom: 20 }}
        >
          🏍️
        </div>

        <div
          className="fc"
          style={{
            fontSize: "clamp(18px,4.5vw,30px)",
            lineHeight: 2.2,
            marginBottom: 28,
          }}
        >
          <p style={{ color: "var(--warm)" }} className="anim-fadeup">
            {l1}
          </p>
          {d1 && (
            <p style={{ color: "var(--lavender)" }} className="anim-fadeup">
              {l2}
            </p>
          )}
          {d2 && (
            <p style={{ color: "var(--deep)" }} className="anim-fadeup">
              {l3}
            </p>
          )}
          {d3 && (
            <p style={{ color: "var(--gold)" }} className="anim-fadeup">
              {l4}
            </p>
          )}
          {d4 && (
            <p style={{ color: "var(--ink)" }} className="anim-fadeup">
              {l5}
            </p>
          )}
        </div>

        {d4 && (
          <div className="anim-scalein" style={{ animationDelay: ".2s" }}>
            <div
              className="fc"
              style={{
                fontSize: "clamp(20px,5vw,36px)",
                background:
                  "linear-gradient(135deg,var(--deep),var(--warm),var(--lavender))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
                letterSpacing: 1,
                animation: "heartbeat 2s ease-in-out infinite",
              }}
            >
              ❤️ Forever Riding Together ❤️
            </div>
            <p
              className="fh"
              style={{ color: "var(--muted)", fontSize: 18, marginTop: 12 }}
            >
              — Shrenik & Shreya, always 🌹
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   PROPOSAL ROOM (Secret)
═══════════════════════════════════════════════ */
const ProposalRoom = ({ onClose }) => {
  const [stage, setStage] = useState(0);

  const { out: t1, done: td1 } = useTypewriter(
    "18 March 2026.",
    62,
    stage === 1,
  );
  const { out: t2, done: td2 } = useTypewriter(
    "एक दिवस जो मी कधीच विसरणार नाही.",
    52,
    stage === 1 && td1,
  );
  const { out: t3, done: td3 } = useTypewriter("Dear Janvhi,", 52, stage === 2);
  const { out: t4, done: td4 } = useTypewriter(
    "Kranti Chowk वरील त्या पहिल्या क्षणापासून मला माहीत होतं की तू खास आहेस. प्रत्येक रात्रीच्या chai पासून, bhadra maruti nigh out पासून, pappa च्या accidental call पासून, cannot cha chai sutta, khasta ragda, gola, panipuri, late night ride, bhadramarut ride, ghrushneshwar jyotirling, dongra vr cha jain tempale, to verul hill vr cha sunset, verul cha usa ras, long stories, chikalt holi, warnis cha color, to holi cha dance — तू नेहमी होतीस. आणि प्रत्येक क्षण तुझ्यामुळे अधिक सुंदर झाला.",
    28,
    stage === 2 && td3,
  );
  const { out: t5 } = useTypewriter(
    "तुझ्याशिवाय एकही adventure नको मला. माझ्यासोबत आयुष्यभर ride करशील का? ❤️",
    34,
    stage === 2 && td3 && td4,
  );

  useEffect(() => {
    if (stage >= 1) {
      triggerConfetti();
      triggerPetals();
    }
  }, [stage]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "rgba(253,246,238,0.96)",
        backdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 20,
        overflowY: "auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg,rgba(249,221,212,.5),rgba(245,232,255,.5),rgba(255,248,240,.5))",
        }}
      />
      <Starfield count={30} />
      <FloatingPetals />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 540,
          width: "100%",
          textAlign: "center",
        }}
      >
        {stage === 0 && (
          <div className="anim-scalein">
            <div
              style={{
                fontSize: 72,
                marginBottom: 16,
                animation: "heartbeat 2s ease-in-out infinite",
              }}
            >
              💝
            </div>
            <h2
              className="fc"
              style={{
                fontSize: 28,
                color: "var(--deep)",
                marginBottom: 12,
                fontWeight: 700,
              }}
            >
              Secret Vault Unlocked
            </h2>
            <p
              style={{ color: "var(--muted)", marginBottom: 24, fontSize: 14 }}
            >
              तू hidden proposal room शोधलीस...
            </p>
            <button
              onClick={() => setStage(1)}
              style={{
                background: "linear-gradient(135deg,var(--deep),var(--warm))",
                border: "none",
                color: "#fff",
                padding: "14px 40px",
                borderRadius: 50,
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 14,
                boxShadow: "0 8px 28px rgba(196,112,106,.4)",
              }}
            >
              Open my Heart 💝
            </button>
          </div>
        )}

        {stage === 1 && (
          <div className="anim-fadeup">
            <div style={{ fontSize: 54, marginBottom: 16 }}>📅</div>
            <div
              className="fc"
              style={{
                fontSize: "clamp(28px,8vw,56px)",
                color: "var(--deep)",
                marginBottom: 10,
                fontWeight: 700,
              }}
            >
              {t1}
            </div>
            <p
              className="fc"
              style={{
                fontSize: 18,
                color: "var(--muted)",
                fontStyle: "italic",
                marginBottom: 28,
              }}
            >
              {t2}
            </p>
            {td1 && td2 && (
              <button
                onClick={() => setStage(2)}
                style={{
                  background:
                    "linear-gradient(135deg,var(--deep),var(--lavender))",
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
                latter Read kr 💌
              </button>
            )}
          </div>
        )}

        {stage === 2 && (
          <div
            className="anim-scaleIn glass-rose"
            style={{
              borderRadius: 24,
              padding: "30px 26px",
              textAlign: "left",
            }}
          >
            <div
              className="fc"
              style={{
                fontSize: 22,
                color: "var(--deep)",
                marginBottom: 14,
                fontStyle: "italic",
              }}
            >
              {t3}
            </div>
            <p
              style={{
                color: "var(--ink)",
                fontSize: 14,
                lineHeight: 1.9,
                marginBottom: 14,
              }}
            >
              {t4}
            </p>
            <p
              className="fc"
              style={{
                color: "var(--deep)",
                fontSize: 16,
                fontStyle: "italic",
                marginBottom: 22,
                lineHeight: 1.9,
              }}
            >
              {t5}
            </p>
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <div
                style={{
                  fontSize: 44,
                  animation: "heartbeat 1.5s ease-in-out infinite",
                }}
              >
                💍
              </div>
              <div
                className="fc"
                style={{
                  fontSize: 22,
                  color: "var(--deep)",
                  marginTop: 10,
                  fontWeight: 700,
                }}
              >
                — तुझा Shrenik ❤️
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            marginTop: 24,
            background: "rgba(255,255,255,.6)",
            border: "1px solid rgba(196,112,106,.2)",
            color: "var(--muted)",
            padding: "9px 22px",
            borderRadius: 50,
            cursor: "pointer",
            fontSize: 13,
            backdropFilter: "blur(10px)",
          }}
        >
          Close कर
        </button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════ */
const NAV_LABELS = [
  "Starting",
  "गप्पा",
  "Spy",
  "Night",
  "Kiss",
  "Ghost",
  "Pet puja",
  "Hill",
  "Shreya",
  "End",
];

export default function FourthPage() {
  useGlobalCSS();

  const [verified, setVerified] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [showGames, setShowGames] = useState(false);
  const [showProposal, setShowProposal] = useState(false);
  const [badge, setBadge] = useState(null);
  const [earned, setEarned] = useState([]);
  const [moonC, setMoonC] = useState(0);
  const [bikeC, setBikeC] = useState(0);
  const secretRef = useRef("");

  // Keyboard easter egg: type "Shrenik"
  useEffect(() => {
    const handler = (e) => {
      secretRef.current = (secretRef.current + e.key).slice(-8);
      if (secretRef.current.toLowerCase().includes("shrenik")) {
        setShowProposal(true);
        secretRef.current = "";
      }
    };
    window.addEventListener("keypress", handler);
    return () => window.removeEventListener("keypress", handler);
  }, []);

  const showAchievement = useCallback((name, icon) => {
    setEarned((e) => {
      if (e.includes(name)) return e;
      setBadge({ name, icon });
      setTimeout(() => setBadge(null), 4000);
      return [...e, name];
    });
  }, []);

  const handleMoon = () => {
    const nm = moonC + 1;
    setMoonC(nm);
    if (nm >= 1 && bikeC >= 2) setShowProposal(true);
  };
  const handleBike = () => {
    const nb = bikeC + 1;
    setBikeC(nb);
    if (moonC >= 1 && nb >= 2) setShowProposal(true);
  };

  if (!verified)
    return (
      <VerifyGate
        onPass={() => {
          triggerPetals();
          setTimeout(() => setVerified(true), 400);
        }}
      />
    );
  if (showGames)
    return (
      <MiniGames
        onBack={() => setShowGames(false)}
        onAchieve={showAchievement}
      />
    );

  const CHAPTERS = [
    <Chapter1
      key="c1"
      onNext={() => setChapter(1)}
      onAchieve={showAchievement}
    />,
    <Chapter2
      key="c2"
      onNext={() => setChapter(2)}
      onAchieve={showAchievement}
    />,
    <Chapter3
      key="c3"
      onNext={() => setChapter(3)}
      onAchieve={showAchievement}
    />,
    <Chapter4
      key="c4"
      onNext={() => setChapter(4)}
      onAchieve={showAchievement}
    />,
    <FirstKissPage
      key="c5"
      onNext={() => setChapter(5)}
      onAchieve={showAchievement}
    />,
    <Chapter5
      key="c5"
      onNext={() => setChapter(5)}
      onAchieve={showAchievement}
    />,
    <Chapter6
      key="c6"
      onNext={() => setChapter(6)}
      onAchieve={showAchievement}
    />,
    <Chapter7 key="c7" onNext={() => setChapter(7)} />,
    <Chapter8 key="c8" onNext={() => setChapter(8)} />,
    <FinalScene key="c9" />,
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--cream)",
        position: "relative",
      }}
    >
      {/* FX layer for confetti/petals */}
      <div
        id="fx-layer"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9980,
        }}
      />

      {showProposal && <ProposalRoom onClose={() => setShowProposal(false)} />}
      {badge && (
        <AchievementBadge
          name={badge.name}
          icon={badge.icon}
          onClose={() => setBadge(null)}
        />
      )}

      {/* ── Navigation ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          padding: "8px 12px",
          background: "rgba(253,246,238,0.88)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(232,165,152,.2)",
          display: "flex",
          alignItems: "center",
          gap: 5,
          overflowX: "auto",
          boxShadow: "0 2px 20px rgba(180,80,60,.08)",
        }}
      >
        {/* Logo */}
        <div
          className="fc"
          style={{
            color: "var(--deep)",
            fontSize: 12,
            letterSpacing: 2,
            marginRight: 6,
            flexShrink: 0,
            fontWeight: 700,
          }}
        >
          S❤️S
        </div>

        {NAV_LABELS.map((label, i) => (
          <button
            key={i}
            onClick={() => setChapter(i)}
            className="nav-pill"
            style={{
              background:
                chapter === i
                  ? "linear-gradient(135deg,var(--deep),var(--warm))"
                  : "rgba(232,165,152,.12)",
              color: chapter === i ? "#fff" : "var(--muted)",
              flexShrink: 0,
              boxShadow:
                chapter === i ? "0 4px 14px rgba(196,112,106,.3)" : "none",
              border: `1px solid ${
                chapter === i ? "transparent" : "rgba(196,112,106,.12)"
              }`,
            }}
          >
            {label}
          </button>
        ))}

        {/* Games */}
        <button
          onClick={() => setShowGames(true)}
          className="nav-pill"
          style={{
            background: "rgba(168,200,232,.2)",
            color: "#5a8ab0",
            border: "1px solid rgba(168,200,232,.3)",
            flexShrink: 0,
          }}
        >
          🎮
        </button>

        {/* Easter egg buttons */}
        <button
          onClick={handleMoon}
          className="nav-pill"
          style={{
            background: "rgba(255,248,200,.4)",
            color: "#c0900a",
            border: "1px solid rgba(212,160,23,.2)",
            flexShrink: 0,
            padding: "6px 9px",
          }}
          title="🌙"
        >
          🌙
        </button>

        <button
          onClick={handleBike}
          className="nav-pill"
          style={{
            background: "rgba(232,165,152,.15)",
            color: "var(--muted)",
            border: "1px solid rgba(196,112,106,.15)",
            flexShrink: 0,
            padding: "6px 9px",
          }}
          title="..."
        >
          🏍️
        </button>

        {/* Achievements counter */}
        {earned.length > 0 && (
          <div
            style={{
              marginLeft: "auto",
              flexShrink: 0,
              background: "rgba(212,160,23,.12)",
              border: "1px solid rgba(212,160,23,.25)",
              borderRadius: 50,
              padding: "4px 11px",
              fontSize: 11,
              color: "var(--gold)",
              whiteSpace: "nowrap",
              fontWeight: 700,
            }}
          >
            🏆 {earned.length}
          </div>
        )}
      </nav>

      {/* Progress bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "rgba(232,165,152,.15)",
          zIndex: 500,
        }}
      >
        <div
          style={{
            height: "100%",
            background:
              "linear-gradient(90deg,var(--deep),var(--warm),var(--lavender))",
            width: `${(chapter / 8) * 100}%`,
            transition: "width .6s cubic-bezier(.16,1,.3,1)",
            boxShadow: "0 0 8px rgba(196,112,106,.4)",
          }}
        />
      </div>

      {/* Chapter content */}
      <div style={{ paddingTop: 48 }}>{CHAPTERS[chapter]}</div>
    </div>
  );
}
