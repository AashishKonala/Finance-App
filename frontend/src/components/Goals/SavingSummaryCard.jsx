import React, { useMemo } from "react";
import { motion } from "framer-motion";

const SavingSummaryCard = ({
  loading = false,
  month = "May 2026",
  currentData = [],
  previousData = [],
  labels = [],
}) => {
  const generatePath = (data, width = 400, height = 150) => {
    if (!data.length) return "";

    const max = Math.max(...data, 1);
    const stepX = data.length === 1 ? 0 : width / (data.length - 1);

    return data
      .map((point, i) => {
        const x = i * stepX;
        const y = height - (point / max) * height;

        return `${i === 0 ? "M" : "L"}${x},${y}`;
      })
      .join(" ");
  };

  const currentPath = useMemo(
    () => generatePath(currentData),
    [currentData]
  );

  const previousPath = useMemo(
    () => generatePath(previousData),
    [previousData]
  );

  const maxValue = Math.max(...currentData, 1);

  const yLabels = [
    maxValue,
    Math.floor(maxValue * 0.5),
    Math.floor(maxValue * 0.2),
    0,
  ];

  if (loading) {
    return (
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 animate-pulse h-64">
        <div className="h-full w-full bg-white/5 rounded-lg"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.4 }}
      className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)] rounded-2xl p-6 pb-14 overflow-visible"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

      <div className="flex justify-between items-center mb-10 relative z-10">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-medium text-white">Saving Summary</h3>

          <span className="text-[10px] text-gray-500 font-mono border border-white/10 px-2 py-0.5 rounded uppercase tracking-wider">
            {month}
          </span>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-[10px] uppercase font-mono text-gray-400">
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.4)]"></span>
            Current
          </div>

          <div className="flex items-center gap-2 text-[10px] uppercase font-mono text-gray-400">
            <span className="w-2 h-2 rounded-full border border-gray-600"></span>
            Previous
          </div>
        </div>
      </div>

      <div className="flex h-48 w-full gap-6 relative z-10">
        <div className="flex flex-col justify-between text-[10px] font-mono text-gray-500 uppercase py-1">
          {yLabels.map((val, i) => (
            <span key={i}>₹{val}</span>
          ))}
        </div>

        <div className="flex-1 relative">
          <div className="absolute inset-0 flex justify-between pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-px h-full bg-white/[0.05]" />
            ))}
          </div>

          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 150"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="savingSummaryFillGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="rgba(59,130,246,0.15)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0)" />
              </linearGradient>
            </defs>

            <motion.path
              d={previousPath}
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />

            <motion.path
              d={`${currentPath} L400,150 L0,150 Z`}
              fill="url(#savingSummaryFillGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />

            <motion.path
              d={currentPath}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="drop-shadow-[0_0_6px_rgba(59,130,246,0.4)]"
            />
          </svg>

          <div className="absolute -bottom-8 w-full flex justify-between text-[10px] font-mono text-gray-500">
            {labels.map((label, index) => (
              <span key={index}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SavingSummaryCard;