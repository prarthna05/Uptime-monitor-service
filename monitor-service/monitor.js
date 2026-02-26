const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Monitor Service Running 📡");
});

app.post("/check", async (req, res) => {
  const { url } = req.body;

  const startTime = Date.now();

  try {
    await axios.get(url);

    const responseTime = Date.now() - startTime;

    let status = "UP";
    if (responseTime > 1000) status = "SLOW";

    res.json({
      url,
      status,
      responseTime
    });

  } catch (error) {
    res.json({
      url,
      status: "DOWN",
      responseTime: null
    });
  }
});

app.listen(6060, () => {
  console.log("Monitor Service running on port 6060");
});