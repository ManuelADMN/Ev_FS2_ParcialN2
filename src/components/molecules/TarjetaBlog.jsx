import React from "react";
import { Link } from "react-router-dom";

export default function TarjetaBlog({entrada}){
  return (
    <div className="card h-100 card-blog">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{entrada.titulo}</h5>
        <div className="text-muted small mb-2">{entrada.fecha} · {entrada.autor}</div>
        <p className="card-text flex-grow-1">{entrada.resumen}</p>
        <Link to={`/blog/${entrada.id}`} className="btn btn-outline-primary mt-2">Leer más</Link>
      </div>
    </div>
  );
}