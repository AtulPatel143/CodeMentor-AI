import { useMemo, useState } from "react";

import NewChatButton from "./NewChatButton";
import ChatSearch from "./ChatSearch";
import ChatList from "./ChatList";
import BottomMenu from "./BottomMenu";

import { useConversation } from "../context/useConversation";

const Sidebar = () => {
  const { conversations } = useConversation();

  const [search, setSearch] = useState("");

  const filteredConversations = useMemo(() => {
    if (!search.trim()) return conversations;

    return conversations.filter((conversation) =>
      conversation.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [conversations, search]);

  return (
    <aside className="flex h-full flex-col border-r border-slate-800 bg-[#0B1120]">
      {/* Header */}
      <div className="space-y-4 border-b border-slate-800 p-4">
        <NewChatButton />

        <ChatSearch value={search} onChange={setSearch} />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Chats
        </h2>

        <ChatList conversations={filteredConversations} />
      </div>

      {/* Footer */}
      <div className="p-4">
        <BottomMenu />
      </div>
    </aside>
  );
};

export default Sidebar;
