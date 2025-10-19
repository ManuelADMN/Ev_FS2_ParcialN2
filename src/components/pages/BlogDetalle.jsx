import React from "react";
import { useParams, Link } from "react-router-dom";
import { blogs as datos } from "../../utils/datosBlogs";

export default function BlogDetalle(){
  const { id } = useParams();
  const blog = datos.find(x => String(x.id) === String(id));
  if(!blog){
    return <div className="container"><p>No se encontró el artículo.</p></div>;
  }
  return (
    <div className="container">
      <div className="mb-3"><Link to="/blogs" className="btn btn-link">&larr; Volver</Link></div>
      <h2>{blog.titulo}</h2>
      <div className="text-muted small mb-3">{blog.fecha} · {blog.autor}</div>
      <pre style={{whiteSpace:'pre-wrap'}}>{blog.contenido}</pre>
    </div>
  );
}