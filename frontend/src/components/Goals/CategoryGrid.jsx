import { useState } from "react";
import CategoryCard from "./CategoryCard";
import AdjustCategoryModal from "./AdjustCategoryModal";
import AddCategoryModal from "./AddCategoryModal";
import {
  Home,
  Utensils,
  Car,
  Film,
  ShoppingBag,
  LayoutGrid,
  Plus,
} from "lucide-react";
import { useTransactionStore } from "../../store/useTransactionStore";
import AllCategoriesModal from "./AllCategoriesModal";

const iconMap = {
  Housing: Home,
  Food: Utensils,
  Transportation: Car,
  Entertainment: Film,
  Shopping: ShoppingBag,
  Others: LayoutGrid,
};

const CategoryGrid = ({ categories = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddCategory, setShowAddCategory] = useState(false);
const [showAllCategories, setShowAllCategories] = useState(false);
  const transactions = useTransactionStore((state) => state.transactions);

  const visibleCategories = categories.slice(0, 6);
  const hiddenCount = Math.max(categories.length - visibleCategories.length, 0);

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

  const handleAddCategory = () => {
  setShowAddCategory(true);
};
 const handleViewAll = () => {
  setShowAllCategories(true);
};

  return (
    <>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-white">
              Category Budgets
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Track spending limits across your expense categories
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddCategory}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition shadow-lg shadow-blue-500/20"
            >
              <Plus size={14} />
              Add Category
            </button>

            <button
  onClick={handleViewAll}
  className="px-4 py-2 rounded-xl border border-white/10 text-xs font-medium text-gray-300 hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/10 transition"
>
  View All
  {hiddenCount > 0 ? ` (${categories.length})` : ""}
</button>
          </div>
        </div>

        {visibleCategories.length === 0 ? (
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4">
              <Plus size={20} className="text-blue-400" />
            </div>

            <p className="text-sm font-medium text-white">
              No category budgets yet
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Create your first category budget to start tracking expenses.
            </p>

            <button
  onClick={() => setShowAddCategory(true)}
  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition shadow-lg shadow-blue-500/20"
>
  <Plus size={14} />
  Add Category
</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {visibleCategories.map((cat) => {
              const Icon = iconMap[cat.icon] || iconMap[cat.label] || LayoutGrid;
              const budget = Number(cat.amount || 0);
              const spent = getSpentByCategory(cat.label);

              return (
                <CategoryCard
                  key={cat._id || cat.id}
                  icon={Icon}
                  label={cat.label}
                  budget={budget}
                  spent={spent}
                  onAdjust={() => setSelectedCategory(cat)}
                />
              );
            })}
          </div>
        )}
      </div>

      <AdjustCategoryModal
        isOpen={!!selectedCategory}
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
      />

      <AddCategoryModal
  isOpen={showAddCategory}
  onClose={() => setShowAddCategory(false)}
/>
<AllCategoriesModal
  isOpen={showAllCategories}
  onClose={() => setShowAllCategories(false)}
  categories={categories}
  onAdjustCategory={(cat) => {
    setShowAllCategories(false);
    setSelectedCategory(cat);
  }}
/>
    </>
  );
};

export default CategoryGrid;