import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save } from "lucide-react";
import { useGoalStore } from "../../store/useGoalStore";

const AdjustCategoryModal = ({ isOpen, onClose, category }) => {
  const updateCategoryAmount = useGoalStore(
    (state) => state.updateCategoryAmount
  );

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (category) {
      setAmount(category.amount || "");
      setError("");
    }
  }, [category]);

  const handleSave = async () => {
    if (saving) return;

    const numericAmount = Number(amount);

    if (!amount) {
      setError("Budget amount is required");
      return;
    }

    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      setError("Budget amount must be greater than 0");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await updateCategoryAmount(category._id || category.id, numericAmount);

      onClose();
    } catch (err) {
      setError(err.message || "Failed to update category budget");
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    if (saving) return;

    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && category && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="bg-[#0d0d0d] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start px-5 py-4 border-b border-white/[0.06]">
              <div>
                <p className="text-base font-medium text-white">
                  Adjust Category Budget
                </p>
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-0.5">
                  {category.label}
                </p>
              </div>

              <button
                onClick={handleClose}
                disabled={saving}
                className="text-gray-500 hover:text-gray-200 transition-colors disabled:opacity-40"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">
                  Budget Amount (₹)
                </label>

                <input
                  type="number"
                  value={amount}
                  disabled={saving}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="e.g. 5000"
                  className={`w-full bg-white/[0.03] border rounded-xl px-3 py-2.5 text-sm font-mono text-gray-200 placeholder-gray-700 outline-none transition-all disabled:opacity-50 ${
                    error
                      ? "border-red-500/50 focus:border-red-500"
                      : "border-white/10 focus:border-blue-500/40"
                  }`}
                />

                {error && (
                  <p className="mt-1.5 text-[11px] text-red-400 font-mono">
                    {error}
                  </p>
                )}
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3">
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  Current Category
                </p>
                <p className="text-sm text-gray-200 mt-1">
                  {category.label}
                </p>
              </div>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
              >
                <Save size={14} />
                {saving ? "Saving..." : "Save Budget"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdjustCategoryModal;