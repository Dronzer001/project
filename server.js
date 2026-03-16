const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/api/message", (req, res) => {
  res.json({
    message: "Hello from backend!",
    time: new Date()
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});