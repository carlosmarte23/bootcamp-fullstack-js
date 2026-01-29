import crypto from "node:crypto";

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

export const findAll = (limit, offset, location) => {
  let result = jobs;

  if (location) {
    result = result.filter(
      (job) => job.location.toLowerCase() === location.toLowerCase(),
    );
  }

  result = result.slice(offset, offset + limit);

  return result;
};

export const findById = (id) => {
  return jobs.find((job) => job.id === id) ?? null;
};

export const create = (data) => {
  const { title, company, location } = data;
  const job = {
    id: crypto.randomUUID(),
    title,
    company,
    location,
  };
  jobs.push(job); // Later we'll implement an INSERT into a DB

  return job;
};

export const updateById = (id, patch) => {
  const job = jobs.find((job) => job.id === id);

  const { title, company, location } = patch;

  if (!job) return null;

  if (title !== undefined) job.title = title;
  if (company !== undefined) job.company = company;
  if (location !== undefined) job.location = location;

  return job;
};

export const deleteById = (id) => {
  const before = jobs.length;
  jobs = jobs.filter((job) => job.id !== id);

  return jobs.length !== before;
};
