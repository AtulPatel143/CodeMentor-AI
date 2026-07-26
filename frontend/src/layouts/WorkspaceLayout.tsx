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
          <div className="flex h-screen overflow-hidden bg-[#0B1120]">
            {/* Fixed Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-80 border-r border-slate-800 bg-[#111827]">
              <Sidebar />
            </aside>

            {/* Main Content */}
            <main className="ml-80 h-screen flex-1 overflow-y-auto">
              <Outlet />
            </main>
          </div>
        </MessageProvider>
      </ConversationProvider>
    </WorkspaceProvider>
  );
}

export default WorkspaceLayout;
