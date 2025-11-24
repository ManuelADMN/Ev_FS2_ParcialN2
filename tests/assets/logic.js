(function(root){
  var memoria = { usuarios: [], sesion: null };
  function resetMemoria(){ memoria.usuarios = []; memoria.sesion = null; }
  function agregarUsuario(u){ memoria.usuarios.push(u); return u; }
  function listarUsuarios(){ return memoria.usuarios.slice(); }
  function actualizarUsuario(run, datos){
    memoria.usuarios = memoria.usuarios.map(u => u.run === run ? Object.assign({}, u, datos) : u);
    return true;
  }
  function eliminarUsuario(run){
    memoria.usuarios = memoria.usuarios.filter(u => u.run !== run);
    return true;
  }
  function login(correo, pass){
    var u = memoria.usuarios.find(function(x){ return (x.correo||'').toLowerCase()===String(correo).toLowerCase() && x.contrasena===pass; });
    if(u){ memoria.sesion = u; return true; }
    return false;
  }
  function logout(){ memoria.sesion = null; }
  function usuarioActual(){ return memoria.sesion; }
  function setError(el, msg){ if(!el) return; el.textContent = msg || ''; el.setAttribute('data-error', msg ? '1':''); }
  root.Logica = { resetMemoria, agregarUsuario, listarUsuarios, actualizarUsuario, eliminarUsuario, login, logout, usuarioActual, setError };
})(this);
