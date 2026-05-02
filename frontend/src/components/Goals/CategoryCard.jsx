import { PencilLine } from "lucide-react";

const formatMoney = (value = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const iconThemeMap = {
  Housing: {
    bg: "bg-blue-500/12",
    border: "border-blue-500/20",
    icon: "text-blue-400",
    bar: "bg-blue-500",
  },
  Food: {
    bg: "bg-emerald-500/12",
    border: "border-emerald-500/20",
    icon: "text-emerald-400",
    bar: "bg-emerald-400",
  },
  Transportation: {
    bg: "bg-violet-500/12",
    border: "border-violet-500/20",
    icon: "text-violet-400",
    bar: "bg-violet-400",
  },
  Entertainment: {
    bg: "bg-amber-500/12",
    border: "border-amber-500/20",
    icon: "text-amber-400",
    bar: "bg-amber-400",
  },
  Shopping: {
    bg: "bg-pink-500/12",
    border: "border-pink-500/20",
    icon: "text-pink-400",
    bar: "bg-pink-400",
  },
  Others: {
    bg: "bg-sky-500/12",
    border: "border-sky-500/20",
    icon: "text-sky-400",
    bar: "bg-sky-400",
  },
};

const CategoryCard = ({
  icon: Icon,
  label,
  budget = 0,
  spent = 0,
  onAdjust,
}) => {
  const usedPercent = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
  const left = Math.max(budget - spent, 0);
  const isOverBudget = spent > budget;

  const theme = iconThemeMap[label] || {
    bg: "bg-blue-500/12",
    border: "border-blue-500/20",
    icon: "text-blue-400",
    bar: "bg-blue-500",
  };

  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 min-h-[132px] hover:border-blue-500/20 hover:bg-white/[0.04] transition-all duration-300">
      {/* Top Row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center border ${theme.bg} ${theme.border}`}
          >
            <Icon size={20} className={theme.icon} />
          </div>

          <div>
            <p className="text-[15px] font-medium text-white leading-none">
              {label}
            </p>
          </div>
        </div>

        <button
          onClick={onAdjust}
          className="h-10 px-4 rounded-xl border border-white/10 text-sm text-gray-200 hover:border-white/20 hover:bg-white/[0.03] transition flex items-center gap-2"
        >
          Edit <PencilLine size={14} />
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-6 mb-4">
        <div>
          <p className="text-xs text-gray-400 mb-1">Budget</p>
          <p className="text-[15px] font-semibold text-white">
            {formatMoney(budget)}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-1">Spent</p>
          <p className="text-[15px] font-semibold text-white">
            {formatMoney(spent)}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-1">Left</p>
          <p
            className={`text-[15px] font-semibold ${
              isOverBudget ? "text-red-400" : "text-emerald-400"
            }`}
          >
            {isOverBudget ? "Over" : formatMoney(left)}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="h-2 flex-1 bg-white/[0.06] rounded-full overflow-hidden mr-4">
            <div
              className={`h-full rounded-full ${theme.bar}`}
              style={{ width: `${usedPercent}%` }}
            />
          </div>

          <p className="text-sm text-gray-300 min-w-[42px] text-right">
            {usedPercent.toFixed(0)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;