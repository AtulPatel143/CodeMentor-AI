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

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const isApiProject = (value: unknown): value is ApiProject => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    typeof value.createdAt === "string" &&
    typeof value.updatedAt === "string"
  );
};

const normalizeProjectArray = (payload: unknown): ApiProject[] => {
  if (Array.isArray(payload)) {
    return payload.filter(isApiProject);
  }

  if (isRecord(payload)) {
    const data = payload.data;
    const projects = payload.projects;

    if (Array.isArray(projects)) {
      return projects.filter(isApiProject);
    }

    if (Array.isArray(data)) {
      return data.filter(isApiProject);
    }
  }

  return [];
};

const normalizeProject = (payload: unknown): ApiProject | null => {
  if (isApiProject(payload)) {
    return payload;
  }

  if (isRecord(payload) && isRecord(payload.data)) {
    return normalizeProject(payload.data);
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
