import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import * as projectService from "../services/project.service";

export const createProject = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { title, description } = req.body;

    const project = await projectService.createProject(
      title,
      description,
      req.user!.id
    );

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
};