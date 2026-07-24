import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
    >
      {theme === "light" ? (
        <>
          <Moon size={18} />
          Dark
        </>
      ) : (
        <>
          <Sun size={18} />
          Light
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
