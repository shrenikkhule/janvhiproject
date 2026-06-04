import { useState } from "react";
import { ChapterPill, Starfield } from "../SHAREDCOMPONENTS/Starfield";

/* ═══════════════════════════════════════════════
   CHAPTER 5 — Bhadramaruti Horror
═══════════════════════════════════════════════ */
const SCAN_MSGS = [
  "👻 1 Dayan सापडली... थांब — 9 DAYAN येत आहेत!",
  "🔴 ALERT: Paranormal activity MAXIMUM level",
  "💀 त्या माणसाने सांगितलं होतं. कुणी ऐकलं नाही.",
  "😱 Bhadramaruti area जवळ signal बंद झाला",
  "👁️ कुणीतरी बघत आहे... dole band kr!",
];

export const Chapter5 = ({ onNext, onAchieve }) => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState("");
  const [jumpscare, setJumpscare] = useState(false);
  const [survived, setSurvived] = useState(false);

  const scan = () => {
    setScanning(true);
    setResult("");
    setTimeout(() => {
      setScanning(false);
      setResult(SCAN_MSGS[Math.floor(Math.random() * SCAN_MSGS.length)]);
      if (Math.random() > 0.42) {
        setTimeout(() => {
          setJumpscare(true);
          setTimeout(() => setJumpscare(false), 850);
        }, 700);
      }
    }, 2000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg,#fff0f5 0%,#ffe8e8 50%,#fff5f0 100%)",
        padding: "70px 16px 50px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Jump scare overlay */}
      {jumpscare && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(255,200,200,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 120,
            animation: "scaleIn .1s ease-out",
          }}
        >
          👻
        </div>
      )}

      <Starfield count={18} />

      {/* Subtle scanlines */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background:
            "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(200,100,100,.03) 3px,rgba(200,100,100,.03) 4px)",
        }}
      />

      <div
        className="anim-fadeup"
        style={{
          textAlign: "center",
          marginBottom: 32,
          position: "relative",
          zIndex: 2,
        }}
      >
        <ChapterPill num="05" color="#d04444" />
        <h1
          className="fc"
          style={{
            fontSize: "clamp(24px,6vw,50px)",
            color: "var(--ink)",
            fontWeight: 700,
          }}
        >
          Bhadramaruti Horror
        </h1>
        <p
          style={{
            color: "#c06060",
            fontSize: 13,
            fontStyle: "italic",
            marginTop: 6,
          }}
        >
          "रात्री 11... एक अजनबी... आणि 9 DAYAN..."
        </p>
      </div>

      {/* Radar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 28,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          className="glass"
          style={{
            width: 220,
            height: 220,
            borderRadius: "50%",
            position: "relative",
            overflow: "hidden",
            border: "2px solid rgba(200,80,80,.3)",
          }}
        >
          {/* Circles */}
          <div
            style={{
              position: "absolute",
              inset: "22%",
              borderRadius: "50%",
              border: "1px solid rgba(200,80,80,.2)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "44%",
              borderRadius: "50%",
              border: "1px solid rgba(200,80,80,.2)",
            }}
          />
          {/* Cross lines */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 1,
              background: "rgba(200,80,80,.1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: 1,
              background: "rgba(200,80,80,.1)",
            }}
          />

          {scanning && (
            <div
              className=""
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background:
                  "conic-gradient(from 0deg,transparent 0deg,rgba(144,238,144,.3) 45deg,transparent 45deg)",
                animation: "radarSweep 1.5s linear infinite",
              }}
            />
          )}

          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 46,
              animation: scanning
                ? "ghostDrift 1.5s ease-in-out infinite"
                : "floatY 3s ease-in-out infinite",
            }}
          >
            👻
          </div>

          {/* Dayan blips */}
          {result &&
            Array.from({ length: 9 }, (_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${22 + Math.random() * 56}%`,
                  top: `${22 + Math.random() * 56}%`,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#ff6b6b",
                  boxShadow: "0 0 6px #ff6b6b",
                  animation: `shimmer 1s ${i * 0.1}s ease-in-out infinite`,
                }}
              />
            ))}
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          marginBottom: 20,
        }}
      >
        <button
          onClick={scan}
          disabled={scanning}
          style={{
            background: scanning
              ? "#e0c8c8"
              : "linear-gradient(135deg,#c44040,#e07070)",
            border: "2px solid rgba(200,80,80,.4)",
            color: scanning ? "#a06060" : "#fff",
            padding: "13px 34px",
            borderRadius: 50,
            cursor: scanning ? "not-allowed" : "pointer",
            fontWeight: 700,
            fontSize: 14,
            boxShadow: "0 6px 20px rgba(196,64,64,.25)",
            transition: "all .3s",
          }}
        >
          {scanning ? "Scanning... 🔴" : "🔴 DAYAN शोध"}
        </button>
        {result && (
          <div
            className="anim-fadeup glass-rose"
            style={{
              marginTop: 14,
              borderRadius: 12,
              padding: "11px 18px",
              display: "inline-block",
              color: "#c04444",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {result}
          </div>
        )}
      </div>

      {!survived && (
        <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <button
            onClick={() => {
              setSurvived(true);
              onAchieve("Ghost Survivor 👻", "👻");
            }}
            style={{
              background: "rgba(255,255,255,.7)",
              border: "2px solid rgba(200,80,80,.25)",
              color: "#c06060",
              padding: "10px 22px",
              borderRadius: 50,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              backdropFilter: "blur(10px)",
            }}
          >
            ✓ मी त्या रात्री वाचलो
          </button>
        </div>
      )}

      {survived && (
        <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <div
            className="anim-scalein glass"
            style={{
              borderRadius: 16,
              padding: "18px 22px",
              display: "inline-block",
              marginBottom: 18,
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 6 }}>🏆</div>
            <div style={{ color: "var(--gold)", fontWeight: 700 }}>
              Ghost Survivor
            </div>
            <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 4 }}>
              "पळालो. ओरडलो. नंतर हसलो." 😂
            </div>
          </div>
          <br />
          <button
            onClick={onNext}
            style={{
              background: "linear-gradient(135deg,#c44040,var(--warm))",
              border: "none",
              color: "#fff",
              padding: "13px 38px",
              borderRadius: 50,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14,
              boxShadow: "0 8px 24px rgba(196,64,64,.3)",
            }}
          >
            Chapter 6 →
          </button>
        </div>
      )}
    </div>
  );
};
