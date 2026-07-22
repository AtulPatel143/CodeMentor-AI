import Sidebar from "./sidebar.tsx";
import Navbar from "./Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8 bg-slate-100">
        <Navbar />

        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;