import { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";

interface Props {
  images: string[] | null; // Aceptamos null
  title: string;
}

export const ImageSlider = ({ images, title }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Verificamos si hay imágenes reales
  const hasImages = images && images.length > 0;

  // Si hay imágenes usamos el array, si no, un array vacío para que no falle el map
  const displayImages = hasImages ? images : [];

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(
      (prev) => (prev - 1 + displayImages.length) % displayImages.length
    );
  };

  return (
    <div className="relative h-80 w-full bg-gray-100 shrink-0 overflow-hidden group">
      {hasImages ? (
        // --- CASO 1: HAY IMÁGENES (CARRUSEL) ---
        <>
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {displayImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${title} - ${idx + 1}`}
                className="w-full h-full object-cover shrink-0"
                loading={idx === 0 ? "eager" : "lazy"}
              />
            ))}
          </div>

          {/* Controles solo si hay más de 1 */}
          {displayImages.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white transition-all shadow-sm z-20 active:scale-90 cursor-pointer"
              >
                <ChevronLeftIcon className="h-6 w-6 drop-shadow-md" />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white transition-all shadow-sm z-20 active:scale-90 cursor-pointer"
              >
                <ChevronRightIcon className="h-6 w-6 drop-shadow-md" />
              </button>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                {displayImages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full shadow-sm transition-all duration-300 ${
                      idx === currentIndex
                        ? "bg-sol-500 w-6"
                        : "bg-white/60 w-2"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        // --- CASO 2: NO HAY IMÁGENES (FONDO GENÉRICO) ---
        <div className="w-full h-full flex flex-col items-center justify-center bg-arena-dark/20 text-rio-900/20">
          <PhotoIcon className="h-24 w-24 opacity-20" />
          <span className="font-fiesta text-2xl mt-4 opacity-30 tracking-widest">
            QUINCHO
          </span>
          <span className="text-xs uppercase tracking-widest opacity-30">
            La Costanera
          </span>
        </div>
      )}

      {/* DEGRADADO INFERIOR COMÚN */}
      <div className="absolute inset-0 bg-linear-to-t from-arena via-transparent to-transparent pointer-events-none z-10"></div>
    </div>
  );
};
