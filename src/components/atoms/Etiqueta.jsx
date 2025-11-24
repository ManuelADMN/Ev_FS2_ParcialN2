import React from "react";
export default function Etiqueta({htmlFor, children}){
  return <label htmlFor={htmlFor} className="form-label">{children}</label>;
}