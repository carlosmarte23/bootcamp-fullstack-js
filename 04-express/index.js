import express from "express";
import process from "node:process";
import { DEFAULTS } from "./config.js";
import jobsRouter from "./routes/jobs.js";

process.loadEnvFile();
const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express();

app.use(express.json());

app.use("/jobs", jobsRouter);

app.get("/health", (req, res) => {
  return res.json({
    status: "ok",
    uptime: process.uptime(),
  });
});

app.listen(PORT, () => {
  console.log(`Servidor express levantado en http://localhost:${PORT}`);
});
