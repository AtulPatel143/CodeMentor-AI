import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewProjectButton = () => {
  const navigate = useNavigate();

  const handleCreateProject = () => {
    // Change this route if your app uses a different one
    navigate("/projects/new");
  };

  return (
    <button
      onClick={handleCreateProject}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 font-medium text-slate-950 transition-all duration-200 hover:bg-cyan-400 active:scale-[0.98]"
    >
      <Plus size={18} />
      New Project
    </button>
  );
};

export default NewProjectButton;
