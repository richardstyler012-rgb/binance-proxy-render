
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/fapi/*", async (req, res) => {
  const targetUrl = "https://fapi.binance.com" + req.originalUrl.replace("/fapi", "");
  try {
    const binanceRes = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*"
      }
    });

    const data = await binanceRes.text();
    res.set("Content-Type", "application/json");
    res.send(data);
  } catch (e) {
    res.status(500).json({ error: "Proxy error", details: e.toString() });
  }
});

app.get("/", (req, res) => {
  res.send("Binance Proxy Render OK");
});

app.listen(10000, () => console.log("Proxy running on port 10000"));
