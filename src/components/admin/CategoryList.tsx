import { useState } from "react";
import type { Category } from "../../types/types";
import { updateCategory, deleteCategory } from "../../services/api";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

interface Props {
  categories: Category[];
  onRefresh: () => void;
}

export const CategoryList = ({ categories, onRefresh }: Props) => {
  // Estado para saber qué categoría se está editando
  const [editingId, setEditingId] = useState<number | null>(null);

  // Estados temporales para los inputs de edición
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState<"comida" | "bebida">("comida");
  const [loading, setLoading] = useState(false);

  // Iniciar edición
  const startEditing = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditType(cat.type);
  };

  // Cancelar edición
  const cancelEditing = () => {
    setEditingId(null);
    setEditName("");
  };

  // Guardar cambios
  const handleUpdate = async (id: number) => {
    if (!editName.trim()) return toast.error("El nombre no puede estar vacío");
    setLoading(true);
    try {
      await updateCategory(id, editName, editType);
      toast.success("Sección actualizada");
      setEditingId(null);
      onRefresh();
    } catch (e) {
      toast.error("Error al actualizar");
    } finally {
      setLoading(false);
    }
  };

  // Borrar categoría
  const handleDelete = async (id: number) => {
    // Usamos un toast personalizado para confirmar (igual que en platos)
    toast(
      (t) => (
        <div className="flex flex-col gap-2 items-center">
          <span className="font-bold text-rio-900 text-center">
            ¿Borrar esta sección?
          </span>
          <span className="text-xs text-gray-500 text-center">
            Si tiene platos, dará error.
          </span>
          <div className="flex gap-2 mt-1">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await deleteCategory(id);
                  toast.success("Sección eliminada");
                  onRefresh();
                } catch (e) {
                  // Supabase protegerá el borrado si hay platos vinculados (Foreign Key)
                  toast.error(
                    "No se puede borrar: Probablemente contiene platos."
                  );
                }
              }}
              className="bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-700"
            >
              Sí, borrar
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg text-xs font-bold hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      { duration: 5000, icon: "⚠️" }
    );
  };

  return (
    <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
      {categories.length === 0 && (
        <p className="text-gray-400 text-sm">No hay secciones creadas.</p>
      )}

      {categories.map((cat) => (
        <div
          key={cat.id}
          className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50 transition-colors"
        >
          {editingId === cat.id ? (
            // --- MODO EDICIÓN (Inputs) ---
            <div className="flex gap-2 w-full items-center animate-in fade-in">
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="flex-1 p-2 text-sm border border-blue-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200"
                autoFocus
              />
              <select
                value={editType}
                onChange={(e) => setEditType(e.target.value as any)}
                className="p-2 text-sm border border-blue-300 rounded-lg outline-none bg-white"
              >
                <option value="comida">Comida</option>
                <option value="bebida">Bebida</option>
              </select>

              <button
                onClick={() => handleUpdate(cat.id)}
                disabled={loading}
                className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
              >
                <CheckIcon className="h-4 w-4" />
              </button>
              <button
                onClick={cancelEditing}
                disabled={loading}
                className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          ) : (
            // --- MODO LECTURA (Texto) ---
            <>
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    cat.type === "comida"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  <TagIcon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-sm text-rio-900">{cat.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                    {cat.type}
                  </p>
                </div>
              </div>

              <div className="flex gap-1.5 shrink-0">
                <button
                  onClick={() => startEditing(cat)}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 cursor-pointer"
                >
                  <PencilSquareIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 cursor-pointer"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
