import api from "./client";

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export const getProjectConversations = async (
  projectId: string,
): Promise<Conversation[]> => {
  const response = await api.get(`/projects/${projectId}/conversations`);

  return response.data.data;
};

export const createConversation = async (
  projectId: string,
  title: string,
): Promise<Conversation> => {
  const response = await api.post(`/projects/${projectId}/conversations`, {
    title,
  });

  return response.data.data;
};

export const deleteConversation = async (conversationId: string) => {
  await api.delete(`/conversations/${conversationId}`);
};

export const getConversations = async (projectId: string) => {
  const response = await api.get(`/projects/${projectId}/conversations`);

  return response.data;
};

export const sendMessage = async (projectId: string, message: string) => {
  const response = await api.post(`/projects/${projectId}/chat`, {
    message,
  });

  return response.data;
};

export const sendStreamMessage = async (
  conversationId: string,
  message: string,
  onChunk: (chunk: string) => void,
) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/conversations/${conversationId}/messages/stream`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to start stream");
  }

  const reader = response.body?.getReader();

  if (!reader) {
    throw new Error("ReadableStream not supported");
  }

  const decoder = new TextDecoder();

  let buffer = "";
  let fullResponse = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";

    for (const event of events) {
      const line = event.split("\n").find((l) => l.startsWith("data: "));

      if (!line) continue;

      const data = line.replace("data: ", "");

      if (data === "done") continue;

      const parsed = JSON.parse(data);

      fullResponse += parsed.chunk;
      onChunk(parsed.chunk);
    }
  }

  return fullResponse;
};
