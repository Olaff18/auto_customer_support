import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./db.js";
import messageRoutes from "./routes/messages.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/messages", messageRoutes);

// Test database connection
sequelize.authenticate()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("✅ Database connection failed:", err));

import Message from "./models/Message.js";

sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Database synced");
});


// TEMP TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is running!");
});


app.listen(4000, () => {
  console.log("Server listening on port 4000");
});

export default app;

// cd server
// node src/app.js
