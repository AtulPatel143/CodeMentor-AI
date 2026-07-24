import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

const StatsCard = ({ title, value, icon: Icon }: Props) => {
  return (
    <div
      className="
        flex items-center justify-between
        rounded-xl
        border border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-colors duration-300
        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      <div>
        <p className="text-slate-500 dark:text-slate-400">{title}</p>

        <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
          {value}
        </h2>
      </div>

      <div className="rounded-full bg-cyan-100 p-4 dark:bg-cyan-900/30">
        <Icon className="text-cyan-600 dark:text-cyan-400" size={28} />
      </div>
    </div>
  );
};

export default StatsCard;
