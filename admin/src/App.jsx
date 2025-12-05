import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");

  // fetch messages from backend
  useEffect(() => {
    fetch("http://localhost:4000/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  const sendReply = async () => {
    await fetch(`http://localhost:4000/messages/${selected.id}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply }),
    });

    alert("Reply sent!");
    setReply("");
    setSelected(null);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>Inbox</h2>

        {messages.map((m) => (
          <div
            key={m.id}
            className={`message-item ${
              selected?.id === m.id ? "active" : ""
            }`}
            onClick={() => setSelected(m)}
          >
            <p><strong>{m.customerEmail}</strong></p>
            <p className="preview">{m.text.slice(0, 40)}...</p>
            <span className={`status ${m.status}`}>
              {m.status}
            </span>
          </div>
        ))}
      </div>

      <div className="content">
        {selected ? (
          <>
            <h2>Message from {selected.customerEmail}</h2>
            <p className="full-message">{selected.text}</p>

            <h3>Your Reply:</h3>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write your response..."
            />

            <button onClick={sendReply}>Send Reply</button>
          </>
        ) : (
          <p>Select a message from the left.</p>
        )}
      </div>
    </div>
  );
}

export default App;

// cd admin
// npm start
