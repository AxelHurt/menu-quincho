import { MenuCard } from "./MenuCard";
import { CategoryAccordion } from "./CategoryAccordion"; // Ajusta ruta
import type { Category, MenuItem } from "../../types/types";

interface Props {
  categories: Category[];
  items: MenuItem[];
  filter: "comida" | "bebida";
  onItemClick: (item: MenuItem) => void;
}

export const MenuList = ({ categories, items, filter, onItemClick }: Props) => {
  const visibleCategories = categories.filter((cat) => cat.type === filter);

  return (
    <main className="px-4 pt-6 pb-20 grow bg-linear-to-b from-arena via-white to-arena">
      {visibleCategories.length > 0 ? (
        visibleCategories.map((cat) => {
          const categoryItems = items.filter(
            (item) => item.category_id === cat.id
          );

          if (categoryItems.length === 0) return null;

          return (
            <CategoryAccordion key={cat.id} title={cat.name}>
              {categoryItems.map((item) => (
                <MenuCard key={item.id} item={item} onClick={onItemClick} />
              ))}
            </CategoryAccordion>
          );
        })
      ) : (
        <div className="text-center text-gray-400 mt-8 font-fiesta">
          No hay secciones creadas aún.
        </div>
      )}
    </main>
  );
};
