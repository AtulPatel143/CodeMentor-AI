import api from "./client";

export interface ApiProject {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
}

export interface GetProjectsResponse {
  projects: ApiProject[];
}

export interface GetRecentProjectsResponse {
  projects: ApiProject[];
}

const normalizeProjectArray = (payload: unknown): ApiProject[] => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === "object") {
    const data = (payload as Record<string, unknown>).data;
    const projects = (payload as Record<string, unknown>).projects;

    if (Array.isArray(projects)) {
      return projects as ApiProject[];
    }

    if (Array.isArray(data)) {
      return data as ApiProject[];
    }
  }

  return [];
};

const normalizeProject = (payload: unknown): ApiProject | null => {
  if (payload && typeof payload === "object") {
    const candidate = payload as Record<string, unknown>;

    if (
      typeof candidate.id === "string" &&
      typeof candidate.title === "string" &&
      typeof candidate.description === "string"
    ) {
      return candidate as ApiProject;
    }

    if (candidate.data && typeof candidate.data === "object") {
      return normalizeProject(candidate.data);
    }
  }

  return null;
};

export const getRecentProjects = async (): Promise<GetRecentProjectsResponse> => {
  const response = await api.get<ProjectApiResponse<ApiProject[]>>(
    "/projects/recent",
  );

  return { projects: normalizeProjectArray(response.data) };
};

export const getProjects = async (): Promise<GetProjectsResponse> => {
  const response = await api.get<ProjectApiResponse<ApiProject[]>>("/projects");

  return { projects: normalizeProjectArray(response.data) };
};

export const createProject = async (
  title: string,
  description: string,
): Promise<ApiProject> => {
  const response = await api.post<ProjectApiResponse<ApiProject>>("/projects", {
    title,
    description,
  });

  const project = normalizeProject(response.data);

  if (!project) {
    throw new Error("Invalid project response");
  }

  return project;
};

export const getProjectById = async (id: string): Promise<ApiProject> => {
  const response = await api.get<ProjectApiResponse<ApiProject>>(
    `/projects/${id}`,
  );

  const project = normalizeProject(response.data);

  if (!project) {
    throw new Error("Invalid project response");
  }

  return project;
};

export const updateProject = async (
  id: string,
  title: string,
  description: string,
): Promise<ApiProject> => {
  const response = await api.put<ProjectApiResponse<ApiProject>>(
    `/projects/${id}`,
    {
      title,
      description,
    },
  );

  const project = normalizeProject(response.data);

  if (!project) {
    throw new Error("Invalid project response");
  }

  return project;
};

export const deleteProject = async (id: string): Promise<void> => {
  await api.delete(`/projects/${id}`);
};
