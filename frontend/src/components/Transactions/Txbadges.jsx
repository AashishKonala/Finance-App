import { CheckCircle2, XCircle } from "lucide-react";
import { CAT_STYLE } from "../constants/transactionsData";

export function CategoryBadge({ category }) {
  const s = CAT_STYLE[category] || CAT_STYLE.Utility;
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-md
        text-[10px] font-mono font-medium uppercase tracking-wide border
        ${s.bg} ${s.text} ${s.border}
      `}
    >
      {category}
    </span>
  );
}

export function StatusChip({ status }) {
  const map = {
    completed: {
      label: "Completed",
      icon: <CheckCircle2 size={10} />,
      cls: "bg-emerald-500/[0.08] text-emerald-400 border-emerald-500/20",
    },
    pending: {
      label: "Pending",
      icon: null,
      cls: "bg-yellow-500/[0.08] text-yellow-400 border-yellow-500/20",
    },
    failed: {
      label: "Failed",
      icon: <XCircle size={10} />,
      cls: "bg-red-500/[0.08] text-red-400 border-red-500/20",
    },
  };

  const { label, icon, cls } = map[status] || map.completed;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-0.5
        rounded-md text-[10px] font-mono border whitespace-nowrap
        ${cls}
      `}
    >
      {status === "pending" ? (
        <span className="blink w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block" />
      ) : (
        icon
      )}
      {label}
    </span>
  );
}