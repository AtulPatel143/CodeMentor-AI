import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import * as authService from "../services/auth.service";

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await authService.register(req.body);

    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error && error.message === "Email already exists") {
      res.status(409).json({
        success: false,
        message: error.message,
      });
      return;
    }

    console.error("Register Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await authService.login(req.body);

    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      res.status(404).json({
        success: false,
        message: error.message,
      });
      return;
    }

    if (error instanceof Error && error.message === "Invalid credentials") {
      res.status(401).json({
        success: false,
        message: error.message,
      });
      return;
    }

    console.error("Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const result = await authService.getProfile(req.user!.id);

    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      res.status(404).json({
        success: false,
        message: error.message,
      });
      return;
    }

    console.error("Get Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
