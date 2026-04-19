import CategoryCard from "./CategoryCard";
import { Home, Utensils, Car, Film, ShoppingBag, LayoutGrid } from "lucide-react";

const CategoryGrid = () => {
  const expenseCategories = [
    { id: 1, label: 'Housing', amount: '$250.00', icon: Home },
    { id: 2, label: 'Food', amount: '$250.00', icon: Utensils },
    { id: 3, label: 'Transportation', amount: '$250.00', icon: Car },
    { id: 4, label: 'Entertainment', amount: '$250.00', icon: Film },
    { id: 5, label: 'Shopping', amount: '$250.00', icon: ShoppingBag },
    { id: 6, label: 'Others', amount: '$250.00', icon: LayoutGrid },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Expenses Goals by Category</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {expenseCategories.map((cat) => (
          <CategoryCard 
            key={cat.id}
            icon={cat.icon}
            label={cat.label}
            amount={cat.amount}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
