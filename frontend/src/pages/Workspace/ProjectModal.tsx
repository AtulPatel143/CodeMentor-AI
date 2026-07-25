import { useRef, useState } from "react";
import { createProject, updateProject } from "../../services/project.service";
import toast from "react-hot-toast";
import axios from "axios";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: () => void;

  mode?: "create" | "edit";

  project?: {
    id: string;
    title: string;
    description: string;
  };
}

const ProjectModal = ({
  isOpen,
  onClose,
  onProjectCreated,
  mode = "create",
  project,
}: ProjectModalProps) => {
  const [loading, setLoading] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  if (!isOpen) return null;

  const modalKey = `${mode}-${project?.id ?? "new"}-${isOpen ? "open" : "closed"}`;

  const handleCreateProject = async () => {
    const titleValue = titleInputRef.current?.value.trim() ?? "";
    const descriptionValue = descriptionInputRef.current?.value ?? "";

    if (titleValue.length < 3) {
      toast.error("Title must be at least 3 characters");
      return;
    }

    if (descriptionValue.trim().length < 10) {
      toast.error("Description must be at least 10 characters");
      return;
    }

    try {
      setLoading(true);

      if (mode === "create") {
        await createProject(titleValue, descriptionValue);
        toast.success("Project created successfully!");
      } else {
        if (!project) {
          toast.error("Project not found");
          return;
        }

        await updateProject(project.id, titleValue, descriptionValue);

        toast.success("Project updated successfully!");
      }

      await onProjectCreated();

      if (titleInputRef.current) {
        titleInputRef.current.value = "";
      }

      if (descriptionInputRef.current) {
        descriptionInputRef.current.value = "";
      }

      onClose();
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to create project",
        );
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold">
          {mode === "create" ? "Create Project" : "Edit Project"}
        </h2>

        <div className="space-y-4">
          <input
            key={`${modalKey}-title`}
            ref={titleInputRef}
            type="text"
            placeholder="Project Title"
            defaultValue={mode === "edit" && project ? project.title : ""}
            className="w-full rounded-lg border p-3"
          />

          <textarea
            key={`${modalKey}-description`}
            ref={descriptionInputRef}
            placeholder="Project Description"
            rows={4}
            defaultValue={mode === "edit" && project ? project.description : ""}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border px-4 py-2">
            Cancel
          </button>

          <button
            onClick={handleCreateProject}
            disabled={loading}
            className="rounded-lg bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600 disabled:opacity-50"
          >
            {loading
              ? mode === "create"
                ? "Creating..."
                : "Saving..."
              : mode === "create"
                ? "Create Project"
                : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
