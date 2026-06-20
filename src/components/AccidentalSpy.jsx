import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════
   Floating Particle Component
═══════════════════════════════════════════════ */
const FloatingParticle = ({ emoji, style }) => (
  <div
    style={{
      position: "absolute",
      fontSize: "clamp(16px,3vw,26px)",
      animation: "floatDrift 6s ease-in-out infinite",
      pointerEvents: "none",
      userSelect: "none",
      opacity: 0.18,
      ...style,
    }}
  >
    {emoji}
  </div>
);

/* ═══════════════════════════════════════════════
   Pulse Ring Component
═══════════════════════════════════════════════ */
const PulseRing = ({ color = "#e05050", size = 80, delay = 0 }) => (
  <div
    style={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      border: `2px solid ${color}`,
      animation: `pulseRing 2s ease-out infinite`,
      animationDelay: `${delay}s`,
      opacity: 0,
      pointerEvents: "none",
    }}
  />
);

/* ═══════════════════════════════════════════════
   Ticker Tape
═══════════════════════════════════════════════ */
const TickerTape = () => {
  const msg =
    "🚨 PAPA DETECTED  •  MISSION COMPROMISED  •  10:12 ACTIVE CALL  •  MAYDAY MAYDAY  •  ";
  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        background: "rgba(200,0,0,0.08)",
        borderTop: "1px solid rgba(200,0,0,0.2)",
        borderBottom: "1px solid rgba(200,0,0,0.2)",
        padding: "7px 0",
        marginBottom: 20,
      }}
    >
      <div
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          animation: "ticker 18s linear infinite",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1.5,
          color: "#c00",
        }}
      >
        {msg}
        {msg}
        {msg}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   CHAPTER 3 — Accidental Spy
═══════════════════════════════════════════════ */
export const Chapter3 = ({ onNext, onAchieve }) => {
  const [stage, setStage] = useState(0);
  const [shakeTitle, setShakeTitle] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timerCount, setTimerCount] = useState(0);
  const timerRef = useRef(null);

  const stages = [
    {
      icon: "📱",
      emoji2: "💬",
      title: "The Conversation",
      text: "एक सुंदर Night. खोल गप्पा. Laugh. Romance.",
      color: "#e07070",
      bg: "rgba(224,112,112,0.08)",
    },
    {
      icon: "😬",
      emoji2: "☠️",
      title: "The Fatal Mistake",
      text: "आणि मग... बोटाचा एक चुकीचा स्पर्श स्क्रीनवर...",
      color: "#e0a050",
      bg: "rgba(224,160,80,0.08)",
    },
    {
      icon: "📞",
      emoji2: "🚨",
      title: "Pappa DETECTED 🚨",
      text: "फोन वाजला. Ring झाली. दुसऱ्या बाजूला Pappa होते.",
      color: "#c03030",
      bg: "rgba(192,48,48,0.08)",
    },
    {
      icon: "😱",
      emoji2: "🕵️",
      title: "MISSION COMPROMISED",
      text: "Pappa ने उचलला. शांतपणे ऐकत राहिले. 10 Min.",
      color: "#a02020",
      bg: "rgba(160,32,32,0.08)",
    },
    {
      icon: "💀",
      emoji2: "⏱️",
      title: "Realisation",
      text: "Screen पाहिली तेव्हा दिसलं... ACTIVE CALL: Pappa — 10:12 min 💀",
      color: "#800",
      bg: "rgba(136,0,0,0.1)",
    },
  ];

  /* Trigger glitch on every new stage */
  useEffect(() => {
    setGlitch(true);
    const t = setTimeout(() => setGlitch(false), 600);
    return () => clearTimeout(t);
  }, [stage]);

  /* Animated call timer at stage 3+ */
  useEffect(() => {
    if (stage >= 3) {
      timerRef.current = setInterval(() => setTimerCount((c) => c + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [stage]);

  /* Confetti on final stage */
  useEffect(() => {
    if (stage === stages.length - 1) setShowConfetti(true);
  }, [stage]);

  const formatTimer = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const handleNext = () => {
    setShakeTitle(true);
    setTimeout(() => setShakeTitle(false), 600);
    setStage((s) => s + 1);
  };

  const confettiEmojis = ["💔", "😱", "☠️", "🚨", "😬", "💀", "📞", "🕵️"];

  return (
    <>
      {/* ── Global keyframes ── */}
      <style>{`
        @keyframes floatDrift {
          0%,100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-18px) rotate(8deg); }
          66% { transform: translateY(8px) rotate(-6deg); }
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          15% { transform: translateX(-8px) rotate(-2deg); }
          30% { transform: translateX(8px) rotate(2deg); }
          45% { transform: translateX(-6px); }
          60% { transform: translateX(6px); }
          75% { transform: translateX(-3px); }
        }
        @keyframes glitchShift {
          0%,100% { clip-path: none; transform: none; }
          20% { clip-path: inset(10% 0 70% 0); transform: translateX(-4px); }
          40% { clip-path: inset(50% 0 20% 0); transform: translateX(4px); }
          60% { clip-path: inset(30% 0 40% 0); transform: translateX(-2px); }
          80% { clip-path: inset(0% 0 90% 0); transform: translateX(2px); }
        }
        @keyframes stageSlide {
          0% { opacity:0; transform: translateX(-24px) scale(0.96); }
          100% { opacity:1; transform: translateX(0) scale(1); }
        }
        @keyframes iconBounce {
          0%,100% { transform: scale(1) rotate(0deg); }
          30% { transform: scale(1.35) rotate(-8deg); }
          60% { transform: scale(0.9) rotate(6deg); }
        }
        @keyframes confettiFall {
          0% { opacity:1; transform: translateY(-20px) rotate(0deg); }
          100% { opacity:0; transform: translateY(120px) rotate(360deg); }
        }
        @keyframes alertBlink {
          0%,100% { background: rgba(200,0,0,0.07); }
          50% { background: rgba(200,0,0,0.18); }
        }
        @keyframes callPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(0,180,0,0.4); }
          50% { box-shadow: 0 0 0 10px rgba(0,180,0,0); }
        }
        @keyframes float {
          0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}
        }
        @keyframes fadeScaleIn {
          0%{opacity:0;transform:scale(.88)}100%{opacity:1;transform:scale(1)}
        }
        .stage-card { animation: stageSlide 0.45s cubic-bezier(.22,1,.36,1) forwards; }
        .icon-bounce { animation: iconBounce 0.6s ease forwards; }
        .shake-anim { animation: shake 0.6s ease; }
        .glitch-anim { animation: glitchShift 0.5s steps(2,end); }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(160deg,#fff5f0 0%,#ffe8e0 50%,#fff0f5 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 60,
          paddingBottom: 60,
          paddingLeft: 16,
          paddingRight: 16,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Ambient floating particles ── */}
        {["📱", "💬", "❤️", "🌙", "😬", "📞", "🕵️", "💀", "🚨", "😱"].map(
          (e, i) => (
            <FloatingParticle
              key={i}
              emoji={e}
              style={{
                top: `${8 + ((i * 9) % 85)}%`,
                left: i % 2 === 0 ? `${2 + ((i * 7) % 12)}%` : undefined,
                right: i % 2 !== 0 ? `${2 + ((i * 7) % 12)}%` : undefined,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${5 + (i % 3)}s`,
              }}
            />
          ),
        )}

        {/* ── Confetti burst on last stage ── */}
        {showConfetti &&
          confettiEmojis.map((e, i) => (
            <div
              key={i}
              style={{
                position: "fixed",
                top: "30%",
                left: `${10 + i * 10}%`,
                fontSize: 22,
                animation: `confettiFall ${1.2 + i * 0.2}s ease forwards`,
                animationDelay: `${i * 0.1}s`,
                zIndex: 999,
                pointerEvents: "none",
              }}
            >
              {e}
            </div>
          ))}

        {/* ── Chapter pill ── */}
        <div style={{ animation: "fadeScaleIn .5s ease" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "linear-gradient(135deg,#e05050,#c03030)",
              color: "#fff",
              borderRadius: 50,
              padding: "5px 16px",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 14,
              boxShadow: "0 4px 16px rgba(224,80,80,.35)",
            }}
          >
            🕵️ CHAPTER 03
          </div>
        </div>

        {/* ── Title with optional shake + glitch ── */}
        <h1
          className={shakeTitle ? "shake-anim" : ""}
          style={{
            fontSize: "clamp(26px,6vw,54px)",
            color: "#1a1a1a",
            fontWeight: 900,
            textAlign: "center",
            marginBottom: 4,
            lineHeight: 1.1,
            letterSpacing: -1,
            position: "relative",
          }}
        >
          <span
            className={glitch && stage > 0 ? "glitch-anim" : ""}
            style={{ display: "inline-block" }}
          >
            The Spy Mission 😱
          </span>
        </h1>
        <p
          style={{
            color: "#b06060",
            fontSize: 12,
            marginBottom: 22,
            fontStyle: "italic",
            letterSpacing: 1,
          }}
        >
          "Operation Papa-Class Fail"
        </p>

        {/* ── Ticker ── */}
        <div style={{ width: "100%", maxWidth: 480 }}>
          <TickerTape />
        </div>

        {/* ── FBI File card ── */}
        <div
          style={{
            background: "#faf6ed",
            color: "#1a1a1a",
            borderRadius: 20,
            padding: 22,
            width: "100%",
            maxWidth: 460,
            marginBottom: 20,
            boxShadow: "0 12px 40px rgba(0,0,0,.15)",
            border: "2px solid #e0d8c8",
            fontFamily: "monospace",
            position: "relative",
            overflow: "hidden",
            animation: "fadeScaleIn .6s ease .1s both",
          }}
        >
          {/* Corner stamp */}
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: 2,
              color: "rgba(200,0,0,0.18)",
              border: "2px solid rgba(200,0,0,0.18)",
              padding: "3px 7px",
              borderRadius: 4,
              transform: "rotate(12deg)",
            }}
          >
            CLASSIFIED
          </div>

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
              CASE FILE #0318
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                marginTop: 4,
                animation: "float 3s ease-in-out infinite",
              }}
            >
              ⚠️ INCIDENT REPORT ⚠️
            </div>
          </div>

          <div style={{ fontSize: 12, lineHeight: 2.1 }}>
            <div>
              <strong>STATUS:</strong>{" "}
              <span style={{ color: "#c00", fontWeight: 700 }}>
                COMPROMISED
              </span>
            </div>
            <div>
              <strong>SUBJECTS:</strong> Shreya &amp; Shrenik
            </div>
            <div>
              <strong>THREAT LEVEL:</strong> 🔴 Pappa-CLASS
            </div>
            <div>
              <strong>DURATION EXPOSED:</strong>{" "}
              {stage >= 3 ? (
                <span
                  style={{
                    fontWeight: 700,
                    color: "#0a0",
                    animation: "none",
                    background: "#e8ffe8",
                    padding: "1px 6px",
                    borderRadius: 4,
                    animation: "callPulse 1.5s ease-in-out infinite",
                    display: "inline-block",
                  }}
                >
                  🟢 LIVE — {formatTimer(612 + timerCount)}
                </span>
              ) : (
                "10 min 12 sec"
              )}
            </div>

            <div
              style={{
                marginTop: 10,
                padding: "10px 12px",
                background: "rgba(200,0,0,0.07)",
                borderLeft: "4px solid #c00",
                borderRadius: 6,
                animation: "alertBlink 1.8s ease-in-out infinite",
                fontSize: 11,
              }}
            >
              🔴 ALERT: Pappa &amp; Mummy LISTENING DETECTED · At night 12AM
            </div>
          </div>
        </div>

        {/* ── Stage cards ── */}
        <div style={{ width: "100%", maxWidth: 460 }}>
          {stages.slice(0, stage + 1).map((s, i) => (
            <div
              key={i}
              className="stage-card"
              style={{
                background: s.bg,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: `1.5px solid ${s.color}33`,
                borderLeft: `5px solid ${s.color}`,
                borderRadius: 18,
                padding: "18px 20px",
                marginBottom: 12,
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                animationDelay: `${i * 0.07}s`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Pulse rings on last revealed card */}
              {i === stage && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 36,
                    transform: "translate(-50%,-50%)",
                  }}
                >
                  <PulseRing color={s.color} size={50} delay={0} />
                  <PulseRing color={s.color} size={50} delay={0.5} />
                </div>
              )}

              {/* Icon */}
              <div
                className={i === stage ? "icon-bounce" : ""}
                style={{
                  fontSize: 38,
                  lineHeight: 1,
                  flexShrink: 0,
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,.15))",
                }}
              >
                {s.icon}
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: 800,
                    color: s.color,
                    marginBottom: 4,
                    fontSize: 13,
                    letterSpacing: 0.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {s.title}
                  <span style={{ fontSize: 14 }}>{s.emoji2}</span>
                </div>
                <p
                  style={{
                    color: "#555",
                    fontSize: 13,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {s.text}
                </p>
              </div>

              {/* Step badge */}
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 12,
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: s.color,
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0.8,
                }}
              >
                {i + 1}
              </div>
            </div>
          ))}
        </div>

        {/* ── Next button ── */}
        {stage < stages.length - 1 && (
          <button
            onClick={handleNext}
            style={{
              background: "linear-gradient(135deg,#c44040,#e07070)",
              border: "none",
              color: "#fff",
              padding: "13px 32px",
              borderRadius: 50,
              cursor: "pointer",
              fontWeight: 800,
              marginTop: 12,
              fontSize: 14,
              boxShadow: "0 8px 24px rgba(196,64,64,.35)",
              letterSpacing: 0.5,
              transition: "transform .15s,box-shadow .15s",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.06) translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 14px 32px rgba(196,64,64,.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(196,64,64,.35)";
            }}
          >
            <span style={{ animation: "float 1.5s ease-in-out infinite" }}>
              {stage === 0 ? "😬" : "😱"}
            </span>
            {stage === 0 ? "मग काय झालं?" : "Next..."}
          </button>
        )}

        {/* ── Final: Achievement + CTA ── */}
        {stage === stages.length - 1 && (
          <div
            style={{
              marginTop: 22,
              textAlign: "center",
              animation: "fadeScaleIn .5s ease",
            }}
          >
            {/* Trophy card */}
            <div
              style={{
                background:
                  "linear-gradient(135deg,rgba(255,245,240,.95),rgba(255,220,210,.95))",
                border: "2px solid rgba(224,80,80,.25)",
                borderRadius: 20,
                padding: "18px 28px",
                display: "inline-block",
                marginBottom: 20,
                boxShadow: "0 12px 40px rgba(224,80,80,.15)",
              }}
            >
              <div
                style={{
                  fontSize: 40,
                  marginBottom: 6,
                  animation: "iconBounce .8s ease infinite alternate",
                  display: "block",
                }}
              >
                🏆
              </div>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: 15,
                  color: "#c03030",
                  letterSpacing: 0.5,
                }}
              >
                Achievement Unlocked!
              </div>
              <div
                style={{
                  color: "#555",
                  fontSize: 13,
                  marginTop: 4,
                  fontStyle: "italic",
                }}
              >
                "Mission Failed Successfully" 😂
              </div>

              {/* Mini stat row */}
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  marginTop: 14,
                  justifyContent: "center",
                }}
              >
                {[
                  { label: "Call Duration", val: "10:12 ☠️" },
                  { label: "Suspicion Level", val: "MAX 🔴" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      background: "rgba(200,0,0,0.06)",
                      borderRadius: 10,
                      padding: "8px 14px",
                      fontSize: 11,
                    }}
                  >
                    <div style={{ color: "#999", fontWeight: 600 }}>
                      {stat.label}
                    </div>
                    <div
                      style={{
                        fontWeight: 900,
                        color: "#c03030",
                        fontSize: 13,
                        marginTop: 2,
                      }}
                    >
                      {stat.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <br />

            <button
              onClick={() => {
                onAchieve("Mummy Spy Incident 😱", "🕵️");
                onNext();
              }}
              style={{
                background: "linear-gradient(135deg,#e07060,#c03030)",
                border: "none",
                color: "#fff",
                padding: "14px 42px",
                borderRadius: 50,
                cursor: "pointer",
                fontWeight: 800,
                fontSize: 15,
                boxShadow: "0 10px 28px rgba(192,48,48,.4)",
                letterSpacing: 0.5,
                transition: "transform .15s,box-shadow .15s",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "scale(1.07) translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 18px 36px rgba(192,48,48,.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 10px 28px rgba(192,48,48,.4)";
              }}
            >
              Chapter 4
              <span style={{ animation: "float 1s ease-in-out infinite" }}>
                →
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};
