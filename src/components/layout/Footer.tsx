import { CodeBracketIcon } from "@heroicons/react/24/solid";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 text-center shrink-0 bg-arena border-t border-arena-dark/50">
      <div className="flex flex-col items-center gap-2 px-6">
        {/* 1. COPYRIGHT CON LINK AL QUINCHO */}
        <div className="text-rio-900/60 flex flex-col items-center">
          <a
            href="https://www.instagram.com/quincholacostanera/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 transition-transform duration-200 inline-block cursor-pointer"
            title="Ir al Instagram del Quincho"
          >
            <h3 className="font-fiesta text-xs font-bold tracking-widest uppercase hover:text-rio-900 transition-colors">
              Quincho La Costanera
            </h3>
          </a>
          <p className="text-[10px] font-medium opacity-70 mt-0.5">
            © {currentYear} • Todos los derechos reservados
          </p>
        </div>

        {/* 2. DESIGNED BY AXELHURT CON LINK */}
        <a
          href="https://www.instagram.com/axelhurt_/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1.5 text-[9px] text-rio-900/40 hover:text-rio-900/80 transition-colors cursor-pointer pt-1"
          title="Ver perfil del desarrollador"
        >
          <CodeBracketIcon className="h-2.5 w-2.5 opacity-50 group-hover:text-sol-600 transition-colors" />
          <span>
            Designed by{" "}
            <span className="font-fiesta font-bold group-hover:text-sol-600 transition-colors border-b border-transparent group-hover:border-sol-600/50">
              AxelHurt
            </span>
          </span>
        </a>
      </div>
    </footer>
  );
};
