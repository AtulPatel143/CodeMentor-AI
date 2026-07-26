import { useMemo } from "react";

import NewChatButton from "./NewChatButton";
import ChatList from "./ChatList";
import BottomMenu from "./BottomMenu";

import { useConversation } from "../context/useConversation";

const Sidebar = () => {
  const { conversations } = useConversation();

  const filteredConversations = useMemo(() => conversations, [conversations]);

  return (
    <aside className="flex h-full flex-col bg-[#111827]">
      {/* Header */}
      <div className="border-b border-slate-800/70 px-5 py-5">
        <NewChatButton />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <h2 className="mb-4 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Chats
        </h2>

        <ChatList conversations={filteredConversations} />
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800/70 px-4 py-4">
        <BottomMenu />
      </div>
    </aside>
  );
};

export default Sidebar;
