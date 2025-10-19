export function limpiarRut(rut){
  return (rut || '').toString().replace(/\./g,'').replace(/-/g,'').toUpperCase();
}
export function calcularDV(numero){
  let suma = 0, multiplicador = 2;
  for(let i = numero.length - 1; i >= 0; i--){
    suma += parseInt(numero[i],10) * multiplicador;
    multiplicador = (multiplicador === 7) ? 2 : (multiplicador + 1);
  }
  const resto = suma % 11;
  const dv = 11 - resto;
  if (dv === 11) return '0';
  if (dv === 10) return 'K';
  return String(dv);
}
export function validarRUN(rutCompleto){
  const limpio = limpiarRut(rutCompleto);
  if(!/^\d{7,8}[0-9K]$/.test(limpio)) return false;
  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  return calcularDV(cuerpo) === dv;
}
export function validarCorreoDenoiseDuoc(correo){
  if(!correo) return false;
  const basico = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!basico.test(correo)) return false;
  const dominioOK = /@(?:denoise|duocuc)\./i.test(correo);
  return dominioOK;
}
export function validarContrasena(pass, min=6){
  return typeof pass==='string' && pass.length >= min;
}
