import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Target, TrendingUp, ChevronDown, PencilLine } from "lucide-react";

const SavingsGoalCard = ({
  loading = false,
  achieved = 12500,
  target = 20000
}) => {

  // ---------- LOADING ----------
  if (loading) {
    return (
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 animate-pulse">
        <div className="h-5 w-32 bg-white/10 rounded mb-6"></div>

        <div className="flex justify-between">
          <div className="space-y-4">
            <div className="h-4 w-24 bg-white/10 rounded"></div>
            <div className="h-6 w-32 bg-white/10 rounded"></div>

            <div className="h-4 w-24 bg-white/10 rounded mt-4"></div>
            <div className="h-6 w-32 bg-white/10 rounded"></div>
          </div>

          <div className="w-32 h-20 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  // ---------- DATA ----------
  const percentage = Math.min(achieved / target, 1);
  const progress = percentage * 100;

  // Arc math
  const radius = 60;
  const circumference = Math.PI * radius; // semicircle
  const strokeDashoffset = circumference - (percentage * circumference);

  // ---------- ANIMATED NUMBER ----------
  
  const [displayPercent, setDisplayPercent] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = progress;
    const duration = 1000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setDisplayPercent(start);
    }, 16);

    return () => clearInterval(timer);
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.01 }}
      className="bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)] rounded-2xl p-6 group hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all"
    >

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <h3 className="text-lg font-medium">Savings Goal</h3>

        <button className="flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/10 rounded-lg text-xs font-mono hover:border-blue-500/40 hover:bg-blue-500/10 transition">
          01 May ~ 31 May <ChevronDown size={14} />
        </button>
      </div>

      {/* Content */}
      <div className="flex items-center justify-between">

        {/* LEFT SIDE */}
        <div className="space-y-6">

          <div>
            <p className="text-xs text-gray-400 flex items-center gap-2">
              <Target size={14} className="text-blue-400" />
              Target Achieved
            </p>
            <p className="text-2xl font-semibold mt-1">
              ₹{achieved.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400 flex items-center gap-2">
              <TrendingUp size={14} className="text-green-400" />
              This Month Target
            </p>
            <p className="text-2xl font-semibold mt-1 font-mono">
              ₹{target.toLocaleString()}
            </p>
          </div>

          <button className="mt-4 flex items-center gap-2 px-4 py-2 border border-blue-500/40 text-blue-400 rounded-xl text-sm hover:bg-blue-500 hover:text-white transition shadow-lg shadow-blue-500/10">
            Adjust Goal <PencilLine size={16} />
          </button>

        </div>

        {/* RIGHT SIDE - GAUGE */}
        <div className="relative flex flex-col items-center">

          <svg width="140" height="80" viewBox="0 0 140 80">

            {/* Background Arc */}
            <path
              d="M 10 70 A 60 60 0 0 1 130 70"
              fill="none"
              stroke="#0f172a"
              strokeWidth="10"
              strokeLinecap="round"
            />

            {/* Animated Progress Arc */}
            <motion.path
              d="M 10 70 A 60 60 0 0 1 130 70"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
            />

            {/* Gradient */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>

          </svg>

          {/* Percentage */}
          <div className="text-center -mt-6">
            <p className="text-xl font-bold font-mono">
              {displayPercent.toFixed(0)}%
            </p>
            <p className="text-[10px] text-gray-500 font-mono uppercase">
              Progress
            </p>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default SavingsGoalCard;
