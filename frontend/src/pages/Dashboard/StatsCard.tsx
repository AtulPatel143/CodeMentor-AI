import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

const StatsCard = ({ title, value, icon: Icon }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
      <div>
        <p className="text-gray-500">{title}</p>

        <h2 className="text-3xl font-bold mt-2">{value}</h2>
      </div>

      <div className="bg-cyan-100 p-4 rounded-full">
        <Icon className="text-cyan-600" size={28} />
      </div>
    </div>
  );
};

export default StatsCard;
