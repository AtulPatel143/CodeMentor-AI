import { useEffect, useState } from "react";
import {
  getConversations,
  sendMessage,
} from "../services/conversation.service";

interface ChatPanelProps {
  projectId: string;
}

type Conversation = {
  id: string;
  message: string;
  response: string;
};

const ChatPanel = ({ projectId }: ChatPanelProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchConversations = async () => {
    try {
      const response = await getConversations(projectId);
      setConversations(response.conversations);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void fetchConversations();
  }, [projectId]);

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);

      await sendMessage(projectId, message);

      setMessage("");

      await fetchConversations();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">🤖 AI Assistant</h2>

      <div className="mb-6 max-h-96 space-y-4 overflow-y-auto">
        {conversations.map((conversation) => (
          <div key={conversation.id}>
            <div className="rounded-lg bg-cyan-100 p-3">
              <strong>You:</strong>
              <p>{conversation.message}</p>
            </div>

            <div className="mt-2 rounded-lg bg-gray-100 p-3">
              <strong>AI:</strong>
              <p>{conversation.response}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask CodeMentor AI..."
          className="flex-1 rounded-lg border px-4 py-3"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="rounded-lg bg-cyan-500 px-5 py-3 text-white hover:bg-cyan-600 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
