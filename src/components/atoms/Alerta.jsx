import React from "react";
export default function Alerta({tipo='danger', children}){
  const clase = `alert alert-${tipo}`;
  return <div className={clase} role="alert">{children}</div>;
}