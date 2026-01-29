import { Router } from "express";

import {
  addJob,
  deleteJob,
  getJobByID,
  getJobs,
  updateJob,
} from "../controllers/jobs.js";

const router = Router();

router.get("/", getJobs);
router.get("/:id", getJobByID);
router.post("/", addJob);
router.patch("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;
