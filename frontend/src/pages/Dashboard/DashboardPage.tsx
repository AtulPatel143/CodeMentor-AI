import { useEffect } from "react";
import api from "../../api/axios";

function DashboardPage() {
  useEffect(() => {
    api
      .get("/auth/profile")
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
      <h1 className="text-4xl font-bold text-cyan-400">Dashboard</h1>

      <p className="mt-4">Welcome to CodeMentor AI 🚀</p>
    </div>
  );
}

export default DashboardPage;
