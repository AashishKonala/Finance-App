import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatCompactCurrency } from "../../utils/formatCurrency";

const SavingSummaryCard = ({
  loading = false,
  month = "May 2026",
  currentData = [],
  previousData = [],
  labels = [],
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const chartWidth = 400;
  const chartHeight = 150;

  const safeCurrentData = currentData.length ? currentData : [0];
  const safePreviousData = previousData.length ? previousData : [0];

  const totalCurrent = safeCurrentData[safeCurrentData.length - 1] || 0;
  const totalPrevious = safePreviousData[safePreviousData.length - 1] || 0;

  const difference = totalCurrent - totalPrevious;
  const percentageChange =
    totalPrevious > 0 ? (difference / totalPrevious) * 100 : 0;

  const isPositive = difference >= 0;

  const maxValue = Math.max(...safeCurrentData, ...safePreviousData, 1);

  const getPoint = (data, index) => {
    const safeData = data.length ? data : [0];
    const stepX =
      safeData.length === 1 ? 0 : chartWidth / (safeData.length - 1);

    const point = safeData[index] ?? 0;
    const x = index * stepX;
    const y = chartHeight - (point / maxValue) * chartHeight;

    return { x, y, value: point };
  };

  const generatePath = (data) => {
    if (!data.length) return "";

    return data
      .map((point, i) => {
        const { x, y } = getPoint(data, i);
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      })
      .join(" ");
  };

  const currentPath = useMemo(
    () => generatePath(safeCurrentData),
    [safeCurrentData, maxValue]
  );

  const previousPath = useMemo(
    () => generatePath(safePreviousData),
    [safePreviousData, maxValue]
  );

  const yLabels = [
    maxValue,
    Math.floor(maxValue * 0.66),
    Math.floor(maxValue * 0.33),
    0,
  ];

  const handleMouseMove = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - bounds.left;

    const dataLength = safeCurrentData.length;
    const stepX = bounds.width / Math.max(dataLength - 1, 1);

    const nearestIndex = Math.round(mouseX / stepX);
    const clampedIndex = Math.max(0, Math.min(nearestIndex, dataLength - 1));

    setActiveIndex(clampedIndex);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const activeCurrentPoint =
    activeIndex !== null ? getPoint(safeCurrentData, activeIndex) : null;

  const activePreviousPoint =
    activeIndex !== null ? getPoint(safePreviousData, activeIndex) : null;

  const activeLabel =
    activeIndex !== null
      ? labels[activeIndex] || `Point ${activeIndex + 1}`
      : "";

  const activeDifference =
    activeIndex !== null
      ? (safeCurrentData[activeIndex] || 0) -
        (safePreviousData[activeIndex] || 0)
      : 0;

  const tooltipLeft =
    activeCurrentPoint && activeCurrentPoint.x > chartWidth * 0.72
      ? "auto"
      : activeCurrentPoint
      ? `${(activeCurrentPoint.x / chartWidth) * 100}%`
      : "0%";

  const tooltipRight =
    activeCurrentPoint && activeCurrentPoint.x > chartWidth * 0.72 ? "0px" : "auto";

  if (loading) {
    return (
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-5 animate-pulse min-h-[300px]">
        <div className="h-5 w-36 bg-white/10 rounded mb-6"></div>
        <div className="h-8 w-44 bg-white/10 rounded mb-6"></div>
        <div className="h-40 w-full bg-white/5 rounded-xl"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-[300px] bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)] rounded-2xl px-6 py-5 pb-10 overflow-hidden"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex justify-between items-start mb-5">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-white">
              Saving Summary
            </h3>

            <span className="text-[10px] text-gray-500 font-mono border border-white/10 px-2.5 py-1 rounded-md uppercase tracking-wider">
              {month}
            </span>
          </div>

          {/* <p className="text-xs text-gray-500 mt-1">
            Cumulative savings compared with previous period
          </p> */}
        </div>

        <div className="flex gap-4 pt-1">
          <div className="flex items-center gap-2 text-[10px] uppercase font-mono text-gray-400">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Current
          </div>

          <div className="flex items-center gap-2 text-[10px] uppercase font-mono text-gray-400">
            <span className="w-2 h-2 rounded-full border border-gray-600"></span>
            Previous
          </div>
        </div>
      </div>

      {/* KPI */}
      <div className="relative z-10 flex items-end justify-between mb-5">
        <div>
          <p className="text-xs text-gray-400 mb-1">Total Saved This Month</p>
          <p className="text-3xl leading-none font-bold text-white tracking-tight">
            {formatCompactCurrency(totalCurrent)}
          </p>
        </div>

        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono ${
            isPositive
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-red-500/10 text-red-400 border-red-500/20"
          }`}
        >
          {isPositive ? (
            <TrendingUp size={14} className="text-emerald-400" />
          ) : (
            <TrendingDown size={14} className="text-red-400" />
          )}

          {isPositive ? "+" : ""}
          {percentageChange.toFixed(1)}% vs previous
        </div>
      </div>

      {/* Chart */}
      <div className="flex h-40 w-full gap-5 relative z-10">
        {/* Y Axis */}
        <div className="flex flex-col justify-between text-[10px] font-mono text-gray-500 py-1">
          {yLabels.map((val, i) => (
            <span key={i}>{formatCompactCurrency(val)}</span>
          ))}
        </div>

        {/* Chart Area */}
        <div
          className="flex-1 relative cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Horizontal Grid */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-px w-full bg-white/[0.05]" />
            ))}
          </div>

          {/* Vertical Grid */}
          <div className="absolute inset-0 flex justify-between pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-px h-full bg-white/[0.035]" />
            ))}
          </div>

          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
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
                <stop offset="0%" stopColor="rgba(59,130,246,0.16)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0)" />
              </linearGradient>
            </defs>

            {/* Previous Line */}
            <motion.path
              d={previousPath}
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1.6"
              strokeDasharray="5 5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />

            {/* Fill */}
            <motion.path
              d={`${currentPath} L${chartWidth},${chartHeight} L0,${chartHeight} Z`}
              fill="url(#savingSummaryFillGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />

            {/* Current Line */}
            <motion.path
              d={currentPath}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />

            {/* Active guide and points */}
            {activeCurrentPoint && (
              <>
                <line
                  x1={activeCurrentPoint.x}
                  y1="0"
                  x2={activeCurrentPoint.x}
                  y2={chartHeight}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />

                <circle
                  cx={activePreviousPoint.x}
                  cy={activePreviousPoint.y}
                  r="4"
                  fill="#0d0d0d"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="2"
                />

                <circle
                  cx={activeCurrentPoint.x}
                  cy={activeCurrentPoint.y}
                  r="5"
                  fill="#3b82f6"
                  stroke="#0d0d0d"
                  strokeWidth="2"
                />
              </>
            )}
          </svg>

          {/* Tooltip */}
          <AnimatePresence>
            {activeIndex !== null && activeCurrentPoint && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
                className="absolute top-2 z-20 min-w-[165px] rounded-xl border border-white/10 bg-[#0b0b0b]/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.45)] px-3 py-2 pointer-events-none"
                style={{
                  left: tooltipLeft,
                  right: tooltipRight,
                  transform:
                    tooltipRight === "auto" ? "translateX(-10%)" : "none",
                }}
              >
                <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">
                  {activeLabel}
                </p>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[11px] text-gray-400">Current</span>
                    <span className="text-[11px] font-mono text-blue-400">
                      {formatCompactCurrency(safeCurrentData[activeIndex])}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[11px] text-gray-400">Previous</span>
                    <span className="text-[11px] font-mono text-gray-300">
                      {formatCompactCurrency(safePreviousData[activeIndex])}
                    </span>
                  </div>

                  <div className="border-t border-white/10 pt-1.5 flex items-center justify-between gap-4">
                    <span className="text-[11px] text-gray-400">Diff</span>
                    <span
                      className={`text-[11px] font-mono ${
                        activeDifference >= 0
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {activeDifference >= 0 ? "+" : ""}
                      {formatCompactCurrency(activeDifference)}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* X Axis */}
          <div className="absolute -bottom-7 w-full flex justify-between text-[10px] font-mono text-gray-500">
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