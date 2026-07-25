import { useEffect, useState } from "react";
import {
  getProjects,
  type ApiProject,
} from "../../../services/project.service";

export const useWorkspace = () => {
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [activeProject, setActiveProject] = useState<ApiProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();

        setProjects(response.projects);

        if (response.projects.length > 0) {
          setActiveProject(response.projects[0]);
        }
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchProjects();
  }, []);

  return {
    projects,
    activeProject,
    setActiveProject,
    loading,
  };
};
