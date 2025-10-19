import React from "react";

export default function Nosotros(){
  return (
    <div className="container">
      <h2 className="mb-4">Sobre Nosotros</h2>

      <p className="lead">
        Somos una empresa de Puerto Montt dedicada al desarrollo de modelos de
        <b> clasificación con inteligencia artificial</b>. Nuestro foco está en la
        industria acuícola, creando soluciones que mejoran la calidad, trazabilidad y eficiencia.
      </p>

      <div className="mb-4">
        <span className="badge text-bg-light me-2">Puerto Montt, Chile</span>
        <span className="badge text-bg-light">IA · Visión Computacional · Acuicultura</span>
      </div>

      <div className="row g-3">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title mb-1">Manuel Díaz</h5>
              <p className="card-text text-secondary mb-2">Cofundador · IA & Datos</p>
              <p className="card-text">
                Enfocado en modelos de clasificación y despliegue de soluciones para procesos acuícolas.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title mb-1">Guillermo Cerda</h5>
              <p className="card-text text-secondary mb-2">Cofundador · Producto & Integración</p>
              <p className="card-text">
                Integración de pipelines, experiencia de usuario y operación de modelos en terreno.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title mb-1">Diego Aravena</h5>
              <p className="card-text text-secondary mb-2">Cofundador · Visión Computacional</p>
              <p className="card-text">
                Especialista en visión por computador aplicada a inspección y control de calidad.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-3"></div>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Qué hacemos</h5>
              <p className="card-text">
                Desarrollamos modelos de IA para clasificación y automatización en acuicultura:
                detección de condiciones en peces y análisis de filetes, con miras a nuevas
                industrias en el futuro.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Nuestra visión</h5>
              <p className="card-text">
                Llevar la analítica y la visión computacional a operaciones reales, mejorando
                la sostenibilidad y la toma de decisiones en tiempo real desde el sur de Chile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
