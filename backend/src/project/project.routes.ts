import { Router } from "express";
import {
  createProject,
  getProjects,
  getProjectById,
} from "../controllers/project.controller";
import { verifyToken } from "../middleware/auth.middleware";
import validate from "../middleware/validation.middleware";
import { createProjectSchema } from "../schemas/project.schema";

const router = Router();

router.post("/", verifyToken, validate(createProjectSchema), createProject);

router.get("/", verifyToken, getProjects);

router.get("/:id", verifyToken, getProjectById);

export default router;
