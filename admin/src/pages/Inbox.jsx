import { useEffect, useState } from "react";
import client from "../api/client";
import { Link } from "react-router-dom";

export default function Inbox() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    client.get("/messages")
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Inbox</h1>

      {messages.map(msg => (
        <div key={msg.id} style={{ marginBottom: 10 }}>
          <Link to={`/message/${msg.id}`}>
            <div>
              <strong>{msg.email}</strong> — {msg.status}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
