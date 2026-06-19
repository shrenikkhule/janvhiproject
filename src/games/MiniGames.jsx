import { useEffect, useRef, useState } from "react";
import { Starfield } from "../SHAREDCOMPONENTS/Starfield";
import { GhostEscape } from "./GHOSTESCAPE";

/* ═══════════════════════════════════════════════
   MINI GAMES HUB
═══════════════════════════════════════════════ */
export const MiniGames = ({ onBack, onAchieve }) => {
  const [active, setActive] = useState(null);
  const [hScore, setHScore] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [hActive, setHActive] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [qScore, setQScore] = useState(0);
  const [qDone, setQDone] = useState(false);
  const onAchRef = useRef(onAchieve);
  useEffect(() => {
    onAchRef.current = onAchieve;
  }, [onAchieve]);

  const QUIZ = [
    {
      q: "आपली पहिली भेट कुठे झाली?",
      opts: ["Kranti Chowk", "TrueView Company", "Cannot", "Beer Bar"],
      ans: 0,
    },
    {
      q: "Pappa ने accidental call मध्ये काय ऐकलं?",
      opts: ["भांडण", "प्रेमाच्या गोष्टी", "Ghost sounds", "Chai order"],
      ans: 1,
    },
    {
      q: "Holi chya diwashi kontya color ni apan holi khelali ..?",
      opts: [
        "varnish & Chikhal",
        "Natural colors",
        "khelalo cha nahi",
        "simple colors",
      ],
      ans: 0,
    },
    {
      q: "Bhadramaruti ला किती Dayan येत होत्या?",
      opts: ["3", "5", "7", "9"],
      ans: 3,
    },
    {
      q: "Apan Kontya Theater Madhi Movie baghitala?",
      opts: ["PVR", "INOX Reliance", "Khinvasara Cineplex", "Cinepolis"],
      ans: 1,
    },
    {
      q: "How long did we kiss non-stop?",
      opts: ["5min", "2min", "13min", "21min"],
      ans: 3,
    },
    {
      q: "Bike ride वर जास्त घाबरतो कोण?",
      opts: ["Shrenik", "Shreya", "दोघेही", "कुणीच नाही"],
      ans: 3,
    },
  ];

  useEffect(() => {
    if (active !== "hearts" || !hActive) return;
    const iv = setInterval(() => {
      setHearts((h) => [
        ...h,
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 82 + 9,
          spd: Math.random() * 2.5 + 1.8,
        },
      ]);
    }, 600);
    const to = setTimeout(() => {
      setHActive(false);
      if (hScore > 10) onAchRef.current("Heart Catcher 💕", "💕");
    }, 15000);
    return () => {
      clearInterval(iv);
      clearTimeout(to);
    };
  }, [active, hActive, hScore]);

  const catchHeart = (id) => {
    setHScore((s) => s + 1);
    setHearts((h) => h.filter((x) => x.id !== id));
  };

  const answerQuiz = (i) => {
    const ns = i === QUIZ[qIdx].ans ? qScore + 1 : qScore;
    if (qIdx + 1 < QUIZ.length) {
      setQScore(ns);
      setQIdx((q) => q + 1);
    } else {
      setQScore(ns);
      setQDone(true);
      if (ns >= 3) onAchRef.current("Quiz Master 🧠", "🧠");
    }
  };

  const GAMES = [
    {
      id: "hearts",
      icon: "💕",
      name: "Hearts पकड",
      desc: "Falling hearts पकड!",
      color: "var(--deep)",
    },
    {
      id: "quiz",
      icon: "🧠",
      name: "Couple Quiz",
      desc: "आपली कहाणी किती माहीत आहे?",
      color: "var(--warm)",
    },
    {
      id: "ghost",
      icon: "👻",
      name: "Ghost Escape",
      desc: "9 Dayan पासून पळ!",
      color: "#c04444",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg,#fff8f2 0%,#f5e8ff 50%,#f0f8ff 100%)",
        padding: "70px 16px 50px",
      }}
    >
      <Starfield count={20} />
      <div
        className="anim-fadeup"
        style={{ textAlign: "center", marginBottom: 36 }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,.7)",
            borderRadius: 50,
            padding: "5px 14px",
            marginBottom: 12,
            border: "1px solid rgba(196,168,212,.3)",
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 2,
              color: "var(--lavender)",
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            MINI GAMES
          </span>
        </div>
        <h1
          className="fc"
          style={{
            fontSize: "clamp(24px,6vw,50px)",
            color: "var(--ink)",
            fontWeight: 700,
          }}
        >
          Game Zone 🎮
        </h1>
      </div>

      {!active && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))",
              gap: 14,
              maxWidth: 580,
              margin: "0 auto 28px",
            }}
          >
            {GAMES.map((g, i) => (
              <div
                key={g.id}
                onClick={() => {
                  setActive(g.id);
                  if (g.id === "hearts") {
                    setHScore(0);
                    setHearts([]);
                    setHActive(true);
                  }
                  if (g.id === "quiz") {
                    setQIdx(0);
                    setQScore(0);
                    setQDone(false);
                  }
                }}
                className="lift-card glass"
                style={{
                  borderRadius: 20,
                  padding: 22,
                  textAlign: "center",
                  animation: `fadeUp .5s ${i * 0.1}s both`,
                }}
              >
                <div style={{ fontSize: 42, marginBottom: 8 }}>{g.icon}</div>
                <div
                  style={{
                    fontWeight: 700,
                    color: g.color,
                    marginBottom: 4,
                    fontSize: 14,
                  }}
                >
                  {g.name}
                </div>
                <div style={{ color: "var(--muted)", fontSize: 12 }}>
                  {g.desc}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              onClick={onBack}
              style={{
                background: "rgba(255,255,255,.7)",
                border: "1px solid rgba(196,112,106,.2)",
                color: "var(--muted)",
                padding: "11px 26px",
                borderRadius: 50,
                cursor: "pointer",
                fontSize: 13,
                backdropFilter: "blur(10px)",
              }}
            >
              ← परत Story Var
            </button>
          </div>
        </>
      )}

      {active === "hearts" && (
        <div style={{ maxWidth: 460, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <span
              style={{ fontSize: 20, fontWeight: 700, color: "var(--deep)" }}
            >
              Score: {hScore} 💕
            </span>
          </div>
          <div
            style={{
              position: "relative",
              height: 360,
              background: "linear-gradient(180deg,#fff5fb,#ffe8f0)",
              borderRadius: 20,
              overflow: "hidden",
              border: "2px solid rgba(232,165,152,.3)",
            }}
          >
            {hActive &&
              hearts.map((h) => (
                <button
                  key={h.id}
                  onClick={() => catchHeart(h.id)}
                  style={{
                    position: "absolute",
                    left: `${h.left}%`,
                    top: "-5%",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 28,
                    animation: `petal ${h.spd}s linear forwards`,
                  }}
                >
                  ❤️
                </button>
              ))}
            {!hActive && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 12,
                  background: "rgba(255,245,250,.9)",
                }}
              >
                <p
                  style={{
                    color: hScore > 0 ? "var(--deep)" : "var(--muted)",
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  {hScore > 0
                    ? `तू ${hScore} hearts catch! ❤️`
                    : "Hearts पकडायला तयार?"}
                </p>
                <button
                  onClick={() => {
                    setHScore(0);
                    setHearts([]);
                    setHActive(true);
                  }}
                  style={{
                    background:
                      "linear-gradient(135deg,var(--deep),var(--warm))",
                    border: "none",
                    color: "#fff",
                    padding: "10px 22px",
                    borderRadius: 50,
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  {hScore > 0 ? "play Again Mand" : "Play कर"}
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => setActive(null)}
            style={{
              display: "block",
              marginTop: 12,
              background: "rgba(255,255,255,.7)",
              border: "1px solid rgba(196,112,106,.2)",
              color: "var(--muted)",
              padding: "8px 18px",
              borderRadius: 50,
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            ← Games
          </button>
        </div>
      )}

      {active === "quiz" && (
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          {!qDone && (
            <div
              className="anim-scalein glass"
              style={{ borderRadius: 20, padding: 26, textAlign: "center" }}
            >
              <div
                style={{
                  color: "var(--muted)",
                  fontSize: 11,
                  marginBottom: 8,
                  letterSpacing: 1,
                  fontWeight: 600,
                }}
              >
                प्रश्न {qIdx + 1} / {QUIZ.length}
              </div>
              {/* Progress bar */}
              <div
                style={{
                  height: 3,
                  background: "rgba(196,112,106,.15)",
                  borderRadius: 2,
                  marginBottom: 18,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background:
                      "linear-gradient(90deg,var(--deep),var(--warm))",
                    width: `${((qIdx + 1) / QUIZ.length) * 100}%`,
                    transition: "width .4s",
                  }}
                />
              </div>
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  marginBottom: 22,
                  color: "var(--ink)",
                  lineHeight: 1.55,
                }}
              >
                {QUIZ[qIdx].q}
              </p>
              <div style={{ display: "grid", gap: 9 }}>
                {QUIZ[qIdx].opts.map((o, i) => (
                  <button
                    key={i}
                    onClick={() => answerQuiz(i)}
                    style={{
                      background: "rgba(255,255,255,.8)",
                      border: "1px solid rgba(196,112,106,.2)",
                      color: "var(--ink)",
                      padding: "12px",
                      borderRadius: 12,
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 500,
                      transition: "all .2s",
                      backdropFilter: "blur(8px)",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background =
                        "linear-gradient(135deg,rgba(249,221,212,.9),rgba(255,255,255,.9))";
                      e.target.style.borderColor = "var(--rose)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "rgba(255,255,255,.8)";
                      e.target.style.borderColor = "rgba(196,112,106,.2)";
                    }}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          )}
          {qDone && (
            <div
              className="anim-scalein glass"
              style={{ borderRadius: 20, padding: 26, textAlign: "center" }}
            >
              <div style={{ fontSize: 54, marginBottom: 10 }}>
                {qScore >= 4 ? "🏆" : qScore >= 2 ? "😊" : "💔"}
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "var(--deep)",
                  marginBottom: 7,
                }}
              >
                {qScore}/{QUIZ.length}
              </div>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: 13,
                  marginBottom: 18,
                }}
              >
                {qScore >= 4
                  ? "तुला ही Story मनापासून माहीत आहे!"
                  : "अजून आठवन कर!"}
              </p>
              <button
                onClick={() => {
                  setQIdx(0);
                  setQScore(0);
                  setQDone(false);
                }}
                style={{
                  background: "linear-gradient(135deg,var(--deep),var(--warm))",
                  border: "none",
                  color: "#fff",
                  padding: "10px 22px",
                  borderRadius: 50,
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Play Again Mand
              </button>
            </div>
          )}
          <button
            onClick={() => setActive(null)}
            style={{
              display: "block",
              marginTop: 12,
              background: "rgba(255,255,255,.7)",
              border: "1px solid rgba(196,112,106,.2)",
              color: "var(--muted)",
              padding: "8px 18px",
              borderRadius: 50,
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            ← Games
          </button>
        </div>
      )}

      {active === "ghost" && (
        <GhostEscape onBack={() => setActive(null)} onAchieve={onAchieve} />
      )}
    </div>
  );
};
