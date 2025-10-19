import React, { useState } from "react";
import Boton from "../atoms/Boton"; // Átomo existente
import ListaResultadosTests from "../organisms/ListaResultadosTests"; // Nuevo Organismo
import { validarRUN, validarCorreoDenoiseDuoc, validarContrasena, calcularDV } from "../../utils/validaciones";

// --- Lógica de la Página ---
// Esta lógica (el "runner") es específica de esta página,
// por lo que está bien que viva aquí.

function ejecutarTest(titulo, funcionDePrueba, valorEsperado) {
  try {
    const resultado = funcionDePrueba();
    const exito = JSON.stringify(resultado) === JSON.stringify(valorEsperado);
    if (exito) {
      return { titulo, exito: true, resultado, esperado: valorEsperado };
    } else {
      return { titulo, exito: false, error: `Se esperaba [${valorEsperado}] pero se obtuvo [${resultado}]` };
    }
  } catch (e) {
    return { titulo, exito: false, error: e.message };
  }
}
// --- Fin Lógica de la Página ---


export default function VerificarTests() {
  const [resultados, setResultados] = useState([]);

  // Función "controladora" que se ejecuta en la página
  function ejecutarPruebas() {
    const listaPruebas = [
      // Pruebas para validarRUN
      ejecutarTest("validarRUN: RUN válido (11111111-1)", () => validarRUN('11111111-1'), true),
      ejecutarTest("validarRUN: RUN válido (Formato con puntos)", () => validarRUN('11.111.111-1'), true),
      ejecutarTest("validarRUN: RUN inválido (DV incorrecto)", () => validarRUN('11111111-K'), false),
      ejecutarTest("validarRUN: RUN inválido (Formato corto)", () => validarRUN('123-K'), false),

      // Pruebas para calcularDV
      ejecutarTest("calcularDV: Cálculo DV (11111111)", () => calcularDV('11111111'), '1'),
      ejecutarTest("calcularDV: Cálculo DV (20416748)", () => calcularDV('20416748'), 'K'),
      ejecutarTest("calcularDV: Cálculo DV (19000160)", () => calcularDV('19000160'), '0'),

      // Pruebas para validarCorreoDenoiseDuoc
      ejecutarTest("validarCorreo: Correo denoise válido", () => validarCorreoDenoiseDuoc('test@denoise.com'), true),
      ejecutarTest("validarCorreo: Correo duocuc válido", () => validarCorreoDenoiseDuoc('test@duocuc.cl'), true),
      ejecutarTest("validarCorreo: Correo duocuc (subdominio)", () => validarCorreoDenoiseDuoc('test@profesor.duocuc.cl'), true),
      ejecutarTest("validarCorreo: Correo gmail (inválido)", () => validarCorreoDenoiseDuoc('test@gmail.com'), false),
      ejecutarTest("validarCorreo: Formato inválido (sin @)", () => validarCorreoDenoiseDuoc('testdenoise.com'), false),
      
      // Pruebas para validarContrasena
      ejecutarTest("validarContrasena: Válida (6 chars)", () => validarContrasena('123456', 6), true),
      ejecutarTest("validarContrasena: Inválida (5 chars)", () => validarContrasena('12345', 6), false),
      ejecutarTest("validarContrasena: Inválida (null)", () => validarContrasena(null, 6), false),
    ];
    setResultados(listaPruebas);
  }

  // El render de la página ahora es mucho más limpio
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Verificación de Tests Internos</h2>
        <Boton clase="btn btn-success" onClick={ejecutarPruebas}>
          Ejecutar Pruebas
        </Boton>
      </div>
      
      <p>Esta página ejecuta pruebas unitarias contra las funciones de lógica en <code>src/utils</code> para asegurar que sigan funcionando como se espera.</p>
      
      {/* Renderiza el organismo */}
      <ListaResultadosTests resultados={resultados} />
    </div>
  );
}