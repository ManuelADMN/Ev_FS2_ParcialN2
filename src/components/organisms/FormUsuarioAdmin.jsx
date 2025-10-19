import React, { useEffect, useState } from "react";
import CampoIngreso from "../molecules/CampoIngreso";
import Boton from "../atoms/Boton";
import { validarRUN, validarCorreoDenoiseDuoc, validarContrasena } from "../../utils/validaciones";
import { existeUsuarioPorCorreo, existeUsuarioPorRUN } from "../../utils/almacenamiento";

export default function FormUsuarioAdmin({modo='crear', usuarioInicial=null, onGuardar, onCancelar}){
  const [form, setForm] = useState({ nombre:'', run:'', correo:'', contrasena:'', rol: 'Cliente' });
  const [errores, setErrores] = useState({});

  useEffect(()=>{
    if(usuarioInicial){
      setForm({ ...usuarioInicial, confirmar: usuarioInicial.contrasena });
    }
  },[usuarioInicial]);

  function onCambio(campo, valor){
    setForm(prev => ({...prev, [campo]: valor}));
  }

  function validar(){
    const errs = {};
    if(!form.nombre.trim()) errs.nombre = "Nombre es requerido";
    if(!validarRUN(form.run)) errs.run = "RUN no válido";
    if(!validarCorreoDenoiseDuoc(form.correo)) errs.correo = "Correo debe ser @denoise.* o @duocuc.*";
    if(!validarContrasena(form.contrasena, 6)) errs.contrasena = "Contraseña mínima de 6 caracteres";
    if(modo==='crear'){
      if(existeUsuarioPorCorreo(form.correo)) errs.correo = "Correo ya registrado";
      if(existeUsuarioPorRUN(form.run)) errs.run = "RUN ya registrado";
    }
    setErrores(errs);
    return Object.keys(errs).length === 0;
  }

  function enviar(e){
    e.preventDefault();
    if(!validar()) return;
    const dato = {
      nombre: form.nombre.trim(),
      run: form.run.toUpperCase(),
      correo: form.correo.toLowerCase(),
      contrasena: form.contrasena,
      rol: form.rol
    };
    onGuardar(dato);
  }

  return (
    <form onSubmit={enviar} className="card p-3 mb-3">
      <div className="row g-3">
        <div className="col-md-6">
          <CampoIngreso id="nombre" etiqueta="Nombre" valor={form.nombre} onChange={e=>onCambio('nombre', e.target.value)} error={errores.nombre} />
        </div>
        <div className="col-md-6">
          <CampoIngreso id="run" etiqueta="RUN" valor={form.run} onChange={e=>onCambio('run', e.target.value)} error={errores.run} />
        </div>
        <div className="col-md-6">
          <CampoIngreso id="correo" etiqueta="Correo (@denoise o @duocuc)" tipo="email" valor={form.correo} onChange={e=>onCambio('correo', e.target.value)} error={errores.correo} />
        </div>
        <div className="col-md-6">
          <CampoIngreso id="contrasena" etiqueta="Contraseña" tipo="password" valor={form.contrasena} onChange={e=>onCambio('contrasena', e.target.value)} error={errores.contrasena} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Rol</label>
          <select className="form-select" value={form.rol} onChange={e=>onCambio('rol', e.target.value)}>
            <option>Cliente</option>
            <option>Vendedor</option>
            <option>Administrador</option>
          </select>
        </div>
      </div>
      <div className="d-flex gap-2 mt-3">
        <Boton tipo="submit" clase="btn btn-success">{modo==='crear' ? 'Agregar' : 'Guardar cambios'}</Boton>
        <Boton clase="btn btn-outline-secondary" onClick={onCancelar}>Cancelar</Boton>
      </div>
      {Object.values(errores).length>0 && <div className="form-error mt-2">Revisa los errores indicados.</div>}
    </form>
  );
}