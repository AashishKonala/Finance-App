import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import { PrimaryButton } from "./TxButtons";
import { CAT_STYLE } from "./transactionsData";

export default function AddTransactionModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[#0d0d0d] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.94, y: 20  }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start px-5 py-4 border-b border-white/[0.06]">
              <div>
                <p className="text-base font-medium">Add Transaction</p>
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-0.5">New Entry</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-200 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              {[
                { label: "Merchant Name", placeholder: "e.g. Amazon",                type: "text"   },
                { label: "Amount ($)",    placeholder: "0.00",                        type: "number" },
                { label: "Description",   placeholder: "e.g. Shopping · Credit Card", type: "text"  },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-sm font-mono text-gray-200 placeholder-gray-700 outline-none focus:border-blue-500/40 transition-all"
                  />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">
                    Category
                  </label>
                  <select className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-sm font-mono text-gray-200 outline-none focus:border-blue-500/40 transition-all">
                    {Object.keys(CAT_STYLE).map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">
                    Type
                  </label>
                  <select className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-sm font-mono text-gray-200 outline-none focus:border-blue-500/40 transition-all">
                    <option>Debit</option>
                    <option>Credit</option>
                  </select>
                </div>
              </div>

              <div className="pt-1">
                <PrimaryButton icon={<Plus size={14} />} label="Save Transaction" onClick={onClose} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}