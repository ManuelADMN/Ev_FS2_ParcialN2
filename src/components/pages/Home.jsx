import React from "react";
export default function Home(){
  return (
    <div className="container">
      <div className="p-5 mb-4 bg-white border rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Denoise · Bluetech AI</h1>
          <p className="col-md-8 fs-5">Ciencia de Datos e Inteligencia Artificial para el sector marino. Optimizamos decisiones con modelos propios y asistentes inteligentes.</p>
          <a className="btn btn-primary btn-lg" href="/nosotros">Conoce nuestros modelos</a>
        </div>
      </div>
    </div>
  );
}