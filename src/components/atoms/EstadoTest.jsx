import React from "react";
export default function EstadoTest({ exito }) {
  const clase = exito ? 'badge text-bg-success' : 'badge text-bg-danger';
  const texto = exito ? 'ÉXITO' : 'FALLIDO';
  
  return (
    <span className={clase} style={{ minWidth: '70px', textAlign: 'center' }}>
      {texto}
    </span>
  );
}