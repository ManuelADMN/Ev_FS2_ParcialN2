import React, { useState } from "react";
import CampoIngreso from "../molecules/CampoIngreso";
import Boton from "../atoms/Boton";
import { validarRUN, validarCorreoDenoiseDuoc, validarContrasena } from "../../utils/validaciones";
import { agregarUsuario, existeUsuarioPorCorreo, existeUsuarioPorRUN } from "../../utils/almacenamiento";
import { useNavigate } from "react-router-dom";

export default function FormRegistro(){
  const [form, setForm] = useState({ nombre:'', run:'', correo:'', contrasena:'', confirmar:'' });
  const [errores, setErrores] = useState({});
  const nav = useNavigate();

  function onCambio(campo, valor){
    setForm(prev => ({...prev, [campo]: valor}));
  }

  function validar(){
    const errs = {};
    if(!form.nombre.trim()) errs.nombre = "Nombre es requerido";
    if(!validarRUN(form.run)) errs.run = "RUN no válido (usa formato 12345678-K)";
    if(!validarCorreoDenoiseDuoc(form.correo)) errs.correo = "Correo debe ser @denoise.* o @duocuc.*";
    if(!validarContrasena(form.contrasena, 6)) errs.contrasena = "Contraseña mínima de 6 caracteres";
    if(form.contrasena !== form.confirmar) errs.confirmar = "Las contraseñas no coinciden";
    if(existeUsuarioPorCorreo(form.correo)) errs.correo = "Correo ya registrado";
    if(existeUsuarioPorRUN(form.run)) errs.run = "RUN ya registrado";
    setErrores(errs);
    return Object.keys(errs).length === 0;
  }

  function enviar(e){
    e.preventDefault();
    if(!validar()) return;
    const nuevo = { nombre: form.nombre.trim(), run: form.run.toUpperCase(), correo: form.correo.toLowerCase(), contrasena: form.contrasena, rol: 'Cliente' };
    agregarUsuario(nuevo);
    alert('Usuario registrado con éxito. Ahora puedes iniciar sesión.');
    nav('/login');
  }

  return (
    <form onSubmit={enviar} className="card p-4 shadow-sm">
      <h5 className="mb-3">Registro de usuario</h5>
      <CampoIngreso id="nombre" etiqueta="Nombre" valor={form.nombre} onChange={e=>onCambio('nombre', e.target.value)} error={errores.nombre} placeholder="Tu nombre completo" />
      <CampoIngreso id="run" etiqueta="RUN" valor={form.run} onChange={e=>onCambio('run', e.target.value)} error={errores.run} placeholder="12345678-K" />
      <CampoIngreso id="correo" etiqueta="Correo (@denoise o @duocuc)" tipo="email" valor={form.correo} onChange={e=>onCambio('correo', e.target.value)} error={errores.correo} placeholder="nombre@denoise.com" />
      <CampoIngreso id="contrasena" etiqueta="Contraseña" tipo="password" valor={form.contrasena} onChange={e=>onCambio('contrasena', e.target.value)} error={errores.contrasena} placeholder="********" />
      <CampoIngreso id="confirmar" etiqueta="Confirmar contraseña" tipo="password" valor={form.confirmar} onChange={e=>onCambio('confirmar', e.target.value)} error={errores.confirmar} placeholder="********" />
      <Boton tipo="submit">Crear cuenta</Boton>
    </form>
  );
}