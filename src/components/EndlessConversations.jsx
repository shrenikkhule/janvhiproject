import { useEffect, useRef, useState, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   CHAPTER 2 — Endless Conversations
   Drop-in replacement — same props as original:
     { onNext, onAchieve }
   Shared components (ChapterPill, Starfield) are no longer
   needed — everything is self-contained here.
═══════════════════════════════════════════════════════════════ */

const MSGS = [
  { from: "S", text: "Cannot चा chai Athavte का? 😍", time: "12:47 AM" },
  {
    from: "M",
    text: "अरे सांगू नकोस! तेव्हापासून मला झोप नाही 🤤",
    time: "12:48 AM",
  },
  { from: "S", text: "परत जायचं का कधीतरी? 🙈", time: "12:49 AM" },
  { from: "M", text: "उद्या? 😏", time: "12:49 AM" },
  { from: "S", text: "You're crazy 😂😂", time: "12:50 AM" },
  { from: "M", text: "Crazy for chai. And maybe for you 😇", time: "12:51 AM" },
  { from: "S", text: "STOP IT 🫣🫣🫣", time: "12:51 AM" },
  {
    from: "RAKSH",
    text: "GUYS IT'S 1AM PLEASE STOP 😤 मला झोपायचंय!",
    time: "1:00 AM",
  },
  { from: "S", text: "Sorry Raksh 😅 goodnight!", time: "1:00 AM" },
  { from: "M", text: "(DM वर Gappa चालूच) 🤫", time: "1:01 AM" },
];

const DELAYS = [600, 1800, 3200, 4300, 5500, 6800, 8100, 10000, 11100, 12400];

const FLOATERS = [
  { em: "💬", x: 8, y: 18, dur: 5.2, delay: 0, size: 28 },
  { em: "☕", x: 88, y: 12, dur: 6.1, delay: 1.2, size: 32 },
  { em: "🌙", x: 5, y: 62, dur: 7.0, delay: 0.5, size: 24 },
  { em: "✨", x: 92, y: 55, dur: 4.8, delay: 2.0, size: 22 },
  { em: "💕", x: 14, y: 82, dur: 6.5, delay: 0.8, size: 30 },
  { em: "😂", x: 84, y: 78, dur: 5.5, delay: 1.6, size: 26 },
  { em: "🫣", x: 50, y: 6, dur: 8.0, delay: 3.0, size: 20 },
  { em: "💬", x: 75, y: 30, dur: 5.8, delay: 2.5, size: 18 },
];

const AVATAR_COLORS = {
  S: { bg: "#E8735A", label: "S" },
  M: { bg: "#5C3D7A", label: "M" },
  RAKSH: { bg: "#B04050", label: "R" },
};

function Avatar({ from }) {
  const av = AVATAR_COLORS[from] || AVATAR_COLORS.S;
  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: av.bg,
        color: "#fff",
        fontSize: 11,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,.18)",
      }}
    >
      {av.label}
    </div>
  );
}

function TypingDots() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 3,
        background: "rgba(255,255,255,.92)",
        borderRadius: "16px 16px 16px 4px",
        padding: "9px 14px",
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
        width: "fit-content",
      }}
    >
      {[0, 1, 2].map((k) => (
        <span
          key={k}
          style={{
            display: "inline-block",
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#B0A0C0",
            animation: `typingBounce 1.1s ${k * 0.18}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

function ChatBubble({ msg, isNew }) {
  const isMe = msg.from === "M";
  const isRaksh = msg.from === "RAKSH";
  const isOther = msg.from === "S";

  const bubbleStyle = {
    maxWidth: "76%",
    padding: "9px 13px 7px",
    borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
    fontSize: 13,
    lineHeight: 1.55,
    position: "relative",
    boxShadow: "0 2px 8px rgba(0,0,0,.09)",
    ...(isMe
      ? { background: "linear-gradient(135deg,#E8735A,#C0507A)", color: "#fff" }
      : isRaksh
        ? {
            background: "linear-gradient(135deg,#7A2840,#B04050)",
            color: "#fff",
          }
        : { background: "rgba(255,255,255,.95)", color: "#2D1B3D" }),
    animation: isNew
      ? "bubbleIn 0.35s cubic-bezier(.22,1.4,.36,1) forwards"
      : "none",
    opacity: isNew ? 0 : 1,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMe ? "row-reverse" : "row",
        alignItems: "flex-start",
        gap: 7,
        marginBottom: 6,
      }}
    >
      {!isMe && <Avatar from={msg.from} />}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isMe ? "flex-end" : "flex-start",
        }}
      >
        {isRaksh && (
          <div
            style={{
              fontSize: 9,
              color: "#B04050",
              fontWeight: 800,
              marginBottom: 2,
              letterSpacing: 1,
            }}
          >
            RAKSHAA 😤
          </div>
        )}
        <div style={bubbleStyle}>
          {msg.text}
          <div
            style={{
              fontSize: 9.5,
              marginTop: 3,
              opacity: 0.65,
              textAlign: "right",
              color: isMe || isRaksh ? "rgba(255,255,255,.8)" : "#9070A0",
            }}
          >
            {msg.time} {isMe && "✓✓"}
          </div>
        </div>
      </div>
    </div>
  );
}

export const Chapter2 = ({ onNext, onAchieve }) => {
  const [msgs, setMsgs] = useState([]);
  const [typing, setTyping] = useState(false);
  const [newIdx, setNewIdx] = useState(-1);
  const [rakshVisible, setRakshVisible] = useState(false);
  const [done, setDone] = useState(false);
  const chatRef = useRef(null);
  const onAchRef = useRef(onAchieve);
  useEffect(() => {
    onAchRef.current = onAchieve;
  }, [onAchieve]);

  useEffect(() => {
    const timers = [];
    MSGS.forEach((m, i) => {
      const t1 = setTimeout(() => setTyping(true), DELAYS[i]);
      const t2 = setTimeout(() => {
        setTyping(false);
        setMsgs((prev) => [...prev, m]);
        setNewIdx(i);
        if (m.from === "RAKSH") setRakshVisible(true);
        if (i === MSGS.length - 1) {
          onAchRef.current?.("Late Night Gappa 🌙", "🌙");
          setDone(true);
        }
        setTimeout(() => {
          if (chatRef.current)
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }, 50);
      }, DELAYS[i] + 700);
      timers.push(t1, t2);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Nunito:wght@400;600;700&display=swap');
        @keyframes typingBounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
        @keyframes bubbleIn { from{opacity:0;transform:scale(0.88) translateY(6px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes floatEmoji { 0%,100%{transform:translateY(0) rotate(-4deg)} 50%{transform:translateY(-14px) rotate(6deg)} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideInLeft { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes titleReveal { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes phoneShadowPulse { 0%,100%{box-shadow:0 32px 80px rgba(92,61,122,.22),0 8px 24px rgba(232,115,90,.12)} 50%{box-shadow:0 36px 90px rgba(92,61,122,.30),0 10px 30px rgba(232,115,90,.18)} }
        @keyframes rakshBounce { 0%{opacity:0;transform:translateX(-30px) rotate(-2deg)} 60%{transform:translateX(4px) rotate(1deg)} 100%{opacity:1;transform:translateX(0) rotate(0deg)} }
        @keyframes notifPing { 0%{transform:scale(1)} 50%{transform:scale(1.25)} 100%{transform:scale(1)} }
        .ch2-wrap * { box-sizing: border-box; }
      `}</style>

      <div
        className="ch2-wrap"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(145deg,#FFF5EE 0%,#FDE8F0 35%,#EDE4FF 65%,#FFF8F0 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "56px 16px 60px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(232,115,90,.13) 0%,transparent 70%)",
            top: "-8%",
            right: "-10%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 340,
            height: 340,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(92,61,122,.10) 0%,transparent 70%)",
            bottom: "5%",
            left: "-8%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(255,200,180,.18) 0%,transparent 70%)",
            top: "30%",
            left: "5%",
            pointerEvents: "none",
          }}
        />

        {/* Floating emoji atmosphere */}
        {FLOATERS.map((f, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${f.x}%`,
              top: `${f.y}%`,
              fontSize: f.size,
              pointerEvents: "none",
              userSelect: "none",
              animation: `floatEmoji ${f.dur}s ${f.delay}s ease-in-out infinite`,
              opacity: 0.22,
            }}
          >
            {f.em}
          </div>
        ))}

        {/* Chapter label */}
        <div
          style={{
            animation: "titleReveal .7s .1s cubic-bezier(.22,1,.36,1) both",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(135deg,#E8735A,#C0507A)",
              borderRadius: 50,
              padding: "5px 18px 5px 12px",
              marginBottom: 14,
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,.25)",
                borderRadius: "50%",
                width: 22,
                height: 22,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              02
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#fff",
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              Endless Conversations
            </span>
          </div>
        </div>

        {/* Big title */}
        <div
          style={{
            animation: "titleReveal .8s .2s cubic-bezier(.22,1,.36,1) both",
            textAlign: "center",
            marginBottom: 6,
          }}
        >
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(30px,6.5vw,58px)",
              lineHeight: 1.1,
              background:
                "linear-gradient(135deg,#5C3D7A 0%,#E8735A 55%,#C0507A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
            }}
          >
            Late Night
            <br />
            Gappa 🌙
          </h1>
        </div>

        <div
          style={{
            animation: "titleReveal .8s .32s cubic-bezier(.22,1,.36,1) both",
            textAlign: "center",
            marginBottom: 36,
          }}
        >
          <p
            style={{
              fontFamily: "'Nunito',sans-serif",
              color: "#9070A0",
              fontSize: 14,
              fontStyle: "italic",
              margin: 0,
            }}
          >
            Time Kami hota... पण गप्पा Khupp ✨
          </p>
        </div>

        {/* ── PHONE FRAME ── */}
        <div
          style={{
            width: "100%",
            maxWidth: 370,
            background: "#1A1A2E",
            borderRadius: 44,
            overflow: "hidden",
            animation:
              "fadeSlideUp .9s .4s cubic-bezier(.22,1,.36,1) both, phoneShadowPulse 4s 1.5s ease-in-out infinite",
            border: "8px solid #2A2040",
            position: "relative",
            zIndex: 2,
            marginBottom: 28,
          }}
        >
          {/* Phone status bar */}
          <div
            style={{
              background: "#128C7E",
              padding: "10px 20px 6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,.9)",
                fontSize: 11,
                fontFamily: "'Nunito',sans-serif",
                fontWeight: 700,
              }}
            >
              1:01 AM
            </span>
            <div
              style={{
                width: 90,
                height: 16,
                background: "#1A1A2E",
                borderRadius: 12,
                margin: "0 auto",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <span style={{ color: "rgba(255,255,255,.85)", fontSize: 10 }}>
                ●●●●
              </span>
              <span style={{ color: "rgba(255,255,255,.85)", fontSize: 10 }}>
                WiFi
              </span>
              <span style={{ color: "rgba(255,255,255,.85)", fontSize: 10 }}>
                🔋
              </span>
            </div>
          </div>

          {/* WhatsApp header */}
          <div
            style={{
              background: "linear-gradient(135deg,#0F9B8E,#128C7E)",
              padding: "10px 14px 12px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.8)" }}>←</div>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#E8735A,#C0507A)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                boxShadow: "0 2px 8px rgba(0,0,0,.3)",
                flexShrink: 0,
              }}
            >
              💕
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#fff",
                  fontFamily: "'Nunito',sans-serif",
                }}
              >
                Shreya, Shrenik &amp; Raksha
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,.78)",
                  fontFamily: "'Nunito',sans-serif",
                }}
              >
                {typing ? "Shrenik is typing..." : "3 members"}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: 16,
                fontSize: 16,
                color: "rgba(255,255,255,.9)",
              }}
            >
              <span>📞</span>
              <span>⋮</span>
            </div>
          </div>

          {/* Chat wallpaper + messages */}
          <div
            ref={chatRef}
            style={{
              height: 340,
              overflowY: "auto",
              padding: "12px 12px 8px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              background: "linear-gradient(180deg,#ECE5DD 0%,#E5DDD3 100%)",
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8b8a2' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          >
            {/* Date separator */}
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <span
                style={{
                  background: "rgba(255,255,255,.72)",
                  borderRadius: 8,
                  padding: "3px 12px",
                  fontSize: 11,
                  color: "#7A6A5A",
                  fontFamily: "'Nunito',sans-serif",
                }}
              >
                TODAY
              </span>
            </div>

            {msgs.map((m, i) => (
              <ChatBubble key={i} msg={m} isNew={i === newIdx} />
            ))}
            {typing && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 7,
                  marginBottom: 4,
                }}
              >
                <Avatar
                  from={
                    msgs.length > 0 && msgs[msgs.length - 1]?.from === "M"
                      ? "S"
                      : "M"
                  }
                />
                <TypingDots />
              </div>
            )}
          </div>

          {/* Input bar */}
          <div
            style={{
              background: "#F0F0F0",
              padding: "8px 10px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                flex: 1,
                background: "#fff",
                borderRadius: 22,
                padding: "9px 14px",
                fontSize: 13,
                color: "#B0A0B8",
                fontFamily: "'Nunito',sans-serif",
              }}
            >
              Type a message…
            </div>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "#128C7E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                color: "#fff",
              }}
            >
              🎤
            </div>
          </div>
        </div>

        {/* Raksha complaint card */}
        {rakshVisible && (
          <div
            style={{
              animation: "rakshBounce .6s cubic-bezier(.22,1.4,.36,1) both",
              background:
                "linear-gradient(135deg,rgba(255,255,255,.88),rgba(255,232,235,.9))",
              backdropFilter: "blur(12px)",
              border: "1.5px solid rgba(200,80,100,.18)",
              borderRadius: 20,
              padding: "16px 22px",
              maxWidth: 340,
              width: "100%",
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
              boxShadow: "0 8px 32px rgba(176,64,80,.12)",
              marginBottom: 28,
            }}
          >
            <div style={{ fontSize: 34, lineHeight: 1, flexShrink: 0 }}>😤</div>
            <div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 13,
                  color: "#7A2840",
                  marginBottom: 4,
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                }}
              >
                Rakshaa had enough
              </div>
              <p
                style={{
                  fontSize: 12.5,
                  color: "#5C3D4A",
                  fontStyle: "italic",
                  margin: 0,
                  lineHeight: 1.6,
                  fontFamily: "'Nunito',sans-serif",
                }}
              >
                "कुठेतरी Raksha झोपायचा प्रयत्न करत Hoti... Failed. Again. 😑"
              </p>
            </div>
          </div>
        )}

        {/* Achievement badge */}
        {done && (
          <div
            style={{
              animation: "fadeSlideUp .7s cubic-bezier(.22,1,.36,1) both",
              background:
                "linear-gradient(135deg,rgba(255,255,255,.9),rgba(237,228,255,.9))",
              backdropFilter: "blur(16px)",
              border: "1.5px solid rgba(92,61,122,.2)",
              borderRadius: 16,
              padding: "12px 22px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 28,
              maxWidth: 340,
              width: "100%",
              boxShadow: "0 8px 28px rgba(92,61,122,.12)",
            }}
          >
            <div
              style={{
                fontSize: 26,
                animation: "notifPing 1.8s ease-in-out infinite",
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              🌙
            </div>
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#9070A0",
                  textTransform: "uppercase",
                  letterSpacing: 1.2,
                  marginBottom: 2,
                }}
              >
                Achievement Unlocked
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#5C3D7A",
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                }}
              >
                Late Night Gappa 🌙
              </div>
            </div>
          </div>
        )}

        {/* Next chapter button */}
        {done && (
          <button
            onClick={onNext}
            style={{
              animation: "fadeSlideUp .7s .15s cubic-bezier(.22,1,.36,1) both",
              background: "linear-gradient(135deg,#5C3D7A,#E8735A)",
              border: "none",
              color: "#fff",
              padding: "14px 44px",
              borderRadius: 50,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 15,
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              boxShadow: "0 10px 30px rgba(92,61,122,.35)",
              letterSpacing: 0.3,
              transition: "transform .15s, box-shadow .15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow =
                "0 14px 36px rgba(92,61,122,.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(92,61,122,.35)";
            }}
          >
            Chapter 3 →
          </button>
        )}
      </div>
    </>
  );
};

export default Chapter2;
