import React from "react";
export default function CampoTexto({id, tipo='text', valor, onChange, placeholder='', requerido=false, ...rest}){
  return <input id={id} type={tipo} className="form-control" value={valor} onChange={onChange} placeholder={placeholder} required={requerido} {...rest} />;
}