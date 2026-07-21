import { Bell, Search } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-white rounded-xl shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Search */}
      <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg w-80">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search projects..."
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>

      {/* User */}
      <div className="flex items-center gap-6">
        <button className="relative">
          <Bell size={22} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold">
            A
          </div>

          <div>
            <p className="font-semibold">Administrator</p>
            <p className="text-sm text-gray-500">Welcome Back 👋</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;