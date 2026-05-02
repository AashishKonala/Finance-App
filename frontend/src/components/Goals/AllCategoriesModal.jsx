import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import CategoryCard from "./CategoryCard";

import {
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

import { useTransactionStore } from "../../store/useTransactionStore";

const iconMap = {
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

  Housing: Home,
  Food: Utensils,
  Transportation: Car,
  Entertainment: Film,
  Shopping: ShoppingBag,
  Others: LayoutGrid,
  Medical: HeartPulse,
  Travel: Plane,
  Education: GraduationCap,
  EMI: CreditCard,
};

const AllCategoriesModal = ({
  isOpen,
  onClose,
  categories = [],
  onAdjustCategory,
}) => {
  const transactions = useTransactionStore((state) => state.transactions);

  const getSpentByCategory = (categoryLabel) => {
    return transactions
      .filter(
        (tx) =>
          tx.type === "debit" &&
          tx.category?.trim().toLowerCase() ===
            categoryLabel?.trim().toLowerCase()
      )
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-[99999] px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[#0d0d0d] border border-white/10 rounded-2xl w-full max-w-6xl max-h-[85vh] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.65)]"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start px-6 py-5 border-b border-white/[0.06]">
              <div>
                <p className="text-lg font-medium text-white">
                  All Category Budgets
                </p>
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-0.5">
                  {categories.length} categories
                </p>
              </div>

              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-90px)] custom-scrollbar">
              {categories.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-sm font-medium text-white">
                    No category budgets yet
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Add a category to start tracking budget limits.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {categories.map((cat) => {
                    const Icon =
                      iconMap[cat.icon] || iconMap[cat.label] || LayoutGrid;

                    const budget = Number(cat.amount || 0);
                    const spent = getSpentByCategory(cat.label);

                    return (
                      <CategoryCard
                        key={cat._id || cat.id}
                        icon={Icon}
                        label={cat.label}
                        budget={budget}
                        spent={spent}
                        color={cat.color}
                        onAdjust={() => onAdjustCategory(cat)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default AllCategoriesModal;