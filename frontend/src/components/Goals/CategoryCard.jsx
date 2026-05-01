import { PencilLine } from "lucide-react";

const CategoryCard = ({ icon: Icon, label, amount }) => {
  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex items-center justify-between group hover:border-blue-500/30 hover:shadow-[0_0_25px_rgba(59,130,246,0.1)] transition-all duration-300">

      <div className="flex items-center gap-4">
        <div className="p-3 bg-white/[0.03] rounded-xl group-hover:bg-blue-500/10 transition">
          <Icon size={20} className="text-blue-400" />
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-1">{label}</p>
          <p className="text-lg font-semibold font-mono">{amount}</p>
        </div>
      </div>

      <button className="px-4 py-1.5 border border-white/10 rounded-lg text-xs font-mono hover:border-blue-500/40 hover:bg-blue-500/10 transition flex items-center gap-2">
        ADJUSTING <PencilLine size={12} />
      </button>
    </div>
  );
};

export default CategoryCard;
