import ThemeToggle from "./ThemeToggle";

type Project = {
  id: string;
  title: string;
  createdAt: string;
};

type WorkspaceHeaderProps = {
  project: Project;
  deleting: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

const WorkspaceHeader = ({
  project,
  deleting,
  onEdit,
  onDelete,
}: WorkspaceHeaderProps) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          📁 {project.title}
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Created: {new Date(project.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button
          onClick={onEdit}
          className="rounded-lg border border-cyan-500 px-5 py-2 text-sm font-medium text-cyan-600 transition hover:bg-cyan-50"
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          disabled={deleting}
          className="rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
