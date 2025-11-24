import React from "react";
export default function Textarea({id, valor, onChange, placeholder='', filas=4, requerido=false}){
  return <textarea id={id} className="form-control" rows={filas} value={valor} onChange={onChange} placeholder={placeholder} required={requerido} />;
}