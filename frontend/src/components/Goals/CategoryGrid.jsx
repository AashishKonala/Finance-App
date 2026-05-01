import CategoryCard from "./CategoryCard";
import {
  Home,
  Utensils,
  Car,
  Film,
  ShoppingBag,
  LayoutGrid,
} from "lucide-react";

const iconMap = {
  Housing: Home,
  Food: Utensils,
  Transportation: Car,
  Entertainment: Film,
  Shopping: ShoppingBag,
  Others: LayoutGrid,
};

const CategoryGrid = ({ categories = [] }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Expenses Goals by Category</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const Icon = iconMap[cat.label] || LayoutGrid;

          return (
            <CategoryCard
              key={cat.id}
              icon={Icon}
              label={cat.label}
              amount={`₹${cat.amount.toLocaleString()}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;