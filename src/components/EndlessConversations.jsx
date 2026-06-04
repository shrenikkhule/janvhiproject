import { useEffect, useRef, useState } from "react";
import { ChapterPill, Starfield } from "../SHAREDCOMPONENTS/Starfield";

/* ═══════════════════════════════════════════════
   CHAPTER 2 — Endless Conversations
═══════════════════════════════════════════════ */
export const Chapter2 = ({ onNext, onAchieve }) => {
  const [msgs, setMsgs] = useState([]);
  const [typing, setTyping] = useState(false);
  const [raksh, setRaksh] = useState(false);
  const onAchRef = useRef(onAchieve);
  useEffect(() => {
    onAchRef.current = onAchieve;
  }, [onAchieve]);
  const chatRef = useRef(null);

  const allMsgs = [
    { from: "S", text: " Cannot चा chai Athavte का? 😍", delay: 500 },
    {
      from: "M",
      text: "अरे सांगू नकोस! तेव्हापासून मला झोप नाही 🤤",
      delay: 1600,
    },
    { from: "S", text: "परत जायचं का कधीतरी? 🙈", delay: 2900 },
    { from: "M", text: "उद्या? 😏", delay: 3900 },
    { from: "S", text: "You're crazy 😂😂", delay: 5000 },
    { from: "M", text: "Crazy for chai. And maybe for you 😇", delay: 6200 },
    { from: "S", text: "STOP IT 🫣🫣🫣", delay: 7500 },
    {
      from: "RAKSH",
      text: "GUYS IT'S 1AM PLEASE STOP 😤 मला झोपायचंय!",
      delay: 9000,
    },
    { from: "S", text: "Sorry Raksh 😅 goodnight!", delay: 10000 },
    { from: "M", text: "(DM वर Gappa चालूच) 🤫", delay: 11200 },
  ];

  useEffect(() => {
    const timers = allMsgs.map((m, i) =>
      setTimeout(() => {
        setTyping(true);
        const inner = setTimeout(() => {
          setTyping(false);
          setMsgs((prev) => [...prev, m]);
          if (m.from === "RAKSH") setRaksh(true);
          if (i === allMsgs.length - 1)
            onAchRef.current("Late Night Gappa 🌙", "🌙");
          if (chatRef.current)
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }, 600);
        return inner;
      }, m.delay),
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg,#f0f4ff 0%,#f5e8f5 40%,#fff8f0 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "70px 16px 50px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Starfield count={20} />

      <div
        style={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(196,168,212,.2) 0%,transparent 70%)",
          top: "5%",
          right: "-5%",
          pointerEvents: "none",
        }}
      />

      <div
        className="anim-fadeup"
        style={{ textAlign: "center", marginBottom: 28 }}
      >
        <ChapterPill num="02" color="var(--lavender)" />
        <h1
          className="fc"
          style={{
            fontSize: "clamp(28px,6vw,54px)",
            color: "var(--ink)",
            fontWeight: 700,
          }}
        >
          Endless Conversations
        </h1>
        <p
          style={{
            color: "var(--muted)",
            fontSize: 13,
            marginTop: 6,
            fontStyle: "italic",
          }}
        >
          Time Kami hota... पण गप्पा Khupp
        </p>
      </div>

      {/* Phone mockup */}
      <div
        className="anim-scalein glass"
        style={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 28,
          overflow: "hidden",
          marginBottom: 20,
          animationDelay: ".1s",
          boxShadow: "0 20px 60px rgba(180,100,160,.15)",
        }}
      >
        {/* WhatsApp-style header */}
        <div
          style={{
            background: "linear-gradient(135deg,var(--deep),var(--lavender))",
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            💕
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#fff" }}>
              Shreya & Shrenik
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.75)" }}>
              {typing ? "typing..." : "● online"}
            </div>
          </div>
          <div style={{ marginLeft: "auto", fontSize: 16 }}>📞</div>
        </div>

        {/* Messages */}
        <div
          ref={chatRef}
          style={{
            height: 300,
            overflowY: "auto",
            padding: 14,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            background:
              "linear-gradient(180deg,rgba(253,246,238,.9),rgba(245,232,245,.9))",
          }}
        >
          {msgs.map((m, i) => (
            <div
              key={i}
              className="chat-bub"
              style={{
                display: "flex",
                justifyContent: m.from === "M" ? "flex-end" : "flex-start",
                animationDelay: `${i * 0.05}s`,
              }}
            >
              <div
                style={{
                  maxWidth: "78%",
                  padding: "8px 13px",
                  borderRadius:
                    m.from === "M"
                      ? "16px 16px 4px 16px"
                      : "16px 16px 16px 4px",
                  background:
                    m.from === "M"
                      ? "linear-gradient(135deg,#d4706a,#f4a261)"
                      : m.from === "RAKSH"
                        ? "linear-gradient(135deg,#8b4040,#b06050)"
                        : "rgba(255,255,255,0.9)",
                  color:
                    m.from === "M" || m.from === "RAKSH"
                      ? "#fff"
                      : "var(--ink)",
                  fontSize: 13,
                  lineHeight: 1.55,
                  boxShadow: "0 2px 8px rgba(0,0,0,.08)",
                }}
              >
                {m.from === "RAKSH" && (
                  <div
                    style={{
                      fontSize: 9,
                      color: "#ffccc0",
                      marginBottom: 2,
                      fontWeight: 700,
                    }}
                  >
                    RAKSHAA 😤
                  </div>
                )}
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div
              style={{
                alignSelf: "flex-start",
                background: "rgba(255,255,255,.85)",
                borderRadius: 14,
                padding: "8px 14px",
                boxShadow: "0 2px 8px rgba(0,0,0,.08)",
              }}
            >
              {[0, 1, 2].map((k) => (
                <span
                  key={k}
                  style={{
                    display: "inline-block",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--rose)",
                    margin: "0 2px",
                    animation: `shimmer 1s ${k * 0.2}s ease-in-out infinite`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {raksh && (
        <div
          className="anim-fadeup glass-rose"
          style={{
            borderRadius: 16,
            padding: "14px 20px",
            maxWidth: 340,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          <div style={{ fontSize: 28, marginBottom: 6 }}>😤</div>
          <p
            style={{ fontSize: 12, color: "var(--deep)", fontStyle: "italic" }}
          >
            "कुठेतरी Raksha झोपायचा प्रयत्न करत Hoti... Failed."
          </p>
        </div>
      )}

      {msgs.length === allMsgs.length && (
        <button
          className="anim-fadeup"
          onClick={onNext}
          style={{
            background: "linear-gradient(135deg,var(--lavender),var(--deep))",
            border: "none",
            color: "#fff",
            padding: "13px 38px",
            borderRadius: 50,
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 14,
            boxShadow: "0 8px 24px rgba(196,168,212,.4)",
          }}
        >
          Chapter 3 →
        </button>
      )}
    </div>
  );
};
