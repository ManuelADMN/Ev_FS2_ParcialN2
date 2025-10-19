import React, { useState } from "react";
import CampoIngreso from "../molecules/CampoIngreso";
import Boton from "../atoms/Boton";
import { useAuth } from "../../context/AuthContext";


export default function FormLogin(){
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const { iniciarSesion } = useAuth();

function enviar(e){
  e.preventDefault();
  const r = iniciarSesion(correo, contrasena);
  if (!r.ok) {
    setError(r.mensaje);
    return;
  }
  alert('Inicio de sesión exitoso. Serás redirigido a la página principal.');
  window.location.href = '/';
}

  return (
    <form onSubmit={enviar} className="card p-4 shadow-sm">
      <h5 className="mb-3">Iniciar sesión</h5>
      {error && <div className="form-error mb-2">{error}</div>}
      <CampoIngreso id="correo" etiqueta="Correo" tipo="email" valor={correo} onChange={e=>setCorreo(e.target.value)} placeholder="tucorreo@denoise.com" />
      <CampoIngreso id="pass" etiqueta="Contraseña" tipo="password" valor={contrasena} onChange={e=>setContrasena(e.target.value)} placeholder="********" />
      <Boton tipo="submit">Entrar</Boton>
    </form>
  );
}