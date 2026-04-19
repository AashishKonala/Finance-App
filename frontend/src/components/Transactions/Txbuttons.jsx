import { motion } from "framer-motion";

export function GlassButton({ icon, label, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/10 rounded-lg text-xs font-mono text-gray-400 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400 transition-all"
      whileTap={{ scale: 0.97 }}
    >
      {icon}{label}
    </motion.button>
  );
}

export function PrimaryButton({ icon, label, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 border border-blue-500/40 text-blue-400 rounded-xl text-sm hover:bg-blue-500 hover:text-white transition-all shadow-lg shadow-blue-500/10"
      whileTap={{ scale: 0.97 }}
    >
      {icon}{label}
    </motion.button>
  );
}

export function PageBtn({ children, onClick, active, disabled }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-7 h-7 rounded-lg flex items-center justify-content-center text-xs font-mono border transition-all outline-none
        ${active
          ? "bg-blue-500/15 border-blue-500/40 text-blue-400"
          : disabled
            ? "bg-white/[0.02] border-white/10 text-gray-600 cursor-not-allowed opacity-30"
            : "bg-white/[0.02] border-white/10 text-gray-500 hover:bg-white/[0.05] hover:text-gray-300"
        }
      `}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {children}
    </motion.button>
  );
}