import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Box, 
  ChevronLeft, 
  PanelLeftClose, 
  PanelLeftOpen,
  History 
} from 'lucide-react';
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SidebarLink = ({ icon, label, to, isCollapsed }) => {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      to={to}
      className={`
        flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group relative
        ${active 
          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.1)]' 
          : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}
      `}
    >
      <div className={`${active ? 'text-blue-400' : 'text-gray-500 group-hover:text-blue-400'} transition-colors shrink-0`}>
        {icon}
      </div>
      
      <AnimatePresence>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="font-medium text-sm tracking-wide whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      {isCollapsed && (
        <div className="absolute left-full ml-6 px-3 py-2 bg-[#111] border border-white/10 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-50 whitespace-nowrap shadow-xl">
          {label}
        </div>
      )}
    </Link>
  );
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside 
      animate={{ width: isCollapsed ? 84 : 260 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-screen bg-[#050505] p-4 flex flex-col border-r border-white/10 relative z-50"
    >
      {/* Brand & Toggle Header */}
      <div className={`flex items-center mb-10 px-2 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20 shrink-0">
            <Box size={22} className="text-white" />
          </div>
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-xl font-bold tracking-tighter text-white whitespace-nowrap"
            >
              FINANCE
            </motion.span>
          )}
        </div>

        {/* New Integrated Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-blue-400 transition-colors ${isCollapsed ? 'mt-4' : ''}`}
        >
          {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <SidebarLink 
          icon={<LayoutDashboard size={20} />} 
          label="Overview" 
          to="/Dashboard" 
          isCollapsed={isCollapsed} 
        />
        <SidebarLink 
          icon={<Wallet size={20} />} 
          label="Goals" 
          to="/goals" 
          isCollapsed={isCollapsed} 
        />
        <SidebarLink 
          icon={<History size={20} />} 
          label="Transactions" 
          to="/transactions" 
          isCollapsed={isCollapsed} 
        />
      </nav>

      {/* Upgrade Card - Only shows when expanded */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-auto p-4 rounded-2xl bg-white/5 border border-white/10"
          >
            <p className="text-[10px] text-blue-400 font-mono uppercase tracking-widest mb-1">System Pro</p>
            <p className="text-[11px] text-gray-500 mb-3">Get AI Insights</p>
            <button className="w-full bg-blue-600 py-2 rounded-lg text-xs font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
              Upgrade
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Minimalist Pro icon for collapsed state */}
      {isCollapsed && (
        <div className="mt-auto mx-auto mb-4">
            <div className="w-10 h-10 rounded-xl border border-blue-500/30 bg-blue-600/10 flex items-center justify-center text-blue-400 cursor-pointer hover:bg-blue-600 hover:text-white transition-all">
                <Box size={18} />
            </div>
        </div>
      )}
    </motion.aside>
  );
}