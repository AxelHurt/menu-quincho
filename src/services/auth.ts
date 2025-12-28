import { supabase } from "../lib/supabase";

// Iniciar sesión
export const signIn = async (email: string, pass: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: pass,
  });
  if (error) throw error;
  return data;
};

// Cerrar sesión
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Obtener usuario actual (si recargas página)
export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};
