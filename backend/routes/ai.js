const router = require("express").Router();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post("/generate", async (req, res) => {
  const { topic } = req.body;

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "user", content: `Generate 5 quiz questions about ${topic}` }
    ]
  });

  res.json(response.choices[0].message.content);
});

module.exports = router;
