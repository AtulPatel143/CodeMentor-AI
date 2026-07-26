import { useEffect, useRef, useState } from "react";
import { MessageSquare, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { useConversation } from "../context/useConversation";
import type { Conversation } from "../context/ConversationContext";

interface Props {
  conversation: Conversation;
}

const ChatItem = ({ conversation }: Props) => {
  const {
    activeConversation,
    setActiveConversation,
    renameConversation,
    deleteConversation,
  } = useConversation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const isActive = activeConversation?.id === conversation.id;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const saveRename = () => {
    const title = draftTitle.trim();

    if (title) {
      renameConversation(conversation.id, title);
    }

    setEditing(false);
    setMenuOpen(false);
  };

  return (
    <div className="group relative">
      <button
        onClick={() => setActiveConversation(conversation)}
        className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 pr-10 text-left transition-all duration-200 ${
          isActive
            ? "bg-slate-800/90 text-white ring-1 ring-slate-700 shadow-sm"
            : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
        }`}
      >
        {/* Active Accent */}
        {isActive && (
          <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-cyan-400" />
        )}

        <MessageSquare
          size={17}
          className="ml-1 shrink-0 text-slate-500 transition-colors group-hover:text-slate-300"
        />

        {editing ? (
          <input
            ref={inputRef}
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            onBlur={saveRename}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveRename();

              if (e.key === "Escape") {
                setEditing(false);
                setDraftTitle("");
              }
            }}
            className="w-full rounded-lg border border-slate-600 bg-slate-700 px-2 py-1.5 text-sm text-white outline-none focus:border-cyan-500"
          />
        ) : (
          <span className="truncate text-[14px] font-medium tracking-tight">
            {conversation.title}
          </span>
        )}
      </button>

      {!editing && (
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 opacity-0 transition-all duration-200 hover:bg-slate-700 hover:text-white group-hover:opacity-100"
        >
          <MoreHorizontal size={16} />
        </button>
      )}

      {menuOpen && (
        <div className="absolute right-2 top-11 z-50 w-40 overflow-hidden rounded-xl border border-slate-700 bg-[#0F172A] p-1.5 shadow-2xl">
          <button
            onClick={() => {
              setDraftTitle(conversation.title);
              setEditing(true);
              setMenuOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-700"
          >
            <Pencil size={15} />
            Rename
          </button>

          <button
            onClick={() => deleteConversation(conversation.id)}
            className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatItem;
