import { useEffect, useState } from "react";
import { FolderKanban, CheckCircle, Clock3, TrendingUp } from "lucide-react";

import DashboardLayout from "./DashboardLayout";
import StatsCard from "./StatsCard";
import { getDashboardStats } from "../../services/dashboard.service";

interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  todoTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  pendingTasks: number;
  progress: number;
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

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await getDashboardStats();
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Welcome to CodeMentor AI 🚀</h1>

      <p className="mt-2 text-gray-600">Your dashboard is ready.</p>

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
    </DashboardLayout>
  );
};

export default DashboardPage;
