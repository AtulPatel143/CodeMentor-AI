import { FolderHeart, LogOut, Settings } from "lucide-react";

import NewProjectButton from "./NewProjectButton";
import ProjectList from "./ProjectList";
import ProjectSearch from "./ProjectSearch";

const WorkspaceSidebar = () => {
  return (
    <aside className="flex h-screen w-80 flex-col border-r border-slate-800 bg-slate-950">
      {/* Logo */}
      <div className="border-b border-slate-800 px-6 py-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          CodeMentor
          <span className="text-cyan-400">AI</span>
        </h1>

        <p className="mt-1 text-sm text-slate-500">AI Coding Workspace</p>
      </div>

      {/* New Project */}
      <div className="px-6 pt-6">
        <NewProjectButton />
      </div>

      {/* Search */}
      <div className="px-6 pt-4">
        <ProjectSearch />
      </div>

      {/* Projects */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <ProjectList />
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 p-6">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-400 transition hover:bg-slate-800 hover:text-white">
          <FolderHeart size={18} />
          Favorites
        </button>

        <button className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-400 transition hover:bg-slate-800 hover:text-white">
          <Settings size={18} />
          Settings
        </button>

        <button className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500/10">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default WorkspaceSidebar;
