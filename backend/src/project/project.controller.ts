import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import * as projectService from "../services/project.service";

// Create Project
export const createProject = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { title, description } = req.body;

    const project = await projectService.createProject(
      title,
      description,
      req.user!.id,
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

// Get All Projects
export const getProjects = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const projects = await projectService.getProjects(req.user!.id);

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

// Get Project By ID
export const getProjectById = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const id = req.params.id as string;

    const project = await projectService.getProjectById(id, req.user!.id);

    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
    });
  }
};

// Update Project
export const updateProject = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { title, description } = req.body;

    const project = await projectService.getProjectById(id, req.user!.id);

    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }

    const updatedProject = await projectService.updateProject(
      id,
      req.user!.id,
      title,
      description,
    );

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update project",
    });
  }
};

// Delete Project
export const deleteProject = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const id = req.params.id as string;

    const project = await projectService.getProjectById(id, req.user!.id);

    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }

    await projectService.deleteProject(id, req.user!.id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
};

// Get Recent Projects
export const getRecentProjects = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const projects = await projectService.getRecentProjects(req.user!.id);

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch recent projects",
    });
  }
};