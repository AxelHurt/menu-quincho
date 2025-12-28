import { useState } from "react";
import type { MenuItem } from "../../types/types";
import { PhotoIcon } from "@heroicons/react/24/outline";

interface Props {
  item: MenuItem;
  onClick: (item: MenuItem) => void;
}

export const MenuCard = ({ item, onClick }: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isAvailable = item.is_available;

  // Verificamos si realmente tiene imágenes
  const hasImage = item.image_urls && item.image_urls.length > 0;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      isAvailable && onClick(item);
    }
  };

  return (
    <div
      role="button"
      tabIndex={isAvailable ? 0 : -1}
      onKeyDown={handleKeyDown}
      onClick={() => isAvailable && onClick(item)}
      className={`group bg-white rounded-2xl shadow-sm border border-arena-dark/50 overflow-hidden flex h-24 transition-all duration-300 relative select-none ${
        isAvailable
          ? "btn-active-scale cursor-pointer hover:shadow-md shadow-rio-900/5 active:bg-gray-50"
          : "opacity-70 grayscale cursor-not-allowed bg-gray-100"
      }`}
    >
      {/* Overlay de AGOTADO */}
      {!isAvailable && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-[1px]">
          <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md font-fiesta tracking-widest border border-red-700 transform">
            AGOTADO
          </span>
        </div>
      )}

      {/* CONTENEDOR DE IMAGEN (O FALLBACK) */}
      <div className="w-24 min-w-24 relative h-full p-1.5 shrink-0">
        {hasImage ? (
          // --- SI TIENE FOTO ---
          <>
            {/* Skeleton loading */}
            {!isImageLoaded && !imageError && (
              <div className="absolute inset-1.5 bg-gray-200 animate-pulse rounded-xl flex items-center justify-center">
                <PhotoIcon className="h-6 w-6 text-gray-400" />
              </div>
            )}
            <img
              src={item.image_urls![0]}
              alt={item.title}
              loading="lazy"
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover rounded-xl shadow-xs transition-transform duration-500 ${
                isImageLoaded
                  ? "opacity-100 group-hover:scale-105"
                  : "opacity-0"
              }`}
            />
          </>
        ) : (
          // --- SI NO TIENE FOTO (DISEÑO BONITO) ---
          <div className="w-full h-full bg-arena-dark/30 rounded-xl flex flex-col items-center justify-center text-rio-900/20 border border-rio-900/5">
            {/* Puedes cambiar este icono por lo que quieras */}
            <PhotoIcon className="h-8 w-8" />
            <span className="text-[8px] font-fiesta uppercase mt-1 opacity-60">
              Quincho
            </span>
          </div>
        )}
      </div>

      {/* Resto del contenido (Texto y precio igual que antes) */}
      <div className="flex-1 py-2 pr-3 pl-1 flex flex-col justify-between relative z-10 overflow-hidden">
        <div>
          <h3 className="font-fiesta font-bold text-rio-900 leading-none text-base truncate">
            {item.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-tight">
            {item.description}
          </p>
        </div>

        <div className="flex justify-end items-end">
          <div
            className={`px-2.5 py-0.5 rounded-full font-fiesta font-bold text-sm shadow-sm border ${
              isAvailable
                ? "bg-arena-dark text-sol-600 border-sol-500/10"
                : "bg-gray-200 text-gray-500 border-gray-300"
            }`}
          >
            ${item.price.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};
