import { FolderOpen, MoreVertical } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  techStack?: string;
  conversations?: number;
  updatedAt?: string;
}

interface ProjectCardProps {
  project: Project;
  active?: boolean;
  onClick?: () => void;
}

const ProjectCard = ({
  project,
  active = false,
  onClick,
}: ProjectCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`group w-full rounded-2xl border p-4 text-left transition-all duration-200 ${
        active
          ? "border-cyan-500 bg-slate-800 shadow-lg shadow-cyan-500/10"
          : "border-slate-800 bg-slate-900 hover:border-slate-700 hover:bg-slate-800"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-500/10 p-2">
            <FolderOpen size={18} className="text-cyan-400" />
          </div>

          <div>
            <h3 className="font-semibold text-white">{project.title}</h3>

            <p className="mt-1 text-xs text-slate-400">
              {project.techStack ?? "React • Node • TypeScript"}
            </p>
          </div>
        </div>

        <MoreVertical
          size={18}
          className="text-slate-500 transition group-hover:text-slate-300"
        />
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {project.conversations ?? 0} Conversations
        </span>

        {active ? (
          <span className="text-xs font-medium text-emerald-400">● Active</span>
        ) : (
          <span className="text-xs text-slate-500">
            {project.updatedAt ?? "Updated recently"}
          </span>
        )}
      </div>
    </button>
  );
};

export default ProjectCard;
