import express from "express";
import Message from "../models/Message.js";
import { generateReply } from "../openai.js";

const router = express.Router();

// Get all messages
router.get("/", async (req, res) => {
  const messages = await Message.findAll();
  res.json(messages);
});

// Add new message
router.post("/", async (req, res) => {
  const { customerEmail, text } = req.body;
  const msg = await Message.create({ customerEmail, text });
  res.json(msg);
});

// Save reply to message
router.post("/:id/reply", async (req, res) => {
  const { reply } = req.body;
  const message = await Message.findByPk(req.params.id);
  message.reply = reply;
  message.status = "resolved";
  await message.save();
  res.json(message);
});

router.post("/:id/ai-reply", async (req, res) => {
  const message = await Message.findByPk(req.params.id);

  if (!message) return res.status(404).json({ error: "Message not found" });

  // call OpenAI
  const replyText = await generateReply(message.text);

  res.json({ reply: replyText });
});

// POST /messages/:id/ai-reply
router.post("/:id/ai-reply", async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found" });

    const replyText = await generateReply(message.text);
    res.json({ reply: replyText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate AI reply" });
  }
});

export default router;
