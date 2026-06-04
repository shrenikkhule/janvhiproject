import { useState } from "react";
import {
  ChapterPill,
  FloatingPetals,
  Starfield,
} from "../SHAREDCOMPONENTS/Starfield";

/* ═══════════════════════════════════════════════
   CHAPTER 1 — Kranti Chowk
═══════════════════════════════════════════════ */
export const Chapter1 = ({ onNext, onAchieve }) => {
  const [stage, setStage] = useState(0);
  const [bikePos, setBikePos] = useState(8);
  const convos = [
    { side: "left", text: "Excuse me... Shani Shingnapurla jaatoys ka? 😊" },
    { side: "right", text: "हो! येणार आहेस का सोबत?" },
    { side: "left", text: "Why not! I'm Shreya by the way ✨" },
    {
      side: "right",
      text: "Shrenik. मला माहीत आहे तू हे नाव विसरणार नाहीस 😏",
    },
    { side: "left", text: "That's... oddly confident! 😂" },
    { side: "right", text: "आणि हे आपल्या Story Chi सुरुवात होती... ❤️" },
  ];

  const startEngine = () => {
    onAchieve("पहिली Ride Unlocked 🏍️", "🏍️");
    setStage(1);
    setTimeout(() => {
      setStage(2);
      let p = 8;
      const iv = setInterval(() => {
        p += 1.8;
        setBikePos(p);
        if (p >= 78) {
          clearInterval(iv);
          setStage(3);
        }
      }, 70);
    }, 1200);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg, #fff8f2 0%, #fce8e0 45%, #f5e8f5 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "70px 16px 50px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Starfield count={25} />
      <FloatingPetals />

      {/* Decorative blobs */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(244,162,97,.12) 0%,transparent 70%)",
          top: "-15%",
          left: "-15%",
          pointerEvents: "none",
        }}
      />

      <div
        className="anim-fadeup"
        style={{ textAlign: "center", marginBottom: 36 }}
      >
        <ChapterPill num="01" color="var(--warm)" />
        <h1
          className="fc"
          style={{
            fontSize: "clamp(32px,7vw,62px)",
            color: "var(--ink)",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 10,
          }}
        >
          Kranti Chowk
        </h1>
        <p
          className="fc"
          style={{ color: "var(--muted)", fontSize: 18, fontStyle: "italic" }}
        >
          "Where our journey began"...
        </p>
      </div>

      {/* Night scene card */}
      <div
        className="glass anim-fadeup"
        style={{
          width: "100%",
          maxWidth: 660,
          borderRadius: 24,
          overflow: "hidden",
          marginBottom: 28,
          height: 200,
          position: "relative",
          background:
            "linear-gradient(180deg,#1a1a3e 0%,#2d1a4e 40%,#4d2a3a 70%,#6d3030 100%)",
          animationDelay: ".15s",
        }}
      >
        {/* Stars in scene */}
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${(i * 13 + 7) % 95}%`,
              top: `${(i * 9 + 5) % 55}%`,
              width: 2,
              height: 2,
              borderRadius: "50%",
              background: "#fff",
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkleS ${Math.random() * 2 + 1.5}s ${Math.random() * 2}s ease-in-out infinite`,
            }}
          />
        ))}
        {/* Moon */}
        <div
          style={{
            position: "absolute",
            right: 30,
            top: 18,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#fff9e0",
            boxShadow: "0 0 18px rgba(255,240,180,.6)",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: 8,
              top: 5,
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "#ffd98a",
              opacity: 0.4,
            }}
          />
        </div>
        {/* Road */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 54,
            background: "#2a2a2a",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "46%",
              left: 0,
              right: 0,
              height: 3,
            }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="road-dash"
                style={{
                  position: "absolute",
                  left: i * 75,
                  width: 45,
                  height: "100%",
                  background: "#f4a261",
                  opacity: 0.7,
                  borderRadius: 2,
                }}
              />
            ))}
          </div>
          {/* Bike */}
          <div
            className={stage >= 1 ? "" : ""}
            style={{
              position: "absolute",
              bottom: 14,
              left: `${bikePos}%`,
              fontSize: 32,
              transition: "left .08s linear",
              animation:
                stage >= 1 ? "bikeBounce .3s ease-in-out infinite" : "none",
              zIndex: 5,
            }}
          >
            🏍️
          </div>
        </div>
        {/* Trees silhouettes */}
        <div
          style={{
            position: "absolute",
            left: "5%",
            bottom: 54,
            fontSize: 28,
            opacity: 0.6,
          }}
        >
          🌲
        </div>
        <div
          style={{
            position: "absolute",
            left: "20%",
            bottom: 54,
            fontSize: 22,
            opacity: 0.5,
          }}
        >
          🌳
        </div>
        <div
          style={{
            position: "absolute",
            right: "8%",
            bottom: 54,
            fontSize: 26,
            opacity: 0.6,
          }}
        >
          🌲
        </div>
      </div>

      {/* Stage content */}
      {stage === 0 && (
        <div
          className="anim-fadeup"
          style={{ textAlign: "center", animationDelay: ".3s" }}
        >
          <p style={{ color: "var(--muted)", marginBottom: 22, fontSize: 14 }}>
            One Evening, One Bike, आणि एक Cannot chi भेट...
          </p>
          <button
            onClick={startEngine}
            style={{
              background: "linear-gradient(135deg,#c4706a,#f4a261)",
              border: "none",
              color: "#fff",
              padding: "15px 44px",
              borderRadius: 50,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 15,
              boxShadow: "0 8px 28px rgba(196,112,106,.35)",
              animation: "heartbeat 2s ease-in-out infinite",
              transition: "transform .2s, box-shadow .2s",
            }}
          >
            🔑 Start Bike
          </button>
        </div>
      )}
      {stage === 1 && (
        <div className="anim-scalein" style={{ textAlign: "center" }}>
          <p
            style={{
              color: "var(--warm)",
              fontSize: 22,
              fontWeight: 700,
              fontFamily: "'Caveat',cursive",
            }}
          >
            VROOM VROOM... 🔥
          </p>
        </div>
      )}
      {stage === 2 && (
        <p
          className="anim-fadeup"
          style={{
            color: "var(--muted)",
            fontStyle: "italic",
            textAlign: "center",
            fontSize: 15,
          }}
        >
          "one ride changed everything..."
        </p>
      )}
      {stage === 3 && (
        <div
          className="anim-fadeup glass"
          style={{
            width: "100%",
            maxWidth: 480,
            borderRadius: 22,
            padding: 24,
          }}
        >
          <p
            className="fc"
            style={{
              textAlign: "center",
              color: "var(--deep)",
              fontSize: 17,
              marginBottom: 18,
              fontStyle: "italic",
            }}
          >
            "...and chit chat started"
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {convos.map((c, i) => (
              <div
                key={i}
                className="chat-bub"
                style={{
                  display: "flex",
                  justifyContent:
                    c.side === "right" ? "flex-end" : "flex-start",
                  animationDelay: `${i * 0.35}s`,
                }}
              >
                <div
                  style={{
                    maxWidth: "74%",
                    padding: "10px 15px",
                    borderRadius:
                      c.side === "right"
                        ? "18px 18px 4px 18px"
                        : "18px 18px 18px 4px",
                    background:
                      c.side === "right"
                        ? "linear-gradient(135deg,var(--deep),var(--warm))"
                        : "rgba(255,255,255,0.85)",
                    color: c.side === "right" ? "#fff" : "var(--ink)",
                    fontSize: 13,
                    lineHeight: 1.6,
                    boxShadow: "0 3px 12px rgba(180,80,60,.12)",
                  }}
                >
                  {c.text}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={onNext}
            style={{
              marginTop: 24,
              width: "100%",
              background: "linear-gradient(135deg,var(--deep),var(--warm))",
              border: "none",
              color: "#fff",
              padding: "13px",
              borderRadius: 14,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14,
              boxShadow: "0 6px 20px rgba(196,112,106,.3)",
            }}
          >
            Next Step →
          </button>
        </div>
      )}
    </div>
  );
};
