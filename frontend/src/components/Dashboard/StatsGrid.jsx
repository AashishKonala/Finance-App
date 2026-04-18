import { ArrowUpRight, BarChart3, Box, Percent } from 'lucide-react';

const QuickAction = ({ icon, label, active = false }) => (
  <div className={`
    aspect-square rounded-[28px] p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 border
    ${active 
      ? 'bg-blue-600/20 border-blue-500/40 text-blue-400 shadow-[0_0_25px_rgba(37,99,235,0.15)]' 
      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-white'}
    relative overflow-hidden group
  `}>
    {/* Inner Glow for active state */}
    {active && (
      <div className="absolute -right-4 -top-4 w-12 h-12 bg-blue-500/20 blur-xl rounded-full" />
    )}

    <div className={`
      w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300
      ${active ? 'bg-blue-500 text-white' : 'bg-white/5 text-gray-500 group-hover:text-blue-400'}
    `}>
      {icon}
    </div>

    <div>
      <p className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] opacity-80">
        {label}
      </p>
      {/* Subtle bar indicator for active card */}
      {active && (
        <div className="h-0.5 w-6 bg-blue-500 mt-2 rounded-full" />
      )}
    </div>
  </div>
);

export default function StatsGrid() {
  return (
    /* Using gap-6 to match the larger spacing in your new Dashboard layout */
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
      <QuickAction icon={<ArrowUpRight size={22} />} label="Portfolio" />
      <QuickAction icon={<BarChart3 size={22} />} label="Analytics" active />
      <QuickAction icon={<Box size={22} />} label="Assets" />
      <QuickAction icon={<Percent size={22} />} label="Growth" />
    </div>
  );
}