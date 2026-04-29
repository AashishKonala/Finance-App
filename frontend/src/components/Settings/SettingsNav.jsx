import { motion } from "framer-motion";
import { ChevronRight, LogOut } from "lucide-react";

export default function SettingsNav({ tabs, activeTab, setActiveTab }) {
  return (
    <nav className="space-y-1.5 sticky top-0">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 text-left ${
            activeTab === id
              ? "bg-blue-500/10 border border-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.05)]"
              : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]"
          }`}
        >
          <Icon size={16} />
          <span className="font-medium">{label}</span>
          {activeTab === id && (
            <motion.div layoutId="activeGlow" className="ml-auto">
              <ChevronRight size={14} className="text-blue-400/50" />
            </motion.div>
          )}
        </button>
      ))}

      <div className="pt-4 mt-4 border-t border-white/5">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400/50 hover:text-red-400">
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </nav>
  );
}
