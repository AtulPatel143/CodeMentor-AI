import api from "./client";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export const getConversationMessages = async (
  conversationId: string,
): Promise<Message[]> => {
  const response = await api.get(`/conversations/${conversationId}/messages`);

  return response.data.data;
};

export const sendMessage = async (
  conversationId: string,
  content: string,
): Promise<Message> => {
  const response = await api.post(`/conversations/${conversationId}/messages`, {
    content,
  });

  return response.data.data;
};
