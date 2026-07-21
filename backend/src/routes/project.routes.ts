import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import validate from "../middleware/validation.middleware";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../validators/project.validator";

const router = Router();

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: CodeMentor AI
 *               description:
 *                 type: string
 *                 example: Backend development project
 *     responses:
 *       201:
 *         description: Project created successfully
 *       401:
 *         description: Unauthorized
 */

// Create Project
router.post("/", verifyToken, validate(createProjectSchema), createProject);

// Get All Projects
router.get("/", verifyToken, getProjects);

// Get Project By ID
router.get("/:id", verifyToken, getProjectById);

// Update Project
router.put("/:id", verifyToken, validate(updateProjectSchema), updateProject);

// Delete Project
router.delete("/:id", verifyToken, deleteProject);

export default router;
