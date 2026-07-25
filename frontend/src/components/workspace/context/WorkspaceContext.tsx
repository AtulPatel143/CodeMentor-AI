/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getProjects,
  type ApiProject,
} from "@/api/project.service";

interface WorkspaceContextValue {
  projects: ApiProject[];
  activeProject: ApiProject | null;
  loading: boolean;

  setActiveProject: (project: ApiProject) => void;
  refreshProjects: () => Promise<void>;
}

export const WorkspaceContext = createContext<
  WorkspaceContextValue | undefined
>(undefined);

interface WorkspaceProviderProps {
  children: ReactNode;
}

export const WorkspaceProvider = ({ children }: WorkspaceProviderProps) => {
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [activeProject, setActiveProject] = useState<ApiProject | null>(null);

  const [loading, setLoading] = useState(true);

  const refreshProjects = useCallback(async () => {
    try {
      const response = await getProjects();

      setProjects(response.projects);

      setActiveProject((current) => {
        if (response.projects.length === 0) {
          return null;
        }

        if (current) {
          const existing = response.projects.find(
            (project) => project.id === current.id,
          );

          if (existing) {
            return existing;
          }
        }

        return response.projects[response.projects.length - 1];
      });
    } catch (error) {
      console.error("Failed to refresh projects:", error);
    }
  }, []);

  useEffect(() => {
    const initialize = async () => {
      await refreshProjects();
      setLoading(false);
    };

    void initialize();
  }, [refreshProjects]);

  return (
    <WorkspaceContext.Provider
      value={{
        projects,
        activeProject,
        loading,
        setActiveProject,
        refreshProjects,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};
