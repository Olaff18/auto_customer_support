import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../api/client";

export default function MessageDetail() {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    client.get(`/messages/${id}`)
      .then(res => setMessage(res.data))
      .catch(err => console.error(err));
  }, [id]);

  async function handleSendReply() {
    await client.post(`/messages/${id}/reply`, { reply });
    alert("Reply sent!");
  }

  async function handleGenerateAIReply() {
    const res = await client.post(`/messages/${id}/generate-ai-reply`);
    setReply(res.data.reply);
  }

  if (!message) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Message from {message.email}</h1>
      <p>{message.text}</p>

      <h3>Your Reply</h3>
      <textarea
        style={{ width: "100%", height: 120 }}
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      />

      <div style={{ marginTop: 20 }}>
        <button onClick={handleGenerateAIReply}>⚡ Generate AI Reply</button>
        <button onClick={handleSendReply} style={{ marginLeft: 10 }}>
          Send Reply
        </button>
      </div>
    </div>
  );
}
