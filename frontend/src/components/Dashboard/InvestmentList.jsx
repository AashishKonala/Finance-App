import { ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';

export default function InvestmentList() {
  const investments = [
    { id: 1, title: 'Hondo', amount: '7.242', change: '+7.34%', color: 'from-blue-400 to-blue-600', symbol: 'H' },
    { id: 2, title: 'Samsen', amount: '4.384', change: '-3.85%', color: 'from-indigo-400 to-indigo-600', symbol: 'S' },
    { id: 3, title: 'Nikom', amount: '0.539', change: '-1.48%', color: 'from-cyan-400 to-cyan-600', symbol: 'N' },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-6 border border-white/10 relative overflow-hidden group">
      {/* Background aura detail */}
      <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />

      <div className="flex justify-between items-center mb-8 relative z-10">
        <div>
          <h3 className="font-bold text-lg text-white tracking-tight">Active Assets</h3>
          <p className="text-[10px] text-blue-400 font-mono uppercase tracking-[0.2em] mt-0.5">Live Portfolio</p>
        </div>
        <button className="p-2.5 bg-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5">
          <ArrowUpRight size={18} />
        </button>
      </div>

      <div className="space-y-4 relative z-10">
        {investments.map((item) => {
          const isPositive = item.change.startsWith('+');
          return (
            <div 
              key={item.id} 
              className="flex items-center justify-between group/item cursor-pointer p-3 rounded-2xl border border-transparent hover:border-white/5 hover:bg-white/[0.03] transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                {/* Icon with Gradient Glow */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-blue-900/20 group-hover/item:scale-110 transition-transform duration-300`}>
                  {item.symbol}
                </div>
                <div>
                  <p className="font-bold text-sm text-white group-hover/item:text-blue-400 transition-colors">{item.title}</p>
                  <p className="text-[11px] text-gray-500 font-medium">{item.amount} units</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`flex items-center justify-end gap-1 text-sm font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {item.change}
                </div>
                <p className="text-[9px] text-gray-600 font-mono uppercase tracking-widest mt-0.5">MTD Performance</p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-8 py-4 rounded-2xl border border-white/10 bg-white/[0.02] text-gray-400 text-xs font-bold uppercase tracking-[0.2em] hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 shadow-xl">
        Review Portfolio
      </button>
    </div>
  );
}