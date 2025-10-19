import React, { useEffect, useState } from "react";
import { obtenerUsuarios, guardarUsuarios, agregarUsuario, actualizarUsuario, eliminarUsuario } from "../../utils/almacenamiento";
import FormUsuarioAdmin from "../organisms/FormUsuarioAdmin";
import TablaUsuarios from "../organisms/TablaUsuarios";

export default function AdminPanel(){
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null);
  const [mostrandoForm, setMostrandoForm] = useState(false);

  useEffect(()=>{
    const lista = obtenerUsuarios();
    if(!lista.find(u => u.correo === 'admin@denoise.com')){
      lista.push({ nombre:'Admin', run:'11111111-1', correo:'admin@denoise.com', contrasena:'admin123', rol:'Administrador' });
      guardarUsuarios(lista);
    }
    setUsuarios(lista);
  },[]);

  function recargar(){ setUsuarios(obtenerUsuarios()); }

  function guardarNuevo(u){
    agregarUsuario(u);
    setMostrandoForm(false);
    recargar();
  }
  function guardarEdicion(u){
    actualizarUsuario(editando.run, u);
    setEditando(null);
    setMostrandoForm(false);
    recargar();
  }
  function onEliminar(u){
    if(window.confirm(`¿Eliminar usuario ${u.nombre}?`)){
      eliminarUsuario(u.run);
      recargar();
    }
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Administración de Usuarios</h2>
        <button className="btn btn-primary" onClick={()=>{ setEditando(null); setMostrandoForm(true); }}>Agregar Usuario</button>
      </div>
      {mostrandoForm && (
        <FormUsuarioAdmin
          modo={editando ? 'editar' : 'crear'}
          usuarioInicial={editando}
          onGuardar={editando ? guardarEdicion : guardarNuevo}
          onCancelar={()=>{ setEditando(null); setMostrandoForm(false); }}
        />
      )}
      <TablaUsuarios usuarios={usuarios} onEditar={(u)=>{ setEditando(u); setMostrandoForm(true); }} onEliminar={onEliminar} />
    </div>
  );
}