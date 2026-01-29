import cors from "cors";
import express from "express";

import { DEFAULTS } from "./config.js";

import { logger } from "./middleware/logger.js";

import healthRouter from "./routes/health.js";
import jobsRouter from "./routes/jobs.js";

process.loadEnvFile();
const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express();

const ACCEPTED_ORIGINS = [`http://localhost:8000`, `http://localhost:5173`];

app.use(cors({ origin: ACCEPTED_ORIGINS }));
app.use(express.json());
app.use(logger);

app.use("/jobs", jobsRouter);
app.use("/health", healthRouter);

app.listen(PORT, () => {
  console.log(`Servidor express levantado en http://localhost:${PORT}`);
});
