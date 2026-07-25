import type { ReactNode } from "react";

interface WorkspaceLayoutProps {
  children: ReactNode;
}

const WorkspaceLayout = ({ children }: WorkspaceLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="flex h-screen overflow-hidden">{children}</div>
    </div>
  );
};

export default WorkspaceLayout;
