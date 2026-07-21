import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import validate from "../middleware/validation.middleware";
import { createTaskSchema } from "../validators/task.validator";
import {
  createTask,
  getTasksByProject,
  updateTask,
} from "../controllers/task.controller";

const router = Router();

router.post("/", verifyToken, validate(createTaskSchema), createTask);

router.get("/project/:projectId", verifyToken, getTasksByProject);
router.put("/:id", verifyToken, updateTask);

export default router;
