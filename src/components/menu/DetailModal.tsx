import type { MenuItem } from "../../types/types";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ImageSlider } from "../ui/ImageSlider";

interface Props {
  item: MenuItem | null;
  onClose: () => void;
}

export const DetailModal = ({ item, onClose }: Props) => {
  if (!item) return null;

  return (
    <div
      // Fondo negro suave (bg-black/30)
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        // Tarjeta centrada y contenida (bg-arena)
        className="bg-arena rounded-3xl overflow-hidden w-[90%] max-w-sm relative shadow-2xl animate-in zoom-in-95 duration-300 border border-white/20 flex flex-col shrink-0 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* BOTÓN CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white z-30 cursor-pointer transition-colors"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        {/* 1. SLIDER DE FOTOS (Aumentado) */}
        {/* Cambio: Aumenté de h-56 a h-80 para que la foto sea la protagonista */}
        <div className="h-80 w-full relative shrink-0">
          <ImageSlider images={item.image_urls} title={item.title} />
        </div>

        {/* 2. CONTENIDO */}
        {/* Cambio: Quité '-mt-6' y 'rounded-t-3xl' para eliminar el efecto de solapamiento/degradado */}
        <div className="p-5 flex flex-col items-center bg-arena grow overflow-y-auto">
          {/* Título */}
          <h2 className="text-2xl font-fiesta font-extrabold text-rio-900 leading-tight drop-shadow-sm text-center mt-1">
            {item.title}
          </h2>

          <div className="w-12 h-1 bg-sol-500 rounded-full my-3 shrink-0"></div>

          {/* Descripción */}
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-center">
            {item.description}
          </p>

          {/* Precio (Estilo original mantenido) */}
          <div className="mt-5 mb-1 w-full text-center shrink-0">
            <span className="inline-block bg-linear-to-r from-sol-500 to-fiesta-pink text-white text-2xl font-fiesta font-extrabold px-8 py-1.5 rounded-full shadow-lg shadow-sol-500/30">
              ${item.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
