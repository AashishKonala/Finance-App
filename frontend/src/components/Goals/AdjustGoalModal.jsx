import { motion, AnimatePresence } from "framer-motion";
import { X, Target, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useGoalStore } from "../../store/useGoalStore";

export default function AdjustGoalModal({ isOpen, onClose }) {
  const monthlyGoal = useGoalStore((state) => state.monthlyGoal);
  const updateMonthlyGoal = useGoalStore((state) => state.updateMonthlyGoal);

  const [form, setForm] = useState({
    achieved: "",
    target: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (isOpen && monthlyGoal) {
      setForm({
        achieved: monthlyGoal.achieved || "",
        target: monthlyGoal.target || "",
        startDate: monthlyGoal.startDate || "",
        endDate: monthlyGoal.endDate || "",
      });
    }
  }, [isOpen, monthlyGoal]);

  const handleSave = () => {
    const achievedAmount = Number(form.achieved);
    const targetAmount = Number(form.target);

    if (!targetAmount || targetAmount <= 0) {
      alert("Please enter a valid target amount");
      return;
    }

    if (achievedAmount < 0) {
      alert("Achieved amount cannot be negative");
      return;
    }

    updateMonthlyGoal({
      achieved: achievedAmount,
      target: targetAmount,
      startDate: form.startDate,
      endDate: form.endDate,
    });

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
          onClick={onClose}
        >
          <motion.div
            className="bg-[#0d0d0d] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start px-5 py-4 border-b border-white/[0.06]">
              <div>
                <p className="text-base font-medium flex items-center gap-2">
                  <Target size={16} className="text-blue-400" />
                  Adjust Goal
                </p>
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-0.5">
                  Monthly Target
                </p>
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
                {
                  key: "achieved",
                  label: "Target Achieved",
                  placeholder: "e.g. 12500",
                  type: "number",
                },
                {
                  key: "target",
                  label: "Monthly Target",
                  placeholder: "e.g. 20000",
                  type: "number",
                },
                {
                  key: "startDate",
                  label: "Start Date",
                  placeholder: "",
                  type: "date",
                },
                {
                  key: "endDate",
                  label: "End Date",
                  placeholder: "",
                  type: "date",
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
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [f.key]: e.target.value,
                      })
                    }
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-sm font-mono text-gray-200 placeholder-gray-700 outline-none focus:border-blue-500/40 transition-all"
                  />
                </div>
              ))}

              {/* Preview */}
              <div className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3">
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">
                  Preview
                </p>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Remaining</span>
                  <span className="text-blue-400 font-mono">
                    ₹
                    {Math.max(
                      Number(form.target || 0) - Number(form.achieved || 0),
                      0
                    ).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-green-400 font-mono">
                    {form.target
                      ? Math.min(
                          (Number(form.achieved || 0) /
                            Number(form.target || 1)) *
                            100,
                          100
                        ).toFixed(0)
                      : 0}
                    %
                  </span>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-1">
                <button
                  onClick={handleSave}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition shadow-lg shadow-blue-500/20"
                >
                  <Save size={14} />
                  Save Goal
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}