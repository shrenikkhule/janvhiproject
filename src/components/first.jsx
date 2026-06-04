import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";

const rnd = (a, b) => Math.random() * (b - a) + a;

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: rnd(0, 100),
  y: rnd(0, 60),
  r: rnd(0.8, 2.5),
  dur: rnd(2, 5),
  delay: rnd(0, 6),
}));

const FLIES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: rnd(10, 88),
  y: rnd(35, 70),
  dx: rnd(-35, 35),
  dy: rnd(-45, -12),
  dur: rnd(3, 6),
  delay: rnd(0, 5),
}));

function Reveal({ children, delay = 0, y = 24, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Cartoon Moon with face ── */
function CartoonMoon() {
  return (
    <motion.div
      className="fixed pointer-events-none z-20"
      style={{ top: 24, right: 56 }}
      animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="100" height="100" viewBox="0 0 100 100">
        {/* Outer glow rings */}
        <circle cx="50" cy="50" r="48" fill="rgba(255,248,180,0.1)" />
        <circle cx="50" cy="50" r="40" fill="rgba(255,242,140,0.12)" />
        {/* Moon body */}
        <circle cx="50" cy="50" r="33" fill="#FFF6B0" />
        {/* Shading for crescent feel */}
        <circle cx="62" cy="44" r="28" fill="#F8E87A" />
        {/* Crater details */}
        <circle cx="38" cy="44" r="4" fill="rgba(200,180,60,0.18)" />
        <circle cx="46" cy="56" r="2.5" fill="rgba(200,180,60,0.14)" />
        <circle cx="34" cy="54" r="2" fill="rgba(200,180,60,0.12)" />
        {/* Face — eyes */}
        <ellipse cx="40" cy="46" rx="3.5" ry="4" fill="#4a3010" />
        <ellipse cx="54" cy="46" rx="3.5" ry="4" fill="#4a3010" />
        {/* Eye shines */}
        <circle cx="41.5" cy="44.5" r="1.3" fill="white" />
        <circle cx="55.5" cy="44.5" r="1.3" fill="white" />
        {/* Blush */}
        <ellipse cx="34" cy="51" rx="5" ry="3" fill="rgba(255,160,120,0.38)" />
        <ellipse cx="60" cy="51" rx="5" ry="3" fill="rgba(255,160,120,0.38)" />
        {/* Sleepy / shy expression */}
        <path
          d="M 41 56 Q 47 62 55 56"
          stroke="#4a3010"
          strokeWidth="2"
          fill="rgba(255,180,160,0.35)"
          strokeLinecap="round"
        />
        {/* Tiny stars orbiting */}
        <motion.text
          x="8"
          y="20"
          fontSize="11"
          style={{ transformOrigin: "13px 15px" }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 0.2 }}
        >
          ✦
        </motion.text>
        <motion.text
          x="78"
          y="16"
          fontSize="9"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: 1.1 }}
        >
          ✦
        </motion.text>
        <motion.text
          x="82"
          y="78"
          fontSize="8"
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: 0.6 }}
        >
          ✦
        </motion.text>
        <motion.text
          x="6"
          y="76"
          fontSize="7"
          animate={{ opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1.8 }}
        >
          ✦
        </motion.text>
      </svg>
    </motion.div>
  );
}

/* ── Soft pastel clouds ── */
function Cloud({ x, y, w = 130, delay = 0, opacity = 0.7 }) {
  return (
    <motion.div
      className="fixed pointer-events-none z-0"
      style={{ left: `${x}%`, top: `${y}%`, opacity, width: w }}
      animate={{ x: [0, 22, 0] }}
      transition={{
        duration: 16 + delay * 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <svg width={w} height={w * 0.48} viewBox={`0 0 ${w} ${w * 0.48}`}>
        <ellipse
          cx={w * 0.5}
          cy={w * 0.38}
          rx={w * 0.44}
          ry={w * 0.2}
          fill="white"
        />
        <circle cx={w * 0.25} cy={w * 0.34} r={w * 0.16} fill="white" />
        <circle cx={w * 0.46} cy={w * 0.26} r={w * 0.21} fill="white" />
        <circle cx={w * 0.68} cy={w * 0.3} r={w * 0.18} fill="white" />
        <circle cx={w * 0.85} cy={w * 0.36} r={w * 0.13} fill="white" />
      </svg>
    </motion.div>
  );
}

/* ── Cartoon pine trees ── */
function Trees() {
  const treeData = [
    { x: -2, s: 1.35, d: 0.4, flip: false },
    { x: 4.5, s: 1.0, d: 0, flip: false },
    { x: 10, s: 0.85, d: 0.7, flip: false },
    { x: 87, s: 1.1, d: 0.5, flip: true },
    { x: 92, s: 0.9, d: 0.1, flip: true },
    { x: 97, s: 1.2, d: 0.8, flip: true },
  ];
  return (
    <div
      className="fixed bottom-0 left-0 right-0 pointer-events-none z-10"
      style={{ height: "48%" }}
    >
      {treeData.map((t, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0"
          style={{
            left: `${t.x}%`,
            transformOrigin: "bottom center",
            transform: `scaleX(${t.flip ? -1 : 1}) scaleY(${t.s})`,
          }}
          animate={{ rotate: [-0.7, 0.7, -0.7] }}
          transition={{
            duration: 4.5 + i * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: t.d,
          }}
        >
          <svg width="88" height="210" viewBox="0 0 88 210">
            <rect x="37" y="148" width="14" height="62" rx="5" fill="#9b7040" />
            <ellipse cx="44" cy="153" rx="36" ry="25" fill="#2e6e38" />
            <ellipse cx="44" cy="124" rx="30" ry="23" fill="#3a8848" />
            <ellipse cx="44" cy="100" rx="24" ry="20" fill="#48a058" />
            <ellipse cx="44" cy="80" rx="18" ry="16" fill="#58b866" />
            <ellipse cx="44" cy="65" rx="13" ry="13" fill="#68cc74" />
            {/* Light spots */}
            <ellipse
              cx="34"
              cy="108"
              rx="5"
              ry="4"
              fill="rgba(255,255,255,0.13)"
            />
            <ellipse
              cx="52"
              cy="128"
              rx="4"
              ry="3"
              fill="rgba(255,255,255,0.1)"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Lamp posts ── */
function LampPost({ pct, side }) {
  return (
    <div
      className="fixed bottom-0 pointer-events-none z-10"
      style={{ left: `${pct}%` }}
    >
      <svg width="50" height="280" viewBox="0 0 50 280">
        <rect x="21" y="72" width="7" height="208" rx="3.5" fill="#b8b0a0" />
        {side === "left" ? (
          <path
            d="M24 72 Q24 42 42 38"
            stroke="#b8b0a0"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M26 72 Q26 42 8  38"
            stroke="#b8b0a0"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
        )}
        <ellipse
          cx={side === "left" ? 42 : 8}
          cy="36"
          rx="11"
          ry="6"
          fill="#e8e0cc"
        />
        <ellipse
          cx={side === "left" ? 42 : 8}
          cy="34"
          rx="9"
          ry="4"
          fill="#fff8d0"
        />
        <motion.ellipse
          cx={side === "left" ? 42 : 8}
          cy="58"
          rx="30"
          ry="9"
          fill="rgba(255,236,140,0.28)"
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

/* ── Road ── */
function Ground() {
  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-10">
      <svg
        width="100%"
        height="90"
        viewBox="0 0 1400 90"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="gf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#cde8f5" stopOpacity="0" />
            <stop offset="100%" stopColor="#bcd8ec" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect x="0" y="55" width="1400" height="35" fill="#c2d8e8" />
        <rect x="0" y="60" width="1400" height="26" fill="#ccdde8" />
        {Array.from({ length: 15 }, (_, i) => (
          <rect
            key={i}
            x={i * 100}
            y="71"
            width="64"
            height="3"
            rx="1.5"
            fill="rgba(255,255,255,0.55)"
          />
        ))}
        <rect
          x="0"
          y="61"
          width="1400"
          height="2"
          fill="rgba(255,255,255,0.45)"
        />
        <ellipse cx="0" cy="58" rx="90" ry="14" fill="#98c89a" />
        <ellipse cx="1400" cy="58" rx="90" ry="14" fill="#98c89a" />
        <rect
          x="0"
          y="0"
          width="1400"
          height="90"
          fill="url(#gf)"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}

/* ── The cartoon couple — detailed chibi ── */
function CoupleScene() {
  return (
    <div
      className="fixed pointer-events-none z-20"
      style={{ bottom: "12%", left: "50%", transform: "translateX(-52%)" }}
    >
      <svg width="340" height="300" viewBox="0 0 340 300">
        {/* Ground shadows */}
        <ellipse
          cx="126"
          cy="288"
          rx="38"
          ry="9"
          fill="rgba(100,140,180,0.18)"
        />
        <ellipse
          cx="214"
          cy="286"
          rx="32"
          ry="8"
          fill="rgba(100,140,180,0.16)"
        />

        {/* ════ HIM ════ */}
        {/* Shoes */}
        <ellipse cx="112" cy="282" rx="18" ry="8" fill="#222233" />
        <ellipse cx="136" cy="282" rx="15" ry="7" fill="#222233" />
        {/* Pants */}
        <rect x="103" y="224" width="17" height="56" rx="8" fill="#3a558a" />
        <rect x="124" y="224" width="17" height="56" rx="8" fill="#3a558a" />
        {/* Jacket body */}
        <rect x="96" y="150" width="58" height="82" rx="18" fill="#4a68b8" />
        {/* Jacket lapels */}
        <path d="M118 150 L126 168 L134 150" fill="white" opacity="0.9" />
        {/* Jacket pocket */}
        <rect
          x="100"
          y="188"
          width="16"
          height="12"
          rx="4"
          fill="rgba(255,255,255,0.18)"
        />
        {/* Left arm — around her waist */}
        <motion.g
          style={{ transformOrigin: "96px 165px" }}
          animate={{ rotate: [-2, 1, -2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="70" y="156" width="30" height="15" rx="7" fill="#4a68b8" />
          <circle cx="72" cy="163" r="11" fill="#f0c498" />
        </motion.g>
        {/* Right arm — around her */}
        <motion.g
          style={{ transformOrigin: "154px 165px" }}
          animate={{ rotate: [2, -1, 2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="152" y="156" width="38" height="15" rx="7" fill="#4a68b8" />
          <circle cx="188" cy="163" r="11" fill="#f0c498" />
        </motion.g>
        {/* Neck */}
        <rect x="115" y="132" width="20" height="22" rx="7" fill="#f0c498" />
        {/* Head */}
        <circle cx="125" cy="110" r="40" fill="#f0c498" />
        {/* Hair — messy dark */}
        <ellipse cx="125" cy="78" rx="40" ry="26" fill="#1e1008" />
        <ellipse cx="94" cy="90" rx="16" ry="22" fill="#1e1008" />
        <ellipse cx="156" cy="90" rx="16" ry="22" fill="#1e1008" />
        <ellipse cx="106" cy="72" rx="13" ry="11" fill="#2a1a0c" />
        <ellipse cx="144" cy="72" rx="13" ry="11" fill="#2a1a0c" />
        {/* Hair highlight */}
        <ellipse cx="114" cy="74" rx="8" ry="4" fill="rgba(255,255,255,0.1)" />
        {/* Ears */}
        <ellipse cx="85" cy="110" rx="10" ry="12" fill="#f0c498" />
        <ellipse cx="165" cy="110" rx="10" ry="12" fill="#f0c498" />
        <ellipse cx="85" cy="110" rx="6" ry="8" fill="#e8b888" />
        <ellipse cx="165" cy="110" rx="6" ry="8" fill="#e8b888" />
        {/* Eyes — looking toward her, slightly wide */}
        <ellipse cx="113" cy="112" rx="9" ry="10" fill="white" />
        <ellipse cx="137" cy="112" rx="9" ry="10" fill="white" />
        <circle cx="115" cy="114" r="6" fill="#2a1808" />
        <circle cx="139" cy="114" r="6" fill="#2a1808" />
        <circle cx="117" cy="111" r="2.2" fill="white" />
        <circle cx="141" cy="111" r="2.2" fill="white" />
        {/* Eyebrows — raised (nervous) */}
        <path
          d="M104 100 Q113 95 120 100"
          stroke="#1e1008"
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M130 100 Q137 95 146 100"
          stroke="#1e1008"
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
        />
        {/* Blush */}
        <ellipse
          cx="98"
          cy="121"
          rx="9"
          ry="5.5"
          fill="rgba(255,120,100,0.4)"
        />
        <ellipse
          cx="152"
          cy="121"
          rx="9"
          ry="5.5"
          fill="rgba(255,120,100,0.4)"
        />
        {/* Smile */}
        <path
          d="M 114 128 Q 125 136 136 128"
          stroke="#c06050"
          strokeWidth="2.5"
          fill="rgba(255,180,160,0.45)"
          strokeLinecap="round"
        />
        {/* Sweat drop (nervous) */}
        <motion.g
          animate={{ opacity: [0, 1, 0], y: [0, 5, 10] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 0.8 }}
        >
          <ellipse
            cx="170"
            cy="84"
            rx="5.5"
            ry="8"
            fill="rgba(100,180,255,0.75)"
          />
          <polygon
            points="165,86 175,86 170,74"
            fill="rgba(100,180,255,0.75)"
          />
        </motion.g>

        {/* ════ HER ════ */}
        {/* HER FEET ON HIS SHOE — key detail */}
        <ellipse cx="210" cy="278" rx="16" ry="7" fill="#b03868" />
        <ellipse cx="226" cy="278" rx="13" ry="6" fill="#b03868" />
        {/* Legs */}
        <rect x="198" y="222" width="14" height="52" rx="7" fill="#f0a8c8" />
        <rect x="216" y="222" width="14" height="52" rx="7" fill="#f0a8c8" />
        {/* Skirt flare */}
        <path
          d="M182 220 Q214 252 246 220 L242 178 Q214 188 186 178 Z"
          fill="#e84888"
        />
        {/* Skirt shine */}
        <path
          d="M192 198 Q200 208 208 198"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        {/* Body */}
        <rect x="188" y="148" width="52" height="52" rx="16" fill="#f460a8" />
        {/* Ribbon / bow on dress */}
        <motion.g
          style={{ transformOrigin: "214px 148px" }}
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M202 148 Q214 141 226 148 Q214 155 202 148Z"
            fill="#ff2880"
          />
          <circle cx="214" cy="148" r="5" fill="#ff7ab0" />
        </motion.g>
        {/* Left arm — reaching around him */}
        <rect x="166" y="162" width="26" height="14" rx="7" fill="#f460a8" />
        <circle cx="168" cy="169" r="10" fill="#fad0b0" />
        {/* Right arm — reaching around him */}
        <rect x="238" y="162" width="24" height="14" rx="7" fill="#f460a8" />
        <circle cx="260" cy="169" r="10" fill="#fad0b0" />
        {/* Neck */}
        <rect x="205" y="130" width="18" height="22" rx="6" fill="#fad0b0" />
        {/* Head */}
        <circle cx="214" cy="110" r="38" fill="#fad0b0" />
        {/* Long flowing hair */}
        <ellipse cx="214" cy="80" rx="38" ry="24" fill="#150505" />
        <ellipse cx="180" cy="100" rx="14" ry="35" fill="#150505" />
        <ellipse cx="248" cy="100" rx="14" ry="35" fill="#150505" />
        <path
          d="M180 134 Q172 165 177 198"
          stroke="#150505"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M248 134 Q256 165 251 198"
          stroke="#150505"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
        />
        {/* Hair shine */}
        <ellipse cx="202" cy="76" rx="9" ry="5" fill="rgba(255,255,255,0.14)" />
        {/* Ears */}
        <ellipse cx="176" cy="110" rx="9" ry="11" fill="#fad0b0" />
        <ellipse cx="252" cy="110" rx="9" ry="11" fill="#fad0b0" />
        <ellipse cx="176" cy="110" rx="5.5" ry="7" fill="#f0c0a0" />
        <ellipse cx="252" cy="110" rx="5.5" ry="7" fill="#f0c0a0" />
        {/* Eyes — closed happy (kissing) */}
        <path
          d="M198 104 Q206 97 214 104"
          stroke="#150505"
          strokeWidth="3"
          fill="rgba(255,200,210,0.3)"
          strokeLinecap="round"
        />
        <path
          d="M214 104 Q222 97 230 104"
          stroke="#150505"
          strokeWidth="3"
          fill="rgba(255,200,210,0.3)"
          strokeLinecap="round"
        />
        {/* Eyelashes */}
        {[
          [196, 104, 192, 99],
          [212, 103, 210, 98],
          [228, 104, 232, 99],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#150505"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        ))}
        {/* Big blush — she's kissing him! */}
        <ellipse
          cx="192"
          cy="115"
          rx="12"
          ry="7"
          fill="rgba(255,90,130,0.45)"
        />
        <ellipse
          cx="236"
          cy="115"
          rx="12"
          ry="7"
          fill="rgba(255,90,130,0.45)"
        />
        {/* Lips — kissing pout */}
        <ellipse cx="214" cy="126" rx="10" ry="7" fill="#e05080" />
        <ellipse cx="214" cy="123" rx="8" ry="4" fill="#ff8aaa" />
        {/* Hair clip / sparkle */}
        <motion.g
          style={{ transformOrigin: "244px 80px" }}
          animate={{ rotate: [-8, 8, -8] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <path d="M236 78 Q244 71 252 78 Q244 85 236 78Z" fill="#ff3388" />
          <path d="M244 78 Q250 71 256 78 Q250 85 244 78Z" fill="#ff3388" />
          <circle cx="244" cy="78" r="4.5" fill="#ff99cc" />
        </motion.g>
        {/* Nervous sweat drop — her side */}
        <motion.g
          animate={{ opacity: [0, 1, 0], y: [0, 5, 10] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        >
          <ellipse
            cx="262"
            cy="80"
            rx="4.5"
            ry="7"
            fill="rgba(100,180,255,0.75)"
          />
          <polygon
            points="257.5,82 266.5,82 262,72"
            fill="rgba(100,180,255,0.75)"
          />
        </motion.g>

        {/* ── Kiss sparks ── */}
        {[
          { x: 168, y: 82, r: 6, delay: 0 },
          { x: 156, y: 66, r: 4.5, delay: 0.35 },
          { x: 174, y: 60, r: 3.5, delay: 0.65 },
          { x: 160, y: 48, r: 7, delay: 1.0 },
          { x: 178, y: 52, r: 4, delay: 1.35 },
          { x: 150, y: 72, r: 3, delay: 0.5 },
        ].map((sp, i) => (
          <motion.circle
            key={i}
            cx={sp.x}
            cy={sp.y}
            r={sp.r}
            fill={i % 2 === 0 ? "#ff88cc" : "#ffcc44"}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.4, 1.6, 0.4],
              y: [0, -10, -22],
            }}
            transition={{
              duration: 1.9,
              repeat: Infinity,
              delay: sp.delay,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Heart floating above */}
        <motion.text
          x="162"
          y="54"
          fontSize="22"
          textAnchor="middle"
          animate={{
            y: [0, -16, 0],
            opacity: [0.6, 1, 0.6],
            scale: [0.9, 1.25, 0.9],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "162px 43px" }}
        >
          💕
        </motion.text>
        <motion.text
          x="150"
          y="36"
          fontSize="13"
          animate={{ opacity: [0, 1, 0], y: [0, -12, -24] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.9 }}
        >
          ✨
        </motion.text>
        <motion.text
          x="172"
          y="38"
          fontSize="11"
          animate={{ opacity: [0, 1, 0], y: [0, -10, -20] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        >
          💗
        </motion.text>
        <motion.text
          x="158"
          y="22"
          fontSize="9"
          animate={{ opacity: [0, 0.8, 0], y: [0, -8, -18] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
        >
          🌸
        </motion.text>
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════
   STORY SECTION
════════════════════════════════════════ */
function StorySection({
  eyebrow,
  headline,
  body,
  delay = 0,
  align = "center",
  accent = "#8858c8",
}) {
  return (
    <Reveal delay={delay} className="w-full max-w-lg mb-16">
      <div
        className={`flex flex-col ${align === "center" ? "items-center text-center" : align === "left" ? "items-start text-left" : "items-end text-right"}`}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="h-px w-8" style={{ background: accent }} />
          <span
            className="text-xs tracking-widest uppercase font-medium"
            style={{
              color: accent,
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 11,
            }}
          >
            {eyebrow}
          </span>
          <div className="h-px w-8" style={{ background: accent }} />
        </div>
        <h2
          className="mb-3 font-bold"
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(22px,4vw,32px)",
            color: "#1e1430",
            lineHeight: 1.25,
          }}
        >
          {headline}
        </h2>
        <p
          style={{
            fontFamily: "'Crimson Pro',serif",
            fontSize: 17,
            color: "#4a3860",
            lineHeight: 1.95,
            fontStyle: "italic",
            maxWidth: 460,
          }}
        >
          {body}
        </p>
      </div>
    </Reveal>
  );
}

/* ── The big kiss moment ── */
function KissMoment() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <Reveal className="w-full max-w-lg mb-16">
      <div
        ref={ref}
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.62)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,200,230,0.6)",
          boxShadow: "0 20px 60px rgba(200,100,160,0.18)",
          padding: "44px 36px",
        }}
      >
        {/* Decorative top gradient line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "15%",
            right: "15%",
            height: 3,
            borderRadius: "0 0 4px 4px",
            background:
              "linear-gradient(90deg,transparent,#e85098,transparent)",
          }}
        />

        {/* Background heart watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ fontSize: 200, opacity: 0.03 }}
        >
          💕
        </div>

        <motion.div
          className="text-center mb-5"
          style={{ fontSize: 56 }}
          animate={{ scale: [1, 1.18, 1], rotate: [-4, 4, -4] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
        >
          💋
        </motion.div>

        <motion.h2
          className="text-center font-bold mb-4"
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(24px,5vw,42px)",
            color: "#c02860",
            lineHeight: 1.2,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
        >
          And Then She Kissed Me.
        </motion.h2>

        <motion.p
          className="text-center"
          style={{
            fontFamily: "'Crimson Pro',serif",
            fontSize: 17.5,
            color: "#6a3050",
            lineHeight: 1.95,
            fontStyle: "italic",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          Soft. Slow. A little terrifying. The kind of kiss that short-circuits
          your entire brain and makes every single thing before it feel like a
          warm-up act.
        </motion.p>

        {/* Emoji row */}
        <motion.div
          className="flex justify-center gap-4 mt-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          {["💕", "🤍", "💗", "🤍", "💕"].map((e, i) => (
            <motion.span
              key={i}
              style={{ fontSize: 24 }}
              animate={{ y: [0, -7, 0], scale: [1, 1.22, 1] }}
              transition={{
                duration: 1.5 + i * 0.2,
                repeat: Infinity,
                delay: i * 0.22,
              }}
            >
              {e}
            </motion.span>
          ))}
        </motion.div>

        {/* Bottom decoration */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "15%",
            right: "15%",
            height: 3,
            borderRadius: "4px 4px 0 0",
            background:
              "linear-gradient(90deg,transparent,#e85098,transparent)",
          }}
        />
      </div>
    </Reveal>
  );
}

/* ════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════ */
export default function FirstKissPage({ onNext }) {
  const [hearts, setHearts] = useState([]);
  const floatEmojis = ["💕", "💗", "🌸", "✨", "💖", "🌟", "💋"];

  useEffect(() => {
    const iv = setInterval(() => {
      setHearts((p) => [
        ...p.slice(-16),
        {
          id: Date.now() + Math.random(),
          x: rnd(6, 90),
          em: floatEmojis[Math.floor(rnd(0, floatEmojis.length))],
          size: rnd(13, 22),
          dur: rnd(3, 5.5),
        },
      ]);
    }, 650);
    return () => clearInterval(iv);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Crimson+Pro:ital,wght@0,400;1,400;1,600&family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>

      <div
        className="relative min-h-screen overflow-x-hidden"
        style={{ background: "#c8e4f4" }}
      >
        {/* Sky layers */}
        <div
          className="fixed inset-0 z-0"
          style={{
            background:
              "linear-gradient(180deg,#b8d8f0 0%,#cceaf8 40%,#ddf0f8 70%,#e8f4f8 100%)",
          }}
        />

        {/* Subtle texture */}
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            opacity: 0.15,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(140,120,200,0.35) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Clouds */}
        <Cloud x={-3} y={5} w={150} delay={0} opacity={0.65} />
        <Cloud x={18} y={3} w={110} delay={2.5} opacity={0.5} />
        <Cloud x={55} y={7} w={130} delay={1.2} opacity={0.55} />
        <Cloud x={76} y={4} w={100} delay={3.5} opacity={0.45} />

        {/* Stars */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {STARS.map((s) => (
            <motion.div
              key={s.id}
              className="absolute rounded-full"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.r * 2,
                height: s.r * 2,
                background:
                  s.y < 25 ? "rgba(160,140,255,0.95)" : "rgba(255,255,255,0.9)",
              }}
              animate={{ opacity: [0.1, 0.9, 0.1], scale: [1, 1.5, 1] }}
              transition={{
                duration: s.dur,
                repeat: Infinity,
                delay: s.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Fireflies */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {FLIES.map((f) => (
            <motion.div
              key={f.id}
              className="absolute rounded-full"
              style={{
                left: `${f.x}%`,
                top: `${f.y}%`,
                width: 5,
                height: 5,
                background: "#b0ff88",
                boxShadow: "0 0 7px 3px rgba(176,255,136,0.65)",
              }}
              animate={{ x: [0, f.dx], y: [0, f.dy], opacity: [0.15, 1, 0.15] }}
              transition={{
                duration: f.dur,
                repeat: Infinity,
                delay: f.delay,
                ease: "easeInOut",
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        {/* Moon */}
        <CartoonMoon />

        {/* Trees + Ground + Lamps */}
        <Trees />
        <Ground />
        <LampPost pct={20} side="right" />
        <LampPost pct={78} side="left" />

        {/* Couple */}
        <CoupleScene />

        {/* Floating emojis */}
        <div className="fixed inset-0 z-20 pointer-events-none">
          <AnimatePresence>
            {hearts.map((h) => (
              <motion.div
                key={h.id}
                className="absolute"
                style={{ left: `${h.x}%`, bottom: 155, fontSize: h.size }}
                initial={{ y: 0, opacity: 0, scale: 0.3 }}
                animate={{ y: -170, opacity: [0, 0.95, 0.7, 0], scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: h.dur, ease: "easeOut" }}
              >
                {h.em}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── PAGE CONTENT ── */}
        <div
          className="relative z-30 flex flex-col items-center px-4"
          style={{ paddingTop: 60, paddingBottom: 310 }}
        >
          {/* Chapter tag */}
          <motion.p
            className="text-xs tracking-widest uppercase mb-3"
            style={{
              color: "rgba(90,60,160,0.55)",
              fontFamily: "'DM Sans',sans-serif",
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            ✦ The Night It Actually Happened ✦
          </motion.p>

          {/* Title */}
          <motion.h1
            className="text-center font-bold mb-2"
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(44px,9vw,86px)",
              color: "#1a1030",
              lineHeight: 1.05,
              letterSpacing: -1.5,
            }}
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            First Kiss
          </motion.h1>

          <motion.p
            className="text-center mb-14"
            style={{
              color: "rgba(70,50,110,0.5)",
              fontSize: 14,
              fontFamily: "'DM Sans',sans-serif",
              letterSpacing: 1.5,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.9 }}
          >
            1:00 AM &nbsp;&nbsp;·&nbsp;&nbsp; Empty Road
            &nbsp;&nbsp;·&nbsp;&nbsp; Just Us
          </motion.p>

          {/* Time badge */}
          <Reveal delay={0.1}>
            <div
              className="flex items-center gap-3 px-5 py-2.5 rounded-full mb-16"
              style={{
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(200,180,240,0.45)",
                boxShadow: "0 4px 18px rgba(150,110,200,0.1)",
              }}
            >
              <motion.div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: "#a050c8" }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <span
                style={{
                  color: "#5a3890",
                  fontSize: 13,
                  fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 500,
                }}
              >
                The city was asleep. We were completely, embarrassingly awake.
              </span>
            </div>
          </Reveal>

          {/* Story sections */}
          <StorySection
            delay={0}
            accent="#7050c0"
            eyebrow="The Setup"
            headline="A Deserted Road at 1 AM"
            body="No one around. Just the lamplight doing its best, trees minding their own business, and the moon watching with zero shame. Exactly the kind of night we had talked about."
          />

          <StorySection
            delay={0.05}
            accent="#e04880"
            align="right"
            eyebrow="Her Move"
            headline="She Stepped Onto My Foot."
            body="Came close. Placed her foot right on mine. Looked up. Hands on my arms. Standing there like she owned the whole road. Honestly? No defence. Zero. None. I was done."
          />

          <StorySection
            delay={0.05}
            accent="#c03898"
            eyebrow="Two Absolute Wrecks"
            headline="Both Nervous. Both Pretending Not To Be."
            body="Hearts going at a genuinely unreasonable speed. Trying to look calm. Failing completely and visibly. Knowing she was just as gone as I was somehow made it a hundred times better."
          />

          <KissMoment />

          <StorySection
            delay={0.05}
            accent="#d06030"
            align="left"
            eyebrow="Right After"
            headline="Then the Hug. The Long One."
            body="She stayed right there. Arms around. Neither of us moved for a while. The kind of hug where being the first one to let go feels like losing something — so neither of us did."
          />

          <StorySection
            delay={0.05}
            accent="#40a870"
            eyebrow="The Aftermath"
            headline="Our Fantasy. Wonderfully Real."
            body="That deserted road. That ridiculous 1 AM. Everything we'd quietly wanted — finally, stupidly, perfectly real. The moon saw everything and is sworn to secrecy."
          />

          {/* Final quote */}
          <Reveal delay={0.2} className="w-full max-w-lg mt-4">
            <div
              className="relative text-center"
              style={{
                background: "rgba(255,255,255,0.52)",
                backdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.85)",
                borderRadius: 28,
                padding: "40px 32px",
                boxShadow: "0 16px 48px rgba(160,100,200,0.1)",
              }}
            >
              <motion.p
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(19px,4vw,28px)",
                  color: "#3a2060",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                }}
                animate={{ opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                "The night we finally stopped pretending
                <br />
                we weren't going to."
              </motion.p>
              <motion.div
                className="flex justify-center gap-3 mt-5"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {["🌙", "💋", "❤️", "💋", "🌙"].map((e, i) => (
                  <motion.span
                    key={i}
                    style={{ fontSize: 20 }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  >
                    {e}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </Reveal>

          {/* Next chapter button */}
          {onNext && (
            <Reveal delay={0.3} className="mt-10">
              <motion.button
                onClick={onNext}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-full font-medium"
                style={{
                  background: "linear-gradient(135deg,#c040a0,#8050e0)",
                  color: "white",
                  fontSize: 15,
                  fontFamily: "'DM Sans',sans-serif",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(160,80,200,0.3)",
                }}
              >
                Continue the Story →
              </motion.button>
            </Reveal>
          )}
        </div>
      </div>
    </>
  );
}
