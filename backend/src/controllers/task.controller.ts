import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import * as taskService from "../services/task.service";
import * as projectService from "../services/project.service";

export const createTask = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { title, description, projectId } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    let project = await projectService.getProjectById(projectId, userId);

    if (!project) {
      project = await projectService.createProjectWithId(
        projectId,
        userId,
        "Untitled Project",
        "Auto-created for task",
      );
    }

    const task = await taskService.createTask(title, description, project.id);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
};
