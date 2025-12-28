import { useState } from "react";
import type { MenuItem } from "../../types/types";
import { toggleItemAvailability, deleteItem } from "../../services/api";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  NoSymbolIcon,
  ExclamationTriangleIcon, // Icono de alerta
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { PhotoIcon } from "@heroicons/react/24/solid";

interface Props {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onRefresh: () => void;
}

export const ProductList = ({ items, onEdit, onRefresh }: Props) => {
  // Estado para controlar qué ítem se quiere borrar.
  // Si es null, el modal está cerrado. Si tiene un número, el modal está abierto.
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = async (item: MenuItem) => {
    try {
      await toggleItemAvailability(item.id, item.is_available);
      onRefresh();
      // Toast rápido que sí se borra
      toast.success(item.is_available ? "Pausado" : "Activado", {
        duration: 2000,
      });
    } catch (e) {
      toast.error("Error al cambiar stock", { duration: 3000 });
    }
  };

  // 1. Al hacer click en el tacho, solo guardamos el ID y abrimos el cartel
  const openDeleteModal = (id: number) => {
    setItemToDelete(id);
  };

  // 2. Función que ejecuta el borrado real
  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);

    try {
      await deleteItem(itemToDelete);

      // Toast de éxito con duración forzada para que no se quede pegado
      toast.success("Plato eliminado correctamente", { duration: 3000 });

      onRefresh();
    } catch (e) {
      toast.error("No se pudo eliminar el plato", { duration: 3000 });
    } finally {
      setIsDeleting(false);
      setItemToDelete(null); // Cerramos el modal
    }
  };

  return (
    <>
      {/* LISTA DE PRODUCTOS */}
      <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
        {items.length === 0 && (
          <p className="text-gray-400 text-sm">No hay platos cargados.</p>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
              item.is_available
                ? "bg-gray-50 border-gray-100"
                : "bg-red-50 border-red-100"
            }`}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              {/* LOGICA DE IMAGEN EN LISTA */}
              {item.image_urls && item.image_urls.length > 0 ? (
                <img
                  src={item.image_urls[0]}
                  className={`w-10 h-10 rounded-full object-cover bg-gray-200 ${
                    !item.is_available && "grayscale opacity-50"
                  }`}
                  alt=""
                />
              ) : (
                // Fallback para admin (Circulo gris con icono)
                <div
                  className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 ${
                    !item.is_available && "opacity-50"
                  }`}
                >
                  <PhotoIcon className="h-5 w-5" />
                </div>
              )}
              <div>
                <p
                  className={`font-bold text-sm truncate max-w-30 ${
                    !item.is_available
                      ? "text-red-800 line-through"
                      : "text-rio-900"
                  }`}
                >
                  {item.title}
                </p>
                <p className="text-xs text-gray-500">${item.price}</p>
              </div>
            </div>

            <div className="flex gap-1.5 shrink-0">
              <button
                onClick={() => handleToggle(item)}
                title={
                  item.is_available ? "Marcar Agotado" : "Marcar Disponible"
                }
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  item.is_available
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                }`}
              >
                {item.is_available ? (
                  <CheckCircleIcon className="h-4 w-4" />
                ) : (
                  <NoSymbolIcon className="h-4 w-4" />
                )}
              </button>

              <button
                onClick={() => onEdit(item)}
                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 cursor-pointer"
              >
                <PencilSquareIcon className="h-4 w-4" />
              </button>

              <button
                // AQUÍ CAMBIAMOS: Ya no llama a delete directo, sino que abre el modal
                onClick={() => openDeleteModal(item.id)}
                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 cursor-pointer"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- CARTEL DE CONFIRMACIÓN (MODAL) --- */}
      {/* Se renderiza solo si itemToDelete tiene un ID */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-in zoom-in-95 duration-200 border border-gray-200">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="bg-red-100 p-3 rounded-full text-red-600">
                <ExclamationTriangleIcon className="h-8 w-8" />
              </div>

              <div>
                <h3 className="text-xl font-fiesta font-bold text-rio-900">
                  ¿Eliminar este plato?
                </h3>
                <p className="text-gray-500 text-sm mt-2">
                  Esta acción no se puede deshacer. El plato dejará de aparecer
                  en el menú inmediatamente.
                </p>
              </div>

              <div className="flex gap-3 w-full mt-2">
                <button
                  onClick={() => setItemToDelete(null)}
                  disabled={isDeleting}
                  className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/30 transition-colors cursor-pointer disabled:opacity-70"
                >
                  {isDeleting ? "Borrando..." : "Sí, Eliminar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
