import React from "react";
export default function Boton({tipo='button', onClick, children, clase='btn btn-primary', ...rest}){
  return <button type={tipo} className={clase} onClick={onClick} {...rest}>{children}</button>;
}