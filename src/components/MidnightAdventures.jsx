import { useEffect, useRef, useState, useCallback } from "react";
import { ChapterPill, Starfield } from "../SHAREDCOMPONENTS/Starfield";

/* ═══════════════════════════════════════════════
   CHAPTER 4 — Midnight Adventures
   "The Ride" — a scooter actually travels a glowing
   route between every stop, in order, the way the
   night really happened. Each arrival unlocks the
   memory with a flip-card + heart burst. The moon
   above fills out as the night goes on.
═══════════════════════════════════════════════ */

const SPOTS = [
  {
    id: "chaha",
    icon: "☕",
    name: "Chai Sutta",
    x: 110,
    y: 70,
    memory: "रात्री 1 वाजता Cannot वर chai. mast Night Ride enjoy करत होतीस 😄",
  },
  {
    id: "gola",
    icon: "🧊",
    name: "Gola",
    x: 300,
    y: 165,
    memory: "Orange gola ! Oragne gola Jibh orange karun dakhavt hoti 😂",
  },
  {
    id: "khasta",
    icon: "🥟",
    name: "Khasta Ragda",
    x: 95,
    y: 270,
    memory:
      "रात्री उशिरा khasta Ragda. Bike च्या step वर बसून खाण्याचा royal feel!",
  },
  {
    id: "samosarice",
    icon: "🍲",
    name: "SamosaRice",
    x: 305,
    y: 365,
    memory:
      "first night out la Samosa rice khau ghatla Ani tula avdala nahi test 😄😄😄",
  },
  {
    id: "coffee",
    icon: "🥤",
    name: "Cold Coffee",
    x: 100,
    y: 460,
    memory:
      "Midnight ला Tujhi cold coffee Ani majhi cold coffee plus Ciggrate. 2 vaje parynt bike ride 😄",
  },
  {
    id: "panipuri",
    icon: "🫧",
    name: "Panipuri",
    x: 300,
    y: 545,
    memory: "तिखट panipuri खाताना तुझा चेहरा. Lal..! अगदी priceless!",
  },
  {
    id: "juice",
    icon: "🥭",
    name: "Juice",
    x: 130,
    y: 630,
    memory:
      "Tujha Mango Shake ani majha Anjir Shake ratri 2 vajta dogh cha shop madhi",
  },
];

const VB_W = 400;
const VB_H = 700;
const MOON_PHASES = ["🌑", "🌒", "🌓", "🌔", "🌕"];

// Catmull-Rom → smooth bezier path through every stop, in order
function buildRoute(points) {
  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
  }
  return d;
}
const ROUTE_D = buildRoute(SPOTS);

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

let burstSeed = 0;

export const Chapter4 = ({ onNext, onAchieve }) => {
  const [visitedCount, setVisitedCount] = useState(0);
  const [ridingUI, setRidingUI] = useState(false);
  const [activeCard, setActiveCard] = useState(-1);
  const [bursts, setBursts] = useState([]);
  const [showFinale, setShowFinale] = useState(false);
  const [ready, setReady] = useState(false);

  const onAchRef = useRef(onAchieve);
  useEffect(() => {
    onAchRef.current = onAchieve;
  }, [onAchieve]);

  const pathRef = useRef(null);
  const bikeRef = useRef(null);
  const lengthRef = useRef(0);
  const totalLenRef = useRef(0);
  const waypointLensRef = useRef([]);
  const ridingRef = useRef(false);
  const rafRef = useRef(null);
  const reducedMotion = useRef(false);

  const positionBike = useCallback((len) => {
    const path = pathRef.current;
    if (!path) return;
    const total = totalLenRef.current;
    const pt = path.getPointAtLength(len);
    const pt2 = path.getPointAtLength(Math.min(len + 1.5, total));
    const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * (180 / Math.PI);
    if (bikeRef.current) {
      bikeRef.current.style.left = (pt.x / VB_W) * 100 + "%";
      bikeRef.current.style.top = (pt.y / VB_H) * 100 + "%";
      bikeRef.current.style.transform = `translate(-50%,-58%) rotate(${angle}deg)`;
    }
    path.style.strokeDashoffset = String(total - len);
  }, []);

  // measure the route once it's in the DOM
  useEffect(() => {
    reducedMotion.current =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    totalLenRef.current = total;
    path.style.strokeDasharray = String(total);

    const samples = 600;
    const sampled = [];
    for (let i = 0; i <= samples; i++) {
      const len = (i / samples) * total;
      const pt = path.getPointAtLength(len);
      sampled.push({ len, x: pt.x, y: pt.y });
    }
    waypointLensRef.current = SPOTS.map((s) => {
      let best = sampled[0];
      let bestDist = Infinity;
      for (const sp of sampled) {
        const dist = (sp.x - s.x) ** 2 + (sp.y - s.y) ** 2;
        if (dist < bestDist) {
          bestDist = dist;
          best = sp;
        }
      }
      return best.len;
    });

    positionBike(0);
    setReady(true);
    return () => cancelAnimationFrame(rafRef.current);
  }, [positionBike]);

  const spawnBurst = (spot) => {
    const id = burstSeed++;
    const hearts = Array.from({ length: 9 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 9 + Math.random() * 0.4;
      const dist = 26 + Math.random() * 22;
      return {
        key: `${id}-${i}`,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist - 14,
        delay: Math.random() * 0.12,
        glyph: Math.random() > 0.4 ? "💗" : "✨",
      };
    });
    setBursts((b) => [...b, { id, x: spot.x, y: spot.y, hearts }]);
    setTimeout(() => {
      setBursts((b) => b.filter((x) => x.id !== id));
    }, 1300);
  };

  const onArrive = useCallback((idx) => {
    setVisitedCount(idx + 1);
    setActiveCard(idx);
    spawnBurst(SPOTS[idx]);
    if (idx + 1 === 4) onAchRef.current("Midnight Rider 🌙", "🌙");
    if (idx + 1 === SPOTS.length) {
      setTimeout(() => setShowFinale(true), 900);
    }
  }, []);

  const rideTo = useCallback(
    (targetLen, idx) => {
      if (ridingRef.current) return;
      ridingRef.current = true;
      setRidingUI(true);
      const startLen = lengthRef.current;
      const duration = reducedMotion.current ? 1 : 1150 + Math.random() * 250;
      const startTime = performance.now();

      const step = (now) => {
        const t = Math.min(1, (now - startTime) / duration);
        const eased = easeInOutCubic(t);
        const newLen = startLen + (targetLen - startLen) * eased;
        lengthRef.current = newLen;
        positionBike(newLen);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          ridingRef.current = false;
          setRidingUI(false);
          onArrive(idx);
        }
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [positionBike, onArrive],
  );

  const handleTap = (i) => {
    if (!ready || ridingRef.current || i !== visitedCount) return;
    rideTo(waypointLensRef.current[i], i);
  };

  const moonPhase =
    MOON_PHASES[Math.min(4, Math.floor((visitedCount / SPOTS.length) * 4))];
  const pct = (v, total) => (v / total) * 100;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg,#f8f0ff 0%,#e8f0ff 50%,#f0f8ff 100%)",
        padding: "70px 16px 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes ch4-pulseRing {
          0%   { box-shadow: 0 0 0 0 rgba(196,112,106,.55); }
          70%  { box-shadow: 0 0 0 14px rgba(196,112,106,0); }
          100% { box-shadow: 0 0 0 0 rgba(196,112,106,0); }
        }
        @keyframes ch4-twinkle {
          0%,100% { opacity: .25; transform: scale(.8); }
          50%     { opacity: 1;   transform: scale(1.15); }
        }
        @keyframes ch4-cardIn {
          0%   { opacity: 0; transform: rotateX(-65deg) translateY(10px); }
          100% { opacity: 1; transform: rotateX(0deg) translateY(0); }
        }
        @keyframes ch4-burstFloat {
          0%   { opacity: 1; transform: translate(0,0) scale(.6); }
          100% { opacity: 0; transform: translate(var(--dx),var(--dy)) scale(1.1); }
        }
        @keyframes ch4-float {
          0%   { transform: translateY(0) rotate(0deg);   opacity: 0; }
          10%  { opacity: .8; }
          90%  { opacity: .8; }
          100% { transform: translateY(-90px) rotate(12deg); opacity: 0; }
        }
        @keyframes ch4-glowPulse {
          0%,100% { filter: drop-shadow(0 0 6px rgba(168,200,232,.6)); }
          50%     { filter: drop-shadow(0 0 16px rgba(196,112,106,.8)); }
        }
        @keyframes ch4-rain {
          0%   { transform: translateY(-10%) translateX(0); opacity: 0; }
          10%  { opacity: 1; }
          100% { transform: translateY(110vh) translateX(20px); opacity: 0; }
        }
        .ch4-route-glow { animation: ch4-glowPulse 2.4s ease-in-out infinite; }
        .ch4-card-enter { animation: ch4-cardIn .55s cubic-bezier(.22,1,.36,1) both; transform-style: preserve-3d; }
        .ch4-bike-idle { animation: ch4-glowPulse 2.2s ease-in-out infinite; }
        .ch4-next-pulse { animation: ch4-pulseRing 1.8s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ch4-route-glow, .ch4-card-enter, .ch4-bike-idle, .ch4-next-pulse,
          .ch4-amb-heart, .ch4-rain-drop { animation: none !important; opacity: 0 !important; }
        }
      `}</style>

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

      <div className="anim-fadeup text-center mb-7">
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
          ती रात्र, ती राईड... चल पुन्हा फिरूया 🛵{" "}
          <span style={{ opacity: 0.7 }}>
            ({ridingUI ? "राईड सुरू..." : "पुढचा थांबा टॅप कर"})
          </span>
        </p>
      </div>

      <div className="max-w-[640px] mx-auto">
        {/* progress strip */}
        <div className="flex items-center gap-3 mb-3 px-1">
          <span style={{ fontSize: 20 }}>{moonPhase}</span>
          <div className="flex-1 h-1.5 rounded-full bg-white/40 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${pct(visitedCount, SPOTS.length)}%`,
                background: "linear-gradient(90deg,var(--sky),var(--rose))",
              }}
            />
          </div>
          <span style={{ color: "var(--rose)", fontSize: 12, fontWeight: 700 }}>
            {visitedCount}/{SPOTS.length}
          </span>
        </div>

        {/* the night map */}
        <div
          className="anim-scalein relative rounded-[22px] overflow-hidden"
          style={{
            aspectRatio: `${VB_W} / ${VB_H}`,
            maxHeight: 480,
            animationDelay: ".1s",
            background:
              "radial-gradient(120% 90% at 20% 0%, #2a2860 0%, #181537 45%, #0d0b22 100%)",
            boxShadow: "0 18px 40px rgba(20,10,50,.35)",
          }}
        >
          {/* twinkles */}
          {Array.from({ length: 22 }, (_, i) => {
            const lx = (i * 47) % 100;
            const ly = (i * 31) % 100;
            return (
              <div
                key={`tw-${i}`}
                style={{
                  position: "absolute",
                  left: `${lx}%`,
                  top: `${ly}%`,
                  width: 2,
                  height: 2,
                  borderRadius: "50%",
                  background: "#fff",
                  animation: `ch4-twinkle ${2 + (i % 4)}s ease-in-out infinite`,
                  animationDelay: `${(i % 5) * 0.4}s`,
                }}
              />
            );
          })}

          {/* moon */}
          <div
            style={{
              position: "absolute",
              top: 16,
              right: 18,
              fontSize: 30,
              filter: "drop-shadow(0 0 10px rgba(255,236,180,.55))",
            }}
          >
            {moonPhase}
          </div>

          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          >
            {/* faint full route */}
            <path
              d={ROUTE_D}
              fill="none"
              stroke="rgba(255,255,255,.16)"
              strokeWidth="3"
              strokeDasharray="3 9"
              strokeLinecap="round"
            />
            {/* glowing ridden trail */}
            <path
              ref={pathRef}
              d={ROUTE_D}
              fill="none"
              stroke="url(#ch4routeGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              className="ch4-route-glow"
            />
            <defs>
              <linearGradient id="ch4routeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--sky)" />
                <stop offset="55%" stopColor="var(--lavender)" />
                <stop offset="100%" stopColor="var(--rose)" />
              </linearGradient>
            </defs>
          </svg>

          {/* burst particles */}
          {bursts.map((b) => (
            <div
              key={b.id}
              style={{
                position: "absolute",
                left: `${pct(b.x, VB_W)}%`,
                top: `${pct(b.y, VB_H)}%`,
                pointerEvents: "none",
              }}
            >
              {b.hearts.map((h) => (
                <span
                  key={h.key}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    fontSize: 13,
                    "--dx": `${h.dx}px`,
                    "--dy": `${h.dy}px`,
                    animation: `ch4-burstFloat .9s ease-out ${h.delay}s both`,
                  }}
                >
                  {h.glyph}
                </span>
              ))}
            </div>
          ))}

          {/* stop markers */}
          {SPOTS.map((s, i) => {
            const state =
              i < visitedCount
                ? "visited"
                : i === visitedCount
                  ? "next"
                  : "locked";
            return (
              <button
                key={s.id}
                onClick={() => handleTap(i)}
                disabled={state !== "next"}
                aria-label={state === "locked" ? "Locked stop" : s.name}
                className={state === "next" ? "ch4-next-pulse" : ""}
                style={{
                  position: "absolute",
                  left: `${pct(s.x, VB_W)}%`,
                  top: `${pct(s.y, VB_H)}%`,
                  transform: "translate(-50%,-50%)",
                  width: state === "next" ? 40 : 32,
                  height: state === "next" ? 40 : 32,
                  borderRadius: "50%",
                  border: "none",
                  cursor: state === "next" ? "pointer" : "default",
                  fontSize: state === "locked" ? 12 : 16,
                  transition: "all .35s cubic-bezier(.34,1.4,.64,1)",
                  background:
                    state === "visited"
                      ? "linear-gradient(135deg,var(--deep),var(--warm))"
                      : state === "next"
                        ? "rgba(255,255,255,.92)"
                        : "rgba(255,255,255,.12)",
                  color:
                    state === "locked" ? "rgba(255,255,255,.5)" : "inherit",
                  boxShadow:
                    state === "visited"
                      ? "0 4px 16px rgba(196,112,106,.5)"
                      : state === "next"
                        ? "0 0 0 4px rgba(255,255,255,.18)"
                        : "none",
                }}
              >
                {state === "locked" ? "•" : s.icon}
              </button>
            );
          })}

          {/* labels for visited + next */}
          {SPOTS.map((s, i) => {
            if (i > visitedCount) return null;
            const isNext = i === visitedCount;
            return (
              <div
                key={`lbl-${s.id}`}
                style={{
                  position: "absolute",
                  left: `${pct(s.x, VB_W)}%`,
                  top: `${pct(s.y, VB_H) - (isNext ? 7.5 : 6.5)}%`,
                  transform: "translate(-50%,-100%)",
                  background: isNext ? "rgba(255,255,255,.9)" : "var(--deep)",
                  color: isNext ? "var(--deep)" : "#fff",
                  borderRadius: 8,
                  padding: "2px 8px",
                  fontSize: 9,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  letterSpacing: 0.4,
                  opacity: isNext ? 0.95 : 1,
                }}
              >
                {isNext ? `→ ${s.name}` : s.name}
              </div>
            );
          })}

          {/* the bike */}
          <div
            ref={bikeRef}
            className="ch4-bike-idle"
            style={{
              position: "absolute",
              left: "0%",
              top: "0%",
              fontSize: 24,
              pointerEvents: "none",
              zIndex: 5,
              transition: "filter .3s",
            }}
          >
            🛵
          </div>
        </div>

        {/* memory trail */}
        <div className="grid `grid-cols-[repeat(auto-fill,minmax(240px,1fr))]` gap-2.5 mt-4">
          {SPOTS.filter((_, i) => i < visitedCount).map((s, i) => (
            <div
              key={`m-${s.id}`}
              className={`glass-rose rounded-[14px] px-4 py-3 ${
                i === activeCard ? "ch4-card-enter" : ""
              }`}
              style={{ perspective: 600 }}
            >
              <div className="text-[18px] mb-1">
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

      {/* ambient floating hearts */}
      {Array.from({ length: 7 }, (_, i) => (
        <span
          key={`amb-${i}`}
          className="ch4-amb-heart"
          style={{
            position: "absolute",
            left: `${8 + i * 13}%`,
            bottom: 0,
            fontSize: 14,
            opacity: 0,
            pointerEvents: "none",
            animation: `ch4-float ${7 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 1.3}s`,
          }}
        >
          {i % 2 ? "💗" : "✨"}
        </span>
      ))}

      {showFinale && (
        <div
          className="anim-fadeup text-center mt-7 relative"
          style={{ maxWidth: 640, margin: "28px auto 0" }}
        >
          {Array.from({ length: 14 }, (_, i) => (
            <span
              key={`rain-${i}`}
              className="ch4-rain-drop"
              style={{
                position: "fixed",
                top: -20,
                left: `${(i * 7.3) % 100}%`,
                fontSize: 12 + (i % 3) * 4,
                pointerEvents: "none",
                zIndex: 0,
                animation: `ch4-rain ${4 + (i % 4)}s linear ${i * 0.25}s infinite`,
              }}
            >
              {i % 3 ? "💗" : "🌙"}
            </span>
          ))}
          <p
            className="fc"
            style={{
              color: "var(--deep)",
              fontStyle: "italic",
              marginBottom: 14,
              fontSize: 16,
              position: "relative",
              zIndex: 1,
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
              position: "relative",
              zIndex: 1,
            }}
          >
            Chapter 5 →
          </button>
        </div>
      )}

      {!showFinale && (
        <p
          style={{
            textAlign: "center",
            color: "var(--rose)",
            marginTop: 16,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {visitedCount === 0
            ? "राईड सुरू करण्यासाठी पहिल्या थांब्यावर टॅप कर 🛵"
            : `${visitedCount}/${SPOTS.length} आठवणी सापडल्या`}
        </p>
      )}
    </div>
  );
};
