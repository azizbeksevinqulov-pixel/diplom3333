const router = require("express").Router();
const Result = require("../models/Result");

router.get("/analytics", async (req, res) => {
  const data = await Result.find();

  const avg = data.reduce((a, b) => a + b.score, 0) / (data.length || 1);

  const weak = avg < 5 ? "Students weak" : "Students good";

  res.json({
    users: data.length,
    avg,
    insight: weak
  });
});

module.exports = router;
