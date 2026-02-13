import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateReply(messageText) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful customer support assistant. Answer briefly and professionally."
        },
        {
          role: "user",
          content: messageText
        },
      ],
      model: "llama-3.3-70b-versatile",  
    });

    return completion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Groq error:", error);
    throw new Error("AI generation failed");
  }
}