const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/auth", require("./routes/auth"));
app.use("/exam", require("./routes/exam"));
app.use("/admin", require("./routes/admin"));

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running")
);
