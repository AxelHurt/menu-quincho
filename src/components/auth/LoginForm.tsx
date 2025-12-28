import { useState } from "react";
import { signIn } from "../../services/auth";
import { LockClosedIcon } from "@heroicons/react/24/outline"; // Opcional, decorativo

interface Props {
  onLoginSuccess: () => void;
}

export const LoginForm = ({ onLoginSuccess }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signIn(email, password);
      onLoginSuccess();
    } catch (err) {
      setError("Datos incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Reduje p-6 a p-5 y max-w-sm a max-w-xs para que sea más angosto
    <div className="bg-white p-5 rounded-2xl shadow-xl border border-arena-dark max-w-xs mx-auto animate-in zoom-in-95 duration-200">
      <div className="flex items-center justify-center gap-2 mb-3 text-rio-900">
        <LockClosedIcon className="h-4 w-4 opacity-50" />
        <h3 className="font-fiesta text-lg font-bold">Acceso Propietario</h3>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {error && (
          <div className="bg-red-50 text-red-600 text-xs p-2 rounded text-center font-bold border border-red-100">
            {error}
          </div>
        )}

        {/* Inputs sin labels visuales para ahorrar espacio */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rio-900 outline-none transition-all"
          placeholder="Correo electrónico"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rio-900 outline-none transition-all"
          placeholder="Contraseña"
          required
        />

        <button
          disabled={loading}
          className="bg-rio-900 text-white font-fiesta text-sm py-2.5 rounded-xl hover:bg-rio-800 transition-colors shadow-md disabled:opacity-50 cursor-pointer mt-1"
        >
          {loading ? "Verificando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
};
