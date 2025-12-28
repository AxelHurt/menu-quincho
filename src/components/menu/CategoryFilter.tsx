interface Props {
  activeFilter: "comida" | "bebida";
  onChange: (filter: "comida" | "bebida") => void;
}

export const CategoryFilter = ({ activeFilter, onChange }: Props) => {
  return (
    <div className="px-10 relative z-20 -mt-6 shrink-0">
      <div className="bg-white p-1 rounded-full shadow-lg shadow-rio-900/10 flex relative overflow-hidden border border-white/50">
        <button
          onClick={() => onChange("comida")}
          className={`flex-1 rounded-full py-2.5 flex items-center justify-center gap-2 transition-all duration-300 relative z-10 cursor-pointer ${
            activeFilter === "comida"
              ? "text-white shadow-md"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          {activeFilter === "comida" && (
            <div className="absolute inset-0 bg-linear-to-r from-sol-500 to-sol-600 rounded-full animate-in fade-in zoom-in-95 duration-200"></div>
          )}
          <span className="relative text-lg">🍔</span>
          <span className="relative font-fiesta font-bold text-xs tracking-wide uppercase">
            Comidas
          </span>
        </button>
        <button
          onClick={() => onChange("bebida")}
          className={`flex-1 rounded-full py-2.5 flex items-center justify-center gap-2 transition-all duration-300 relative z-10 cursor-pointer ${
            activeFilter === "bebida"
              ? "text-white shadow-md"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          {activeFilter === "bebida" && (
            <div className="absolute inset-0 bg-linear-to-r from-fiesta-pink to-sol-600 rounded-full animate-in fade-in zoom-in-95 duration-200"></div>
          )}
          <span className="relative text-lg">🍹</span>
          <span className="relative font-fiesta font-bold text-xs tracking-wide uppercase">
            Bebidas
          </span>
        </button>
      </div>
    </div>
  );
};
