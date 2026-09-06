import { useEffect, useRef, useState } from "react";
import "./Chatbot.css";

import farm1 from "../assets/farm1.jpg";
import farm2 from "../assets/farm2.jpg";
import farm3 from "../assets/farm3.jpg";
import farm4 from "../assets/farm4.jpg";
import farm5 from "../assets/farm5.jpg";

export default function Chatbot() {
  const farmImages = [farm4, farm2, farm1, farm3, farm5];

  const [currentImage, setCurrentImage] = useState(0);
  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      type: "bot",
      text:
        "Vanakkam! 👋 I'm Harvest AI, your South Indian farming assistant. Ask me about paddy, ragi, maize, groundnut, banana, chilli, coconut, irrigation, pests, fertilizers and more.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  /* BACKGROUND SLIDESHOW */

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % farmImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  /* AUTO SCROLL */

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  /* ASK AI */

  const askQuestion = async (customQuestion = null) => {
    const userQuestion = customQuestion || question;

    if (!userQuestion.trim() || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8000/ai/chatbot",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            question: userQuestion,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text:
            data.answer ||
            "Sorry, I couldn't find an answer for that.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text:
            "⚠️ Unable to connect to Harvest AI. Please make sure the backend server is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* ENTER KEY */

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      askQuestion();
    }
  };

  /* SUGGESTIONS */

  const suggestions = [
    {
      icon: "🌾",
      text: "How do I cultivate paddy?",
    },

    {
      icon: "🌶️",
      text: "How can I control thrips in chilli?",
    },

    {
      icon: "🌱",
      text: "How do I cultivate ragi?",
    },

    {
      icon: "💧",
      text: "What irrigation method saves water?",
    },
  ];

  return (
    <div className="harvest-page">

      {/* ========================= */}
      {/* FARM BACKGROUND */}
      {/* ========================= */}

      <div className="farm-background">
        {farmImages.map((image, index) => (
          <div
            key={index}
            className={`farm-image ${
              index === currentImage ? "active" : ""
            }`}
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
        ))}
      </div>

      <div className="farm-overlay" />

      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {/* ========================= */}
      {/* MAIN APP */}
      {/* ========================= */}

      <div className="harvest-app">

        {/* ========================= */}
        {/* LEFT SIDEBAR */}
        {/* ========================= */}

        <aside className="harvest-sidebar">

          <div className="brand">

            <div className="brand-avatar">

              <div className="avatar-ring">
                🤖
              </div>

              <span className="avatar-status" />

            </div>

            <div>

              <h2>Harvest AI</h2>

              <p>
                South India Farming Intelligence
              </p>

            </div>

          </div>


          <div className="sidebar-divider" />


          <div className="sidebar-section">

            <p className="sidebar-label">
              EXPLORE KNOWLEDGE
            </p>


            <div className="knowledge-list">

              <button
                className="knowledge-item"
                onClick={() =>
                  askQuestion("Tell me about paddy cultivation")
                }
                disabled={loading}
              >
                <span>🌾</span>
                Paddy & Rice
              </button>


              <button
                className="knowledge-item"
                onClick={() =>
                  askQuestion("Tell me about ragi and millet cultivation")
                }
                disabled={loading}
              >
                <span>🌱</span>
                Millets & Ragi
              </button>


              <button
                className="knowledge-item"
                onClick={() =>
                  askQuestion("How can I protect my crops from pests?")
                }
                disabled={loading}
              >
                <span>🌶️</span>
                Crop Protection
              </button>


              <button
                className="knowledge-item"
                onClick={() =>
                  askQuestion("What irrigation methods are best for farming?")
                }
                disabled={loading}
              >
                <span>💧</span>
                Irrigation
              </button>


              <button
                className="knowledge-item"
                onClick={() =>
                  askQuestion("Give me fertilizer guidance for crops")
                }
                disabled={loading}
              >
                <span>🧪</span>
                Fertilizer Guidance
              </button>

            </div>

          </div>


          <div className="sidebar-bottom">

            <div className="ai-status-card">

              <div className="status-icon">
                🌱
              </div>

              <div>

                <strong>
                  AI Knowledge Ready
                </strong>

                <span>
                  Agriculture guidance for South India
                </span>

              </div>

            </div>

          </div>

        </aside>


        {/* ========================= */}
        {/* MAIN CHAT */}
        {/* ========================= */}

        <main className="harvest-main">


          {/* HEADER */}

          <header className="harvest-header">

            <div>

              <div className="header-tag">

                <span className="pulse-dot" />

                HARVEST INTELLIGENCE

              </div>


              <h1>
                Your Farming
                <span> Co-Pilot</span>
              </h1>


              <p>
                Practical agricultural guidance powered by
                intelligent farming knowledge.
              </p>

            </div>


            <div className="header-focus-card">

              <span className="focus-icon">
                🌿
              </span>

              <div>

                <strong>
                  South India Focus
                </strong>

                <small>
                  Crops • Soil • Water • Protection
                </small>

              </div>

            </div>

          </header>


          {/* ========================= */}
          {/* QUICK QUESTIONS */}
          {/* ========================= */}

          <section className="quick-section">

            <p>TRY ASKING</p>


            <div className="suggestion-grid">

              {suggestions.map((suggestion, index) => (

                <button
                  key={index}
                  className="suggestion-chip"
                  onClick={() =>
                    askQuestion(suggestion.text)
                  }
                  disabled={loading}
                >

                  <span>
                    {suggestion.icon}
                  </span>

                  {suggestion.text}

                </button>

              ))}

            </div>

          </section>


          {/* ========================= */}
          {/* CHAT PANEL */}
          {/* ========================= */}

          <section className="chat-glass-panel">


            {/* CHAT HEADER */}

            <div className="chat-topbar">

              <div className="chat-ai-info">

                <div className="small-ai-avatar">
                  🤖
                </div>


                <div>

                  <strong>
                    Harvest AI Assistant
                  </strong>


                  <span>

                    <i />

                    Online & ready to help

                  </span>

                </div>

              </div>


              <div className="chat-badge">
                🌾 FARMING MODE
              </div>

            </div>


            {/* MESSAGES */}

            <div className="chat-messages">

              {messages.map((message, index) => (

                <div
                  key={index}
                  className={`chat-row ${
                    message.type === "user"
                      ? "user-row"
                      : "bot-row"
                  }`}
                >

                  {message.type === "bot" && (

                    <div className="message-avatar">
                      🤖
                    </div>

                  )}


                  <div
                    className={`chat-bubble ${
                      message.type === "user"
                        ? "user-bubble"
                        : "bot-bubble"
                    }`}
                  >

                    {message.text}

                  </div>

                </div>

              ))}


              {loading && (

                <div className="chat-row bot-row">

                  <div className="message-avatar">
                    🤖
                  </div>


                  <div className="typing-bubble">

                    <span />
                    <span />
                    <span />

                  </div>

                </div>

              )}

              <div ref={chatEndRef} />

            </div>


            {/* INPUT */}

            <div className="chat-input-wrapper">

              <div className="chat-input-box">

                <span className="input-leaf">
                  🌱
                </span>


                <input
                  type="text"
                  value={question}
                  placeholder="Ask anything about your farm..."
                  onChange={(event) =>
                    setQuestion(event.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                />


                <button
                  className="send-button"
                  onClick={() => askQuestion()}
                  disabled={
                    loading ||
                    !question.trim()
                  }
                >

                  {loading ? (

                    <span className="send-loader" />

                  ) : (

                    <>
                      Send
                      <span>➜</span>
                    </>

                  )}

                </button>

              </div>

            </div>

          </section>


          {/* FOOT NOTE */}

          <div className="harvest-footer-note">

            🌿 Harvest AI uses your agricultural knowledge base.
            For serious crop disease or chemical decisions,
            consult a local agricultural expert.

          </div>

        </main>

      </div>

    </div>
  );
}