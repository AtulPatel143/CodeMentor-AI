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
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
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

export const getTasksByProject = async (req: AuthRequest, res: Response) => {
  try {
    const projectId = Array.isArray(req.params.projectId)
      ? req.params.projectId[0]
      : req.params.projectId;
    const { status, search } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    // Verify the project belongs to the logged-in user
    const project = await projectService.getProjectById(
      projectId,
      req.user!.id,
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const tasks = await taskService.getTasksByProject(
      projectId,
      status as string,
      search as string,
      page,
      limit,
    );

    return res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
      error,
    });
  }
};
