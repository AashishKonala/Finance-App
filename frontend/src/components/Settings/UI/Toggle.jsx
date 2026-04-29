import { motion } from "framer-motion";

export default function Toggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
        enabled ? "bg-blue-500" : "bg-white/10"
      }`}
    >
      <motion.span
        animate={{ x: enabled ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md block"
      />
    </button>
  );
}
