import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════
   CHAPTER 4 — Midnight Adventures
   Design: Polaroid Film Strip Scrapbook
   Every memory = a polaroid photo card you "develop"
   by scratching it. Unique reveal per spot.
═══════════════════════════════════════════════ */

const SPOTS = [
  {
    id: "chaha",
    icon: "☕",
    name: "Chai Sutta",
    time: "1:00 AM",
    color: "from-amber-900/80 to-orange-950/80",
    accent: "#f59e0b",
    polaroidBg: "bg-amber-950",
    memory:
      "रात्री 1 वाजता Cannot वर chai. तू mast Night Ride enjoy करत होतीस — आणि chai च्या वाफेत तुझं हसणं अजूनही आठवतं 😄",
    emoji: "🌫️",
  },
  {
    id: "gola",
    icon: "🧊",
    name: "Gola",
    time: "11:30 PM",
    color: "from-sky-900/80 to-blue-950/80",
    accent: "#38bdf8",
    polaroidBg: "bg-sky-950",
    memory:
      "Orange gola! तुझी jibh orange झाली होती आणि मला दाखवत होतीस — life ची best moment 😂",
    emoji: "🍊",
  },
  {
    id: "khasta",
    icon: "🥟",
    name: "Khasta Ragda",
    time: "12:30 AM",
    color: "from-yellow-900/80 to-amber-950/80",
    accent: "#eab308",
    polaroidBg: "bg-yellow-950",
    memory:
      "रात्री उशिरा khasta Ragda. Bike च्या step वर बसून खाण्याचा royal feel — फक्त तुझ्यासोबत!",
    emoji: "👑",
  },
  {
    id: "samosa",
    icon: "🍲",
    name: "Samosa Rice",
    time: "10:00 PM",
    color: "from-red-900/80 to-rose-950/80",
    accent: "#f43f5e",
    polaroidBg: "bg-red-950",
    memory:
      "First night out ला Samosa Rice खाऊ घातलं आणि तुला आवडलं नाही — तुझा तो चेहरा 😄😄😄 Priceless!",
    emoji: "😬",
  },
  {
    id: "coffee",
    icon: "🥤",
    name: "Cold Coffee",
    time: "2:00 AM",
    color: "from-purple-900/80 to-violet-950/80",
    accent: "#a855f7",
    polaroidBg: "bg-purple-950",
    memory:
      "Midnight ला तुझी cold coffee आणि माझी. Cigarette धुरात 2 वाजेपर्यंत bike ride — perfect night 😄",
    emoji: "🌙",
  },
  {
    id: "panipuri",
    icon: "🫧",
    name: "Panipuri",
    time: "9:30 PM",
    color: "from-green-900/80 to-emerald-950/80",
    accent: "#22c55e",
    polaroidBg: "bg-green-950",
    memory:
      "तिखट panipuri खाताना तुझा चेहरा लाल झाला होता — अगदी priceless! तरी थांबत नव्हतीस 😂",
    emoji: "🌶️",
  },
  {
    id: "juice",
    icon: "🍹",
    name: "Juice Corner",
    time: "1:45 AM",
    color: "from-pink-900/80 to-fuchsia-950/80",
    accent: "#ec4899",
    polaroidBg: "bg-pink-950",
    memory:
      "तुझा Mango Shake आणि माझा Anjir Shake — रात्री 2 वाजता दोघं त्या shop मध्ये. Cheers to us! 🥂",
    emoji: "🥭",
  },
];

/* ── Starfield ── */
function StarCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf;
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.01 + 0.004,
    }));
    function resize() {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);
    function draw() {
      ctx.clearRect(0, 0, c.width, c.height);
      stars.forEach((s) => {
        s.phase += s.speed;
        const a = 0.2 + 0.8 * Math.abs(Math.sin(s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,210,255,${a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

/* ── Floating hearts burst ── */
function HeartBurst({ x, y, onDone }) {
  const items = ["💜", "✨", "🌙", "💫", "🤍", "⭐"];
  useEffect(() => {
    const t = setTimeout(onDone, 1400);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          style={{
            position: "fixed",
            left: x + (Math.random() - 0.5) * 60,
            top: y,
            fontSize: 20,
            pointerEvents: "none",
            zIndex: 9999,
            animation: `burstUp${i % 3} 1.2s ease-out forwards`,
            animationDelay: `${i * 80}ms`,
            opacity: 0,
          }}
        >
          {items[i % items.length]}
        </span>
      ))}
    </>
  );
}

/* ── Scratch-to-Reveal Polaroid ── */
function PolaroidCard({ spot, onReveal, revealed }) {
  const canvasRef = useRef(null);
  const [scratched, setScratched] = useState(false);
  const [scratchPct, setScratchPct] = useState(0);
  const isDrawing = useRef(false);

  useEffect(() => {
    if (revealed) {
      setScratched(true);
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    // Fill with silver scratch layer
    ctx.fillStyle = "#1e1533";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Scratchy texture pattern
    for (let i = 0; i < 300; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.random() * 8 - 4, y + Math.random() * 4 - 2);
      ctx.strokeStyle = `rgba(255,255,255,${Math.random() * 0.06})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Hint text
    ctx.font = "bold 13px sans-serif";
    ctx.fillStyle = "rgba(200,180,255,0.5)";
    ctx.textAlign = "center";
    ctx.fillText("✦ Scratch to reveal ✦", canvas.width / 2, canvas.height / 2);
  }, [revealed]);

  function getPos(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return {
      x: ((src.clientX - rect.left) / rect.width) * canvas.width,
      y: ((src.clientY - rect.top) / rect.height) * canvas.height,
    };
  }

  function scratch(e) {
    if (scratched) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { x, y } = getPos(e, canvas);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Check coverage
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] === 0) cleared++;
    }
    const pct = (cleared / (canvas.width * canvas.height)) * 100;
    setScratchPct(Math.round(pct));
    if (pct > 45) {
      setScratched(true);
      onReveal();
    }
  }

  return (
    <div
      className="relative"
      style={{
        width: "100%",
        aspectRatio: "3/4",
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      {/* Memory content underneath */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${spot.color} flex flex-col items-center justify-center p-4 text-center`}
      >
        <div style={{ fontSize: 38 }}>{spot.icon}</div>
        <div style={{ fontSize: 28 }}>{spot.emoji}</div>
        <p
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.6,
            marginTop: 10,
            fontStyle: "italic",
          }}
        >
          {spot.memory}
        </p>
      </div>

      {/* Scratch overlay canvas */}
      {!scratched && (
        <canvas
          ref={canvasRef}
          width={240}
          height={320}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            touchAction: "none",
            cursor: "crosshair",
            borderRadius: 4,
          }}
          onMouseDown={(e) => {
            isDrawing.current = true;
            scratch(e);
          }}
          onMouseMove={(e) => {
            if (isDrawing.current) scratch(e);
          }}
          onMouseUp={() => (isDrawing.current = false)}
          onTouchStart={scratch}
          onTouchMove={scratch}
        />
      )}

      {/* Scratch progress hint */}
      {!scratched && scratchPct > 5 && scratchPct < 45 && (
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.6)",
            borderRadius: 20,
            padding: "2px 10px",
            fontSize: 10,
            color: "rgba(255,255,255,0.7)",
            pointerEvents: "none",
          }}
        >
          {scratchPct}% scratched
        </div>
      )}
    </div>
  );
}

/* ── Main Chapter 4 ── */
export const Chapter4 = ({ onNext, onAchieve }) => {
  const [revealed, setRevealed] = useState([]);
  const [bursts, setBursts] = useState([]);
  const [activeIdx, setActiveIdx] = useState(null);
  const [filmPos, setFilmPos] = useState(0);
  const onAchRef = useRef(onAchieve);
  const stripRef = useRef(null);
  useEffect(() => {
    onAchRef.current = onAchieve;
  }, [onAchieve]);

  const reveal = (id, e) => {
    if (revealed.includes(id)) return;
    const next = [...revealed, id];
    setRevealed(next);
    if (next.length === 4) onAchRef.current?.("Midnight Rider 🌙", "🌙");

    // Burst at tap position
    const rect = e?.currentTarget?.getBoundingClientRect?.();
    if (rect) {
      const bid = Date.now();
      setBursts((b) => [
        ...b,
        {
          id: bid,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        },
      ]);
    }
  };

  const removeBurst = (id) => setBursts((b) => b.filter((x) => x.id !== id));

  // Film strip scroll controls
  const scroll = (dir) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 230, behavior: "smooth" });
  };

  const allDone = revealed.length === SPOTS.length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg,#06030f 0%,#0d0620 50%,#090415 100%)",
        paddingBottom: 60,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <StarCanvas />

      {/* Burst hearts */}
      {bursts.map((b) => (
        <HeartBurst
          key={b.id}
          x={b.x}
          y={b.y}
          onDone={() => removeBurst(b.id)}
        />
      ))}

      {/* Keyframes injected globally */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,500&family=Inter:wght@400;500;600&display=swap');
        @keyframes burstUp0 { 0%{opacity:0;transform:translateY(0) scale(.5)} 20%{opacity:1} 100%{opacity:0;transform:translateY(-90px) scale(1)} }
        @keyframes burstUp1 { 0%{opacity:0;transform:translateY(0) scale(.5) rotate(-15deg)} 20%{opacity:1} 100%{opacity:0;transform:translateY(-120px) scale(1.1) rotate(10deg)} }
        @keyframes burstUp2 { 0%{opacity:0;transform:translateY(0) scale(.5) rotate(15deg)} 20%{opacity:1} 100%{opacity:0;transform:translateY(-70px) scale(.9) rotate(-10deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%,100%{opacity:.4} 50%{opacity:1} }
        @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes filmSlide { from{transform:translateX(0)} to{transform:translateX(-10px)} }
        .ch4-playfair { font-family:'Playfair Display',serif; }
        .ch4-inter { font-family:'Inter',sans-serif; }
        .polaroid-wrap {
          flex-shrink: 0;
          width: 200px;
          background: #0e0920;
          border: 1px solid rgba(180,100,255,0.18);
          border-radius: 6px;
          padding: 10px 10px 36px;
          position: relative;
          transition: transform .3s ease, box-shadow .3s ease;
          cursor: pointer;
          animation: fadeUp .5s ease forwards;
        }
        .polaroid-wrap:hover {
          transform: translateY(-6px) rotate(0deg) !important;
          box-shadow: 0 20px 50px rgba(180,100,255,0.25) !important;
        }
        .polaroid-revealed {
          box-shadow: 0 8px 30px rgba(180,100,255,0.2);
        }
        .film-hole {
          width: 12px; height: 12px;
          border-radius: 2px;
          background: #06030f;
          border: 1px solid rgba(255,255,255,0.08);
          flex-shrink: 0;
        }
        .film-strip-scroll::-webkit-scrollbar { display:none; }
        .film-strip-scroll { scrollbar-width:none; }
      `}</style>

      {/* ── HERO ── */}
      <div
        className="ch4-inter"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "56px 20px 20px",
          animation: "fadeUp .6s ease forwards",
        }}
      >
        {/* Rotating moon glyph */}
        <div
          style={{
            width: 56,
            height: 56,
            margin: "0 auto 16px",
            borderRadius: "50%",
            border: "1px solid rgba(180,100,255,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            background: "rgba(100,50,180,0.12)",
            animation: "shimmer 3s ease-in-out infinite",
          }}
        >
          🌙
        </div>

        {/* Chapter pill */}
        <div
          style={{
            display: "inline-block",
            border: "1px solid rgba(200,130,255,0.35)",
            borderRadius: 40,
            padding: "3px 16px",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: 3,
            color: "rgba(200,140,255,0.8)",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          Chapter 04
        </div>

        <h1
          className="ch4-playfair"
          style={{
            fontSize: "clamp(30px,8vw,58px)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.1,
            marginBottom: 10,
          }}
        >
          Midnight
          <br />
          <span style={{ color: "#d8a4ff", fontStyle: "italic" }}>
            Adventures
          </span>
        </h1>

        <p
          style={{
            fontSize: 13,
            color: "rgba(210,180,255,0.55)",
            fontStyle: "italic",
            letterSpacing: 0.3,
            maxWidth: 300,
            margin: "0 auto",
          }}
        >
          तू होती म्हणून रात्र सुंदर होती, Shreya 🌙
        </p>
      </div>

      {/* ── FILM STRIP INSTRUCTION ── */}
      <div
        style={{
          textAlign: "center",
          marginTop: 6,
          marginBottom: 20,
          position: "relative",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "rgba(200,170,255,0.4)",
            letterSpacing: 1,
            animation: "shimmer 2.5s ease-in-out infinite",
          }}
        >
          ✦ प्रत्येक polaroid scratch करून memory reveal कर ✦
        </span>
      </div>

      {/* ── FILM STRIP ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          marginBottom: 16,
        }}
      >
        {/* Film top perforations */}
        <div
          style={{
            display: "flex",
            gap: 10,
            padding: "0 20px",
            marginBottom: 6,
            alignItems: "center",
            overflowX: "hidden",
          }}
        >
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i} className="film-hole" />
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => scroll(-1)}
          style={{
            position: "absolute",
            left: 4,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            background: "rgba(100,50,180,0.4)",
            border: "1px solid rgba(200,130,255,0.3)",
            borderRadius: "50%",
            width: 36,
            height: 36,
            cursor: "pointer",
            color: "#d8a4ff",
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ‹
        </button>
        <button
          onClick={() => scroll(1)}
          style={{
            position: "absolute",
            right: 4,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            background: "rgba(100,50,180,0.4)",
            border: "1px solid rgba(200,130,255,0.3)",
            borderRadius: "50%",
            width: 36,
            height: 36,
            cursor: "pointer",
            color: "#d8a4ff",
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ›
        </button>

        {/* Scrollable polaroid strip */}
        <div
          ref={stripRef}
          className="film-strip-scroll"
          style={{
            display: "flex",
            gap: 14,
            overflowX: "auto",
            padding: "8px 44px",
            scrollSnapType: "x mandatory",
          }}
        >
          {SPOTS.map((s, i) => {
            const isRevealed = revealed.includes(s.id);
            const rotation = (i % 2 === 0 ? 1 : -1) * (1 + (i % 3));
            return (
              <div
                key={s.id}
                className={`polaroid-wrap ${isRevealed ? "polaroid-revealed" : ""}`}
                style={{
                  transform: `rotate(${isRevealed ? 0 : rotation}deg)`,
                  scrollSnapAlign: "start",
                  animationDelay: `${i * 0.06}s`,
                  opacity: 0,
                  animationFillMode: "forwards",
                }}
              >
                {/* Photo area */}
                <PolaroidCard
                  spot={s}
                  revealed={isRevealed}
                  onReveal={() =>
                    reveal(s.id, {
                      currentTarget: {
                        getBoundingClientRect: () => ({
                          left: 200 + i * 220,
                          top: 300,
                          width: 200,
                          height: 260,
                        }),
                      },
                    })
                  }
                />

                {/* Polaroid caption strip */}
                <div
                  style={{
                    marginTop: 10,
                    textAlign: "center",
                    padding: "0 4px",
                  }}
                >
                  <div
                    className="ch4-playfair"
                    style={{
                      fontSize: 13,
                      fontStyle: "italic",
                      color: isRevealed ? "#d8a4ff" : "rgba(200,180,255,0.35)",
                      fontWeight: 500,
                      transition: "color .4s",
                    }}
                  >
                    {s.name}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(200,180,255,0.3)",
                      marginTop: 2,
                      letterSpacing: 0.5,
                    }}
                  >
                    {s.time}
                  </div>

                  {/* Dot indicator */}
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: isRevealed
                        ? s.accent
                        : "rgba(200,180,255,0.15)",
                      margin: "6px auto 0",
                      boxShadow: isRevealed ? `0 0 10px ${s.accent}` : "none",
                      transition: "all .4s ease",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Film bottom perforations */}
        <div
          style={{
            display: "flex",
            gap: 10,
            padding: "0 20px",
            marginTop: 6,
            overflowX: "hidden",
          }}
        >
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i} className="film-hole" />
          ))}
        </div>
      </div>

      {/* ── PROGRESS BAR ── */}
      <div
        style={{
          maxWidth: 440,
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: "rgba(200,180,255,0.45)",
              letterSpacing: 0.5,
            }}
          >
            आठवणी developed
          </span>
          <span style={{ fontSize: 11, color: "#d8a4ff", fontWeight: 600 }}>
            {revealed.length} / {SPOTS.length}
          </span>
        </div>

        {/* Track */}
        <div
          style={{
            height: 4,
            borderRadius: 4,
            background: "rgba(180,100,255,0.12)",
            border: "1px solid rgba(180,100,255,0.15)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: 4,
              background: "linear-gradient(90deg,#7b2fbe,#d8a4ff)",
              width: `${(revealed.length / SPOTS.length) * 100}%`,
              transition: "width .6s cubic-bezier(.34,1.2,.64,1)",
              boxShadow: "0 0 12px rgba(200,130,255,0.5)",
            }}
          />
        </div>

        {/* Spot pips */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          {SPOTS.map((s) => (
            <div
              key={s.id}
              title={s.name}
              style={{
                fontSize: revealed.includes(s.id) ? 16 : 11,
                transition: "font-size .3s ease, filter .3s ease",
                filter: revealed.includes(s.id)
                  ? "drop-shadow(0 0 6px rgba(200,130,255,0.8))"
                  : "grayscale(1) opacity(0.3)",
              }}
            >
              {revealed.includes(s.id) ? s.icon : "○"}
            </div>
          ))}
        </div>
      </div>

      {/* ── LOVE QUOTE ON FULL REVEAL ── */}
      {allDone && (
        <div
          style={{
            maxWidth: 500,
            margin: "32px auto 0",
            padding: "0 20px",
            position: "relative",
            zIndex: 2,
            animation: "fadeUp .7s ease forwards",
            textAlign: "center",
          }}
        >
          {/* Decorative top line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background:
                  "linear-gradient(90deg,transparent,rgba(200,130,255,0.4))",
              }}
            />
            <span style={{ fontSize: 18 }}>💜</span>
            <div
              style={{
                flex: 1,
                height: 1,
                background:
                  "linear-gradient(90deg,rgba(200,130,255,0.4),transparent)",
              }}
            />
          </div>

          {/* Quote card */}
          <div
            style={{
              background:
                "linear-gradient(145deg,rgba(120,50,180,0.15),rgba(60,20,100,0.2))",
              border: "1px solid rgba(200,130,255,0.25)",
              borderRadius: 20,
              padding: "28px 24px 24px",
              marginBottom: 20,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Shimmer top border */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "10%",
                right: "10%",
                height: 1,
                background:
                  "linear-gradient(90deg,transparent,#d8a4ff,transparent)",
              }}
            />

            <div style={{ fontSize: 28, marginBottom: 14 }}>🌙 💜 🌙</div>

            <p
              className="ch4-playfair"
              style={{
                fontSize: 16,
                fontStyle: "italic",
                color: "rgba(230,210,255,0.92)",
                lineHeight: 1.75,
                marginBottom: 16,
              }}
            >
              "शहराच्या प्रत्येक corner मध्ये
              <br />
              तुझ्याशी एक आठवण आहे, Janvi...
              <br />
              रात्र असो वा दिवस,
              <br />
              तुझ्यासोबत सगळं perfect वाटतं."
            </p>

            <div
              style={{
                fontSize: 11,
                color: "rgba(200,160,255,0.45)",
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              — तुझ्यासाठी, नेहमी 🤍
            </div>
          </div>

          {/* Next chapter button */}
          <button
            onClick={onNext}
            style={{
              background: "linear-gradient(135deg,#7b2fbe,#c97fe8)",
              border: "none",
              color: "#fff",
              padding: "15px 44px",
              borderRadius: 50,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: 0.5,
              boxShadow: "0 10px 36px rgba(180,100,220,0.45)",
              transition: "all .3s ease",
              fontFamily: "Inter,sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow =
                "0 16px 48px rgba(180,100,220,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 10px 36px rgba(180,100,220,0.45)";
            }}
          >
            Chapter 5 → ✨
          </button>
        </div>
      )}
    </div>
  );
};
