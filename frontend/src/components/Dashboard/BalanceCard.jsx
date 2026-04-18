import { ArrowUpRight, ArrowDownLeft, History, Box } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BalanceCard() {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 border border-white/10 h-fit flex flex-col text-white relative overflow-hidden group">
      {/* Background radial glow */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-600/10 blur-[50px] rounded-full pointer-events-none" />
      
      {/* Header Section */}
      <div className="flex justify-between items-start mb-10 relative z-10">
        <div>
          <p className="text-blue-400 text-[10px] font-mono uppercase tracking-[0.2em] mb-1">Available Liquidity</p>
          <h2 className="text-4xl font-bold tracking-tighter">$9,385.34</h2>
        </div>
        <div className="p-3 bg-blue-600/20 rounded-2xl border border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white transition-all cursor-pointer shadow-lg shadow-blue-900/20">
          <ArrowUpRight size={20} />
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-4 mb-10 relative z-10">
        {[ArrowUpRight, ArrowDownLeft, History, Box].map((Icon, i) => (
          <button 
            key={i} 
            className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300 group/btn"
          >
            <Icon size={18} className="text-gray-400 group-hover:text-white transition-colors" />
          </button>
        ))}
      </div>

      {/* Progress Section */}
      <div className="pt-8 border-t border-white/10 relative z-10">
        <div className="flex justify-between items-end text-sm mb-5">
          <div>
            <p className="text-gray-500 text-xs mb-1">Spending Limit</p>
            <span className="font-bold text-white tracking-tight">$274.00</span>
          </div>
          <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">40% USED</span>
        </div>
        
        {/* The Gauge/Slider */}
        <div className="h-2 w-full bg-white/5 rounded-full relative overflow-visible">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: '40%' }}
             transition={{ duration: 1.5, ease: "circOut" }}
             className="absolute top-0 left-0 h-full bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"
           >
              {/* Glowing Indicator Handle */}
              <div className="absolute right-0 -top-1.5 w-5 h-5 bg-white border-4 border-blue-600 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
           </motion.div>
        </div>
      </div>
    </div>
  );
}