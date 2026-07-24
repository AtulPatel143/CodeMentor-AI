import { useEffect, useState } from "react";
import { FolderKanban, CheckCircle, Clock3, TrendingUp } from "lucide-react";

import DashboardLayout from "./DashboardLayout";
import StatsCard from "./StatsCard";

import { getDashboardStats } from "../../services/dashboard.service";
import { getRecentProjects } from "../../services/project.service";

interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  todoTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  pendingTasks: number;
  progress: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
}

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalTasks: 0,
    todoTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    progress: 0,
  });

  const [recentProjects, setRecentProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsResponse = await getDashboardStats();
        setStats(statsResponse.data);

        const recentResponse = await getRecentProjects();
        setRecentProjects(recentResponse.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
        Welcome to CodeMentor AI 🚀
      </h1>

      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Your dashboard is ready.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        <StatsCard
          title="Total Projects"
          value={stats.totalProjects}
          icon={FolderKanban}
        />

        <StatsCard
          title="Completed Tasks"
          value={stats.completedTasks}
          icon={CheckCircle}
        />

        <StatsCard
          title="Pending Tasks"
          value={stats.pendingTasks}
          icon={Clock3}
        />

        <StatsCard
          title="Progress"
          value={`${stats.progress}%`}
          icon={TrendingUp}
        />
      </div>

      {/* Recent Projects */}
      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">
          Recent Projects
        </h2>

        {recentProjects.length === 0 ? (
          <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">
            Recent Projects
          </h2>
        ) : (
          <div className="grid gap-4">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {project.title}
                </h3>

                <p className="mt-1 text-slate-600 dark:text-slate-400">
                  {project.description || "No description"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
