import { Plus, Settings } from "lucide-react";
import RecentProjects from "./RecentProjects";

type WorkspaceSidebarProps = {
  onNewProject: () => void;
};

const WorkspaceSidebar = ({ onNewProject }: WorkspaceSidebarProps) => {
  return (
    <aside className="flex h-[calc(100vh-170px)] w-72 flex-col rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b p-5">
        <h2 className="text-xl font-bold text-gray-900">🧠 CodeMentor AI</h2>

        <p className="mt-1 text-sm text-gray-500">AI Programming Workspace</p>

        <button
          onClick={onNewProject}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-cyan-600"
        >
          <Plus size={18} />
          New Project
        </button>
      </div>

      {/* Recent Projects */}
      <div className="flex-1 overflow-y-auto p-5">
        <RecentProjects />
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100">
          <Settings size={18} />
          Settings
        </button>
      </div>
    </aside>
  );
};

export default WorkspaceSidebar;
