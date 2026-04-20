let questions = [];
let answers = [];

fetch("http://localhost:5000/questions")
  .then(res => res.json())
  .then(data => {
    questions = data;
    render();
  });

function render() {
  const div = document.getElementById("quiz");

  questions.forEach((q, i) => {
    div.innerHTML += `<p>${q.text}</p>` +
      q.options.map((opt, j) =>
        `<input type="radio" name="q${i}" onclick="answers[${i}]=${j}">${opt}`
      ).join("<br>");
  });
}

function submitTest() {
  fetch("http://localhost:5000/result", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("result").innerText =
      `Score: ${data.score}/${data.total}`;
  });
}
