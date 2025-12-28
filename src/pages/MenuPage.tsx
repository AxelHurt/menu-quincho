// src/pages/MenuPage.tsx
import { useState } from "react";
import { useMenu } from "../hooks/useMenu";
import type { MenuItem } from "../types/types";

// UI Components
import { Header } from "../components/layout/Header";
import { CategoryFilter } from "../components/menu/CategoryFilter";
import { MenuList } from "../components/menu/MenuList";
import { DetailModal } from "../components/menu/DetailModal";
import { Footer } from "../components/layout/Footer";

export const MenuPage = () => {
  const { categories, items } = useMenu(); // Ya no necesitamos refreshData aquí
  const [filter, setFilter] = useState<"comida" | "bebida">("comida");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  return (
    <div className="min-h-screen w-full bg-[conic-gradient(at_top,var(--tw-gradient-stops))] from-rio-900 via-rio-800 to-slate-900 flex justify-center overflow-y-auto font-body">
      <div className="w-full max-w-md bg-arena min-h-screen shadow-2xl relative flex flex-col">
        <Header />
        <CategoryFilter activeFilter={filter} onChange={setFilter} />

        <MenuList
          categories={categories}
          items={items}
          filter={filter}
          onItemClick={setSelectedItem}
        />

        <DetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />

        <Footer />
      </div>
    </div>
  );
};
