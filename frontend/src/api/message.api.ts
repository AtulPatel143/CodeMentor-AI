import axios from "./client";

let controller: AbortController | null = null;

export async function getMessages(conversationId: string) {
  const { data } = await axios.get(
    `/api/conversations/${conversationId}/messages`,
  );

  return data.data;
}

export async function streamMessage(
  conversationId: string,
  content: string,
  onChunk: (chunk: string) => void,
): Promise<void> {
  controller = new AbortController();

  const token = localStorage.getItem("token");
 
  const rawApiUrl = (import.meta.env.VITE_API_URL as string) || "";

  const trimmed = rawApiUrl.replace(/\/+$/u, "");

  const apiBase =
    trimmed === ""
      ? "/api"
      : trimmed.endsWith("/api")
      ? trimmed
      : `${trimmed}/api`;

  const response = await fetch(
    `${apiBase}/conversations/${conversationId}/messages/stream`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
      body: JSON.stringify({
        content,
      }),
      signal: controller.signal,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to start stream.");
  }

  if (!response.body) {
    throw new Error("Streaming is not supported.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      buffer += decoder.decode(value, {
        stream: true,
      });

      while (buffer.includes("\n\n")) {
        const index = buffer.indexOf("\n\n");

        const rawEvent = buffer.slice(0, index);

        buffer = buffer.slice(index + 2);

        let event = "";
        let data = "";

        rawEvent.split("\n").forEach((line) => {
          if (line.startsWith("event:")) {
            event = line.slice(6).trim();
          }

          if (line.startsWith("data:")) {
            data += line.slice(5).trim();
          }
        });

        switch (event) {
          case "token": {
            const { chunk } = JSON.parse(data);
            onChunk(chunk);
            break;
          }

          case "done":
            return;

          case "error": {
            const { message } = JSON.parse(data);
            throw new Error(message);
          }
        }
      }
    }
  } finally {
    controller = null;
    reader.releaseLock();
  }
}

export function stopStreaming() {
  controller?.abort();
  controller = null;
}
