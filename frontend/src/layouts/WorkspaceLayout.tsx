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
          <div className="flex h-screen overflow-hidden bg-[#0B1120] text-white">
            {/* Sidebar */}
            <aside className="w-72 shrink-0 border-r border-slate-800/70 bg-[#111827]">
              <Sidebar />
            </aside>

            {/* Main Content */}
            <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
              <Outlet />
            </main>
          </div>
        </MessageProvider>
      </ConversationProvider>
    </WorkspaceProvider>
  );
}

export default WorkspaceLayout;
