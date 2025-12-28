// src/hooks/useMenu.ts
import { useState, useEffect, useCallback } from "react";
import { getCategories, getMenuItems } from "../services/api";
import type { Category, MenuItem } from "../types/types";

export const useMenu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  // useCallback evita que esta función se re-cree en cada render,
  // permitiendo pasarla al AdminPanel sin causar loops infinitos.
  const refreshData = useCallback(async () => {
    setLoading(true);
    try {
      // Hacemos las dos peticiones al mismo tiempo (Paralelo) para que sea más rápido
      const [catsData, itemsData] = await Promise.all([
        getCategories(),
        getMenuItems(),
      ]);

      setCategories(catsData);
      setItems(itemsData);
    } catch (error) {
      console.error("Error cargando el menú:", error);
      alert("Hubo un error al cargar el menú. Revisa tu conexión.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar datos automáticamente al iniciar
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return {
    categories,
    items,
    loading,
    refreshData,
  };
};
