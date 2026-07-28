import { Settings, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-hot-toast";

const BottomMenu = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  };

  return (
    <div className="space-y-2 border-t border-slate-800 pt-4">
      <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-slate-400 transition hover:bg-slate-800 hover:text-white">
        <Settings size={18} />
        <span>Settings</span>
      </button>

      <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-slate-400 transition hover:bg-slate-800 hover:text-white">
        <User size={18} />
        <span>My Profile</span>
      </button>

      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-red-400 transition hover:bg-red-500/10"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default BottomMenu;
