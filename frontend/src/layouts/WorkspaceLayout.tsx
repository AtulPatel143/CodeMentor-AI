import { Outlet } from "react-router-dom";

import Sidebar from "../components/workspace/Sidebar/Sidebar";
import { ConversationProvider } from "../components/workspace/context/ConversationContext";
import { MessageProvider } from "../components/workspace/context/MessageContext";
import { WorkspaceProvider } from "../components/workspace/context/WorkspaceContext";

function WorkspaceLayout() {
  return (
    <WorkspaceProvider>
      <ConversationProvider>
        <MessageProvider>
          <div className="flex h-screen bg-[#0B1120]">
            <aside className="w-80 shrink-0 border-r border-slate-800 bg-[#111827]">
              <Sidebar />
            </aside>

            <main className="flex-1 overflow-hidden">
              <Outlet />
            </main>
          </div>
        </MessageProvider>
      </ConversationProvider>
    </WorkspaceProvider>
  );
}

export default WorkspaceLayout;
