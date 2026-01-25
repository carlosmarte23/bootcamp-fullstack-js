import express from "express";

process.loadEnvFile();
const PORT = process.env.PORT || 1234;
const app = express();

app.get("/", (req, res) => {
  res.send("Hola desde express!");
});

app.listen(PORT, () => {
  console.log(`Servidor express levantado en http://localhost:${PORT}`);
});
