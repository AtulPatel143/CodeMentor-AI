import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/project.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
// Test Route
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to CodeMentor AI Backend 🚀",
  });
});

export default app;
