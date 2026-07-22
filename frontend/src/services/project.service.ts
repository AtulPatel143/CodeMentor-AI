import api from "../api/axios";

export const getRecentProjects = async () => {
  const response = await api.get("/projects/recent");
  return response.data;
};

export const getProjects = async () => {
  const response = await api.get("/projects");
  return response.data;
};

export const createProject = async (title: string, description: string) => {
  const response = await api.post("/projects", {
    title,
    description,
  });

  return response.data;
};

export const getProjectById = async (id: string) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

export const updateProject = async (
  id: string,
  title: string,
  description: string,
) => {
  const response = await api.put(`/projects/${id}`, {
    title,
    description,
  });

  return response.data;
};

export const deleteProject = async (id: string) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};