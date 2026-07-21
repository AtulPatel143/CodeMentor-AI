import { Request, Response } from "express";
import * as dashboardService from "../services/dashboard.service";
import { AuthRequest } from "../middleware/auth.middleware";

export const getDashboard = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const stats = await dashboardService.getDashboardStats(
      req.user!.id
    );

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};