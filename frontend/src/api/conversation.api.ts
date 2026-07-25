import client from "./client";
import { Conversation } from "../types/conversation";

export const getConversations = async (
  projectId: string,
): Promise<Conversation[]> => {
  const { data } = await client.get(`/projects/${projectId}/conversations`);

  return data.data;
};

export const createConversation = async (
  projectId: string,
): Promise<Conversation> => {
  const { data } = await client.post(`/projects/${projectId}/conversations`);

  return data.data;
};

export const renameConversation = async (
  id: string,
  title: string,
): Promise<Conversation> => {
  const { data } = await client.patch(`/conversations/${id}`, { title });

  return data.data;
};

export const deleteConversation = async (id: string): Promise<void> => {
  await client.delete(`/conversations/${id}`);
};
