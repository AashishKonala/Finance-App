import { LayoutDashboard, Wallet, BarChart3, CreditCard, History, Settings, Box } from 'lucide-react';

const SidebarLink = ({ icon, label, active = false }) => (
  <div className={`
    flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group
    ${active 
      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.1)]' 
      : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}
  `}>
    <div className={`${active ? 'text-blue-400' : 'text-gray-500 group-hover:text-blue-400'} transition-colors`}>
      {icon}
    </div>
    <span className="font-medium text-sm tracking-wide">{label}</span>
  </div>
);

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#050505] p-6 flex flex-col border-r border-white/10 relative overflow-hidden">
      {/* Background Aura - Matching your Landing Page Hero */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />

      {/* Brand Logo */}
      <div className="relative z-10 flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
          <Box size={22} className="text-white" />
        </div>
        <span className="text-xl font-bold tracking-tighter text-white">FINANCE</span>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex-1 space-y-2">
        <SidebarLink icon={<LayoutDashboard size={20} />} label="Overview" active />
        <SidebarLink icon={<Wallet size={20} />} label="Payments" />
        <SidebarLink icon={<BarChart3 size={20} />} label="Analytics" />
        <SidebarLink icon={<CreditCard size={20} />} label="Cards" />
        <div className="h-px bg-white/5 my-6 mx-2" /> {/* Divider */}
        <SidebarLink icon={<History size={20} />} label="History" />
        <SidebarLink icon={<Settings size={20} />} label="Settings" />
      </nav>

      {/* Upgrade Card - Glassmorphism style */}
      <div className="relative mt-auto p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent overflow-hidden group">
        <div className="relative z-10 bg-white/5 backdrop-blur-md p-5 rounded-2xl">
          <p className="text-[11px] text-blue-400 font-mono uppercase tracking-[0.2em] mb-2">Pro Plan</p>
          <p className="text-xs text-gray-400 mb-4 leading-relaxed">Unlock advanced AI financial insights.</p>
          <button className="w-full bg-blue-600 text-white text-xs font-bold py-3 rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
            Upgrade Now
          </button>
        </div>
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </aside>
  );
}