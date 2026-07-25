import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const ChatSearch = ({ value, onChange }: Props) => {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search chats..."
        className="w-full rounded-xl border border-slate-700 bg-[#111827] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500"
      />
    </div>
  );
};

export default ChatSearch;
