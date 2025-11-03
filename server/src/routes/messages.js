import express from "express";
import Message from "../models/Message.js";

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

export default router;
