import React from "react";
import Boton from "../atoms/Boton";

export default function TablaUsuarios({usuarios, onEditar, onEliminar}){
  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th>RUN</th><th>Nombre</th><th>Correo</th><th>Rol</th><th className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.run}>
              <td>{u.run}</td>
              <td>{u.nombre}</td>
              <td>{u.correo}</td>
              <td>{u.rol}</td>
              <td className="text-end">
                <div className="btn-group btn-group-sm">
                  <Boton clase="btn btn-outline-secondary" onClick={()=>onEditar(u)}>Editar</Boton>
                  <Boton clase="btn btn-outline-danger" onClick={()=>onEliminar(u)}>Eliminar</Boton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}