import WorkspaceLayout from "../../components/workspace/Layout/WorkspaceLayout";
import WorkspaceSidebar from "../../components/workspace/Sidebar/WorkspaceSidebar";
import WorkspaceHeader from "../../components/workspace/Layout/WorkspaceHeader";

import ChatView from "../../components/workspace/Chat/ChatView";

import { WorkspaceProvider } from "../../components/workspace/context/WorkspaceContext";

const WorkspacePage = () => {
  return (
    <WorkspaceProvider>
      <WorkspaceLayout>
        <WorkspaceSidebar />

        <main className="flex flex-1 flex-col overflow-hidden bg-slate-950">
          <WorkspaceHeader />

          <ChatView />
        </main>
      </WorkspaceLayout>
    </WorkspaceProvider>
  );
};

export default WorkspacePage;
