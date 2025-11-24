import React from "react";
import EstadoTest from "../atoms/EstadoTest";

/**
 * Molécula que renderiza una fila de resultado de test.
 * Utiliza el átomo EstadoTest y muestra el título y el error (si existe).
 */
export default function ResultadoTestItem({ resultado }) {
  // Define el color del 'alert' basado en el éxito
  const claseAlerta = resultado.exito ? 'alert-success' : 'alert-danger';

  return (
    <div className={`alert ${claseAlerta} d-flex align-items-start mb-2`}>
      {/* Átomo */}
      <EstadoTest exito={resultado.exito} />
      
      {/* Contenido */}
      <div className="ms-3 flex-grow-1">
        <strong className="mb-0 d-block">{resultado.titulo}</strong>
        {!resultado.exito && (
          <pre className="mb-0 mt-2" style={{ fontSize: '0.9em', whiteSpace: 'pre-wrap' }}>
            {resultado.error}
          </pre>
        )}
      </div>
    </div>
  );
}