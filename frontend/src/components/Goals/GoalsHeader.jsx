import { Bell } from "lucide-react";

const GoalsHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="space-y-1">
        {/* <span className="text-[10px] font-mono text-blue-400 tracking-[0.3em] uppercase">
          System / Finance / Goals
        </span> */}
        <h1 className="text-2xl font-semibold text-blue-400 tracking-tight">
          Goals
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-mono text-gray-500">MAY 19, 2026</span>
        <button className="p-2 bg-white/[0.03] border border-white/10 rounded-full hover:bg-blue-500/10 transition">
          <Bell size={18} className="text-blue-400" />
        </button>
      </div>
    </div>
  );
};

export default GoalsHeader;
