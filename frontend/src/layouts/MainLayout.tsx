import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex h-screen flex-col bg-slate-900 text-white">
      <header className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-900/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <h1 className="text-2xl font-extrabold tracking-wide text-cyan-400">
            CodeMentor AI
          </h1>

          <nav className="flex gap-6 text-sm">
            <Link to="/" className="transition hover:text-cyan-400">
              Home
            </Link>

            <Link to="/" className="transition hover:text-cyan-400">
              Features
            </Link>

            <Link
              to="/login"
              className="rounded-lg bg-cyan-500 px-4 py-2 font-medium text-slate-900 transition hover:bg-cyan-400"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
