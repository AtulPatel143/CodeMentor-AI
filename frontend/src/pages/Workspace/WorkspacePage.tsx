import ChatInput from "../../components/workspace/Chat/ChatInput";
import ChatView from "../../components/workspace/Chat/ChatView";
import WelcomeScreen from "../../components/workspace/Hero/WelcomeScreen";
import { useConversation } from "../../components/workspace/context/useConversation";
import { useMessage } from "../../components/workspace/context/useMessage";

const WorkspacePage = () => {
  const { activeConversation } = useConversation();
  const { messages } = useMessage();

  const showChat = activeConversation !== null || messages.length > 0;

  return (
    <div className="flex h-screen flex-col bg-[#0B1120]">
      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto">
        {showChat ? <ChatView /> : <WelcomeScreen />}
      </div>

      {/* Fixed Input */}
      <div className="border-t border-slate-800 bg-[#0B1120]">
        <ChatInput />
      </div>
    </div>
  );
};

export default WorkspacePage;
