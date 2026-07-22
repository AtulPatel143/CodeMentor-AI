import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/project.routes";
import taskRoutes from "./routes/task.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import conversationRoutes from "./routes/conversation.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api", conversationRoutes);
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to CodeMentor AI Backend 🚀",
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/test", (_req, res) => {
  res.json({
    message: "Latest deployment is running!",
  });
});


export default app;
