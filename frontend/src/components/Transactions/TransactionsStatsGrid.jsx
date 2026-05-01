import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

export default function TransactionsStatsGrid({ transactions }) {
  const totalIncome = transactions
    .filter((t) => t.type === "credit")
    .reduce((s, t) => s + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "debit")
    .reduce((s, t) => s + Math.abs(t.amount), 0);

  const netBalance   = totalIncome - totalExpenses;
  const pendingCount = transactions.filter((t) => t.status === "pending").length;

  const fmt = (n) => n.toLocaleString("en-IN", { minimumFractionDigits: 2 });

  const stats = [
    { label: "Total Income",   value: formatCurrency(totalIncome),   color: "text-emerald-400", change: "+8.4% vs last month",  up: true  },
    { label: "Total Expenses", value: formatCurrency(totalExpenses), color: "text-red-400",     change: "+2.1% vs last month",  up: false },
    { label: "Net Balance",    value: formatCurrency(netBalance),    color: "text-white",       change: "+12.6% vs last month", up: true  },
    { label: "Transactions",   value: `${transactions.length}`, color: "text-white",       change: `${pendingCount} pending`, up: null },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-5 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:border-blue-500/20 transition-all"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.35, ease: "easeOut" }}
        >
          {/* top sheen — same as SavingsGoalCard shadow style */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          <p className="text-xs text-gray-400 font-mono uppercase tracking-wide mb-3">{s.label}</p>
          <p className={`text-2xl font-semibold font-mono ${s.color}`}>{s.value}</p>

          <div className="flex items-center gap-1 mt-2">
            {s.up === true  && <TrendingUp  size={11} className="text-emerald-400" />}
            {s.up === false && <TrendingDown size={11} className="text-red-400" />}
            <span className={`text-[10px] font-mono ${s.up === true ? "text-emerald-400" : s.up === false ? "text-red-400" : "text-gray-500"}`}>
              {s.change}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}