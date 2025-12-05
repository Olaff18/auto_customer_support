import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI();

export async function generateReply(messageText) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini", // moze "gpt-3.5-turbo"
    messages: [
      {
        role: "system",
        content: "You are a helpful customer support assistant."
      },
      {
        role: "user",
        content: messageText
      }
    ]
  });

  return response.choices[0].message.content;
}
