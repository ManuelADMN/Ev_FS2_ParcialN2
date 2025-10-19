import React from "react";
import Etiqueta from "../atoms/Etiqueta";
import CampoTexto from "../atoms/CampoTexto";

export default function CampoIngreso({id, etiqueta, tipo='text', valor, onChange, placeholder='', error=''}){
  return (
    <div className="mb-3">
      <Etiqueta htmlFor={id}>{etiqueta}</Etiqueta>
      <CampoTexto id={id} tipo={tipo} valor={valor} onChange={onChange} placeholder={placeholder} />
      {error ? <div className="form-error">{error}</div> : null}
    </div>
  );
}