import React from "react";
export default function Nosotros(){
  return (
    <div className="container">
      <h2 className="mb-4">Sobre Denoise</h2>
      <p>Denoise es una compañía de Ciencia de Datos e IA enfocada en Bluetech. Desarrollamos analítica y asistentes para monitorear y mejorar la sostenibilidad marina.</p>
      <div className="row g-3 mt-3">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">DenoiseSH</h5>
              <p className="card-text">Modelo que se encarga de la clasificación de salmones sanos o infectados.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">DenoQ</h5>
              <p className="card-text">Modelo encargado de clasificar la pigmentación en los filetes de salmón.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Oddie (Chatbot)</h5>
              <p className="card-text">Asistente inteligente conectado a DenoiseSH y DenoQ con lenguaje natural para consultas rápidas y dashboard interactivo.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}