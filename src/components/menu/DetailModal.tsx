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
      className="fixed inset-0 z-50 flex items-center justify-center bg-rio-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-arena rounded-4xl overflow-hidden w-full max-w-100 relative shadow-2xl animate-in zoom-in-95 duration-300 border border-white/20 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* BOTÓN CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white z-30 cursor-pointer transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* 1. SLIDER DE FOTOS (Componente separado) */}
        <ImageSlider images={item.image_urls} title={item.title} />

        {/* 2. CONTENIDO */}
        <div className="p-6 pt-2 relative -mt-6 z-20 overflow-y-auto bg-arena rounded-t-4xl">
          <h2 className="text-3xl font-fiesta font-extrabold text-rio-900 leading-tight drop-shadow-sm text-center">
            {item.title}
          </h2>

          <div className="w-16 h-1 bg-sol-500 rounded-full my-3 mx-auto"></div>

          <p className="text-gray-700 text-lg leading-relaxed text-center">
            {item.description}
          </p>

          <div className="mt-6 text-center">
            <span className="inline-block bg-linear-to-r from-sol-500 to-fiesta-pink text-white text-4xl font-fiesta font-extrabold px-8 py-2 rounded-full shadow-lg shadow-sol-500/30 transform">
              ${item.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
