import { useState } from "react";
import { askFarmingBot, askCustomerBot } from "../api/ai";

function Chatbot({ type = "farming" }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!question.trim() || loading) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userQuestion },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response =
        type === "farming"
          ? await askFarmingBot(userQuestion)
          : await askCustomerBot(userQuestion);

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: response.answer },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2>
        {type === "farming"
          ? "🌾 Farming Assistant"
          : "🛒 Customer Support"}
      </h2>

      <div style={styles.chatBox}>
        {messages.length === 0 && (
          <p>
            {type === "farming"
              ? "Ask me anything about farming!"
              : "How can I help you with the marketplace?"}
          </p>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            style={
              message.sender === "user"
                ? styles.userMessage
                : styles.botMessage
            }
          >
            {message.text}
          </div>
        ))}

        {loading && (
          <div style={styles.botMessage}>
            Thinking...
          </div>
        )}
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={question}
          placeholder="Type your question..."
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "500px",
    margin: "30px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
  },

  chatBox: {
    height: "400px",
    overflowY: "auto",
    padding: "10px",
    border: "1px solid #eee",
    marginBottom: "15px",
  },

  userMessage: {
    background: "#DCF8C6",
    padding: "10px",
    borderRadius: "10px",
    margin: "8px",
    marginLeft: "80px",
  },

  botMessage: {
    background: "#f1f1f1",
    padding: "10px",
    borderRadius: "10px",
    margin: "8px",
    marginRight: "80px",
    whiteSpace: "pre-wrap",
  },

  inputContainer: {
    display: "flex",
    gap: "10px",
  },
};

export default Chatbot;