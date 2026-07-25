import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import ConversationList from "./ConversationList";
import EmptyWorkspaceHero from "../Hero/EmptyWorkspaceHero";

import { useWorkspace } from "../context/useWorkspace";
import { ConversationProvider } from "../context/ConversationContext";

const ChatView = () => {
  const { activeProject } = useWorkspace();

  if (!activeProject) {
    return <EmptyWorkspaceHero />;
  }

  return (
    <ConversationProvider projectId={activeProject.id}>
      <div className="flex h-full flex-1 bg-slate-950">
        <ConversationList />

        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-y-auto">
            <ChatHistory />
          </div>

          <ChatInput />
        </div>
      </div>
    </ConversationProvider>
  );
};

export default ChatView;
