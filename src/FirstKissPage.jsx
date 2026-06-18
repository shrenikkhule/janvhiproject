import { useState, useEffect, useRef, useCallback } from "react";
import { Flynn, Rapunzel } from "./games/HandWave";

const TANGLED_TASKS = [
  { id: "wave", label: "Wave hello", icon: "👋", btn: "Wave hello" },
  { id: "smile", label: "Share a smile", icon: "😊", btn: "Share a smile" },
  { id: "closer", label: "Lean closer", icon: "🌹", btn: "Lean closer" },
  { id: "hold", label: "Hold tight", icon: "🤗", btn: "Hold tight" },
];

const TANGLED_HINTS = {
  wave: "Flynn waves from the bridge! ✨",
  smile: "Rapunzel smiles back! 🌸",
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
        <path d="M55 32 L95 28 L100 48 L58 50Z" fill="#ff8aaa" opacity="0.6" />
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

      {/* Couple — smooth chibi cartoon */}
      <g transform="translate(640, 130)" filter="url(#softShadow)">
        {/* Ground shadows */}
        <ellipse cx="90" cy="268" rx="42" ry="10" fill="rgba(80,100,160,0.2)" />
        <ellipse
          cx="175"
          cy="266"
          rx="36"
          ry="9"
          fill="rgba(80,100,160,0.18)"
        />

        {/* HIM */}
        <ellipse cx="78" cy="262" rx="20" ry="8" fill="#2a2848" />
        <ellipse cx="102" cy="262" rx="16" ry="7" fill="#2a2848" />
        <path
          d="M68 210 Q72 262 78 262 L98 262 Q104 210 100 210 Z"
          fill="#3d5588"
        />
        <path
          d="M96 210 Q100 262 106 262 L122 262 Q126 210 122 210 Z"
          fill="#3d5588"
        />
        <path
          d="M58 148 Q58 210 68 210 L122 210 Q132 210 132 148 Q132 100 95 96 Q58 100 58 148Z"
          fill="url(#jacket)"
        />
        <path d="M82 148 L95 168 L108 148" fill="white" opacity="0.85" />
        {/* Arm around her */}
        <path
          d="M132 158 Q168 150 188 162 Q192 168 186 174 Q160 180 130 170 Z"
          fill="url(#jacket)"
        />
        <circle cx="188" cy="168" r="12" fill="url(#skinHim)" />
        {/* Neck & head */}
        <rect
          x="82"
          y="118"
          width="22"
          height="24"
          rx="8"
          fill="url(#skinHim)"
        />
        <circle cx="95" cy="92" r="38" fill="url(#skinHim)" />
        {/* Hair — smooth curves */}
        <path
          d="M58 92 Q55 50 95 48 Q135 50 132 92 Q128 70 95 68 Q62 70 58 92Z"
          fill="#1a1008"
        />
        <path d="M52 88 Q38 70 48 52 Q58 44 68 58" fill="#1a1008" />
        <path d="M138 88 Q152 70 142 52 Q132 44 122 58" fill="#1a1008" />
        <ellipse cx="78" cy="62" rx="10" ry="6" fill="rgba(255,255,255,0.08)" />
        {/* Ears */}
        <ellipse cx="58" cy="94" rx="9" ry="11" fill="url(#skinHim)" />
        <ellipse cx="132" cy="94" rx="9" ry="11" fill="url(#skinHim)" />
        {/* Eyes — wide, looking at her */}
        <ellipse cx="82" cy="96" rx="10" ry="11" fill="white" />
        <ellipse cx="108" cy="96" rx="10" ry="11" fill="white" />
        <circle cx="84" cy="98" r="6" fill="#2a1808" />
        <circle cx="110" cy="98" r="6" fill="#2a1808" />
        <circle cx="86" cy="95" r="2.5" fill="white" />
        <circle cx="112" cy="95" r="2.5" fill="white" />
        <path
          d="M72 84 Q82 78 90 84"
          stroke="#1a1008"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M100 84 Q108 78 118 84"
          stroke="#1a1008"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse
          cx="68"
          cy="106"
          rx="10"
          ry="6"
          fill="rgba(255,100,120,0.45)"
        />
        <ellipse
          cx="122"
          cy="106"
          rx="10"
          ry="6"
          fill="rgba(255,100,120,0.45)"
        />
        <path
          d="M84 112 Q95 120 106 112"
          stroke="#c06060"
          strokeWidth="2.5"
          fill="rgba(255,180,160,0.4)"
          strokeLinecap="round"
        />

        {/* HER */}
        <ellipse cx="162" cy="260" rx="18" ry="7" fill="#a02858" />
        <ellipse cx="182" cy="260" rx="14" ry="6" fill="#a02858" />
        <path
          d="M152 208 Q156 260 162 260 L178 260 Q182 208 178 208 Z"
          fill="#f0a0c8"
        />
        <path
          d="M176 208 Q180 260 186 260 L198 260 Q202 208 198 208 Z"
          fill="#f0a0c8"
        />
        <path
          d="M138 206 Q170 238 202 206 L196 168 Q170 178 144 168 Z"
          fill="url(#dress)"
        />
        <path
          d="M148 188 Q158 198 168 188"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M148 148 Q148 206 138 206 L202 206 Q192 148 192 148 Q170 158 148 148Z"
          fill="url(#dress)"
        />
        {/* Bow sticker */}
        <path
          d="M158 148 Q170 138 182 148 Q170 158 158 148Z"
          fill="#ff2880"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        <circle cx="170" cy="148" r="5" fill="#ff9ec8" />
        {/* Arms */}
        <path
          d="M138 162 Q118 168 112 178 Q108 184 116 188 Q130 182 142 172Z"
          fill="url(#dress)"
        />
        <circle cx="112" cy="182" r="10" fill="url(#skinHer)" />
        <path
          d="M192 162 Q212 168 218 178 Q222 184 214 188 Q200 182 188 172Z"
          fill="url(#dress)"
        />
        <circle cx="218" cy="182" r="10" fill="url(#skinHer)" />
        {/* Neck & head */}
        <rect
          x="158"
          y="118"
          width="20"
          height="24"
          rx="7"
          fill="url(#skinHer)"
        />
        <circle cx="168" cy="92" r="36" fill="url(#skinHer)" />
        {/* Long hair — flowing curves */}
        <path
          d="M132 92 Q128 48 168 46 Q208 48 204 92 Q200 68 168 66 Q136 68 132 92Z"
          fill="#120808"
        />
        <path
          d="M128 100 Q108 120 112 168 Q114 188 120 200"
          stroke="#120808"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M208 100 Q228 120 224 168 Q222 188 216 200"
          stroke="#120808"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="152" cy="58" rx="8" ry="4" fill="rgba(255,255,255,0.12)" />
        {/* Hair clip sparkle */}
        <path
          d="M198 54 Q206 46 214 54 Q206 62 198 54Z"
          fill="#ff4499"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        {/* Closed happy eyes */}
        <path
          d="M152 88 Q160 80 168 88"
          stroke="#120808"
          strokeWidth="3"
          fill="rgba(255,200,210,0.35)"
          strokeLinecap="round"
        />
        <path
          d="M168 88 Q176 80 184 88"
          stroke="#120808"
          strokeWidth="3"
          fill="rgba(255,200,210,0.35)"
          strokeLinecap="round"
        />
        <ellipse cx="148" cy="100" rx="12" ry="7" fill="rgba(255,80,130,0.5)" />
        <ellipse cx="188" cy="100" rx="12" ry="7" fill="rgba(255,80,130,0.5)" />
        <ellipse cx="168" cy="108" rx="11" ry="8" fill="#d04878" />
        <ellipse cx="168" cy="105" rx="9" ry="4" fill="#ff8aaa" />

        {/* Kiss spark stickers */}
        {[
          { cx: 128, cy: 58, fill: "#ff80cc", dur: "1.8s", begin: "0s" },
          { cx: 116, cy: 42, fill: "#ffd44a", dur: "2s", begin: "0.35s" },
          { cx: 136, cy: 28, fill: "#ff80cc", dur: "1.6s", begin: "0.7s" },
          { cx: 122, cy: 14, fill: "#c084fc", dur: "2.2s", begin: "1s" },
        ].map((sp, i) => (
          <g key={i}>
            <path
              d={`M${sp.cx} ${sp.cy - 6} L${sp.cx + 2} ${sp.cy} L${sp.cx + 6} ${sp.cy} L${sp.cx + 3} ${sp.cy + 3} L${sp.cx + 4} ${sp.cy + 7} L${sp.cx} ${sp.cy + 5} L${sp.cx - 4} ${sp.cy + 7} L${sp.cx - 3} ${sp.cy + 3} L${sp.cx - 6} ${sp.cy} L${sp.cx - 2} ${sp.cy}Z`}
              fill={sp.fill}
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur={sp.dur}
                repeatCount="indefinite"
                begin={sp.begin}
              />
              <animateTransform
                attributeName="transform"
                type="scale"
                values="0.6;1.2;0.6"
                dur={sp.dur}
                repeatCount="indefinite"
                begin={sp.begin}
                additive="sum"
              />
            </path>
          </g>
        ))}

        {/* Floating kiss sticker */}
        <g transform="translate(108, -20)">
          <circle r="22" fill="#ff4d8a" opacity="0.2">
            <animate
              attributeName="r"
              values="20;24;20"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>
          <text textAnchor="middle" y="6" fontSize="22">
            💋
          </text>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,-20; 0,-42; 0,-20"
            dur="2.8s"
            repeatCount="indefinite"
          />
        </g>
      </g>
    </svg>
  );
}

/* ── Interactive Rapunzel & Flynn mission ── */
function TangledMissionSection({ onKissComplete }) {
  const [done, setDone] = useState(new Set());
  const [kissed, setKissed] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [hint, setHint] = useState(
    "Complete each step — then Flynn & Rapunzel kiss 💫",
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
    setHint("✨ Flynn & Rapunzel — lip to lip, just like that night ✨");
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
    setHint("Complete each step — then Flynn & Rapunzel kiss 💫");
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
          Flynn & Rapunzel
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

export default function FirstKissPage() {
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
