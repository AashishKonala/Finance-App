import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import { PrimaryButton } from "./TxButtons";
import { CAT_STYLE } from "../../constants/transactionsData";
import { useTransactionStore } from "../../store/useTransactionStore";
import { useState } from "react";

export default function AddTransactionModal({ isOpen, onClose }) {
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const initialForm = {
    name: "",
    amount: "",
    desc: "",
    category: Object.keys(CAT_STYLE)[0],
    type: "debit",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Merchant name is required";
    }

    if (!form.amount) {
      newErrors.amount = "Amount is required";
    } else if (Number(form.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!form.desc.trim()) {
      newErrors.desc = "Description is required";
    }

    if (!form.category) {
      newErrors.category = "Category is required";
    }

    if (!["debit", "credit"].includes(form.type)) {
      newErrors.type = "Transaction type is invalid";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });

    if (errors[key]) {
      setErrors({
        ...errors,
        [key]: "",
      });
    }

    if (apiError) {
      setApiError("");
    }
  };

  const handleSave = async () => {
    if (saving) return;

    const isValid = validateForm();

    if (!isValid) return;

    try {
      setSaving(true);
      setApiError("");

      const newTx = {
        name: form.name.trim(),
        amount: Number(form.amount),
        desc: form.desc.trim(),
        category: form.category,
        type: form.type,
      };

      await addTransaction(newTx);

      setForm(initialForm);
      setErrors({});
      setApiError("");
      onClose();
    } catch (error) {
      setApiError(error.message || "Failed to save transaction");
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    if (saving) return;

    setForm(initialForm);
    setErrors({});
    setApiError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
                <p className="text-base font-medium">Add Transaction</p>
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-0.5">
                  New Entry
                </p>
              </div>

              <button
                onClick={handleClose}
                disabled={saving}
                className="text-gray-500 hover:text-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {[
                {
                  key: "name",
                  label: "Merchant Name",
                  placeholder: "e.g. Amazon",
                  type: "text",
                },
                {
                  key: "amount",
                  label: "Amount (₹)",
                  placeholder: "0.00",
                  type: "number",
                },
                {
                  key: "desc",
                  label: "Description",
                  placeholder: "e.g. Shopping · Credit Card",
                  type: "text",
                },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">
                    {f.label}
                  </label>

                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    disabled={saving}
                    onChange={(e) => handleChange(f.key, e.target.value)}
                    className={`w-full bg-white/[0.03] border rounded-xl px-3 py-2.5 text-sm font-mono text-gray-200 placeholder-gray-700 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors[f.key]
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-white/10 focus:border-blue-500/40"
                    }`}
                  />

                  {errors[f.key] && (
                    <p className="mt-1.5 text-[11px] text-red-400 font-mono">
                      {errors[f.key]}
                    </p>
                  )}
                </div>
              ))}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">
                    Category
                  </label>

                  <select
                    value={form.category}
                    disabled={saving}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className={`w-full bg-white/[0.03] border rounded-xl px-3 py-2.5 text-sm font-mono text-gray-200 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.category
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-white/10 focus:border-blue-500/40"
                    }`}
                  >
                    {Object.keys(CAT_STYLE).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  {errors.category && (
                    <p className="mt-1.5 text-[11px] text-red-400 font-mono">
                      {errors.category}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">
                    Type
                  </label>

                  <select
                    value={form.type}
                    disabled={saving}
                    onChange={(e) => handleChange("type", e.target.value)}
                    className={`w-full bg-white/[0.03] border rounded-xl px-3 py-2.5 text-sm font-mono text-gray-200 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.type
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-white/10 focus:border-blue-500/40"
                    }`}
                  >
                    <option value="debit">Debit</option>
                    <option value="credit">Credit</option>
                  </select>

                  {errors.type && (
                    <p className="mt-1.5 text-[11px] text-red-400 font-mono">
                      {errors.type}
                    </p>
                  )}
                </div>
              </div>

              {apiError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2">
                  <p className="text-[11px] text-red-400 font-mono">
                    {apiError}
                  </p>
                </div>
              )}

              <div className="pt-1">
                <PrimaryButton
                  icon={<Plus size={14} />}
                  label={saving ? "Saving..." : "Save Transaction"}
                  onClick={handleSave}
                  disabled={saving}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}