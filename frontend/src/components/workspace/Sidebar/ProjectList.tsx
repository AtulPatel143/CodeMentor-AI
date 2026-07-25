import ProjectCard from "./ProjectCard";
import { useWorkspace } from "../context/useWorkspace";

const ProjectList = () => {
  const { projects, activeProject, setActiveProject, loading } = useWorkspace();

  if (loading) {
    return (
      <div className="py-6 text-center text-sm text-slate-500">
        Loading projects...
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-700 p-6 text-center">
        <p className="text-sm text-slate-400">No projects yet.</p>

        <p className="mt-2 text-xs text-slate-500">
          Create your first project to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Projects
      </h3>

      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={{
            id: project.id,
            title: project.title,
            techStack: "React • TypeScript",
            conversations: 0,
            updatedAt: "Updated recently",
          }}
          active={activeProject?.id === project.id}
          onClick={() => setActiveProject(project)}
        />
      ))}
    </div>
  );
};

export default ProjectList;
