const CLAVE_USUARIOS = 'denoise_usuarios';
const CLAVE_SESION = 'denoise_sesion';

export function obtenerUsuarios(){
  try{
    const txt = localStorage.getItem(CLAVE_USUARIOS);
    return txt ? JSON.parse(txt) : [];
  }catch(e){ return []; }
}
export function guardarUsuarios(lista){
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(lista || []));
}
export function agregarUsuario(usuario){
  const usuarios = obtenerUsuarios();
  usuarios.push(usuario);
  guardarUsuarios(usuarios);
  return usuario;
}
export function actualizarUsuario(run, datos){
  let usuarios = obtenerUsuarios();
  usuarios = usuarios.map(u => u.run === run ? {...u, ...datos} : u);
  guardarUsuarios(usuarios);
  return true;
}
export function eliminarUsuario(run){
  const usuarios = obtenerUsuarios().filter(u => u.run !== run);
  guardarUsuarios(usuarios);
  return true;
}
export function establecerSesion(usuario){
  localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
}
export function obtenerSesion(){
  try{
    const txt = localStorage.getItem(CLAVE_SESION);
    return txt ? JSON.parse(txt) : null;
  }catch(e){ return null; }
}
export function cerrarSesion(){
  localStorage.removeItem(CLAVE_SESION);
}
export function existeUsuarioPorCorreo(correo){
  return obtenerUsuarios().some(u => (u.correo || '').toLowerCase() === (correo||'').toLowerCase());
}
export function existeUsuarioPorRUN(run){
  return obtenerUsuarios().some(u => (u.run || '').toUpperCase() === (run||'').toUpperCase());
}
