import { SparklesIcon } from "@heroicons/react/24/solid";

export const Header = () => {
  return (
    <header className="relative overflow-hidden shrink-0 rounded-b-3xl z-10">
      <div className="absolute inset-0 bg-linear-to-tr from-sol-600 via-fiesta-pink to-sol-500 opacity-90"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      <div className="relative z-10 p-6 py-8 text-center text-white flex flex-col items-center justify-center">
        <div className="mb-1 flex flex-col items-center">
          <h1 className="font-fiesta text-3xl font-extrabold tracking-tight uppercase drop-shadow-md leading-none text-center">
            Quincho
          </h1>
          <h2 className="font-fiesta text-sm font-bold text-yellow-100 flex items-center justify-center gap-1 drop-shadow-sm opacity-90 mt-1">
            <SparklesIcon className="h-3 w-3 inline" /> La Costanera
          </h2>
        </div>
        <p className="text-[10px] mt-1 text-yellow-50/80 font-bold tracking-[0.2em] uppercase">
          Romang • Santa Fe
        </p>
      </div>
    </header>
  );
};
