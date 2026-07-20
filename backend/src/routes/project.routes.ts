import { Router } from "express";

import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller";

import { verifyToken } from "../middleware/auth.middleware";
import validate from "../middleware/validation.middleware";

import {
  createProjectSchema,
  updateProjectSchema,
} from "../schemas/project.schema";

const router = Router();

// Create Project
router.post(
  "/",
  verifyToken,
  validate(createProjectSchema),
  createProject
);

// Get All Projects
router.get("/", verifyToken, getProjects);

// Get Single Project
router.get("/:id", verifyToken, getProjectById);

// Update Project
router.put(
  "/:id",
  verifyToken,
  validate(updateProjectSchema),
  updateProject
);

// Delete Project
router.delete("/:id", verifyToken, deleteProject);

export default router;