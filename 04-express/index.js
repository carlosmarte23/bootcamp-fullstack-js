import express from "express";
import { DEFAULTS } from "./config.js";

process.loadEnvFile();
const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express();

const jobs = [
  { id: 1, title: "Frontend Developer", location: "Remote" },
  { id: 2, title: "Backend Developer", location: "Barcelona" },
  { id: 3, title: "Fullstack Developer", location: "Remote" },
];

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

app.get("/jobs", (req, res) => {
  const {
    location,
    limit = DEFAULTS.LIMIT,
    offset = DEFAULTS.OFFSET,
  } = req.query;

  let filteredJobs = jobs;

  if (location) {
    filteredJobs = filteredJobs.filter(
      (job) => job.location.toLowerCase() === location.toLocaleLowerCase(),
    );
  }

  const limitNumber = Number(limit);
  const offsetNumber = Number(offset);
  filteredJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber);

  return res.json(filteredJobs);
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
