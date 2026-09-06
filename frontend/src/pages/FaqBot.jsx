import { useEffect, useState } from "react";
import "./FaqBot.css";

import farm1 from "../assets/farm1.jpg";
import farm2 from "../assets/farm2.jpg";
import farm3 from "../assets/farm3.jpg";
import farm4 from "../assets/farm4.jpg";
import farm5 from "../assets/farm5.jpg";

function FaqBot() {
  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Vanakkam! 👋 I'm your Harvest & Co. support assistant. Ask me anything about orders, delivery, payments, stock, or returns."
    }
  ]);

  const [loading, setLoading] = useState(false);

  // Background slideshow
  const farmImages = [
  farm4,
  farm2,
  farm1,
  farm3,
  farm5
];

  const [backgroundIndex, setBackgroundIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prev) =>
        prev === farmImages.length - 1 ? 0 : prev + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [farmImages.length]);

  const askQuestion = async () => {
    if (!question.trim() || loading) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: userQuestion
      }
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/ai/faq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question: userQuestion
        })
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: data.answer
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Sorry, something went wrong. Please try again."
        }
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      askQuestion();
    }
  };

  const selectSuggestion = (text) => {
    setQuestion(text);
  };

  return (
    <div className="faq-page">

      {/* CINEMATIC BACKGROUND */}
      <div
        className="faq-background"
        style={{
          backgroundImage: `url(${farmImages[backgroundIndex]})`
        }}
      />

      {/* DARK OVERLAY */}
      <div className="faq-overlay" />

      {/* FLOATING ELEMENTS */}
      <div className="floating-leaf leaf-one">🌿</div>
      <div className="floating-leaf leaf-two">🍃</div>
      <div className="floating-leaf leaf-three">🌱</div>

      <div className="faq-wrapper">

        {/* LEFT BRAND PANEL */}

        <div className="faq-side-panel">

          <div className="support-brand">

            <div className="support-avatar">
              🤖
            </div>

            <div>
              <span className="small-label">
                HARVEST INTELLIGENCE
              </span>

              <h2>
                Harvest <span>Support</span>
              </h2>
            </div>

          </div>

          <div className="side-content">

            <h1>
              We're here to help your
              <span> farming journey.</span>
            </h1>

            <p>
              Get instant assistance for orders, delivery,
              payments, product availability and more.
            </p>

          </div>

          <div className="support-status">

            <span className="status-dot"></span>

            AI SUPPORT ONLINE

          </div>

          <div className="support-info">

            <div>
              ⚡
              <span>Instant responses</span>
            </div>

            <div>
              🌾
              <span>Farm focused support</span>
            </div>

            <div>
              🛒
              <span>Order assistance</span>
            </div>

          </div>

        </div>


        {/* CHAT PANEL */}

        <div className="faq-container">

          {/* HEADER */}

          <div className="faq-header">

            <div className="header-left">

              <div className="bot-icon">
                🤖
              </div>

              <div>

                <span className="header-label">
                  HARVEST & CO.
                </span>

                <h2>
                  Customer Support
                </h2>

                <p>
                  Ask anything about your experience
                </p>

              </div>

            </div>


            <div className="online-status">

              <span></span>

              Online

            </div>

          </div>


          {/* CHAT */}

          <div className="chat-area">

            <div className="chat-glow"></div>

            {messages.map((message, index) => (

              <div
                key={index}
                className={`message-row ${message.type}`}
              >

                {message.type === "bot" && (

                  <div className="mini-avatar">
                    🤖
                  </div>

                )}

                <div className="message">

                  {message.text}

                  <div className="message-time">

                    {message.type === "bot"
                      ? "Harvest AI"
                      : "You"}

                  </div>

                </div>

              </div>

            ))}


            {loading && (

              <div className="message-row bot">

                <div className="mini-avatar">
                  🤖
                </div>

                <div className="message typing">

                  <span></span>
                  <span></span>
                  <span></span>

                </div>

              </div>

            )}

          </div>


          {/* SUGGESTIONS */}

          <div className="suggestions">

            <button
              onClick={() =>
                selectSuggestion(
                  "What happens if I order more products than available stock?"
                )
              }
            >
              📦 Stock availability
            </button>


            <button
              onClick={() =>
                selectSuggestion(
                  "How can I track my order?"
                )
              }
            >
              🚚 Track order
            </button>


            <button
              onClick={() =>
                selectSuggestion(
                  "What payment methods are available?"
                )
              }
            >
              💳 Payments
            </button>

          </div>


          {/* INPUT */}

          <div className="chat-input-area">

            <div className="input-icon">
              ✨
            </div>

            <input
              type="text"
              placeholder="Ask about orders, delivery, payments..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              onClick={askQuestion}
              disabled={loading}
            >

              <span>
                {loading ? "Thinking..." : "Send"}
              </span>

              {!loading && "➤"}

            </button>

          </div>


          <div className="powered-by">

            ✦ Powered by Harvest Intelligence

          </div>

        </div>


        {/* RIGHT FARM CARD */}

        <div className="farm-quote-card">

          <div className="quote-icon">
            🌱
          </div>

          <p>
            Smart farming today for a
            better tomorrow.
          </p>

          <div className="quote-line"></div>

          <span>
            HARVEST & CO.
          </span>

        </div>

      </div>

    </div>
  );
}

export default FaqBot;