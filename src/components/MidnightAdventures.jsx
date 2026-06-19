import { useEffect, useRef, useState } from "react";
import { ChapterPill, Starfield } from "../SHAREDCOMPONENTS/Starfield";

/* ═══════════════════════════════════════════════
   CHAPTER 4 — Midnight Adventures
═══════════════════════════════════════════════ */
const SPOTS = [
  {
    id: "chaha",
    icon: "☕",
    name: "Chai Sutta",
    loc: [28, 56],
    memory: "रात्री 1 वाजता Cannot वर chai. mast Night Ride enjoy करत होतीस 😄",
  },
  {
    id: "gola",
    icon: "🧊",
    name: "Gola",
    loc: [54, 36],
    memory: "Orange gola ! Oragne gola Jibh orange karun dakhavt hoti 😂",
  },
  {
    id: "khasta",
    icon: "🥟",
    name: "Khasta Ragda",
    loc: [70, 62],
    memory:
      "रात्री उशिरा khasta Ragda. Bike च्या step वर बसून खाण्याचा royal feel!",
  },
  {
    id: "Samosa Rice",
    icon: "🍲",
    name: "SamosaRice",
    loc: [20, 30],
    memory:
      "first night out la Samosa rice khau ghatla Ani tula avdala nahi test 😄😄😄 ",
  },
  {
    id: "coffee",
    icon: "🥤",
    name: "Cold Coffee",
    loc: [80, 27],
    memory:
      "Midnight ला Tujhi cold coffee Ani majhi cold coffee plus Ciggrate. 2 vaje parynt bike ride 😄",
  },
  {
    id: "panipuri",
    icon: "🫧",
    name: "Panipuri",
    loc: [44, 72],
    memory: "तिखट panipuri खाताना तुझा चेहरा. Lal..! अगदी priceless!",
  },
  {
    id: "Juice",
    icon: "🫧",
    name: "Juice",
    loc: [44, 72],
    memory:
      "Tujha Mango Shake ani majha Anjir Shake ratri 2 vajta dogh cha shop madhi",
  },
];

export const Chapter4 = ({ onNext, onAchieve }) => {
  const [revealed, setRevealed] = useState([]);
  const onAchRef = useRef(onAchieve);
  useEffect(() => {
    onAchRef.current = onAchieve;
  }, [onAchieve]);

  const tap = (id) => {
    if (revealed.includes(id)) return;
    const next = [...revealed, id];
    setRevealed(next);
    if (next.length === 4) onAchRef.current("Midnight Rider 🌙", "🌙");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg,#f8f0ff 0%,#e8f0ff 50%,#f0f8ff 100%)",
        padding: "70px 16px 50px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Starfield count={30} />

      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(168,200,232,.25) 0%,transparent 70%)",
          bottom: "10%",
          right: "-10%",
          pointerEvents: "none",
        }}
      />

      <div
        className="anim-fadeup"
        style={{ textAlign: "center", marginBottom: 28 }}
      >
        <ChapterPill num="04" color="var(--sky)" />
        <h1
          className="fc"
          style={{
            fontSize: "clamp(26px,6vw,52px)",
            color: "var(--ink)",
            fontWeight: 700,
          }}
        >
          Midnight Adventures
        </h1>
        <p
          style={{
            color: "var(--muted)",
            fontSize: 13,
            marginTop: 6,
            fontStyle: "italic",
          }}
        >
          प्रत्येक जागी एक आठवण... Tap karun bgh 🗺️
        </p>
      </div>

      <div style={{ maxWidth: 620, margin: "0 auto" }}>
        {/* Map */}
        <div
          className="glass anim-scalein"
          style={{
            borderRadius: 22,
            height: 300,
            position: "relative",
            overflow: "hidden",
            animationDelay: ".1s",
            background:
              "linear-gradient(135deg,rgba(168,200,232,.3),rgba(196,168,212,.2))",
          }}
        >
          {/* Grid */}
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${i * 12.5}%`,
                top: 0,
                bottom: 0,
                borderLeft: "1px solid rgba(100,140,200,.06)",
              }}
            />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: `${i * 16.7}%`,
                left: 0,
                right: 0,
                borderTop: "1px solid rgba(100,140,200,.06)",
              }}
            />
          ))}

          {/* Spot buttons */}
          {SPOTS.map((s) => (
            <button
              key={s.id}
              onClick={() => tap(s.id)}
              style={{
                position: "absolute",
                left: `${s.loc[0]}%`,
                top: `${s.loc[1]}%`,
                transform: "translate(-50%,-50%)",
                background: revealed.includes(s.id)
                  ? "linear-gradient(135deg,var(--deep),var(--warm))"
                  : "rgba(255,255,255,0.7)",
                border: `2px solid ${revealed.includes(s.id) ? "var(--deep)" : "rgba(100,140,200,.35)"}`,
                borderRadius: "50%",
                width: 42,
                height: 42,
                cursor: "pointer",
                fontSize: 18,
                transition: "all .3s cubic-bezier(.34,1.4,.64,1)",
                boxShadow: revealed.includes(s.id)
                  ? "0 4px 18px rgba(196,112,106,.4)"
                  : "0 2px 8px rgba(0,0,0,.1)",
                transform: revealed.includes(s.id)
                  ? "translate(-50%,-50%) scale(1.15)"
                  : "translate(-50%,-50%) scale(1)",
              }}
            >
              {s.icon}
            </button>
          ))}

          {/* Labels */}
          {SPOTS.map(
            (s) =>
              revealed.includes(s.id) && (
                <div
                  key={`lbl-${s.id}`}
                  style={{
                    position: "absolute",
                    left: `${s.loc[0]}%`,
                    top: `${s.loc[1] - 11}%`,
                    transform: "translateX(-50%)",
                    background: "var(--deep)",
                    borderRadius: 8,
                    padding: "2px 8px",
                    fontSize: 9,
                    fontWeight: 700,
                    color: "#fff",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    letterSpacing: 0.5,
                  }}
                >
                  {s.name}
                </div>
              ),
          )}
        </div>

        {/* Memory cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
            gap: 10,
            marginTop: 16,
          }}
        >
          {SPOTS.filter((s) => revealed.includes(s.id)).map((s) => (
            <div
              key={`m-${s.id}`}
              className="anim-fadeup glass-rose"
              style={{ borderRadius: 14, padding: "13px 15px" }}
            >
              <div style={{ fontSize: 18, marginBottom: 5 }}>
                {s.icon}{" "}
                <strong style={{ color: "var(--deep)", fontSize: 12 }}>
                  {s.name}
                </strong>
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--muted)",
                  lineHeight: 1.55,
                  fontStyle: "italic",
                }}
              >
                {s.memory}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p
        style={{
          textAlign: "center",
          color: "var(--rose)",
          marginTop: 16,
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        {revealed.length}/{SPOTS.length} आठवणी सापडल्या
      </p>

      {revealed.length === SPOTS.length && (
        <div
          className="anim-fadeup"
          style={{ textAlign: "center", marginTop: 18 }}
        >
          <p
            className="fc"
            style={{
              color: "var(--deep)",
              fontStyle: "italic",
              marginBottom: 14,
              fontSize: 16,
            }}
          >
            "शहराच्या प्रत्येक Corner madhi तुझ्याशी एक आठवण..."
          </p>
          <button
            onClick={onNext}
            style={{
              background: "linear-gradient(135deg,var(--sky),var(--lavender))",
              border: "none",
              color: "var(--ink)",
              padding: "13px 38px",
              borderRadius: 50,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14,
              boxShadow: "0 8px 24px rgba(168,200,232,.45)",
            }}
          >
            Chapter 5 →
          </button>
        </div>
      )}
    </div>
  );
};
