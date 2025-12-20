import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=" +
      process.env.GEMINI_API_KEY;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Gemini raw response:", data);
      return res.status(500).json({ error: data.error.message });
    }

    res.json({
      reply: data.candidates[0].content.parts[0].text,
    });
  } catch (error) {
    console.error("GEMINI ERROR:", error);
    res.status(500).json({ error: "AI error occurred" });
  }
});

app.listen(port, () => {
  console.log("Server running on port 5000");
});
