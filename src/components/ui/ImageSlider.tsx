import { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";

interface Props {
  images: string[] | null;
  title: string;
}

export const ImageSlider = ({ images, title }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasImages = images && images.length > 0;
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
    // CAMBIO: Puse h-full para que ocupe el 100% de la altura que le diga el componente padre
    <div className="relative h-full w-full bg-gray-100 shrink-0 overflow-hidden group">
      {hasImages ? (
        // --- CASO 1: HAY IMÁGENES ---
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
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white transition-all shadow-sm z-20 active:scale-90 cursor-pointer"
              >
                <ChevronLeftIcon className="h-6 w-6 drop-shadow-md" />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 text-white transition-all shadow-sm z-20 active:scale-90 cursor-pointer"
              >
                <ChevronRightIcon className="h-6 w-6 drop-shadow-md" />
              </button>

              {/* Indicadores (Puntitos) */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                {displayImages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full shadow-md transition-all duration-300 border border-black/10 ${
                      idx === currentIndex
                        ? "bg-sol-500 w-6"
                        : "bg-white/80 w-2 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        // --- CASO 2: NO HAY IMÁGENES ---
        <div className="w-full h-full flex flex-col items-center justify-center bg-arena-dark/20 text-rio-900/20">
          <PhotoIcon className="h-24 w-24" />
          <span className="font-fiesta text-2xl mt-4 tracking-widest">
            QUINCHO
          </span>
          <span className="text-xs uppercase tracking-widest">
            La Costanera
          </span>
        </div>
      )}
    </div>
  );
};
