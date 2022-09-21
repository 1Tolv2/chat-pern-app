const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express.Router();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.json({ Message: "Successful!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port: PORT`);
});
