import { FolderOpen } from "lucide-react";
import { useWorkspace } from "../context/useWorkspace";

const WorkspaceHeader = () => {
  const { activeProject } = useWorkspace();

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-8">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-cyan-500/10 p-3">
          <FolderOpen size={22} className="text-cyan-400" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white">
            {activeProject?.title ?? "Welcome to CodeMentor AI"}
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            {activeProject
              ? "Your AI coding workspace is ready."
              : "Select a project or create a new one."}
          </p>
        </div>
      </div>

      <div className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
        ● AI Ready
      </div>
    </header>
  );
};

export default WorkspaceHeader;
