import { useState, useRef, useEffect } from "react";

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const formatText = (text) => {
    return text.split("\n").map((line, i) => (
      <div key={i}>{line}</div>
    ));
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };

    // ✅ FIX: use updated chat
    const updatedChat = [...chat, userMessage];
    setChat(updatedChat);
    setLoading(true);

    try {
      const res = await fetch("https://localhost:44316/gateway/AI/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message,
          history: updatedChat.slice(-6) // 🔥 limit memory
        })
      });

      const data = await res.json();

      const botMessage = {
        sender: "ai",
        text: data.reply
      };

      setChat((prev) => [...prev, botMessage]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { sender: "ai", text: "❌ Error: Unable to fetch response" }
      ]);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>🤖 AI Assistant</h3>

      {/* Chat Window */}
      <div style={styles.chatBox}>
        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: "10px"
            }}
          >
            <div
              style={{
                ...styles.bubble,
                background:
                  msg.sender === "user"
                    ? "linear-gradient(135deg, #4facfe, #00f2fe)"
                    : "#f1f1f1",
                color: msg.sender === "user" ? "#fff" : "#333"
              }}
            >
              {formatText(msg.text)}
            </div>
          </div>
        ))}

        {loading && (
          <p style={styles.loading}>AI is thinking...</p>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* Input */}
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything..."
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />

        <button style={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "420px",
    margin: "40px auto",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    padding: "15px",
    background: "#ffffff",
    fontFamily: "Arial"
  },
  header: {
    textAlign: "center",
    marginBottom: "10px"
  },
  chatBox: {
    height: "350px",
    overflowY: "auto",
    padding: "10px",
    borderRadius: "10px",
    background: "#fafafa",
    border: "1px solid #eee"
  },
  bubble: {
    maxWidth: "75%",
    padding: "10px 14px",
    borderRadius: "15px",
    fontSize: "14px",
    lineHeight: "1.4",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  },
  loading: {
    fontStyle: "italic",
    fontSize: "12px",
    color: "#888",
    marginTop: "5px"
  },
  inputContainer: {
    display: "flex",
    marginTop: "10px"
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none"
  },
  button: {
    marginLeft: "8px",
    padding: "10px 16px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    cursor: "pointer"
  }
};