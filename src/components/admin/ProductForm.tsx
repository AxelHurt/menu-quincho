import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import type { Category, MenuItem } from "../../types/types";
import toast from "react-hot-toast";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface Props {
  categories: Category[];
  itemToEdit: MenuItem | null;
  onCancelEdit: () => void;
  onSuccess: () => void;
}

export const ProductForm = ({
  categories,
  itemToEdit,
  onCancelEdit,
  onSuccess,
}: Props) => {
  const [loading, setLoading] = useState(false);

  // Datos del plato
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);

  // Selector
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [activeType, setActiveType] = useState<"comida" | "bebida">("comida");
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  useEffect(() => {
    if (itemToEdit) {
      setTitle(itemToEdit.title);
      setDescription(itemToEdit.description);
      setPrice(String(itemToEdit.price));
      setCategoryId(itemToEdit.category_id);

      const currentCat = categories.find(
        (c) => c.id === itemToEdit.category_id
      );
      if (currentCat) {
        setActiveType(currentCat.type);
      }
    } else {
      resetForm();
    }
  }, [itemToEdit, categories]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setCategoryId(null);
    setImageFiles(null);
    setIsSelectorOpen(false);
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) {
      toast.error("Selecciona una sección para el plato");
      return;
    }
    setLoading(true);

    try {
      let imageUrls: string[] | undefined;

      // Solo subimos fotos SI el usuario seleccionó archivos
      if (imageFiles && imageFiles.length > 0) {
        const uploadPromises = Array.from(imageFiles).map(async (file) => {
          const fileExt = file.name.split(".").pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const { error } = await supabase.storage
            .from("menu-images")
            .upload(fileName, file);
          if (error) throw error;
          const { data } = supabase.storage
            .from("menu-images")
            .getPublicUrl(fileName);
          return data.publicUrl;
        });
        imageUrls = await Promise.all(uploadPromises);
      }

      const itemData = {
        title,
        price: Number(price),
        description,
        category_id: categoryId,
        // Si hay fotos nuevas, las agregamos. Si no, no tocamos el campo (en edit) o va null (en create)
        ...(imageUrls ? { image_urls: imageUrls } : {}),
      };

      if (itemToEdit) {
        const { error } = await supabase
          .from("menu_items")
          .update(itemData)
          .eq("id", itemToEdit.id);
        if (error) throw error;
        toast.success("Plato actualizado");
      } else {
        // AQUÍ EL CAMBIO: Ya no exigimos fotos para crear
        const { error } = await supabase.from("menu_items").insert(itemData);
        if (error) throw error;
        toast.success("Plato creado");
      }

      resetForm();
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al guardar");
    } finally {
      setLoading(false);
    }
  };

  const visibleCategories = categories.filter((cat) => cat.type === activeType);
  const selectedCategoryName = categories.find(
    (c) => c.id === categoryId
  )?.name;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {itemToEdit && (
        <div className="bg-yellow-50 text-yellow-700 text-xs p-2 rounded mb-2 border border-yellow-200">
          Estás editando.
          <button
            type="button"
            onClick={onCancelEdit}
            className="block mt-1 underline font-bold cursor-pointer"
          >
            Cancelar edición
          </button>
        </div>
      )}

      {/* --- SELECTOR (ACORDEÓN + TABS) --- */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          1. ¿Qué es?
        </span>

        {/* PESTAÑAS */}
        <div className="flex p-1 bg-gray-100 rounded-xl">
          <button
            type="button"
            onClick={() => {
              setActiveType("comida");
              setCategoryId(null);
              setIsSelectorOpen(true);
            }}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer ${
              activeType === "comida"
                ? "bg-white text-rio-900 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            🍔 Comida
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveType("bebida");
              setCategoryId(null);
              setIsSelectorOpen(true);
            }}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer ${
              activeType === "bebida"
                ? "bg-white text-rio-900 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            🍹 Bebida
          </button>
        </div>

        {/* ACORDEÓN DESPLEGABLE */}
        <div
          className={`border rounded-xl transition-all duration-300 bg-white ${
            isSelectorOpen
              ? "border-rio-900 ring-2 ring-rio-900/10"
              : "border-gray-200"
          }`}
        >
          <button
            type="button"
            onClick={() => setIsSelectorOpen(!isSelectorOpen)}
            className="w-full flex items-center justify-between p-3 cursor-pointer"
          >
            <div className="flex flex-col items-start">
              <span className="text-[10px] uppercase font-bold text-gray-400">
                Sección Seleccionada:
              </span>
              {categoryId ? (
                <span className="font-bold text-rio-900 text-sm">
                  {selectedCategoryName}
                </span>
              ) : (
                <span className="text-gray-400 text-sm italic">
                  Toca para elegir...
                </span>
              )}
            </div>
            <ChevronDownIcon
              className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                isSelectorOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isSelectorOpen && (
            <div className="p-3 border-t border-gray-100 bg-gray-50/50 rounded-b-xl animate-in slide-in-from-top-2">
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {visibleCategories.length > 0 ? (
                  visibleCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setCategoryId(cat.id);
                        setIsSelectorOpen(false);
                      }}
                      className={`py-2 px-3 text-sm rounded-lg border transition-all cursor-pointer text-left truncate ${
                        categoryId === cat.id
                          ? "bg-rio-900 text-white border-rio-900 shadow-md"
                          : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-white"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 col-span-2 italic py-4 text-center">
                    No hay secciones de {activeType} creadas.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          2. Detalles del plato
        </span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nombre del plato"
          required
          className="p-3 bg-white border border-gray-200 rounded-xl w-full outline-none focus:ring-2 focus:ring-rio-900/20 transition-all"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción (Ingredientes...)"
          rows={2}
          className="p-3 bg-white border border-gray-200 rounded-xl w-full outline-none focus:ring-2 focus:ring-rio-900/20 transition-all resize-none"
        />
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            $
          </span>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Precio"
            required
            className="p-3 pl-7 bg-white border border-gray-200 rounded-xl w-full outline-none focus:ring-2 focus:ring-rio-900/20 transition-all"
          />
        </div>
      </div>

      <div className="p-3 border-2 border-dashed border-gray-300 rounded-xl text-center bg-gray-50 hover:bg-gray-100 transition-colors">
        <p className="text-xs text-gray-500 mb-2">
          {/* CAMBIO VISUAL: Texto indica que es opcional siempre */}
          Fotos del plato (Opcional)
        </p>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          multiple
          // CAMBIO: Ya no es required nunca
          onChange={(e) => setImageFiles(e.target.files)}
          className="text-sm w-full cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-rio-50 file:text-rio-900 hover:file:bg-rio-100"
        />
      </div>

      <button
        disabled={loading}
        className={`text-white p-4 rounded-xl font-bold font-fiesta shadow-lg transition-colors cursor-pointer mt-2 ${
          itemToEdit
            ? "bg-rio-800 hover:bg-rio-900"
            : "bg-sol-600 hover:bg-sol-700"
        }`}
      >
        {loading
          ? "Guardando..."
          : itemToEdit
          ? "Actualizar Plato"
          : "Agregar al Menú"}
      </button>
    </form>
  );
};
