import express from "express";

process.loadEnvFile();
const PORT = process.env.PORT || 1234;
const app = express();

app.use((req, res, next) => {
  console.log("--- Nueva petición recibida ---");
  console.log("Fecha:", new Date().toLocaleString());
  console.log("Método:", req.method);
  console.log("URL:", req.url);
  next();
});

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
