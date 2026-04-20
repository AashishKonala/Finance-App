import { Search, Calendar } from "lucide-react";
import { GlassButton } from "./TxButtons";
import { TABS } from "./transactionsData";

export default function TransactionsToolbar({
  activeTab,
  onTabChange,
  search,
  onSearchChange,
}) {
  return (
    <div className="flex justify-between items-center px-5 py-3.5 border-b border-white/[0.06] flex-wrap gap-2.5">

      {/* Tab filters */}
      <div className="flex gap-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`
              px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all outline-none
              ${activeTab === tab
                ? "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                : "bg-transparent text-gray-500 border border-transparent hover:text-gray-300 hover:bg-white/[0.03]"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search + date */}
      <div className="flex items-center gap-2.5">
        <div className="relative flex items-center">
          <Search size={13} className="absolute left-2.5 text-gray-600 pointer-events-none" />
          <input
            className="bg-white/[0.03] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs font-mono text-gray-400 placeholder-gray-700 w-48 outline-none focus:border-blue-500/30 focus:text-gray-200 transition-all"
            placeholder="Search transactions..."
            value={search}
            onChange={onSearchChange}
          />
        </div>
        <GlassButton icon={<Calendar size={13} />} label="Apr 2026" />
      </div>
    </div>
  );
}