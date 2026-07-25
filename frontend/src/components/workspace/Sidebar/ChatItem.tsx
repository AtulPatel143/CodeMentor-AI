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
        className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 pr-10 text-left transition ${
          isActive
            ? "bg-slate-800 text-white"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }`}
      >
        <MessageSquare size={18} className="shrink-0" />

        {editing ? (
          <input
            ref={inputRef}
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            onBlur={saveRename}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveRename();
              }

              if (e.key === "Escape") {
                setEditing(false);
                setDraftTitle("");
              }
            }}
            className="w-full rounded bg-slate-700 px-2 py-1 text-sm text-white outline-none"
          />
        ) : (
          <span className="truncate text-sm">{conversation.title}</span>
        )}
      </button>

      {!editing && (
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-md p-1 text-slate-500 transition hover:bg-slate-700 hover:text-white group-hover:flex"
        >
          <MoreHorizontal size={16} />
        </button>
      )}

      {menuOpen && (
        <div className="absolute right-2 top-11 z-50 w-40 rounded-xl border border-slate-700 bg-[#111827] p-2 shadow-xl">
          <button
            onClick={() => {
              setDraftTitle(conversation.title);
              setEditing(true);
              setMenuOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-700"
          >
            <Pencil size={16} />
            Rename
          </button>

          <button
            onClick={() => deleteConversation(conversation.id)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatItem;
