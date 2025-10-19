import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth, esAdmin } from "../../context/AuthContext"; //
import Boton from "../atoms/Boton";

export default function BarraNavegacion(){
  const { usuario, cerrarSesion } = useAuth(); //
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white border-bottom mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/"><b>Denoise</b> <span className="text-secondary">Bluetech AI</span></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navprincipal" aria-controls="navprincipal" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="navprincipal">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/modelos">Modelos</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/nosotros">Nosotros</NavLink></li>

            <li className="nav-item"><NavLink className="nav-link" to="/blogs">Blogs</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>
            
            {/* 1. Modifica esta sección */}
            {usuario && esAdmin(usuario) ? ( //
              <> {/* Envuelve los items en un fragmento <>...</> */}
                <li className="nav-item"><NavLink className="nav-link" to="/admin">Admin</NavLink></li>
                
                {/* 2. Añade el nuevo enlace aquí */}
                <li className="nav-item"><NavLink className="nav-link" to="/verificar-tests">Verificar Lógica</NavLink></li>
              </>
            ) : null}
          </ul>
          <div className="d-flex gap-2">
            {!usuario ? (<>
              <NavLink className="btn btn-outline-primary" to="/login">Iniciar sesión</NavLink>
              <NavLink className="btn btn-primary" to="/registro">Registrarse</NavLink>
            </>) : (<>
              <span className="me-2 text-muted">Hola, {usuario.nombre} ({usuario.rol})</span>
              <Boton clase="btn btn-outline-danger" onClick={cerrarSesion}>Cerrar sesión</Boton>
            </>)}
          </div>
        </div>
      </div>
    </nav>
  );
}