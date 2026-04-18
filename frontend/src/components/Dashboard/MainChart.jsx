import { SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MainChart() {
  const chartData = [40, 70, 45, 90, 65, 80, 30, 50, 40, 60, 45, 55];

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 border border-white/10 w-full relative overflow-hidden group">
      {/* Subtle background glow specific to the chart */}
      <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex justify-between items-center mb-10 relative z-10">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Market Expenditures</h3>
          <p className="text-[10px] text-blue-400 font-mono uppercase tracking-[0.2em] mt-1">Real-time Data</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            {['Jan', 'Feb', 'Mar', 'Jun'].map((m) => (
              <span key={m} className={m === 'Jun' ? "text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20" : "py-1.5 px-1"}>
                {m}
              </span>
            ))}
          </div>
          <button className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Bar Visualizer */}
      <div className="h-48 w-full flex items-end gap-3 px-2 relative z-10">
        {chartData.map((h, i) => (
          <div key={i} className="flex-1 h-full flex flex-col justify-end group/bar">
            {/* The actual bar */}
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 1, delay: i * 0.05, ease: "circOut" }}
              className="w-full bg-blue-500/20 rounded-t-lg transition-all duration-300 group-hover/bar:bg-blue-500 group-hover/bar:shadow-[0_0_20px_rgba(59,130,246,0.4)] relative cursor-pointer"
            >
              {/* Tooltip on hover */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-xl border border-blue-400/30 -translate-y-2 group-hover/bar:translate-y-0">
                ${h * 100}.00
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Footer info */}
      <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center relative z-10">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold tracking-tighter text-white">$34,742.00</span>
          <span className="text-xs font-medium text-green-400 flex items-center gap-1">
            <ArrowUpRight size={14} /> 12.5%
          </span>
        </div>
        <button className="px-8 py-3.5 bg-blue-600 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
          View Report
        </button>
      </div>
    </div>
  );
}