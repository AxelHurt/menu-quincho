import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MenuPage } from "./pages/MenuPage";
import { AdminPage } from "./pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta raíz: El Menú Público */}
        <Route path="/" element={<MenuPage />} />

        {/* Ruta secreta: El Panel de Admin */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
