// src/pages/AdminPage.tsx
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useMenu } from "../hooks/useMenu";
import { AdminPanel } from "../components/admin/AdminPanel";
import { LoginForm } from "../components/auth/LoginForm";
import { Toaster } from "react-hot-toast";

export const AdminPage = () => {
  const { refreshData } = useMenu();
  const [user, setUser] = useState<any>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setCheckingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-body">
      <Toaster position="bottom-center" />

      <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl relative">
        {/* --- CABECERA REDISEÑADA --- */}
        <div className="relative bg-rio-900 pt-10 pb-10 px-6 rounded-b-3xl shadow-2xl overflow-hidden shrink-0 z-10">
          {/* Fondo Decorativo (Luces sutiles) */}
          <div className="absolute top-[-50%] left-[-10%] w-60 h-60 bg-sol-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-[-50%] right-[-10%] w-60 h-60 bg-fiesta-pink/20 rounded-full blur-3xl pointer-events-none"></div>

          {/* Contenido */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            {/* Icono encapsulado */}
            <h1 className="font-fiesta text-3xl text-white tracking-wide drop-shadow-md">
              Gestión Quincho
            </h1>

            {/* Subtítulo estilizado */}
            <div className="flex items-center gap-3 mt-2 opacity-80">
              <div className="h-px w-6 bg-linear-to-r from-transparent to-white/50"></div>
              <p className="text-[10px] font-bold text-rio-100 uppercase tracking-[0.25em]">
                Panel de Control
              </p>
              <div className="h-px w-6 bg-linear-to-l from-transparent to-white/50"></div>
            </div>
          </div>
        </div>
        {/* --- FIN CABECERA --- */}

        <div className="p-4">
          {user ? (
            <AdminPanel onUpdate={refreshData} />
          ) : (
            <div className="mt-10">
              <LoginForm onLoginSuccess={() => {}} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
