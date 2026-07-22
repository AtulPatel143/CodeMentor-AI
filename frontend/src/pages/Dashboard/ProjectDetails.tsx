import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import ProjectModal from "./ProjectModal";
import { deleteProject, getProjectById } from "../../services/project.service";
import toast from "react-hot-toast";
import ChatPanel from "../../components/ChatPanel";

type Project = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!project) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      await deleteProject(project.id);

      toast.success("Project deleted successfully!");

      navigate("/projects");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete project");
    } finally {
      setDeleting(false);
    }
  };

  const refreshProject = async () => {
    if (!id) return;

    try {
      const response = await getProjectById(id);
      setProject(response.project);
    } catch (error) {
      console.error(error);
      toast.error("Failed to refresh project");
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        setLoading(true);

        const response = await getProjectById(id);
        setProject(response.project);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    void fetchProject();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-64 items-center justify-center">
          <p className="text-gray-500">Loading project...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!project) {
    return (
      <DashboardLayout>
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-semibold">Project not found</h2>

          <p className="mt-3 text-gray-500">
            The project may have been deleted or you don't have access to it.
          </p>

          <button
            onClick={() => navigate("/projects")}
            className="mt-6 rounded-lg bg-cyan-500 px-5 py-2 text-white"
          >
            Back to Projects
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">{project.title}</h1>

        <p className="mt-4 text-gray-600">{project.description}</p>

        <div className="mt-8 flex gap-3">
          <button
            onClick={() => setIsEditOpen(true)}
            className="rounded-lg bg-cyan-500 px-5 py-2 text-white hover:bg-cyan-600"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-lg bg-red-500 px-5 py-2 text-white hover:bg-red-600 disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>

        <div className="mt-8 border-t pt-4 text-sm text-gray-500">
          Created: {new Date(project.createdAt).toLocaleString()}
        </div>
      </div>

      {/* 👇 Add ChatPanel here */}
      <ChatPanel projectId={project.id} />

      <ProjectModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onProjectCreated={refreshProject}
        mode="edit"
        project={project ?? undefined}
      />
    </DashboardLayout>
  );
};

export default ProjectDetails;
