# 🤖 AI Customer Support System

A full-stack AI-powered customer support dashboard that allows administrators to manage customer messages and generate automated replies using a Large Language Model (LLM).

This project demonstrates backend API development, database modeling, frontend integration, and external AI service integration.

---

## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL (NeonDB)
- Sequelize ORM
- Groq API (LLama 3.3 70B)
- dotenv

### Frontend
- React
- Fetch API

### AI Model
- `llama-3.3-70b-versatile` (via Groq SDK)

---

## 📦 Features

### Admin Dashboard
- View all customer messages
- See message status (new / resolved)
- Open message details
- Write manual reply
- Generate AI-powered reply
- Save reply to database

### Backend API
- RESTful routes for messages
- Database synchronization
- AI reply generation endpoint
- Error handling & validation

---

## 🧠 AI Integration

AI replies are generated using Groq’s SDK:

```js
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
        }
      ],
      model: "llama-3.3-70b-versatile"
    });

    return completion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Groq error:", error);
    throw new Error("AI generation failed");
  }
}
```

---

## 🗂 Project Structure

```
auto_customer_support/
│
├── server/
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── ai.js
│   │   └── app.js
│   ├── package.json
│   └── .env
│
└── admin/
    ├── src/
    └── package.json
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```
git clone <your-repo-url>
cd auto_customer_support
```

---

### 2️⃣ Backend Setup

```
cd server
npm install
```

Create `.env` file:

```
DATABASE_URL=your_postgres_connection_string
GROQ_API_KEY=your_groq_api_key
```

Start backend:

```
node src/app.js
```

---

### 3️⃣ Frontend Setup

```
cd admin
npm install
npm start
```

App runs on:

```
http://localhost:3000
```

Backend runs on:

```
http://localhost:4000
```

---

## 🔌 API Endpoints

### Get all messages

```
GET /messages
```

### Get message by ID

```
GET /messages/:id
```

### Generate AI reply

```
POST /messages/:id/ai-reply
```

### Save reply

```
PUT /messages/:id/reply
```

---

## 🎯 Learning Outcomes

This project demonstrates:

- Designing REST APIs
- Database schema modeling
- ORM usage with Sequelize
- Integrating external AI APIs
- Handling asynchronous operations
- Building a full-stack React + Node application
- Managing environment variables securely

---

## 📈 Future Improvements

- Add authentication (admin login)
- Add pagination
- Add message search
- Add AI confidence score
- Add logging & monitoring
- Deploy to cloud (Render / Railway / Vercel)

---

## 🧑‍💻 Author

Built as a portfolio project to demonstrate backend, database, and AI integration skills.

---

## 📜 License

MIT License

