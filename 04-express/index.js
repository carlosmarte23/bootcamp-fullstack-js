import express from "express";
import crypto from "node:crypto";
import { DEFAULTS } from "./config.js";

process.loadEnvFile();
const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express();

let jobs = [
  {
    id: "f7a7a5a5-7f7b-4f7a-a5a5-7f7b4f7a5a5a",
    title: "Frontend Developer",
    company: "Data Driven Co",
    location: "Ciudad de México",
  },
  {
    id: "f8a7a5a5-7f8b-4f8a-a5a5-7f8b4f8a5a5a",
    title: "Backend Developer",
    company: "Tech Solutions Inc",
    location: "New York",
  },
  {
    id: "f9a7a5a5-7f9c-4f9a-a5a5-7f9c4f9a5a5a",
    title: "Full Stack Developer",
    company: "Remoto Ltd",
    location: "Remote",
  },
  {
    id: "faa7a5a5-7fac-4faa-a5a5-7fac4faa5a5a",
    title: "DevOps Engineer",
    company: "Innovate Solutions",
    location: "Berlin",
  },
];

app.use(express.json());

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
      (job) => job.location.toLowerCase() === location.toLowercase(),
    );
  }

  const limitNumber = Number(limit);
  const offsetNumber = Number(offset);

  if (isNaN(limitNumber) || isNaN(offsetNumber)) {
    return res
      .status(400)
      .json({ message: "Limit y offset deben ser números." });
  }

  filteredJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber);

  return res.json(filteredJobs);
});

app.post("/jobs", (req, res) => {
  const { title, company, location } = req.body;

  const newJob = {
    id: crypto.randomUUID(),
    title,
    company,
    location,
  };

  jobs.push(newJob); // Later we'll implement an INSERT into a DB

  return res.status(201).json(newJob);
});

app.get("/jobs/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Debes enviar un id." });
  }

  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return res.status(404).json({ message: "Empleo no encontrado" });
  }

  return res.json(job);
});

app.patch("/jobs/:id", (req, res) => {
  const { id } = req.params;
  const { title, company, location } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Debes enviar un id." });
  }

  if (title === undefined && company === undefined && location === undefined) {
    return res.status(400).json({ message: "Debes enviar al menos un campo." });
  }

  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return res.status(404).json({ message: "Empleo no encontrado" });
  }

  if (title !== undefined) job.title = title;
  if (company !== undefined) job.company = company;
  if (location !== undefined) job.location = location;

  return res.json(job);
});

app.delete("/jobs/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Debes enviar un id." });
  }

  const before = jobs.length;

  jobs = jobs.filter((job) => job.id !== id);

  if (jobs.length === before) {
    return res.status(404).json({ message: "Empleo no encontrado" });
  }

  return res.sendStatus(204);
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
