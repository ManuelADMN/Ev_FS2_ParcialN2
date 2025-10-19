describe('Validaciones básicas', function(){
  it('validarRUN reconoce un RUN válido conocido', function(){
    expect(Validaciones.validarRUN('11111111-1')).toBeTrue();
  });
  it('validarRUN rechaza DV incorrecto', function(){
    expect(Validaciones.validarRUN('11111111-2')).toBeFalse();
  });
  it('validarRUN rechaza formato sin DV', function(){
    expect(Validaciones.validarRUN('11111111')).toBeFalse();
  });
  it('validarCorreoDenoiseDuoc acepta dominios permitidos', function(){
    expect(Validaciones.validarCorreoDenoiseDuoc('admin@denoise.com')).toBeTrue();
    expect(Validaciones.validarCorreoDenoiseDuoc('test@duocuc.cl')).toBeTrue();
  });
  it('validarCorreoDenoiseDuoc rechaza dominios no permitidos', function(){
    expect(Validaciones.validarCorreoDenoiseDuoc('x@gmail.com')).toBeFalse();
  });
});

describe('Validación de contraseña mínima', function(){
  it('acepta contraseñas con 6 o más caracteres', function(){
    expect(Validaciones.validarContrasenaMinima('123456')).toBeTrue();
    expect(Validaciones.validarContrasenaMinima('contra123')).toBeTrue();
  });
  it('rechaza contraseñas con menos de 6 caracteres', function(){
    expect(Validaciones.validarContrasenaMinima('12345')).toBeFalse();
    expect(Validaciones.validarContrasenaMinima('abc')).toBeFalse();
  });
});


describe('Control de roles', function(){
  it('esAdmin retorna true solo para Administrador', function(){
    expect(Validaciones.esAdmin('Administrador')).toBeTrue();
    expect(Validaciones.esAdmin('Vendedor')).toBeFalse();
    expect(Validaciones.esAdmin('Cliente')).toBeFalse();
  });
});

describe('CRUD y autenticación (mock)', function(){
  beforeEach(function(){ Logica.resetMemoria(); });

  it('agregarUsuario incrementa el total', function(){
    expect(Logica.listarUsuarios().length).toBe(0);
    Logica.agregarUsuario({run:'1-9', nombre:'A', correo:'a@denoise.com', contrasena:'x', rol:'Cliente'});
    expect(Logica.listarUsuarios().length).toBe(1);
  });

  it('actualizarUsuario modifica campos', function(){
    Logica.agregarUsuario({run:'1-9', nombre:'A', correo:'a@denoise.com', contrasena:'x', rol:'Cliente'});
    Logica.actualizarUsuario('1-9', { nombre: 'B', rol:'Vendedor' });
    var u = Logica.listarUsuarios()[0];
    expect(u.nombre).toBe('B');
    expect(u.rol).toBe('Vendedor');
  });

  it('eliminarUsuario remueve por RUN', function(){
    Logica.agregarUsuario({run:'1-9', nombre:'A', correo:'a@denoise.com', contrasena:'x', rol:'Cliente'});
    Logica.agregarUsuario({run:'2-7', nombre:'B', correo:'b@denoise.com', contrasena:'y', rol:'Cliente'});
    Logica.eliminarUsuario('1-9');
    var runs = Logica.listarUsuarios().map(u=>u.run);
    expect(runs).toEqual(['2-7']);
  });

  it('login y logout controlan sesión', function(){
    Logica.agregarUsuario({run:'1-9', nombre:'A', correo:'a@denoise.com', contrasena:'x', rol:'Administrador'});
    expect(Logica.login('a@denoise.com', 'x')).toBeTrue();
    expect(Logica.usuarioActual().correo).toBe('a@denoise.com');
    Logica.logout();
    expect(Logica.usuarioActual()).toBeNull();
  });
});

describe('DOM helper', function(){
  it('setError marca y limpia errores', function(){
    var el = document.createElement('div');
    Logica.setError(el, 'Campo requerido');
    expect(el.textContent).toBe('Campo requerido');
    expect(el.getAttribute('data-error')).toBe('1');
    Logica.setError(el, '');
    expect(el.textContent).toBe('');
    expect(el.getAttribute('data-error')).toBe('');
  });
});
