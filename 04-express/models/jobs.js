import crypto from "node:crypto";
import jobs from "../data/jobs.json" with { type: "json" };

let jobsData = structuredClone(jobs);

export const findAll = ({
  technology,
  type,
  level,
  text,
  limit = 10,
  offset = 0,
} = {}) => {
  let result = jobsData;

  if (technology) {
    const tech = String(technology).trim().toLowerCase();
    result = result.filter(
      (job) =>
        Array.isArray(job?.data?.technology) &&
        job.data.technology.includes(tech),
    );
  }

  if (type) {
    const normalizedType = String(type).trim().toLowerCase();

    result = result.filter(
      (job) =>
        String(job?.data?.modalidad ?? "")
          .trim()
          .toLowerCase() === normalizedType,
    );
  }

  if (level) {
    const normalizedLevel = String(level).trim().toLowerCase();

    result = result.filter(
      (job) =>
        String(job?.data?.nivel ?? "")
          .trim()
          .toLowerCase() === normalizedLevel,
    );
  }

  if (text) {
    const query = String(text).trim().toLowerCase();

    if (query.length > 0) {
      result = result.filter((job) => {
        const title = String(job?.titulo ?? "")
          .trim()
          .toLowerCase();

        const desc = String(job?.descripcion ?? "")
          .trim()
          .toLowerCase();
        return title.includes(query) || desc.includes(query);
      });
    }
  }

  result = result.slice(offset, offset + limit);

  return result;
};

export const findById = (id) => {
  return jobsData.find((job) => job.id === id) ?? null;
};

export const create = (jobData) => {
  const { titulo, empresa, ubicacion, descripcion, data, content } = jobData;
  const job = {
    id: crypto.randomUUID(),
    titulo,
    empresa,
    ubicacion,
    descripcion,
    data: data ?? { technology: [], modalidad: "", nivel: "" },
    content: content ?? {},
  };
  jobsData.push(job);

  return job;
};

export const updateById = (id, patch) => {
  const job = jobsData.find((job) => job.id === id);
  if (!job) return null;

  const { titulo, empresa, ubicacion, descripcion, data, content } = patch;

  //Top level fields
  if (titulo !== undefined) job.titulo = titulo;
  if (empresa !== undefined) job.empresa = empresa;
  if (ubicacion !== undefined) job.ubicacion = ubicacion;
  if (descripcion !== undefined) job.descripcion = descripcion;

  //Data
  if (data !== undefined) {
    if (job.data == null || typeof job.data !== "object") {
      job.data = { technology: [], modalidad: "", nivel: "" };
    }

    if (data.technology !== undefined && Array.isArray(data.technology)) {
      job.data.technology = data.technology;
    }

    if (data.modalidad !== undefined) job.data.modalidad = data.modalidad;
    if (data.nivel !== undefined) job.data.nivel = data.nivel;
  }

  //Content
  if (content !== undefined) {
    if (job.content == null || typeof job.content !== "object") {
      job.content = {};
    }

    job.content = content;
  }

  return job;
};

export const deleteById = (id) => {
  const index = jobsData.findIndex((job) => job.id === id);
  if (index === -1) return false;

  jobsData.splice(index, 1);
  return true;
};
