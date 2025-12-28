import { useState } from "react";
import { createCategory } from "../../services/api";
import toast from "react-hot-toast"; // <--- 1. Importamos toast

export const CategoryForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState<"comida" | "bebida">("comida");
  const [loading, setLoading] = useState(false); // Para feedback visual en el botón

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación simple con Toast
    if (!name.trim()) {
      toast.error("El nombre no puede estar vacío");
      return;
    }

    setLoading(true); // Bloqueamos botón

    try {
      await createCategory(name, type);

      // 2. Mensaje de Éxito
      toast.success(`Sección "${name}" creada correctamente`);

      setName("");
      onSuccess();
    } catch (e) {
      console.error(e);
      // 3. Mensaje de Error
      toast.error("Error al crear la categoría. Intenta de nuevo.");
    } finally {
      setLoading(false); // Desbloqueamos botón
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ej: Hamburguesas, Postres..."
        className="p-3 bg-white border border-gray-200 rounded-xl w-full outline-none focus:ring-2 focus:ring-rio-900/20 transition-all"
        disabled={loading}
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value as any)}
        className="p-3 bg-white border border-gray-200 rounded-xl w-full outline-none focus:ring-2 focus:ring-rio-900/20 transition-all"
        disabled={loading}
      >
        <option value="comida">Para Comidas</option>
        <option value="bebida">Para Bebidas</option>
      </select>

      <button
        disabled={loading}
        className="bg-gray-800 text-white p-3 rounded-xl font-bold font-fiesta text-sm cursor-pointer hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Creando..." : "Crear Sección"}
      </button>
    </form>
  );
};
