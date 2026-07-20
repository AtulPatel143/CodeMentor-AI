import { Router } from "express";
import { createTask } from "../controllers/task.controller";
import { verifyToken } from "../middleware/auth.middleware";
import validate from "../middleware/validation.middleware";
import { createTaskSchema } from "../validators/task.validator";

const router = Router();

router.post(
  "/",
  verifyToken,
  validate(createTaskSchema),
  createTask
);

export default router;