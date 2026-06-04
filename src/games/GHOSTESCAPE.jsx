import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════
   GHOST ESCAPE MINI GAME
═══════════════════════════════════════════════ */
export const GhostEscape = ({ onBack, onAchieve }) => {
  const [pos, setPos] = useState(50);
  const [ghosts, setGhosts] = useState([]);
  const [alive, setAlive] = useState(true);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const posRef = useRef(50);
  const aliveRef = useRef(true);
  const scoreRef = useRef(0);

  const move = (dir) => {
    const n = Math.max(
      5,
      Math.min(95, posRef.current + (dir === "left" ? -10 : 10)),
    );
    posRef.current = n;
    setPos(n);
  };

  useEffect(() => {
    if (!started) return;
    aliveRef.current = true;
    const gi = setInterval(() => {
      setGhosts((g) => [
        ...g,
        { id: Date.now() + Math.random(), x: Math.random() * 80 + 10, y: 0 },
      ]);
    }, 650);
    const mv = setInterval(() => {
      if (!aliveRef.current) return;
      scoreRef.current++;
      setScore(scoreRef.current);
      setGhosts((g) => {
        const upd = g
          .map((gh) => ({ ...gh, y: gh.y + 3 }))
          .filter((gh) => gh.y < 105);
        const hit = upd.some(
          (gh) => Math.abs(gh.x - posRef.current) < 9 && gh.y > 82,
        );
        if (hit) {
          aliveRef.current = false;
          setAlive(false);
          if (scoreRef.current > 30) onAchieve("Ghost Survivor 👻", "👻");
        }
        return upd;
      });
    }, 100);
    return () => {
      clearInterval(gi);
      clearInterval(mv);
    };
  }, [started, onAchieve]);

  const restart = () => {
    scoreRef.current = 0;
    posRef.current = 50;
    aliveRef.current = true;
    setScore(0);
    setPos(50);
    setGhosts([]);
    setAlive(true);
    setStarted(true);
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", textAlign: "center" }}>
      <div
        style={{
          color: "#c04444",
          fontWeight: 700,
          fontSize: 18,
          marginBottom: 8,
        }}
      >
        Score: {score}
      </div>
      <div
        style={{
          position: "relative",
          height: 340,
          background: "linear-gradient(180deg,#fff0f5,#ffe0e0)",
          borderRadius: 20,
          overflow: "hidden",
          border: "2px solid rgba(200,80,80,.25)",
          marginBottom: 10,
        }}
      >
        {ghosts.map((g) => (
          <div
            key={g.id}
            style={{
              position: "absolute",
              left: `${g.x}%`,
              top: `${g.y}%`,
              fontSize: 24,
              transform: "translateX(-50%)",
              animation: "ghostDrift 1s ease-in-out infinite",
            }}
          >
            👻
          </div>
        ))}
        {alive ? (
          <div
            style={{
              position: "absolute",
              bottom: "5%",
              left: `${pos}%`,
              transform: "translateX(-50%)",
              fontSize: 30,
              animation: "bikeBounce .3s ease-in-out infinite",
            }}
          >
            🏍️
          </div>
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,240,240,.9)",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={{ fontSize: 42 }}>💀</div>
            <div style={{ color: "#c04444", fontWeight: 700 }}>
              पकडलास! Score: {score}
            </div>
            <button
              onClick={restart}
              style={{
                background: "linear-gradient(135deg,#c44040,#e07070)",
                border: "none",
                color: "#fff",
                padding: "9px 22px",
                borderRadius: 50,
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Play Again
            </button>
          </div>
        )}
        {!started && alive && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,240,240,.9)",
            }}
          >
            <button
              onClick={() => setStarted(true)}
              style={{
                background: "linear-gradient(135deg,#c44040,#e07070)",
                border: "none",
                color: "#fff",
                padding: "13px 28px",
                borderRadius: 50,
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              9 Bhoot पासून पळ! 👻
            </button>
          </div>
        )}
      </div>
      {started && alive && (
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          {["left", "right"].map((d) => (
            <button
              key={d}
              onPointerDown={() => move(d)}
              style={{
                background: "rgba(255,255,255,.8)",
                border: "2px solid rgba(200,80,80,.2)",
                color: "var(--deep)",
                padding: "13px 28px",
                borderRadius: 50,
                cursor: "pointer",
                fontSize: 18,
                fontWeight: 700,
                backdropFilter: "blur(8px)",
                userSelect: "none",
              }}
            >
              {d === "left" ? "←" : "→"}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={onBack}
        style={{
          background: "rgba(255,255,255,.7)",
          border: "1px solid rgba(196,112,106,.2)",
          color: "var(--muted)",
          padding: "8px 18px",
          borderRadius: 50,
          cursor: "pointer",
          fontSize: 12,
        }}
      >
        ← Return
      </button>
    </div>
  );
};
