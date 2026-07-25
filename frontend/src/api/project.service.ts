import api from "../api/axios";

export interface ApiProject {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetProjectsResponse {
  projects: ApiProject[];
}

export interface GetRecentProjectsResponse {
  projects: ApiProject[];
}

export const getRecentProjects =
  async (): Promise<GetRecentProjectsResponse> => {
    const response =
      await api.get<GetRecentProjectsResponse>("/projects/recent");
    return response.data;
  };

export const getProjects = async (): Promise<GetProjectsResponse> => {
  const response = await api.get<GetProjectsResponse>("/projects");
  return response.data;
};

export const createProject = async (
  title: string,
  description: string,
): Promise<ApiProject> => {
  const response = await api.post<ApiProject>("/projects", {
    title,
    description,
  });

  return response.data;
};

export const getProjectById = async (id: string): Promise<ApiProject> => {
  const response = await api.get<ApiProject>(`/projects/${id}`);
  return response.data;
};

export const updateProject = async (
  id: string,
  title: string,
  description: string,
): Promise<ApiProject> => {
  const response = await api.put<ApiProject>(`/projects/${id}`, {
    title,
    description,
  });

  return response.data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await api.delete(`/projects/${id}`);
};
