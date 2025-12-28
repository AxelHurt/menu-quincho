// src/services/api.ts
import { supabase } from "../lib/supabase"; // Asegúrate de que esta ruta sea correcta
import type { MenuItem, Category } from "../types/types"; // Ajusta según donde tengas tus types

// --- LECTURA ---
export const getCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id");
  if (error) throw error;
  return data as Category[];
};

export const getMenuItems = async () => {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .order("id", { ascending: false });
  if (error) throw error;
  return data as MenuItem[];
};

// --- ESCRITURA (ADMIN) ---
// Agregamos estas funciones para usarlas luego en el AdminPanel
export const toggleItemAvailability = async (
  id: number,
  currentStatus: boolean
) => {
  const { error } = await supabase
    .from("menu_items")
    .update({ is_available: !currentStatus })
    .eq("id", id);
  if (error) throw error;
};

export const deleteItem = async (id: number) => {
  const { error } = await supabase.from("menu_items").delete().eq("id", id);
  if (error) throw error;
};

export const createCategory = async (
  name: string,
  type: "comida" | "bebida"
) => {
  const { error } = await supabase.from("categories").insert({ name, type });
  if (error) throw error;
};

export const updateCategory = async (
  id: number,
  name: string,
  type: "comida" | "bebida"
) => {
  const { error } = await supabase
    .from("categories")
    .update({ name, type })
    .eq("id", id);
  if (error) throw error;
};

export const deleteCategory = async (id: number) => {
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
};
