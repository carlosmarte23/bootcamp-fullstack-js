import express from "express";
import { DEFAULTS } from "./config.js";

process.loadEnvFile();
const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express();

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Data Driven Co",
    location: "Ciudad de México",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Tech Solutions Inc",
    location: "New York",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Remoto Ltd",
    location: "Remote",
  },
  {
    id: 4,
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
      (job) => job.location.toLowerCase() === location.toLocaleLowerCase(),
    );
  }

  const limitNumber = Number(limit);
  const offsetNumber = Number(offset);
  filteredJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber);

  return res.json(filteredJobs);
});

app.get("/jobs/:id", (req, res) => {
  const { id } = req.params;

  const jobId = Number(id);

  if (!Number.isInteger(jobId) || jobId <= 0) {
    return res
      .status(400)
      .json({ message: "La id debe ser un número entero positivo." });
  }

  const job = jobs.find((job) => job.id === jobId);

  if (!job) {
    return res.status(404).json({ message: "Empleo no encontrado" });
  }

  return res.json(job);
});

app.post("/jobs", (req, res) => {
  const { title, company, location } = req.body;

  const newJob = {
    id: jobs.length + 1, //FIX
    title,
    company,
    location,
  };

  jobs.push(newJob); // Later we'll implement an INSERT into a DB

  return res.status(201).json(newJob);
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
