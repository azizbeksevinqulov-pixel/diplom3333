const Question = require("../models/Question");

router.post("/add", async (req, res) => {
  const q = await Question.create(req.body);
  res.json(q);
});
