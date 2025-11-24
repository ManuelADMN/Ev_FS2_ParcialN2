import React, { createContext, useContext, useEffect, useState } from "react";
import { obtenerSesion, establecerSesion, cerrarSesion as cerrar, obtenerUsuarios } from "../utils/almacenamiento";

const AuthContext = createContext(null);

export function ProveedorAuth({children}){
  const [usuario, setUsuario] = useState(null);

  useEffect(()=>{
    const ses = obtenerSesion();
    if(ses) setUsuario(ses);
  },[]);

  function iniciarSesion(correo, contrasena){
    const lista = obtenerUsuarios();
    const u = lista.find(x => (x.correo||'').toLowerCase() === (correo||'').toLowerCase() && x.contrasena === contrasena);
    if(u){
      establecerSesion(u);
      setUsuario(u);
      return { ok: true, usuario: u };
    }
    return { ok: false, mensaje: "Credenciales inválidas" };
  }

  function cerrarSesion(){
    cerrar();
    setUsuario(null);
  }

  return <AuthContext.Provider value={{usuario, setUsuario, iniciarSesion, cerrarSesion}}>{children}</AuthContext.Provider>;
}

export function useAuth(){ return useContext(AuthContext); }
export function esAdmin(u){ return (u && u.rol === 'Administrador'); }
