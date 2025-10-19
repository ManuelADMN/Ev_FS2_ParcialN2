import React from "react";
import { blogs as datos } from "../../utils/datosBlogs";
import TarjetaBlog from "../molecules/TarjetaBlog";

export default function Blogs(){
  return (
    <div className="container">
      <h2 className="mb-4">Blog</h2>
      <div className="row g-3">
        {datos.map(b => (
          <div className="col-sm-12 col-md-6" key={b.id}>
            <TarjetaBlog entrada={b} />
          </div>
        ))}
      </div>
    </div>
  );
}