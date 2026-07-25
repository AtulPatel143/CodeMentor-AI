import { MessageSquare, Plus } from "lucide-react";
import { useConversation } from "../context/useConversation";

const ConversationList = () => {
  const { conversations, activeConversation, setActiveConversation, loading } =
    useConversation();

  return (
    <div className="flex w-72 flex-col border-r border-slate-800 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-800 p-4">
        <h2 className="text-sm font-semibold text-white">Conversations</h2>

        <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white">
          <Plus size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {loading ? (
          <p className="text-sm text-slate-500">Loading conversations...</p>
        ) : conversations.length === 0 ? (
          <p className="text-sm text-slate-500">No conversations yet.</p>
        ) : (
          <div className="space-y-2">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setActiveConversation(conversation)}
                className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${
                  activeConversation?.id === conversation.id
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <MessageSquare size={18} />

                <span className="truncate text-sm">{conversation.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
