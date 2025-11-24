import React, { useState } from "react";
import CampoIngreso from "../molecules/CampoIngreso";
import Textarea from "../atoms/Textarea";
import Boton from "../atoms/Boton";

export default function Contacto(){
  const [form, setForm] = useState({nombre:'', correo:'', mensaje:''});
  const [enviado, setEnviado] = useState(false);
  const [errores, setErrores] = useState({});

  function onCambio(campo, valor){ setForm(prev => ({...prev, [campo]: valor})); }
  function validar(){
    const errs = {};
    if(!form.nombre.trim()) errs.nombre = "Nombre requerido";
    const basico = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!basico.test(form.correo)) errs.correo = "Correo inválido";
    if(!form.mensaje.trim()) errs.mensaje = "Mensaje requerido";
    setErrores(errs);
    return Object.keys(errs).length === 0;
  }
  function enviar(e){
    e.preventDefault();
    if(!validar()) return;
    setEnviado(true);
  }

  if(enviado){
    return <div className="container"><div className="alert alert-success">Gracias por contactarnos, responderemos pronto.</div></div>
  }

  return (
    <div className="container">
      <h2 className="mb-3">Contacto</h2>
      <form onSubmit={enviar} className="card p-4 shadow-sm col-12 col-md-8 col-lg-6">
        <CampoIngreso id="nombre" etiqueta="Nombre" valor={form.nombre} onChange={e=>onCambio('nombre', e.target.value)} error={errores.nombre} />
        <CampoIngreso id="correo" etiqueta="Correo" tipo="email" valor={form.correo} onChange={e=>onCambio('correo', e.target.value)} error={errores.correo} />
        <div className="mb-3">
          <label className="form-label" htmlFor="mensaje">Mensaje</label>
          <Textarea id="mensaje" valor={form.mensaje} onChange={e=>onCambio('mensaje', e.target.value)} />
          {errores.mensaje ? <div className="form-error">{errores.mensaje}</div> : null}
        </div>
        <Boton tipo="submit">Enviar</Boton>
      </form>
    </div>
  );
}