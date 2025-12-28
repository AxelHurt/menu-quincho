import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface Props {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const Accordion = ({ title, isOpen, onToggle, children }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-arena-dark overflow-hidden mb-4">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <h3 className="font-fiesta font-bold text-rio-900 text-left">
          {title}
        </h3>
        <ChevronDownIcon
          className={`h-5 w-5 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};
