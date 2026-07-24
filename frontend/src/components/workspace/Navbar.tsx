import { Bell, Search } from "lucide-react";
import ThemeToggle from "./Header/ThemeToggle";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
      {/* Search */}
      <div className="flex w-80 items-center gap-3 rounded-lg bg-slate-100 px-4 py-2 transition-colors dark:bg-slate-800">
        <Search size={18} className="text-slate-500 dark:text-slate-400" />

        <input
          type="text"
          placeholder="Search projects..."
          className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        <ThemeToggle />

        {/* Notification */}
        <button className="relative rounded-full p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800">
          <Bell size={22} className="text-slate-600 dark:text-slate-300" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 font-bold text-white">
            A
          </div>

          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              Administrator
            </p>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Welcome Back 👋
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
