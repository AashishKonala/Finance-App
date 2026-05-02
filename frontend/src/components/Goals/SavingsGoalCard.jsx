import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, PencilLine, CalendarDays } from "lucide-react";
import AdjustGoalModal from "./AdjustGoalModal";
import { formatCompactCurrency } from "../../utils/formatCurrency";

const SavingsGoalCard = ({
  loading = false,
  achieved = 0,
  target = 1,
  startDate = "",
  endDate = "",
}) => {
  const [showAdjustGoal, setShowAdjustGoal] = useState(false);
  const [displayPercent, setDisplayPercent] = useState(0);

  const safeTarget = target || 1;
  const percentage = Math.min(achieved / safeTarget, 1);
  const progress = percentage * 100;
  const remaining = Math.max(target - achieved, 0);

  const getDaysLeft = () => {
    if (!endDate) return null;

    const today = new Date();
    const end = new Date(endDate);

    today.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return Math.max(diffDays, 0);
  };

  const daysLeft = getDaysLeft();

  const formatDisplayDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatShortDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  };

  const getStatus = () => {
    if (achieved >= target) {
      return {
        label: "Completed",
        className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      };
    }

    if (progress >= 50) {
      return {
        label: "On Track",
        className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      };
    }

    return {
      label: "Behind",
      className: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    };
  };

  const status = getStatus();

  const gaugeRadius = 82;
  const gaugeCircumference = 2 * Math.PI * gaugeRadius;
  const gaugeArcLength = 0.72 * gaugeCircumference;
  const progressArcLength = percentage * gaugeArcLength;

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

  if (loading) {
    return (
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-5 animate-pulse min-h-[300px]">
        <div className="h-5 w-32 bg-white/10 rounded mb-6"></div>
        <div className="h-8 w-40 bg-white/10 rounded mb-5"></div>

        <div className="grid grid-cols-2 gap-4">
          <div className="h-14 bg-white/10 rounded"></div>
          <div className="h-14 bg-white/10 rounded"></div>
          <div className="h-14 bg-white/10 rounded"></div>
          <div className="h-14 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.01 }}
        className="relative min-h-[300px] bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)] rounded-2xl px-6 py-5 overflow-hidden group hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
        <div className="absolute -bottom-28 -right-24 w-72 h-72 bg-blue-500/10 blur-[90px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex justify-between items-start mb-5">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-white">Savings Goal</h3>

            <span
              className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md border ${status.className}`}
            >
              ● {status.label}
            </span>
          </div>

          <button className="flex items-center gap-2 px-3.5 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-xs font-mono text-gray-300 hover:border-blue-500/40 hover:bg-blue-500/10 transition">
            {formatShortDate(startDate)} - {formatShortDate(endDate)}
            <ChevronDown size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-between gap-8">
          {/* Left Content */}
          <div className="flex-1 max-w-[58%] min-w-0">
            <div className="mb-5">
              <p className="text-xs text-gray-400 mb-2">Target Amount</p>
              <p className="text-3xl leading-none font-bold text-white tracking-tight">
                {formatCompactCurrency(target)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-0">
              {/* Row 1 */}
              <div className="border-r border-white/10 pr-5 pb-4">
                <p className="text-xs text-gray-400 mb-1 whitespace-nowrap">
                  Target Achieved
                </p>
                <p className="text-xl leading-none font-semibold text-blue-400">
                  {formatCompactCurrency(achieved)}
                </p>
              </div>

              <div className="pl-2 pb-4">
                <p className="text-xs text-gray-400 mb-1 whitespace-nowrap">
                  This Month Target
                </p>
                <p className="text-xl leading-none font-semibold text-emerald-400">
                  {formatCompactCurrency(target)}
                </p>
              </div>

              <div className="col-span-2 border-t border-white/10 mb-4" />

              {/* Row 2 */}
              <div className="border-r border-white/10 pr-5">
                <p className="text-xs text-gray-400 mb-1 whitespace-nowrap">
                  Remaining Amount
                </p>
                <p className="text-xl leading-none font-semibold text-amber-400">
                  {formatCompactCurrency(remaining)}
                </p>
              </div>

              <div className="pl-2">
                <p className="text-xs text-gray-400 mb-1 flex items-center gap-1.5 whitespace-nowrap">
                  <CalendarDays size={13} className="text-gray-400" />
                  Days Left
                </p>

                <p className="text-xl leading-none font-semibold text-white">
                  {daysLeft !== null ? `${daysLeft} Days` : "—"}
                </p>

                {endDate && (
                  <p className="text-[10px] font-mono text-gray-500 mt-1.5">
                    ({formatDisplayDate(endDate)})
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => setShowAdjustGoal(true)}
              className="mt-5 flex items-center gap-2 px-4 py-2 border border-blue-500/40 text-blue-400 rounded-xl text-sm hover:bg-blue-500 hover:text-white transition shadow-lg shadow-blue-500/10"
            >
              Adjust Goal <PencilLine size={16} />
            </button>
          </div>

          {/* Gauge */}
          <div className="relative flex items-center justify-center min-w-[180px] h-[180px]">
            {/* <div className="absolute w-44 h-44 bg-blue-500/10 blur-[95px] rounded-full" /> */}

            <svg width="180" height="180" viewBox="0 0 190 190">
              <circle
                cx="95"
                cy="95"
                r={gaugeRadius}
                fill="none"
                stroke="#0f172a"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${gaugeArcLength} ${gaugeCircumference}`}
                transform="rotate(140 95 95)"
              />

              <motion.circle
                cx="95"
                cy="95"
                r={gaugeRadius}
                fill="none"
                stroke="url(#savingsGoalGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${progressArcLength} ${gaugeCircumference}`}
                initial={{
                  strokeDasharray: `0 ${gaugeCircumference}`,
                }}
                animate={{
                  strokeDasharray: `${progressArcLength} ${gaugeCircumference}`,
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                transform="rotate(140 95 95)"
                className="drop-shadow-[0_0_10px_rgba(59,30,6,0.55)]"
              />

              <defs>
                <linearGradient
                  id="savingsGoalGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute text-center">
              <p className="text-3xl font-bold text-white">
                {displayPercent.toFixed(0)}%
              </p>
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mt-1">
                Progress
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <AdjustGoalModal
        isOpen={showAdjustGoal}
        onClose={() => setShowAdjustGoal(false)}
      />
    </>
  );
};

export default SavingsGoalCard;