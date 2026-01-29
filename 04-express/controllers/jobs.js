import { DEFAULTS } from "../config.js";
import * as Jobs from "../models/jobs.js";

export const getJobs = (req, res) => {
  const {
    technology,
    type,
    level,
    text,
    limit = DEFAULTS.LIMIT,
    offset = DEFAULTS.OFFSET,
  } = req.query;

  const limitNumber = Number(limit);
  const offsetNumber = Number(offset);

  if (isNaN(limitNumber) || isNaN(offsetNumber)) {
    return res
      .status(400)
      .json({ message: "Limit y offset deben ser números." });
  }

  let filteredJobs = Jobs.findAll({
    technology,
    type,
    level,
    text,
    limit: limitNumber,
    offsset: offsetNumber,
  });

  return res.json(filteredJobs);
};

export const getJobByID = (req, res) => {
  const { id } = req.params;

  const job = Jobs.findById(id);

  if (!job) {
    return res.status(404).json({ message: "Empleo no encontrado" });
  }

  return res.json(job);
};

export const addJob = (req, res) => {
  const { titulo, empresa, ubicacion, descripcion, data, content } = req.body;

  if (!titulo || !empresa || !ubicacion || !descripcion) {
    return res.status(400).json({
      message: "titulo, empresa, ubicacion y descripcion son requeridos.",
    });
  }

  if (data !== undefined && (typeof data !== "object" || Array.isArray(data))) {
    return res.status(400).json({ message: "data debe ser un objeto." });
  }

  if (data?.technology && !Array.isArray(data.technology)) {
    return res
      .status(400)
      .json({ message: "data.technology debe ser un array." });
  }

  const jobData = {
    titulo,
    empresa,
    ubicacion,
    descripcion,
    data: data ?? {},
    content: content ?? {},
  };

  const newJob = Jobs.create(jobData);

  return res.status(201).json(newJob);
};

export const updateJob = (req, res) => {
  const { id } = req.params;
  const { titulo, empresa, ubicacion, descripcion, data, content } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Debes enviar un id." });
  }

  const hasAnyField =
    titulo !== undefined ||
    empresa !== undefined ||
    ubicacion !== undefined ||
    descripcion !== undefined ||
    data !== undefined ||
    content !== undefined;

  if (!hasAnyField) {
    return res.status(400).json({ message: "Debes enviar al menos un campo." });
  }

  const updatedJob = Jobs.updateById(id, {
    titulo,
    empresa,
    ubicacion,
    descripcion,
    data,
    content,
  });

  if (!updatedJob) {
    return res.status(404).json({ message: "Empleo no encontrado" });
  }

  return res.json(updatedJob);
};

export const deleteJob = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Debes enviar un id." });
  }

  const deleted = Jobs.deleteById(id);

  if (!deleted) {
    return res.status(404).json({ message: "Empleo no encontrado" });
  }

  return res.sendStatus(204);
};
