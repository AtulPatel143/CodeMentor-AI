import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import  validate  from "../middleware/validation.middleware";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
} from "../controllers/project.controller";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../validators/project.validator";

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

// Get Project By ID
router.get("/:id", verifyToken, getProjectById);

// Update Project
router.put(
  "/:id",
  verifyToken,
  validate(updateProjectSchema),
  updateProject
);

export default router;