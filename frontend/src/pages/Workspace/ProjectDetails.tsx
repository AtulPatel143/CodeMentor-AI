import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import ProjectModal from "./ProjectModal";
import { deleteProject, getProjectById } from "../../services/project.service";
import toast from "react-hot-toast";
import ChatPanel from "../../components/ChatPanel";
import axios from "axios";
import WorkspaceHeader from "../../components/workspace/Layout/WorkspaceHeader";
import WorkspaceSidebar from "../../components/workspace/Sidebar/WorkspaceSidebar";

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
  const [isCreateOpen, setIsCreateOpen] = useState(false);

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
    } catch (error: unknown) {
      console.error(error);

      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setProject(null);
        return;
      }

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
      } catch (error: unknown) {
        console.error(error);

        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setProject(null);
          return;
        }

        toast.error("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    void fetchProject();
  }, [id]);

  useEffect(() => {
    if (!project) return;

    localStorage.setItem("lastActiveProject", project.id);
  }, [project]);

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
      <WorkspaceHeader
        project={project}
        deleting={deleting}
        onEdit={() => setIsEditOpen(true)}
        onDelete={handleDelete}
      />

      <div className="mt-6 flex h-[calc(100vh-170px)] gap-6">
        <WorkspaceSidebar onNewProject={() => setIsCreateOpen(true)} />

        <div className="flex-1 overflow-hidden rounded-xl bg-white shadow-sm">
          <ChatPanel projectId={project.id} />
        </div>
      </div>

      <ProjectModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onProjectCreated={refreshProject}
        mode="edit"
        project={project}
      />

      <ProjectModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onProjectCreated={refreshProject}
        mode="create"
      />
    </DashboardLayout>
  );
};

export default ProjectDetails;
