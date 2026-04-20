const router = require("express").Router();
const Question = require("../models/Question");
const Result = require("../models/Result");

router.get("/", async (req, res) => {
  res.json(await Question.find());
});

router.post("/submit", async (req, res) => {
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

module.exports = router;
