import api from "../api/axios";

export const getConversations = async (projectId: string) => {
  const response = await api.get(
    `/projects/${projectId}/conversations`
  );

  return response.data;
};

export const sendMessage = async (
  projectId: string,
  message: string
) => {
  const response = await api.post(
    `/projects/${projectId}/chat`,
    {
      message,
    }
  );

  return response.data;
};