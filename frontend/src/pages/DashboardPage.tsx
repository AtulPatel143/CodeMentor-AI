import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function DashboardPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold text-cyan-400">Dashboard</h1>

      <p className="mt-4 text-slate-300">
        Welcome to CodeMentor AI Dashboard 🚀
      </p>
      <button
        onClick={handleLogout}
        className="mt-6 rounded-lg bg-red-500 px-5 py-2 font-semibold text-white transition hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}

export default DashboardPage;
