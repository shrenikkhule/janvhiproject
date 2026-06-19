import { useState, useEffect, useRef, useCallback } from "react";
import { Flynn, Rapunzel } from "../games/HandWave";
const TANGLED_TASKS = [
  { id: "wave", label: "Wave hello", icon: "👋", btn: "Wave hello" },
  { id: "smile", label: "Share a smile", icon: "😊", btn: "Share a smile" },
  { id: "closer", label: "Lean closer", icon: "🌹", btn: "Lean closer" },
  { id: "hold", label: "Hold tight", icon: "🤗", btn: "Hold tight" },
];

const TANGLED_HINTS = {
  wave: "Shrenik waves from the bridge! ✨",
  smile: "Janvhi smiles back! 🌸",
  closer: "They lean in closer... 🌹",
  hold: "Wrapped in a hug! 🤗",
};

const rnd = (a, b) => Math.random() * (b - a) + a;

const STARS = Array.from({ length: 140 }, (_, i) => ({
  id: i,
  x: rnd(0, 100),
  y: rnd(0, 65),
  r: rnd(0.3, 2.1),
  dur: rnd(2, 5),
  delay: rnd(0, 6),
  purple: rnd(0, 1) > 0.6,
}));

const FLIES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: rnd(10, 88),
  y: rnd(38, 72),
  dur: rnd(3, 6),
  delay: rnd(0, 5),
}));

const HEART_EMOJIS = ["💕", "💗", "💋", "🌸", "✨", "💖", "💗"];

function useIntersection(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.12, rootMargin: "-40px" },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Glossy SVG sticker hearts ── */
function StickerHeart({
  x,
  y,
  size = 32,
  color = "#ff6b9d",
  rotate = 0,
  delay = 0,
}) {
  return (
    <svg
      className="absolute pointer-events-none animate-[stickerBob_3s_ease-in-out_infinite]"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        rotate: `${rotate}deg`,
        animationDelay: `${delay}s`,
      }}
      viewBox="0 0 48 48"
    >
      <defs>
        <linearGradient id={`hg-${x}-${y}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#ff9ec8" />
        </linearGradient>
        <filter id={`glow-${x}-${y}`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M24 42 C24 42 4 28 4 16 C4 8 10 4 16 4 C20 4 22 8 24 12 C26 8 28 4 32 4 C38 4 44 8 44 16 C44 28 24 42 24 42Z"
        fill={`url(#hg-${x}-${y})`}
        filter={`url(#glow-${x}-${y})`}
        stroke="white"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <ellipse
        cx="14"
        cy="14"
        rx="5"
        ry="3"
        fill="white"
        opacity="0.45"
        transform="rotate(-25 14 14)"
      />
    </svg>
  );
}

/* ── Kiss mark sticker ── */
function KissSticker({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" width="64" height="64">
      <circle cx="32" cy="32" r="30" fill="#ff4d8a" opacity="0.15" />
      <path
        d="M32 18 C28 14 18 16 18 26 C18 36 32 48 32 48 C32 48 46 36 46 26 C46 16 36 14 32 18Z"
        fill="#ff5a9a"
        stroke="#fff"
        strokeWidth="2"
        strokeOpacity="0.6"
      />
      <text
        x="32"
        y="38"
        textAnchor="middle"
        fontSize="14"
        fill="white"
        opacity="0.9"
      >
        mwah
      </text>
    </svg>
  );
}

/* ── Tangled lantern sticker ── */
function LanternSticker({ className = "", glow = false }) {
  return (
    <svg className={className} viewBox="0 0 28 40" width="28" height="40">
      <rect
        x="8"
        y="6"
        width="12"
        height="22"
        rx="5"
        fill="#f9b84a"
        opacity={glow ? 1 : 0.85}
      />
      <rect x="6" y="4" width="16" height="5" rx="2.5" fill="#c07810" />
      <rect x="6" y="26" width="16" height="5" rx="2.5" fill="#c07810" />
      <line x1="14" y1="0" x2="14" y2="4" stroke="#a06010" strokeWidth="1.5" />
      <line
        x1="14"
        y1="31"
        x2="14"
        y2="38"
        stroke="#a06010"
        strokeWidth="1.5"
      />
      {glow && (
        <ellipse cx="14" cy="17" rx="22" ry="14" fill="rgba(249,184,74,0.25)" />
      )}
    </svg>
  );
}

/* ── Floating Tangled lanterns ── */
function FloatingLanterns({ active }) {
  const lanterns = [
    { x: 6, y: 14, delay: 0, dur: 9 },
    { x: 18, y: 8, delay: 1.2, dur: 11 },
    { x: 78, y: 10, delay: 0.6, dur: 10 },
    { x: 88, y: 18, delay: 2, dur: 12 },
    { x: 42, y: 6, delay: 0.3, dur: 8 },
  ];
  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {lanterns.map((l, i) => (
        <div
          key={i}
          className="absolute transition-opacity duration-[1.2s]"
          style={{
            left: `${l.x}%`,
            top: `${l.y}%`,
            opacity: active ? 0.9 : 0.35,
            animation: `lanternFloat ${l.dur}s ease-in-out infinite alternate`,
            animationDelay: `${l.delay}s`,
          }}
        >
          <LanternSticker glow={active} />
        </div>
      ))}
    </div>
  );
}

/* ── Soft aurora — Tangled purple & gold ── */
function AuroraSky() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      <div className="absolute -top-20 left-[10%] w-[45%] h-48 rounded-full bg-purple-700/25 blur-[80px] animate-[auroraDrift_12s_ease-in-out_infinite]" />
      <div className="absolute top-10 right-[5%] w-[38%] h-40 rounded-full bg-amber-400/12 blur-[70px] animate-[auroraDrift_14s_ease-in-out_infinite_reverse]" />
      <div className="absolute top-32 left-[35%] w-[30%] h-32 rounded-full bg-fuchsia-600/15 blur-[60px] animate-[auroraDrift_10s_ease-in-out_infinite_1s]" />
      <StickerHeart
        x={8}
        y={12}
        size={28}
        color="#c084fc"
        rotate={-12}
        delay={0}
      />
      <StickerHeart
        x={82}
        y={8}
        size={24}
        color="#f472b6"
        rotate={18}
        delay={0.8}
      />
      <StickerHeart
        x={72}
        y={22}
        size={20}
        color="#a78bfa"
        rotate={-8}
        delay={1.4}
      />
    </div>
  );
}

/* ── Cartoon bridge scene with smooth chibi couple ── */
function BridgeScene() {
  return (
    <div>
      <svg
        className="fixed bottom-0 left-0 right-0 w-full h-[52%] z-[3] pointer-events-none"
        viewBox="0 0 1400 520"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#141e3a" />
            <stop offset="100%" stopColor="#080f1e" />
          </linearGradient>
          <linearGradient id="lampGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,220,120,0.45)" />
            <stop offset="100%" stopColor="rgba(255,220,120,0)" />
          </linearGradient>
          <linearGradient id="skinHim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd4b8" />
            <stop offset="100%" stopColor="#e8b090" />
          </linearGradient>
          <linearGradient id="skinHer" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffe8d8" />
            <stop offset="100%" stopColor="#f0c8a8" />
          </linearGradient>
          <linearGradient id="jacket" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5b7fd4" />
            <stop offset="100%" stopColor="#3d5a9e" />
          </linearGradient>
          <linearGradient id="dress" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff5a9a" />
            <stop offset="100%" stopColor="#d83070" />
          </linearGradient>
          <filter id="softShadow">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="6"
              floodColor="#000"
              floodOpacity="0.35"
            />
          </filter>
        </defs>
        {/* Water with ripples */}
        <rect x="0" y="370" width="1400" height="150" fill="url(#water)" />
        {[700, 400, 1000, 250, 1150].map((cx, i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={400 + i * 5}
            rx={140 - i * 15}
            ry={10 - i}
            fill={`rgba(120,150,220,${0.06 + i * 0.01})`}
          >
            <animate
              attributeName="rx"
              values={`${140 - i * 15};${150 - i * 15};${140 - i * 15}`}
              dur={`${3 + i}s`}
              repeatCount="indefinite"
            />
          </ellipse>
        ))}
        {/* Bridge — rounded cartoon planks */}
        <rect x="0" y="355" width="1400" height="22" rx="6" fill="#2a3558" />
        <rect x="0" y="362" width="1400" height="8" rx="3" fill="#354268" />
        {Array.from({ length: 20 }, (_, i) => (
          <rect
            key={i}
            x={i * 74 + 10}
            y="318"
            width="6"
            height="46"
            rx="3"
            fill="#3a4a70"
            opacity="0.9"
          />
        ))}
        {/* Lamp posts — warm cartoon style */}
        {[
          { x: 222, arm: "M222 220 Q222 188 248 182", cx: 248 },
          { x: 1176, arm: "M1176 220 Q1176 188 1150 182", cx: 1150 },
          { x: 551, arm: "M551 240 Q551 212 572 206", cx: 572 },
          { x: 851, arm: "M851 240 Q851 212 830 206", cx: 830 },
        ].map((lamp, i) => (
          <g key={i}>
            <rect
              x={lamp.x - 4}
              y={i < 2 ? 220 : 240}
              width="8"
              height={i < 2 ? 140 : 120}
              rx="4"
              fill="#4a5078"
            />
            <path
              d={lamp.arm}
              stroke="#4a5078"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse
              cx={lamp.cx}
              cy={i < 2 ? 180 : 204}
              rx="14"
              ry="7"
              fill="#f0e8d0"
            />
            <ellipse
              cx={lamp.cx}
              cy={i < 2 ? 178 : 202}
              rx="11"
              ry="4.5"
              fill="#fff8c8"
            />
            <ellipse
              cx={lamp.cx}
              cy={i < 2 ? 210 : 230}
              rx="40"
              ry="14"
              fill="url(#lampGlow)"
              opacity="0.85"
            >
              <animate
                attributeName="opacity"
                values="0.7;1;0.7"
                dur="3s"
                repeatCount="indefinite"
                begin={`${i * 0.5}s`}
              />
            </ellipse>
          </g>
        ))}
        {/* Scooter — smooth rounded cartoon */}
        <g transform="translate(600, 258)" filter="url(#softShadow)">
          <ellipse cx="70" cy="88" rx="90" ry="10" fill="rgba(0,0,0,0.2)" />
          <path
            d="M20 72 Q20 40 55 32 L95 28 Q130 26 140 50 L148 68 Q155 78 140 82 L60 84 Q30 84 20 72Z"
            fill="#ff6b8a"
            stroke="#fff"
            strokeWidth="2"
            strokeOpacity="0.3"
          />
          <path
            d="M55 32 L95 28 L100 48 L58 50Z"
            fill="#ff8aaa"
            opacity="0.6"
          />
          <circle
            cx="38"
            cy="78"
            r="26"
            fill="none"
            stroke="#3d4a70"
            strokeWidth="5"
          />
          <circle cx="38" cy="78" r="8" fill="#5a6890" />
          <circle
            cx="128"
            cy="78"
            r="26"
            fill="none"
            stroke="#3d4a70"
            strokeWidth="5"
          />
          <circle cx="128" cy="78" r="8" fill="#5a6890" />
          <path
            d="M95 28 L110 8 Q118 4 128 12 L135 28"
            fill="none"
            stroke="#4a5888"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <ellipse cx="118" cy="10" rx="14" ry="5" fill="#5a6890" />
        </g>
      </svg>
      {/* <img
        className="h-100 w-100"
        src="data:image/jpeg;base64,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"
        alt=""
      /> */}
    </div>
  );
}

/* ── Interactive Janvhi & Shrenik mission ── */
function TangledMissionSection({ onKissComplete }) {
  const [done, setDone] = useState(new Set());
  const [kissed, setKissed] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [hint, setHint] = useState(
    "Complete each step — then Shrenik & Janvhi kiss 💫",
  );
  const heartIdRef = useRef(0);
  const hintTimerRef = useRef(null);
  const ref = useRef(null);
  const visible = useIntersection(ref);

  const tasksDone = done.size;
  const allDone = tasksDone === TANGLED_TASKS.length;
  const gapMap = { 0: 48, 1: 30, 2: 14, 3: 6 };
  const gap = kissed ? 2 : (gapMap[Math.min(tasksDone, 3)] ?? 48);

  const spawnHearts = useCallback((n = 10) => {
    const newH = Array.from({ length: n }, (_, i) => ({
      id: heartIdRef.current++,
      emoji: HEART_EMOJIS[(heartIdRef.current + i) % HEART_EMOJIS.length],
      left: `${12 + Math.random() * 76}%`,
      size: 14 + Math.random() * 14,
      delay: i * 0.12,
      dur: 1.2 + Math.random() * 0.8,
    }));
    setHearts((prev) => [...prev, ...newH]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newH.find((n) => n.id === h.id)));
    }, 2800);
  }, []);

  const doTask = useCallback((id) => {
    setDone((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set([...prev, id]);
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
      setHint(TANGLED_HINTS[id] || "");
      hintTimerRef.current = setTimeout(() => {
        const remaining = TANGLED_TASKS.find((t) => !next.has(t.id));
        setHint(
          remaining
            ? `Next: ${remaining.btn} — or tap the characters ✨`
            : "All steps done — tap 💋 Kiss! or the characters",
        );
      }, 2200);
      return next;
    });
  }, []);

  const doKiss = useCallback(() => {
    if (!allDone || kissed) return;
    setKissed(true);
    spawnHearts(14);
    setHint("✨ Shrenik & Janvhi — lip to lip, just like that night ✨");
    onKissComplete?.();
    setTimeout(() => spawnHearts(10), 1800);
    setTimeout(() => spawnHearts(8), 3400);
  }, [allDone, kissed, spawnHearts, onKissComplete]);

  const charClick = useCallback(() => {
    const next = TANGLED_TASKS.find((t) => !done.has(t.id));
    if (!next) {
      doKiss();
      return;
    }
    doTask(next.id);
  }, [done, doTask, doKiss]);

  const resetAll = useCallback(() => {
    setDone(new Set());
    setKissed(false);
    setHearts([]);
    setHint("Complete each step — then Shrenik & Janvhi kiss 💫");
  }, []);

  useEffect(
    () => () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    },
    [],
  );

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[520px] mb-14 rounded-3xl overflow-hidden border border-amber-400/25 bg-[linear-gradient(160deg,rgba(90,30,100,0.35)_0%,rgba(20,10,40,0.5)_50%,rgba(60,25,80,0.3)_100%)] backdrop-blur-xl"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(28px) scale(0.97)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
      }}
    >
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
      <div className="absolute -top-3 left-6">
        <LanternSticker className="w-7 h-10 opacity-80" />
      </div>
      <div className="absolute -top-3 right-6 scale-x-[-1]">
        <LanternSticker className="w-7 h-10 opacity-80" />
      </div>

      <div className="px-6 pt-8 pb-6">
        <p className="font-[DM_Sans,sans-serif] text-[10px] tracking-[3.5px] uppercase text-amber-300/70 text-center mb-1">
          ✦ Tangled Moment ✦
        </p>
        <h3 className="font-[Playfair_Display,serif] text-[clamp(20px,4vw,26px)] font-bold text-[#ffe8c8] text-center mb-1">
          Shrenik & Janvhi
        </h3>
        <p className="font-[Cormorant_Garamond,serif] text-sm italic text-[rgba(255,220,180,0.55)] text-center mb-5">
          Wave · Smile · Lean · Hug · Kiss
        </p>

        {/* Task pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {TANGLED_TASKS.map((t) => {
            const isDone = done.has(t.id);
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => doTask(t.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-[DM_Sans,sans-serif] tracking-wide transition-all duration-300 ${
                  isDone
                    ? "border border-amber-300/40 bg-amber-400/15 text-amber-200 cursor-default"
                    : "border border-white/15 bg-white/[0.06] text-white/55 hover:border-amber-300/35 hover:bg-amber-400/10 cursor-pointer"
                }`}
              >
                <span
                  className={`text-sm inline-block transition-transform ${isDone ? "scale-125" : ""}`}
                >
                  {isDone ? "✓" : t.icon}
                </span>
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-5 px-1">
          <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-[width] duration-700 ease-out"
              style={{
                width: `${(tasksDone / TANGLED_TASKS.length) * 100}%`,
                background: kissed
                  ? "linear-gradient(90deg, #f9b84a, #f97ba1)"
                  : "linear-gradient(90deg, #c06090, #f9b84a)",
              }}
            />
          </div>
          <span className="text-[11px] text-white/35 font-[DM_Sans,sans-serif] whitespace-nowrap">
            {tasksDone}/{TANGLED_TASKS.length}
          </span>
        </div>

        {/* Character stage */}
        <div className="relative flex justify-center items-end min-h-[260px] rounded-2xl bg-[linear-gradient(180deg,rgba(10,5,25,0.4)_0%,rgba(30,15,50,0.25)_100%)] border border-purple-500/15 overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1a0d30]/80 to-transparent pointer-events-none" />

          {/* Bridge bench */}
          <svg
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[1]"
            width="240"
            height="55"
            viewBox="0 0 240 55"
          >
            <rect x="8" y="10" width="224" height="14" rx="5" fill="#2a1848" />
            <rect x="8" y="10" width="224" height="5" rx="2" fill="#3a2860" />
            <rect x="20" y="24" width="10" height="28" rx="4" fill="#2a1848" />
            <rect x="210" y="24" width="10" height="28" rx="4" fill="#2a1848" />
          </svg>

          <div
            className="relative z-10 flex items-end transition-[gap] duration-700 ease-out pb-2"
            style={{ gap }}
          >
            <Flynn kissed={kissed} tasksDone={tasksDone} onClick={charClick} />
            <Rapunzel
              kissed={kissed}
              tasksDone={tasksDone}
              onClick={charClick}
            />
          </div>

          {/* Section hearts */}
          {hearts.map((h) => (
            <div
              key={h.id}
              className="absolute bottom-8 pointer-events-none animate-[missionHeart_ease-out_forwards]"
              style={{
                left: h.left,
                fontSize: h.size,
                animationDelay: `${h.delay}s`,
                animationDuration: `${h.dur}s`,
              }}
            >
              {h.emoji}
            </div>
          ))}

          {kissed && (
            <div className="absolute top-3 inset-x-0 flex justify-center gap-1 animate-[kissSparkle_2s_ease-in-out_infinite]">
              {["✨", "💋", "✨"].map((s, i) => (
                <span key={i} className="text-sm">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>

        <p className="text-center text-xs text-white/30 font-[DM_Sans,sans-serif] mt-3 min-h-[18px] transition-opacity">
          {hint}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {TANGLED_TASKS.map((t) => (
            <button
              key={`btn-${t.id}`}
              type="button"
              onClick={() => doTask(t.id)}
              disabled={done.has(t.id)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-[DM_Sans,sans-serif] border transition-all ${
                done.has(t.id)
                  ? "border-white/10 bg-white/[0.03] text-white/25 cursor-not-allowed opacity-40"
                  : "border-white/15 bg-white/[0.07] text-white/65 hover:border-amber-300/40 hover:bg-amber-400/10 cursor-pointer"
              }`}
            >
              {t.btn}
            </button>
          ))}
          <button
            type="button"
            onClick={doKiss}
            disabled={!allDone || kissed}
            className={`px-5 py-2 rounded-full text-sm font-medium font-[DM_Sans,sans-serif] transition-all ${
              allDone && !kissed
                ? "bg-[#f97ba1] text-white border-none animate-[kissBtnGlow_2s_ease-in-out_infinite] cursor-pointer"
                : "bg-[rgba(249,123,161,0.2)] text-white/30 cursor-not-allowed"
            }`}
          >
            💋 Kiss!
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="px-3.5 py-1.5 rounded-full text-xs font-[DM_Sans,sans-serif] border border-white/10 bg-white/[0.04] text-white/40 hover:text-white/60 cursor-pointer transition-colors"
          >
            ↺ Reset
          </button>
        </div>

        {kissed && (
          <p className="font-[Playfair_Display,serif] text-center text-[#ffcce0] text-sm italic mt-4 animate-[breathe_3s_ease-in-out_infinite] tracking-wide">
            ✨ A kiss under the lantern light — just like us ✨
          </p>
        )}
      </div>

      <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
    </div>
  );
}

function StoryBlock({
  eyebrow,
  headline,
  body,
  accent = "#8860e0",
  align = "left",
  delay = 0,
}) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  const alignClass =
    align === "center"
      ? "items-center text-center"
      : align === "right"
        ? "items-end text-right"
        : "items-start text-left";

  return (
    <div
      ref={ref}
      className={`w-full max-w-[520px] mb-14 flex flex-col ${alignClass}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
      }}
    >
      <div
        className={`flex items-center gap-2.5 mb-2.5 ${align === "right" ? "flex-row-reverse" : ""}`}
      >
        {align === "right" && (
          <div className="h-px w-8" style={{ background: accent }} />
        )}
        <span
          className="font-[DM_Sans,sans-serif] text-[10px] tracking-[3.5px] uppercase font-medium"
          style={{ color: accent }}
        >
          {eyebrow}
        </span>
        <div className="h-px w-8" style={{ background: accent }} />
      </div>
      <h2 className="font-[Playfair_Display,serif] text-[clamp(22px,4vw,30px)] font-bold text-[#e8d8ff] leading-tight mb-3.5 whitespace-pre-line">
        {headline}
      </h2>
      <p className="font-[Cormorant_Garamond,serif] text-lg italic text-[rgba(200,175,240,0.8)] leading-8">
        {body}
      </p>
    </div>
  );
}

function KissCard() {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  return (
    <div
      ref={ref}
      className="relative w-full max-w-[520px] rounded-3xl border border-[rgba(220,140,180,0.3)] bg-white/[0.04] backdrop-blur-xl px-9 py-11 text-center mb-14 overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(28px) scale(0.97)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
      }}
    >
      <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[rgba(220,100,160,0.6)] to-transparent" />

      <div className="flex justify-center mb-5">
        <KissSticker className="w-16 h-16 animate-[kissFloat_2s_ease-in-out_infinite]" />
      </div>

      <h2 className="font-[Playfair_Display,serif] text-[clamp(26px,5vw,40px)] font-bold text-[#f0a8cc] leading-tight mb-4">
        Lip to Lip.
        <br />
        Two. Three Times.
      </h2>
      <p className="font-[Cormorant_Garamond,serif] text-lg italic text-[rgba(220,175,210,0.85)] leading-8">
        Soft. Then again. Then once more — each one better than the last, each
        one confirming this was absolutely real. The kind of kisses that answer
        every question you were too scared to ask. Passionate. Completely us.
        Everything we'd been holding back, finally — finally — let go.
      </p>

      <div className="flex justify-center gap-4 mt-6">
        {["💕", "🤍", "💗", "🤍", "💕"].map((e, i) => (
          <span
            key={i}
            className="text-[22px] inline-block animate-[floatBounce_1.5s_ease-in-out_infinite]"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            {e}
          </span>
        ))}
      </div>

      <div className="absolute bottom-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[rgba(220,100,160,0.6)] to-transparent" />
    </div>
  );
}

export default function First() {
  const [hearts, setHearts] = useState([]);
  const [lanternsActive, setLanternsActive] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setHearts((p) => [
        ...p.slice(-18),
        {
          id: Date.now() + Math.random(),
          x: rnd(6, 90),
          em: HEART_EMOJIS[Math.floor(rnd(0, HEART_EMOJIS.length))],
          size: rnd(12, 20),
          dur: rnd(3.5, 6),
        },
      ]);
    }, 700);
    return () => clearInterval(iv);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes kissFloat { 0%,100%{transform:scale(1) rotate(-4deg)} 50%{transform:scale(1.18) rotate(4deg)} }
        @keyframes floatBounce { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-7px) scale(1.2)} }
        @keyframes breathe { 0%,100%{opacity:0.82} 50%{opacity:1} }
        @keyframes pulse { 0%,100%{opacity:0.4;transform:scale(0.8)} 50%{opacity:1;transform:scale(1.2)} }
        @keyframes floatHeart { 0%{opacity:0;transform:translateY(0) scale(0.4)} 15%{opacity:1} 80%{opacity:0.7} 100%{opacity:0;transform:translateY(-180px) scale(1.1)} }
        @keyframes starTwinkle { 0%,100%{opacity:0.12} 50%{opacity:0.95} }
        @keyframes stickerBob { 0%,100%{transform:translateY(0) rotate(var(--tw-rotate,0deg))} 50%{transform:translateY(-8px) rotate(calc(var(--tw-rotate,0deg) + 6deg))} }
        @keyframes auroraDrift { 0%,100%{transform:translateX(0) scale(1)} 50%{transform:translateX(30px) scale(1.08)} }
        @keyframes lanternFloat { 0%{transform:translateY(0) rotate(-4deg)} 100%{transform:translateY(-18px) rotate(5deg)} }
        @keyframes missionHeart { 0%{opacity:0;transform:translateY(0) scale(0.4)} 15%{opacity:1} 80%{opacity:0.7} 100%{opacity:0;transform:translateY(-90px) scale(1.3)} }
        @keyframes kissBtnGlow { 0%,100%{box-shadow:0 0 12px rgba(249,123,161,0.4)} 50%{box-shadow:0 0 24px rgba(249,184,74,0.6),0 0 40px rgba(249,123,161,0.3)} }
        @keyframes kissSparkle { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }
      `}</style>

      <div className="relative min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#0a0618_0%,#1a0d35_30%,#2a1045_55%,#120b28_100%)]">
        {/* Stars */}
        <div className="fixed inset-0 z-[1] pointer-events-none">
          {STARS.map((s) => (
            <div
              key={s.id}
              className="absolute rounded-full animate-[starTwinkle_ease-in-out_infinite]"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.r * 2,
                height: s.r * 2,
                background: s.purple
                  ? "rgba(180,150,255,0.9)"
                  : "rgba(255,255,255,0.88)",
                animationDuration: `${s.dur}s`,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Fireflies */}
        <div className="fixed inset-0 z-[1] pointer-events-none">
          {FLIES.map((f) => (
            <div
              key={f.id}
              className="absolute w-1 h-1 rounded-full bg-[#88ffaa] shadow-[0_0_6px_3px_rgba(136,255,170,0.5)] animate-[floatBounce_ease-in-out_infinite]"
              style={{
                left: `${f.x}%`,
                top: `${f.y}%`,
                animationDuration: `${f.dur}s`,
                animationDelay: `${f.delay}s`,
              }}
            />
          ))}
        </div>

        <AuroraSky />
        <FloatingLanterns active={lanternsActive} />
        <BridgeScene />

        {/* Floating hearts */}
        <div className="fixed inset-0 z-[5] pointer-events-none">
          {hearts.map((h) => (
            <div
              key={h.id}
              className="absolute animate-[floatHeart_ease-out_forwards]"
              style={{
                left: `${h.x}%`,
                bottom: 160,
                fontSize: h.size,
                animationDuration: `${h.dur}s`,
              }}
            >
              {h.em}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-5 pt-[60px] pb-[340px]">
          <p className="font-[DM_Sans,sans-serif] text-[11px] tracking-[4px] uppercase text-[rgba(200,160,255,0.55)] mb-4">
            ✦ The Night Under The Bridge ✦
          </p>

          <h1 className="font-[Playfair_Display,serif] text-[clamp(52px,10vw,96px)] font-bold text-[#f0e8ff] leading-none tracking-tight text-center mb-2 [text-shadow:0_0_60px_rgba(180,120,255,0.3)]">
            First Kiss
          </h1>

          <p className="font-[Cormorant_Garamond,serif] text-[15px] italic text-[rgba(200,170,240,0.5)] tracking-[3px] mb-[52px]">
            1:00 AM &nbsp;·&nbsp; The Bridge &nbsp;·&nbsp; Just Us &nbsp;·&nbsp;
            The Bike
          </p>

          <Reveal delay={0.1}>
            <div className="flex items-center gap-2.5 px-[22px] py-2.5 rounded-full border border-[rgba(180,130,255,0.25)] bg-white/[0.04] backdrop-blur-md mb-[60px]">
              <div className="w-[7px] h-[7px] rounded-full bg-[#b880ff] animate-[pulse_1.8s_ease-in-out_infinite]" />
              <span className="text-[13px] text-[rgba(200,170,255,0.75)] font-[DM_Sans,sans-serif]">
                The city was asleep. We were completely, dangerously awake.
              </span>
            </div>
          </Reveal>

          <StoryBlock
            eyebrow="The Place"
            align="center"
            accent="#8860e0"
            delay={0}
            headline={
              "The Bridge. The Empty Road.\nThe Lamp Light Doing Its Best."
            }
            body="No one around. Just the bridge stretching out under the night sky, the water below catching every shimmer of light, and us — two people who had been quietly dying for this moment. The kind of place that feels like the whole world made room for just two people."
          />

          <StoryBlock
            eyebrow="The Bike"
            align="right"
            accent="#e04888"
            delay={0.05}
            headline={"On the Running Bike.\nShe Came Close."}
            body="The bike still running, the engine's low hum underneath everything. She leaned in. The whole world shrank down to just that moment — the road, the wind, her. Nothing else existed. Just her face tilting toward mine."
          />

          <StoryBlock
            eyebrow="The Pull"
            align="left"
            accent="#c03898"
            delay={0.05}
            headline={"I Pulled Her Waist.\nPulled Her Right Into Me."}
            body="My hand found her waist and I pulled — not rough, not slow — just that exact right pull that said everything I couldn't say out loud. She came close. That electric inch of space between us collapsed. Heart absolutely hammering. Both of us pretending we weren't. Both of us failing completely."
          />

          <KissCard />

          <TangledMissionSection
            onKissComplete={() => setLanternsActive(true)}
          />

          <StoryBlock
            eyebrow="The Tension"
            align="right"
            accent="#d06030"
            delay={0.05}
            headline={"Both Dying For It.\nBoth Trying Not to Show It."}
            body="We had been orbiting this for so long. Every conversation, every glance held a half-second too long, every time we were close and didn't — until we did. Two people absolutely gone for each other, finally standing in that truth under a lamp post on a bridge at 1 AM. Terrifying. Perfect. Ours."
          />

          <StoryBlock
            eyebrow="After"
            align="center"
            accent="#40a870"
            delay={0.05}
            headline={"And Then She Stayed.\nRight There."}
            body="Arms around. Neither of us moved. The bike ticking as it cooled. The water below. The stars holding their breath. The kind of moment that burns itself into you permanently — the before and after of your whole story with someone."
          />

          <Reveal delay={0.2} className="w-full max-w-[520px]">
            <div className="text-center rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md px-8 py-11 mb-10">
              <p className="font-[Playfair_Display,serif] text-[clamp(18px,3.5vw,26px)] italic text-[#d8c8f8] leading-relaxed animate-[breathe_4s_ease-in-out_infinite]">
                "The bridge knew before we did.
                <br />
                The night held its breath for us.
                <br />
                On a running bike, under one lamp,
                <br />
                we stopped pretending we weren't
                <br />
                completely, helplessly each other's."
              </p>
              <div className="flex justify-center gap-3.5 mt-5">
                {["✨", "💋", "❤️", "💋", "✨"].map((e, i) => (
                  <span
                    key={i}
                    className="text-lg inline-block animate-[floatBounce_3s_ease-in-out_infinite]"
                    style={{ animationDelay: `${i * 0.4}s` }}
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
