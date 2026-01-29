import { DEFAULTS } from "../config.js";
import * as Jobs from "../models/jobs.js";

export const getJobs = (req, res) => {
  const {
    location,
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

  let filteredJobs = Jobs.findAll(limitNumber, offsetNumber, location);

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
  const { title, company, location } = req.body;

  const data = {
    title,
    company,
    location,
  };

  const newJob = Jobs.create(data);

  return res.status(201).json(newJob);
};

export const updateJob = (req, res) => {
  const { id } = req.params;
  const { title, company, location } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Debes enviar un id." });
  }

  if (title === undefined && company === undefined && location === undefined) {
    return res.status(400).json({ message: "Debes enviar al menos un campo." });
  }

  const updatedJob = Jobs.updateById(id, { title, company, location });

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
