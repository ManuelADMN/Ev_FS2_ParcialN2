import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProveedorAuth } from "./context/AuthContext";
import BarraNavegacion from "./components/organisms/BarraNavegacion";
import PieDePagina from "./components/organisms/PieDePagina";
import Home from "./components/pages/Home";
import Modelos from "./components/pages/Modelos";
import Nosotros from "./components/pages/Nosotros";
import Blogs from "./components/pages/Blogs";
import BlogDetalle from "./components/pages/BlogDetalle";
import Contacto from "./components/pages/Contacto";
import InicioSesion from "./components/pages/InicioSesion";
import Registro from "./components/pages/Registro";
import AdminPanel from "./components/pages/AdminPanel";
import RutaPrivadaAdmin from "./routes/RutaPrivada";

// 1. Importa la nueva página que creaste
import VerificarTests from "./components/pages/VerificarTests";

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <ProveedorAuth>
        <BarraNavegacion />
        <main className="flex-fill">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/modelos" element={<Modelos />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<BlogDetalle />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<InicioSesion />} />
            <Route path="/registro" element={<Registro />} />
            
            {/* 2. Añade la nueva ruta (protegida) */}
            <Route
              path="/verificar-tests"
              element={<RutaPrivadaAdmin><VerificarTests /></RutaPrivadaAdmin>}
            />
            <Route
              path="/admin"
              element={<RutaPrivadaAdmin><AdminPanel /></RutaPrivadaAdmin>}
            />
          </Routes>
        </main>
        <PieDePagina />
      </ProveedorAuth>
    </div>
  );
}