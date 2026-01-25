import express from "express";

process.loadEnvFile();
const PORT = process.env.PORT || 1234;
const app = express();

app.get("/", (req, res) => {
  res.send("Hola desde express!");
});

app.get("/health", (req, res) => {
  return res.json({
    status: "ok",
    uptime: process.uptime(),
  });
});

app.listen(PORT, () => {
  console.log(`Servidor express levantado en http://localhost:${PORT}`);
});
