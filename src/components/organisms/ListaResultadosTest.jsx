import React from "react";
import ResultadoTestItem from "../molecules/ResultadoTestItem";

/**
 * Organismo que muestra la lista de resultados de los tests.
 * Muestra un mensaje si no hay resultados.
 */
export default function ListaResultadosTests({ resultados }) {
  // Estado inicial o vacío
  if (resultados.length === 0) {
    return (
      <div className="alert alert-secondary mt-4">
        Presiona el botón "Ejecutar Pruebas" para ver los resultados.
      </div>
    );
  }

  // Renderiza la lista de moléculas
  return (
    <div className="mt-4">
      {resultados.map((r, i) => (
        <ResultadoTestItem key={i} resultado={r} />
      ))}
    </div>
  );
}