import { useState } from "react";
import { useMenu } from "../../hooks/useMenu";
import type { MenuItem } from "../../types/types";

// UI Generica
import { Accordion } from "../ui/Accordion";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut } from "../../services/auth";

// Componentes Admin
import { CategoryForm } from "./CategoryForm";
import { ProductForm } from "./ProductForm";
import { ProductList } from "./ProductList";
import { CategoryList } from "./CategoryList"; // <--- 1. IMPORTAR AQUÍ

interface Props {
  onUpdate: () => void;
}

export const AdminPanel = ({ onUpdate }: Props) => {
  const { categories, items, refreshData } = useMenu();

  // Agregamos 'manage-categories' a los tipos de secciones
  const [openSection, setOpenSection] = useState<
    "form" | "category" | "list" | "manage-categories" | null
  >(null);
  const [itemToEdit, setItemToEdit] = useState<MenuItem | null>(null);

  const handleSuccess = () => {
    refreshData();
    onUpdate();
    setItemToEdit(null);
  };

  const handleLogout = async () => {
    await signOut();
  };

  const handleEditClick = (item: MenuItem) => {
    setItemToEdit(item);
    setOpenSection("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Actualizamos el tipo del parámetro
  const toggleSection = (
    section: "form" | "category" | "list" | "manage-categories"
  ) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="flex flex-col gap-2 pb-20 text-left">
      <div className="flex items-center justify-between px-2 mb-2">
        <span className="text-xs font-bold text-rio-900/50 uppercase tracking-widest">
          Panel de Control
        </span>
        <button
          onClick={handleLogout}
          className="text-xs flex items-center gap-1 text-red-600 font-bold hover:bg-red-50 px-2 py-1 rounded transition-colors cursor-pointer"
        >
          Cerrar Sesión <ArrowRightStartOnRectangleIcon className="h-4 w-4" />
        </button>
      </div>

      {/* 1. FORMULARIO PRODUCTO */}
      <Accordion
        title={itemToEdit ? "✏️ Editando Plato..." : "Nuevo Plato"}
        isOpen={openSection === "form"}
        onToggle={() => {
          if (itemToEdit) setItemToEdit(null);
          toggleSection("form");
        }}
      >
        <ProductForm
          categories={categories}
          itemToEdit={itemToEdit}
          onCancelEdit={() => setItemToEdit(null)}
          onSuccess={handleSuccess}
        />
      </Accordion>

      {/* 2. CREAR SECCIÓN */}
      <Accordion
        title="Nueva Sección"
        isOpen={openSection === "category"}
        onToggle={() => toggleSection("category")}
      >
        <CategoryForm onSuccess={handleSuccess} />
      </Accordion>

      {/* 3. GESTIONAR SECCIONES (NUEVO ACORDEÓN) */}
      <Accordion
        title="Gestionar Secciones Existentes"
        isOpen={openSection === "manage-categories"}
        onToggle={() => toggleSection("manage-categories")}
      >
        <CategoryList categories={categories} onRefresh={handleSuccess} />
      </Accordion>

      {/* 4. LISTA DE PRODUCTOS */}
      <Accordion
        title="Gestionar Platos Existentes"
        isOpen={openSection === "list"}
        onToggle={() => toggleSection("list")}
      >
        <ProductList
          items={items}
          onEdit={handleEditClick}
          onRefresh={handleSuccess}
        />
      </Accordion>
    </div>
  );
};
