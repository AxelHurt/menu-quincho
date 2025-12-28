import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface Props {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const CategoryAccordion = ({
  title,
  children,
  defaultOpen = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    // 1. Redujimos mb-4 a mb-3 y rounded-3xl a rounded-2xl (más compacto)
    <div className="mb-3 overflow-hidden rounded-2xl border border-white/50 shadow-sm bg-gray-50 backdrop-blur-sm transition-all duration-300">
      {/* Cabecera del Acordeón */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        // 2. Redujimos drásticamente el padding (antes p-5, ahora py-3 px-4)
        className={`w-full flex items-center justify-between py-3 px-4 text-left transition-colors duration-300 cursor-pointer ${
          isOpen ? "bg-white/60" : "hover:bg-white/30"
        }`}
      >
        {/* 3. Redujimos la fuente a text-lg (antes xl) y ajustamos leading */}
        <span className="font-fiesta text-lg font-bold text-rio-900 uppercase tracking-wide leading-none pt-0.5">
          {title}
        </span>

        {/* Icono un poco más chico (h-5 w-5) */}
        <ChevronDownIcon
          className={`h-5 w-5 text-sol-600 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Contenido Desplegable */}
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          {/* Ajustamos el padding del contenido interno también */}
          <div className="p-3 pt-0 flex flex-col gap-3">
            {/* Espaciador minúsculo */}
            <div className="h-2"></div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
