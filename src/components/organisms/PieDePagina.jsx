import React from "react";
export default function PieDePagina(){
  return (
    <footer>
      <div className="container d-flex justify-content-between">
        <div>© {new Date().getFullYear()} Denoise · Bluetech AI</div>
        <div className="text-muted">Ciencia de Datos · IA aplicada</div>
      </div>
    </footer>
  );
}