import { useState, useEffect, useRef, useCallback } from "react";

const TASKS = [
  { id: "wave", label: "Wave hello", icon: "👋", btn: "Wave hello" },
  { id: "smile", label: "Share a smile", icon: "😊", btn: "Share a smile" },
  { id: "closer", label: "Move closer", icon: "🌹", btn: "Move closer" },
  { id: "hold", label: "Hold hands", icon: "💛", btn: "Hold hands" },
];

const HINT_MSGS = {
  wave: "Flynn waves hello! ✨",
  smile: "Rapunzel smiles back! 🌸",
  closer: "They move closer... 🌹",
  hold: "Hands intertwined! 💛",
};

const HEART_EMOJIS = [
  "❤️",
  "💕",
  "💗",
  "💖",
  "🌸",
  "✨",
  "💫",
  "🌟",
  "🫀",
  "💝",
];

function Star({ style }) {
  return (
    <div
      className="absolute rounded-full bg-white"
      style={{
        ...style,
        animation: `twinkle ${style["--d"] || "2s"} ease-in-out infinite alternate`,
      }}
    />
  );
}

function Firefly({ style }) {
  return (
    <div
      className="absolute rounded-full"
      style={{
        width: 4,
        height: 4,
        background: "#aaff66",
        boxShadow: "0 0 6px 2px rgba(170,255,100,0.6)",
        ...style,
      }}
    />
  );
}

function LanternSVG({ show, style }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        opacity: show ? 0.9 : 0,
        transition: "opacity 1.2s ease",
        ...style,
      }}
    >
      <svg width="24" height="34" viewBox="0 0 22 30">
        <rect
          x="6"
          y="4"
          width="10"
          height="20"
          rx="4"
          fill="#f9b84a"
          opacity=".9"
        />
        <rect x="4" y="2" width="14" height="4" rx="2" fill="#c07810" />
        <rect x="4" y="22" width="14" height="4" rx="2" fill="#c07810" />
        <line
          x1="11"
          y1="0"
          x2="11"
          y2="2"
          stroke="#a06010"
          strokeWidth="1.5"
        />
        <line
          x1="11"
          y1="26"
          x2="11"
          y2="30"
          stroke="#a06010"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

function FloatingHeart({ emoji, style }) {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        animation: `floatUp ${style["--dur"] || "1.6s"} ease-out forwards`,
        animationDelay: style["--delay"] || "0s",
        bottom: 0,
        fontSize: style.fontSize,
        left: style.left,
        zIndex: 40,
      }}
    >
      {emoji}
    </div>
  );
}

// ─── Flynn Character ───────────────────────────────────────────────────────────
export function Flynn({ kissed, tasksDone, onClick }) {
  const lean = kissed;
  const smile = tasksDone >= 1 || kissed;
  const pucker = kissed;
  const hug = tasksDone >= 3 || kissed;
  const eyesClosed = kissed;

  return (
    <div
      className="flex flex-col items-center cursor-pointer select-none"
      onClick={onClick}
    >
      {/* Head */}
      <div
        style={{
          width: 58,
          height: 60,
          borderRadius: "50% 50% 45% 45%",
          background: "#c8845a",
          position: "relative",
          transition: "transform 0.6s cubic-bezier(0.4,2,0.55,1)",
          transform: lean
            ? "rotate(22deg) translateX(14px) translateY(-4px)"
            : "none",
        }}
      >
        {/* Hair */}
        <div
          style={{
            position: "absolute",
            top: -6,
            left: 4,
            right: 4,
            height: 26,
            background: "#3d1f0a",
            borderRadius: "60% 60% 20% 20%",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -6,
            left: 4,
            right: 4,
            height: 26,
            background: "#3d1f0a",
            borderRadius: "60% 60% 20% 20%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 6,
              left: -3,
              width: 12,
              height: 18,
              background: "#3d1f0a",
              borderRadius: "50% 0 0 50%",
            }}
          />
        </div>
        {/* Brows */}
        <div
          style={{
            position: "absolute",
            top: 18,
            left: 10,
            width: 14,
            height: 3,
            background: "#3d1f0a",
            borderRadius: 2,
            transform: "rotate(-8deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 18,
            right: 10,
            width: 14,
            height: 3,
            background: "#3d1f0a",
            borderRadius: 2,
            transform: "rotate(8deg)",
          }}
        />
        {/* Eyes */}
        <div
          style={{
            position: "absolute",
            top: 26,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 14,
          }}
        >
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: eyesClosed ? 2 : 8,
                background: "#2c1a0e",
                borderRadius: eyesClosed ? 2 : "50%",
                marginTop: eyesClosed ? 3 : 0,
                transition: "height 0.3s, margin-top 0.3s",
              }}
            />
          ))}
        </div>
        {/* Nose */}
        <div
          style={{
            position: "absolute",
            top: 36,
            left: "50%",
            transform: "translateX(-50%)",
            width: 6,
            height: 5,
            borderRadius: "0 0 4px 4px",
            borderBottom: "2px solid #a0603a",
          }}
        />
        {/* Stubble */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 8,
            right: 8,
            height: 10,
            borderRadius: "0 0 6px 6px",
            background: "rgba(80,40,10,0.25)",
          }}
        />
        {/* Mouth */}
        {pucker ? (
          <div
            style={{
              position: "absolute",
              bottom: 11,
              left: "50%",
              transform: "translateX(-50%)",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#b05030",
              transition: "all 0.3s",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              bottom: 12,
              left: "50%",
              transform: "translateX(-50%)",
              width: smile ? 18 : 16,
              height: 7,
              borderRadius: "0 0 10px 10px",
              borderBottom: `${smile ? "2.5px" : "2px"} solid ${smile ? "#b05030" : "#8a4020"}`,
              transition: "all 0.3s",
            }}
          />
        )}
      </div>
      {/* Body */}
      <div
        style={{
          width: 66,
          height: 80,
          marginTop: -2,
          background: "#3a5c2e",
          borderRadius: "10px 10px 6px 6px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "10px 10px 6px 6px",
            background: "rgba(80,50,20,0.35)",
            clipPath: "polygon(20% 0, 80% 0, 75% 100%, 25% 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 6,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 12,
                height: 2,
                background: "#c8a060",
                borderRadius: 1,
              }}
            />
          ))}
        </div>
        {/* Arms */}
        <div
          style={{
            position: "absolute",
            width: 14,
            height: 42,
            background: "#3a5c2e",
            borderRadius: 8,
            right: -12,
            top: 8,
            transformOrigin: "top center",
            transition: "transform 0.6s cubic-bezier(0.4,2,0.55,1)",
            transform: hug ? "rotate(-65deg) translateY(6px)" : "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 14,
            height: 42,
            background: "#3a5c2e",
            borderRadius: 8,
            left: -12,
            top: 8,
            transformOrigin: "top center",
            transition: "transform 0.6s cubic-bezier(0.4,2,0.55,1)",
            transform: hug ? "rotate(65deg) translateY(6px)" : "none",
          }}
        />
      </div>
      {/* Legs */}
      <div
        style={{
          width: 66,
          height: 24,
          background: "#2c3a60",
          borderRadius: "0 0 8px 8px",
          marginTop: -2,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 4,
            width: 24,
            height: 10,
            background: "#1a1008",
            borderRadius: "4px 4px 6px 6px",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 4,
            width: 24,
            height: 10,
            background: "#1a1008",
            borderRadius: "4px 4px 6px 6px",
          }}
        />
      </div>
    </div>
  );
}

// ─── Rapunzel Character ────────────────────────────────────────────────────────
export function Rapunzel({ kissed, tasksDone, onClick }) {
  const lean = kissed;
  const smile = tasksDone >= 1 || kissed;
  const pucker = kissed;
  const hug = tasksDone >= 3 || kissed;
  const blush = tasksDone >= 2 || kissed;
  const eyesClosed = kissed;

  return (
    <div
      className="flex flex-col items-center cursor-pointer select-none"
      onClick={onClick}
    >
      {/* Head */}
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: "50%",
          background: "#e8b890",
          position: "relative",
          transition: "transform 0.6s cubic-bezier(0.4,2,0.55,1)",
          transform: lean
            ? "rotate(-22deg) translateX(-14px) translateY(-4px)"
            : "none",
        }}
      >
        {/* Hair top */}
        <div
          style={{
            position: "absolute",
            top: -10,
            left: -2,
            right: -2,
            height: 28,
            background: "#d4a820",
            borderRadius: "60% 60% 20% 20%",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: -8,
            width: 16,
            height: 50,
            background: "#d4a820",
            borderRadius: "10px 0 0 10px",
          }}
        />
        {/* Long hair */}
        <div
          style={{
            position: "absolute",
            top: 44,
            left: "50%",
            transform: "translateX(-50%)",
            width: 28,
            height: 120,
            background: "#d4a820",
            borderRadius: 10,
            zIndex: -1,
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: -30,
              left: -6,
              width: 20,
              height: 50,
              background: "#c89c18",
              borderRadius: "0 0 10px 10px",
              transform: "rotate(-8deg)",
            }}
          />
        </div>
        {/* Brows */}
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 9,
            width: 12,
            height: 2.5,
            background: "#8b6010",
            borderRadius: 2,
            transform: "rotate(-5deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 9,
            width: 12,
            height: 2.5,
            background: "#8b6010",
            borderRadius: 2,
            transform: "rotate(5deg)",
          }}
        />
        {/* Eyes */}
        <div
          style={{
            position: "absolute",
            top: 23,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 12,
          }}
        >
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                width: 9,
                height: eyesClosed ? 2 : 10,
                background: eyesClosed ? "#8b6010" : "#3a8020",
                borderRadius: eyesClosed ? 2 : "50%",
                border: eyesClosed ? "none" : "1.5px solid #1a5010",
                marginTop: eyesClosed ? 4 : 0,
                transition: "height 0.3s, margin-top 0.3s",
              }}
            />
          ))}
        </div>
        {/* Blush */}
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 3,
            width: 12,
            height: 7,
            background: "rgba(255,100,100,0.35)",
            borderRadius: "50%",
            opacity: blush ? 1 : 0,
            transition: "opacity 0.4s",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 32,
            right: 3,
            width: 12,
            height: 7,
            background: "rgba(255,100,100,0.35)",
            borderRadius: "50%",
            opacity: blush ? 1 : 0,
            transition: "opacity 0.4s",
          }}
        />
        {/* Nose */}
        <div
          style={{
            position: "absolute",
            top: 34,
            left: "50%",
            transform: "translateX(-50%)",
            width: 5,
            height: 4,
            borderRadius: "0 0 3px 3px",
            borderBottom: "1.5px solid #b07040",
          }}
        />
        {/* Freckles */}
        <div
          style={{
            position: "absolute",
            top: 30,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 18,
          }}
        >
          {[0, 1].map((g) => (
            <div key={g} style={{ display: "flex", gap: 3 }}>
              {[0, 1].map((f) => (
                <div
                  key={f}
                  style={{
                    width: 3,
                    height: 3,
                    borderRadius: "50%",
                    background: "rgba(160,90,40,0.35)",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        {/* Mouth */}
        {pucker ? (
          <div
            style={{
              position: "absolute",
              bottom: 9,
              left: "50%",
              transform: "translateX(-50%)",
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "#d0507a",
              transition: "all 0.3s",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              bottom: 10,
              left: "50%",
              transform: "translateX(-50%)",
              width: smile ? 16 : 14,
              height: 6,
              borderRadius: "0 0 8px 8px",
              borderBottom: `${smile ? "2.5px" : "2px"} solid ${smile ? "#d0507a" : "#c06080"}`,
              transition: "all 0.3s",
            }}
          />
        )}
      </div>
      {/* Body */}
      <div
        style={{
          width: 58,
          height: 74,
          marginTop: -2,
          background: "#7a2d8a",
          borderRadius: "12px 12px 8px 16px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 30,
            background: "#6a2070",
            borderRadius: "12px 12px 0 0",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: -4,
            right: -4,
            height: 50,
            background: "#8a38a0",
            borderRadius: "4px 4px 12px 16px",
            clipPath: "polygon(0 0, 100% 0, 110% 100%, -10% 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 10,
            height: 10,
            background: "#f080a0",
            borderRadius: "50%",
          }}
        />
        {/* Arms */}
        <div
          style={{
            position: "absolute",
            width: 12,
            height: 38,
            background: "#e8b890",
            borderRadius: 7,
            left: -10,
            top: 10,
            transformOrigin: "top center",
            transition: "transform 0.6s cubic-bezier(0.4,2,0.55,1)",
            transform: hug ? "rotate(60deg) translateY(4px)" : "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 12,
            height: 38,
            background: "#e8b890",
            borderRadius: 7,
            right: -10,
            top: 10,
            transformOrigin: "top center",
            transition: "transform 0.6s cubic-bezier(0.4,2,0.55,1)",
            transform: hug ? "rotate(-60deg) translateY(4px)" : "none",
          }}
        />
      </div>
    </div>
  );
}

// ─── Main Scene ────────────────────────────────────────────────────────────────
export default function TangledScene() {
  const [done, setDone] = useState(new Set());
  const [kissed, setKissed] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [lanternsOn, setLanternsOn] = useState(false);
  const [hint, setHint] = useState(
    "Click the characters or use the buttons below ✨",
  );
  const [stars] = useState(() =>
    Array.from({ length: 65 }, (_, i) => ({
      id: i,
      size: Math.random() * 2.4 + 0.8,
      top: Math.random() * 70,
      left: Math.random() * 100,
      dur: (Math.random() * 2.5 + 1).toFixed(1),
      delay: (Math.random() * 2.5).toFixed(1),
    })),
  );
  const [fireflies] = useState(() =>
    [
      [30, 80],
      [110, 65],
      [200, 90],
      [310, 70],
      [420, 85],
      [510, 68],
      [590, 80],
      [650, 72],
    ].map(([x, y], i) => ({
      id: i,
      x,
      y,
      dx: (Math.random() * 40 - 20).toFixed(0),
      dy: (Math.random() * 28 - 14).toFixed(0),
      dur: (Math.random() * 3 + 2.5).toFixed(1),
      delay: (Math.random() * 2).toFixed(1),
    })),
  );
  const [lanternPos] = useState(() =>
    [
      [8, 28],
      [16, 20],
      [26, 24],
      [38, 18],
      [50, 22],
      [62, 19],
      [74, 28],
    ].map(([xPct, topPct], i) => ({
      id: i,
      xPct,
      topPct,
      lx: (Math.random() * 20 - 10).toFixed(0),
      ly: (Math.random() * 30 + 15).toFixed(0),
      dur: (6 + Math.random() * 5).toFixed(1),
      delay: (i * 0.4).toFixed(1),
    })),
  );

  const heartIdRef = useRef(0);
  const hintTimerRef = useRef(null);

  const tasksDone = done.size;
  const allDone = tasksDone === TASKS.length;

  const gapMap = { 0: 52, 1: 32, 2: 14, 3: 6 };
  const gap = kissed ? 2 : (gapMap[Math.min(tasksDone, 3)] ?? 52);

  const spawnHearts = useCallback((n = 10) => {
    const newH = Array.from({ length: n }, (_, i) => ({
      id: heartIdRef.current++,
      emoji: HEART_EMOJIS[(heartIdRef.current + i) % HEART_EMOJIS.length],
      left: `${10 + Math.random() * 80}%`,
      fontSize: `${13 + Math.random() * 14}px`,
      delay: `${(i * 0.14).toFixed(2)}s`,
      dur: `${(1.2 + Math.random() * 0.9).toFixed(1)}s`,
    }));
    setHearts((prev) => [...prev, ...newH]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newH.find((n) => n.id === h.id)));
    }, 3200);
  }, []);

  const doTask = useCallback(
    (id) => {
      if (done.has(id)) return;
      setDone((prev) => new Set([...prev, id]));
    },
    [done],
  );

  const doKiss = useCallback(() => {
    if (!allDone || kissed) return;
    setKissed(true);
    spawnHearts(14);
    setLanternsOn(true);
    setHint("");
    setTimeout(() => spawnHearts(10), 1900);
    setTimeout(() => spawnHearts(8), 3600);
  }, [allDone, kissed, spawnHearts]);

  const charClick = useCallback(() => {
    const next = TASKS.find((t) => !done.has(t.id));
    if (!next) {
      doKiss();
      return;
    }
    doTask(next.id);
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    setHint(HINT_MSGS[next.id] || "");
    hintTimerRef.current = setTimeout(
      () => setHint("Click the characters or use the buttons below ✨"),
      2200,
    );
  }, [done, doTask, doKiss]);

  const resetAll = useCallback(() => {
    setDone(new Set());
    setKissed(false);
    setHearts([]);
    setLanternsOn(false);
    setHint("Click the characters or use the buttons below ✨");
  }, []);

  useEffect(
    () => () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    },
    [],
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Crimson+Pro:wght@300;400;500&display=swap');
        @keyframes twinkle {
          from { opacity: 0.12; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1.3); }
        }
        @keyframes floatLantern {
          from { transform: translate(0, 0) rotate(-3deg); }
          to { transform: translate(var(--lx, 10px), var(--ly, -20px)) rotate(4deg); }
        }
        @keyframes fireflyFloat {
          from { transform: translate(0, 0); opacity: 0.25; }
          to { transform: translate(var(--fdx, 20px), var(--fdy, -14px)); opacity: 0.9; }
        }
        @keyframes floatUp {
          0% { opacity: 0; transform: translateY(0) scale(0.4); }
          15% { opacity: 1; }
          80% { opacity: 0.7; }
          100% { opacity: 0; transform: translateY(-95px) scale(1.4); }
        }
        @keyframes shimmerTitle {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 12px rgba(249,123,161,0.4); }
          50% { box-shadow: 0 0 24px rgba(249,123,161,0.8), 0 0 40px rgba(249,123,161,0.3); }
        }
        .kiss-btn-glow { animation: pulseGlow 2s ease-in-out infinite; }
        .scene-font { font-family: 'Crimson Pro', serif; }
        .title-font { font-family: 'Playfair Display', serif; }
        .task-done-check { animation: checkPop 0.4s cubic-bezier(0.4,2,0.55,1) forwards; }
        @keyframes checkPop { from { transform: scale(0.5); } to { transform: scale(1); } }
        .progress-fill { transition: width 0.6s cubic-bezier(0.4, 2, 0.6, 1); }
        .char-gap { transition: gap 0.7s cubic-bezier(0.4, 2, 0.55, 1); }
      `}</style>

      <div
        className="relative w-full overflow-hidden scene-font"
        style={{
          minHeight: 640,
          background:
            "linear-gradient(180deg, #04040f 0%, #080c2a 45%, #120b38 100%)",
          borderRadius: 20,
          fontFamily: "'Crimson Pro', serif",
        }}
      >
        {/* Stars */}
        {stars.map((s) => (
          <Star
            key={s.id}
            style={{
              width: s.size,
              height: s.size,
              top: `${s.top}%`,
              left: `${s.left}%`,
              "--d": `${s.dur}s`,
              animationDelay: `${s.delay}s`,
              opacity: 0.15,
            }}
          />
        ))}

        {/* Moon */}
        <div
          style={{
            position: "absolute",
            top: 22,
            right: 55,
            width: 58,
            height: 58,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 38% 38%, #fffbe0 60%, #f0d070 100%)",
            boxShadow: "0 0 30px rgba(255,240,120,0.25)",
          }}
        />

        {/* Fireflies */}
        {fireflies.map((f) => (
          <Firefly
            key={f.id}
            style={{
              left: f.x,
              bottom: f.y,
              "--fdx": `${f.dx}px`,
              "--fdy": `${f.dy}px`,
              animation: `fireflyFloat ${f.dur}s ease-in-out infinite alternate`,
              animationDelay: `${f.delay}s`,
            }}
          />
        ))}

        {/* Lanterns */}
        {lanternPos.map((l) => (
          <LanternSVG
            key={l.id}
            show={lanternsOn}
            style={{
              left: `${l.xPct}%`,
              top: `${l.topPct}%`,
              "--lx": `${l.lx}px`,
              "--ly": `-${l.ly}px`,
              animation: lanternsOn
                ? `floatLantern ${l.dur}s ease-in-out infinite alternate`
                : "none",
              animationDelay: `${l.delay}s`,
              transition: `opacity 1s ease ${(l.id * 0.22).toFixed(1)}s`,
            }}
          />
        ))}

        {/* ── Task Pills ── */}
        <div className="relative z-10 flex flex-wrap gap-2 justify-center px-4 pt-4">
          {TASKS.map((t) => {
            const isDone = done.has(t.id);
            return (
              <button
                key={t.id}
                onClick={() => doTask(t.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 14px",
                  borderRadius: 20,
                  border: isDone
                    ? "1px solid rgba(255,210,80,0.5)"
                    : "1px solid rgba(255,255,255,0.12)",
                  background: isDone
                    ? "rgba(255,180,80,0.15)"
                    : "rgba(255,255,255,0.06)",
                  color: isDone ? "#ffd97a" : "rgba(255,255,255,0.5)",
                  fontSize: 13,
                  cursor: isDone ? "default" : "pointer",
                  transition: "all 0.35s",
                  fontFamily: "'Crimson Pro', serif",
                  letterSpacing: "0.3px",
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    display: "inline-block",
                    transition: "transform 0.4s",
                    transform: isDone ? "scale(1.4)" : "none",
                  }}
                >
                  {isDone ? "✓" : t.icon}
                </span>
                {t.label}
              </button>
            );
          })}
        </div>

        {/* ── Progress Bar ── */}
        <div className="relative z-10 flex items-center gap-3 px-6 pt-3">
          <div
            style={{
              flex: 1,
              height: 4,
              background: "rgba(255,255,255,0.08)",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div
              className="progress-fill"
              style={{
                height: "100%",
                width: `${(tasksDone / TASKS.length) * 100}%`,
                background: kissed
                  ? "linear-gradient(90deg, #f97ba1, #ffd060)"
                  : "linear-gradient(90deg, #f97ba1, #c06090)",
                borderRadius: 10,
              }}
            />
          </div>
          <span
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.35)",
              whiteSpace: "nowrap",
              fontFamily: "'Crimson Pro', serif",
            }}
          >
            {tasksDone} / {TASKS.length}
          </span>
        </div>

        {/* ── Stage ── */}
        <div
          className="relative z-10 flex justify-center items-end"
          style={{ minHeight: 280, paddingTop: 12 }}
        >
          {/* Bench SVG */}
          <svg
            viewBox="0 0 280 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 8,
            }}
            width="280"
            height="65"
          >
            <rect x="10" y="12" width="260" height="16" rx="6" fill="#1e0e03" />
            <rect x="10" y="12" width="260" height="6" rx="3" fill="#2d1506" />
            <rect x="22" y="28" width="12" height="32" rx="5" fill="#1e0e03" />
            <rect x="246" y="28" width="12" height="32" rx="5" fill="#1e0e03" />
            <rect x="55" y="22" width="170" height="10" rx="4" fill="#2d1506" />
          </svg>

          {/* Characters */}
          <div
            className="char-gap relative z-10 flex items-end"
            style={{ gap }}
          >
            <Flynn kissed={kissed} tasksDone={tasksDone} onClick={charClick} />
            <Rapunzel
              kissed={kissed}
              tasksDone={tasksDone}
              onClick={charClick}
            />
          </div>
        </div>

        {/* Floating Hearts Layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 35, overflow: "hidden" }}
        >
          {hearts.map((h) => (
            <FloatingHeart
              key={h.id}
              emoji={h.emoji}
              style={{
                left: h.left,
                fontSize: h.fontSize,
                "--delay": h.delay,
                "--dur": h.dur,
              }}
            />
          ))}
        </div>

        {/* ── Caption ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            fontFamily: "'Playfair Display', serif",
            fontSize: 16,
            fontStyle: "italic",
            letterSpacing: kissed ? "2px" : 0,
            color: kissed ? "#ffcce0" : "transparent",
            transition: "color 0.8s, letter-spacing 0.8s",
            paddingTop: 8,
            animation: kissed ? "shimmerTitle 3s ease-in-out infinite" : "none",
          }}
        >
          ✨ A kiss under the lantern light ✨
        </div>

        {/* ── Hint ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            fontSize: 12,
            color: "rgba(255,255,255,0.28)",
            padding: "4px 0",
            fontFamily: "'Crimson Pro', serif",
            minHeight: 22,
            transition: "opacity 0.5s",
          }}
        >
          {hint}
        </div>

        {/* ── Action Buttons ── */}
        <div className="relative z-10 flex flex-wrap gap-2 justify-center px-4 pb-5 pt-3">
          {TASKS.map((t) => {
            const isDone = done.has(t.id);
            return (
              <button
                key={t.id}
                onClick={() => doTask(t.id)}
                disabled={isDone}
                style={{
                  padding: "7px 16px",
                  borderRadius: 24,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.07)",
                  color: isDone
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(255,255,255,0.65)",
                  fontSize: 13,
                  cursor: isDone ? "not-allowed" : "pointer",
                  opacity: isDone ? 0.4 : 1,
                  transition: "all 0.2s",
                  fontFamily: "'Crimson Pro', serif",
                  letterSpacing: "0.3px",
                }}
                onMouseEnter={(e) => {
                  if (!isDone) {
                    e.target.style.borderColor = "rgba(255,200,100,0.4)";
                    e.target.style.background = "rgba(255,200,100,0.08)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.14)";
                  e.target.style.background = "rgba(255,255,255,0.07)";
                }}
              >
                {t.btn}
              </button>
            );
          })}
          <button
            onClick={doKiss}
            disabled={!allDone || kissed}
            className={allDone && !kissed ? "kiss-btn-glow" : ""}
            style={{
              padding: "8px 22px",
              borderRadius: 24,
              border: "none",
              background:
                allDone && !kissed ? "#f97ba1" : "rgba(249,123,161,0.25)",
              color: allDone && !kissed ? "#fff" : "rgba(255,255,255,0.3)",
              fontSize: 14,
              cursor: allDone && !kissed ? "pointer" : "not-allowed",
              fontFamily: "'Crimson Pro', serif",
              letterSpacing: "0.5px",
              fontWeight: 500,
              transition: "all 0.3s",
            }}
          >
            💋 Kiss!
          </button>
          <button
            onClick={resetAll}
            style={{
              padding: "7px 16px",
              borderRadius: 24,
              border: "1px solid rgba(255,255,255,0.09)",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.35)",
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "'Crimson Pro', serif",
              transition: "all 0.2s",
            }}
          >
            ↺ Reset
          </button>
        </div>

        {/* Bushes */}
        {[
          { w: 90, h: 52, left: -8, bg: "#040f06" },
          { w: 65, h: 40, left: 68, bg: "#061209" },
          { w: 100, h: 56, right: -8, bg: "#040f06" },
          { w: 60, h: 38, right: 68, bg: "#061209" },
        ].map((b, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: 0,
              width: b.w,
              height: b.h,
              ...(b.left !== undefined ? { left: b.left } : { right: b.right }),
              background: b.bg,
              borderRadius: "50% 50% 0 0",
              pointerEvents: "none",
            }}
          />
        ))}
      </div>
    </>
  );
}
