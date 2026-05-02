import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Home,
  Utensils,
  Car,
  Film,
  ShoppingBag,
  LayoutGrid,
  HeartPulse,
  Plane,
  GraduationCap,
  CreditCard,
} from "lucide-react";
import { useGoalStore } from "../../store/useGoalStore";

const categoryOptions = [
  {
    label: "Housing",
    icon: "Home",
    color: "blue",
    IconComponent: Home,
  },
  {
    label: "Food",
    icon: "Utensils",
    color: "emerald",
    IconComponent: Utensils,
  },
  {
    label: "Transportation",
    icon: "Car",
    color: "violet",
    IconComponent: Car,
  },
  {
    label: "Entertainment",
    icon: "Film",
    color: "amber",
    IconComponent: Film,
  },
  {
    label: "Shopping",
    icon: "ShoppingBag",
    color: "pink",
    IconComponent: ShoppingBag,
  },
  {
    label: "Medical",
    icon: "HeartPulse",
    color: "red",
    IconComponent: HeartPulse,
  },
  {
    label: "Travel",
    icon: "Plane",
    color: "amber",
    IconComponent: Plane,
  },
  {
    label: "Education",
    icon: "GraduationCap",
    color: "purple",
    IconComponent: GraduationCap,
  },
  {
    label: "EMI",
    icon: "CreditCard",
    color: "sky",
    IconComponent: CreditCard,
  },
  {
    label: "Others",
    icon: "LayoutGrid",
    color: "blue",
    IconComponent: LayoutGrid,
  },
];

const AddCategoryModal = ({ isOpen, onClose }) => {
  const addCategory = useGoalStore((state) => state.addCategory);
  const expenseCategories = useGoalStore((state) => state.expenseCategories);

  const [selectedLabel, setSelectedLabel] = useState(categoryOptions[0].label);
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const selectedCategory = categoryOptions.find(
    (cat) => cat.label === selectedLabel
  );

  const validateForm = () => {
    const newErrors = {};

    if (!selectedLabel) {
      newErrors.category = "Category is required";
    }

    if (!amount) {
      newErrors.amount = "Budget amount is required";
    } else if (Number(amount) <= 0) {
      newErrors.amount = "Budget amount must be greater than 0";
    }

    const alreadyExists = expenseCategories.some(
      (cat) =>
        cat.label.trim().toLowerCase() === selectedLabel.trim().toLowerCase()
    );

    if (alreadyExists) {
      newErrors.category = "This category already exists";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setSelectedLabel(categoryOptions[0].label);
    setAmount("");
    setErrors({});
  };

  const handleClose = () => {
    if (saving) return;

    resetForm();
    onClose();
  };

  const handleSave = async () => {
    if (saving) return;

    const isValid = validateForm();

    if (!isValid) return;

    try {
      setSaving(true);

      const newCategory = {
        label: selectedCategory.label,
        amount: Number(amount),
        icon: selectedCategory.icon,
        color: selectedCategory.color,
      };

      await addCategory(newCategory);

      resetForm();
      onClose();
    } catch (error) {
      setErrors({
        api: error.message || "Failed to add category",
      });
    } finally {
      setSaving(false);
    }
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
            className="bg-[#0d0d0d] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start px-5 py-4 border-b border-white/[0.06]">
              <div>
                <p className="text-base font-medium text-white">
                  Add Expense Category
                </p>
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-0.5">
                  Create Budget Category
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

            {/* Body */}
            <div className="p-5 space-y-5">
              {/* Category Picklist */}
              <div>
                <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">
                  Select Category
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {categoryOptions.map((cat) => {
                    const Icon = cat.IconComponent;
                    const isSelected = selectedLabel === cat.label;

                    return (
                      <button
                        key={cat.label}
                        type="button"
                        disabled={saving}
                        onClick={() => {
                          setSelectedLabel(cat.label);
                          if (errors.category) {
                            setErrors({ ...errors, category: "" });
                          }
                        }}
                        className={`flex items-center gap-3 px-3 py-3 rounded-xl border transition ${
                          isSelected
                            ? "border-blue-500/50 bg-blue-500/10"
                            : "border-white/10 bg-white/[0.03] hover:border-white/20"
                        }`}
                      >
                        <div className="w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center">
                          <Icon
                            size={17}
                            className={
                              isSelected ? "text-blue-400" : "text-gray-400"
                            }
                          />
                        </div>

                        <span
                          className={`text-sm ${
                            isSelected ? "text-white" : "text-gray-400"
                          }`}
                        >
                          {cat.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {errors.category && (
                  <p className="mt-1.5 text-[11px] text-red-400 font-mono">
                    {errors.category}
                  </p>
                )}
              </div>

              {/* Amount */}
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
                    if (errors.amount) {
                      setErrors({ ...errors, amount: "" });
                    }
                  }}
                  placeholder="e.g. 5000"
                  className={`w-full bg-white/[0.03] border rounded-xl px-3 py-2.5 text-sm font-mono text-gray-200 placeholder-gray-700 outline-none transition-all disabled:opacity-50 ${
                    errors.amount
                      ? "border-red-500/50 focus:border-red-500"
                      : "border-white/10 focus:border-blue-500/40"
                  }`}
                />

                {errors.amount && (
                  <p className="mt-1.5 text-[11px] text-red-400 font-mono">
                    {errors.amount}
                  </p>
                )}
              </div>

              {errors.api && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2">
                  <p className="text-[11px] text-red-400 font-mono">
                    {errors.api}
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
              >
                <Plus size={14} />
                {saving ? "Adding..." : "Add Category"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddCategoryModal;