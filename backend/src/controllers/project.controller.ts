import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import * as projectService from "../services/project.service";

// Create Project
export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body;

    const userId = req.user!.id;

    const project = await projectService.createProject(
      userId,
      title,
      description,
    );

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error,
    });
  }
};

// Get All Projects
export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const projects = await projectService.getProjects(userId);

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error,
    });
  }
};

// Get Single Project
export const getProjectById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const project = await projectService.getProjectById(
      req.params.id as string,
      userId,
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
      error,
    });
  }
};

// Update Project
export const updateProject = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const { title, description } = req.body;

    const project = await projectService.updateProject(
      req.params.id as string,
      userId,
      title,
      description,
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update project",
      error,
    });
  }
};

// Delete Project

export const deleteProject = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const project = await projectService.getProjectById(
      id,
      req.user!.id
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const deleted = await projectService.deleteProject(id, req.user!.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error,
    });
  }
};