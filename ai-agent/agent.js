const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Agent Running 🤖");
});

app.post("/analyze", (req, res) => {
  const logs = req.body.logs || "";

  const totalLogs = logs.split("\n").length;
  const errors = (logs.match(/ERROR/g) || []).length;
  const warnings = (logs.match(/WARNING/g) || []).length;

  let status = "Stable";
  if (errors > 5) status = "Critical";
  else if (errors > 0) status = "Warning";

  res.json({
    totalLogs,
    errors,
    warnings,
    status
  });
});

app.listen(6000, () => {
  console.log("AI Agent running on port 6000");
});