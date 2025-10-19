(function(root){
  function limpiarRut(rut){ return (rut||'').toString().replace(/\./g,'').replace(/-/g,'').toUpperCase(); }
  function calcularDV(numero){
    var suma=0, mult=2;
    for(var i=numero.length-1;i>=0;i--){
      suma += parseInt(numero[i],10)*mult;
      mult = (mult===7)?2:(mult+1);
    }
    var resto = suma % 11;
    var dv = 11 - resto;
    if(dv===11) return '0';
    if(dv===10) return 'K';
    return String(dv);
  }
  function validarRUN(rutCompleto){
    var limpio = limpiarRut(rutCompleto);
    if(!/^\d{7,8}[0-9K]$/.test(limpio)) return false;
    var cuerpo = limpio.slice(0,-1);
    var dv = limpio.slice(-1);
    return calcularDV(cuerpo) === dv;
  }
  function validarCorreoDenoiseDuoc(correo){
    if(!correo) return false;
    var basico = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!basico.test(correo)) return false;
    var dominioOK = /@(?:denoise|duocuc)\./i.test(correo);
    return dominioOK;
  }
  function validarContrasenaMinima(pass){
    if (typeof pass !== 'string') return false;
    if (pass.length < 6) return false;
    return true;
  }
  function esAdmin(rol){ return String(rol) === 'Administrador'; }
  
root.Validaciones = {limpiarRut, calcularDV, validarRUN, validarCorreoDenoiseDuoc, esAdmin, validarContrasenaMinima};
})(this);
