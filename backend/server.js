const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const Question = mongoose.model("Question", {
  text: String,
  options: [String],
  answer: Number
});

const Result = mongoose.model("Result", {
  score: Number,
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

// GET questions
app.get("/questions", async (req, res) => {
  const data = await Question.find();
  res.json(data);
});

// POST result
app.post("/result", async (req, res) => {
  const { answers } = req.body;
  const questions = await Question.find();

  let score = 0;

  questions.forEach((q, i) => {
    if (answers[i] === q.answer) score++;
  });

  const result = await Result.create({
    score,
    total: questions.length
  });

  res.json(result);
});

// MINI AI (simple analysis)
app.get("/analytics", async (req, res) => {
  const results = await Result.find();

  const avg =
    results.reduce((a, b) => a + b.score, 0) / (results.length || 1);

  res.json({
    totalUsers: results.length,
    avgScore: avg
  });
});

app.listen(5000, () => console.log("Server running"));
