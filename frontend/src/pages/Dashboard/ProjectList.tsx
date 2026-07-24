import { useCallback, useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import CreateProjectModal from "./ProjectModal";
import { getProjects } from "../../services/project.service";
import { useNavigate } from "react-router-dom";

type Project = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

const ProjectList = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getProjects();

      setProjects(response.projects);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchProjects();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [fetchProjects]);

  useEffect(() => {
    if (loading) return;

    const lastActiveProject = localStorage.getItem("lastActiveProject");

    if (!lastActiveProject) return;

    const projectExists = projects.some(
      (project) => project.id === lastActiveProject,
    );

    if (projectExists) {
      navigate(`/projects/${lastActiveProject}`);
    }
  }, [loading, projects, navigate]);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-gray-600 mt-2">Manage all your projects here.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-cyan-500 px-5 py-2 text-white font-medium hover:bg-cyan-600 transition"
        >
          + New Project
        </button>
      </div>

      {loading ? (
        <div className="rounded-xl bg-white p-12 text-center">
          <p>Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <h2 className="text-xl font-semibold">No Projects Yet</h2>

          <p className="mt-2 text-gray-500">
            Create your first project to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              className="cursor-pointer rounded-xl border bg-white p-6 shadow-sm transition hover:border-cyan-500 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold">{project.title}</h3>

              <p className="mt-2 text-gray-600">{project.description}</p>

              <p className="mt-4 text-sm text-gray-400">
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProjectCreated={fetchProjects}
      />
    </DashboardLayout>
  );
};

export default ProjectList;
