import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { CategoryBadge, StatusChip } from "./TxBadges";
import { ICON_BG } from "../../constants/transactionsData";
import { formatCurrency } from "../../utils/formatCurrency";

const COLUMNS = ["Transaction", "Category", "Date", "Status", "Amount"];

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.25, ease: "easeOut" },
  }),
  exit: { opacity: 0, y: -6, transition: { duration: 0.15 } },
};

const formatDate = (dateValue) => {
  if (!dateValue) return "—";

  return new Date(dateValue).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (dateValue) => {
  if (!dateValue) return "";

  return new Date(dateValue).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function TransactionsTable({ rows = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/[0.05]">
            {COLUMNS.map((h) => (
              <th
                key={h}
                className={`
                  px-5 py-2.5 text-[10px] font-mono font-medium
                  text-gray-600 uppercase tracking-widest
                  ${h === "Amount" ? "text-right" : "text-left"}
                `}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <AnimatePresence mode="popLayout">
            {rows.length === 0 ? (
              <tr key="empty">
                <td
                  colSpan={5}
                  className="py-12 text-center text-xs font-mono text-gray-700 uppercase tracking-widest"
                >
                  No transactions found
                </td>
              </tr>
            ) : (
              rows.map((tx, i) => (
                <motion.tr
                  key={tx._id || tx.id}
                  custom={i}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors cursor-pointer"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          ICON_BG[tx.category] || "bg-slate-500/10"
                        }`}
                      >
                        <span className="text-sm">{tx.icon || "•"}</span>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-100 leading-none">
                          {tx.name}
                        </p>
                        <p className="text-[10px] font-mono text-gray-500 mt-1">
                          {tx.desc}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-3.5">
                    <CategoryBadge category={tx.category} />
                  </td>

                  <td className="px-5 py-3.5">
                    <p className="text-xs font-mono text-gray-400">
                      {tx.date || formatDate(tx.createdAt)}
                    </p>
                    <p className="text-[10px] font-mono text-gray-600 mt-0.5">
                      {tx.time || formatTime(tx.createdAt)}
                    </p>
                  </td>

                  <td className="px-5 py-3.5">
                    <StatusChip status={tx.status || "Completed"} />
                  </td>

                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {tx.type === "credit" ? (
                        <ArrowDownLeft size={13} className="text-emerald-400" />
                      ) : (
                        <ArrowUpRight size={13} className="text-red-400" />
                      )}

                      <span
                        className={`text-sm font-semibold font-mono ${
                          tx.type === "credit"
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {tx.type === "credit" ? "+" : "−"}
                        {formatCurrency(Math.abs(tx.amount))}
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}