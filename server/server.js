// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');

const app = express();
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// ===== Datos en memoria (demo) =====
const users = [];
const blogs = [
  { id: 1, titulo: 'Bienvenido a Denoise', autor: 'Equipo', resumen: 'Resumen', contenido: 'Contenido inicial' }
];
const models = [
  { id: 'denoise-sh', nombre: 'DenoiseSH', descripcion: 'Salud de salmones con IA' },
  { id: 'denoq', nombre: 'DenoQ', descripcion: 'Calidad de datos' },
  { id: 'oddie', nombre: 'Oddie', descripcion: 'Orquestador de IA' }
];
const messages = [];

// ===== Helpers RUT / validaciones mínimas =====
function normalizarRUN(rut){ return rut?.toString().replace(/\./g,'').replace(/-/g,'').toUpperCase() || ''; }
function dvRUN(num){
  let M=0,S=1; for(; num; num=Math.floor(num/10)) S=(S+num%10*(9-M++%6))%11;
  return S? S-1 : 'K';
}
function validarRUN(rutCompleto){
  const limpio = normalizarRUN(rutCompleto);
  const cuerpo = limpio.slice(0,-1), dv = limpio.slice(-1);
  if(!/^\d+$/.test(cuerpo)) return false;
  const dvCalc = String(dvRUN(parseInt(cuerpo,10)));
  return String(dv).toUpperCase() === dvCalc.toString();
}
function validarCorreo(c){ return /@(denoise\.[a-z]+|duocuc\.cl)$/i.test(c || ''); }

// ===== Auth middleware =====
function authRequired(req,res,next){
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
  if(!token) return res.status(401).json({error:'Token requerido'});
  try{
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { id, rol, correo, nombre }
    next();
  }catch(e){
    return res.status(401).json({error:'Token inválido'});
  }
}
function adminOnly(req,res,next){
  if(req.user?.rol !== 'Administrador') return res.status(403).json({error:'Solo Administrador'});
  next();
}

// ===== Seed Admin si no existe =====
function ensureAdmin(){
  const exists = users.find(u => u.correo === 'admin@denoise.com');
  if(!exists){
    const hash = bcrypt.hashSync('admin123',10);
    users.push({
      id: 1, nombre: 'Admin', run: '11.111.111-1', correo: 'admin@denoise.com',
      contrasenaHash: hash, rol: 'Administrador'
    });
  }
}
ensureAdmin();

// ===== Health =====
app.get('/api/health', (req,res)=> res.json({ ok:true, ts: Date.now() }));

// ===== Auth =====
app.post('/api/auth/register', (req,res)=>{
  let { nombre, run, correo, contrasena, rol } = req.body || {};
  if(!nombre || !run || !correo || !contrasena) return res.status(400).json({error:'Campos requeridos'});
  if(!validarRUN(run)) return res.status(400).json({error:'RUN inválido'});
  if(!validarCorreo(correo)) return res.status(400).json({error:'Correo debe ser @denoise.* o @duocuc.cl'});
  if(users.some(u => u.correo === correo)) return res.status(409).json({error:'Correo ya registrado'});
  if(users.some(u => normalizarRUN(u.run) === normalizarRUN(run))) return res.status(409).json({error:'RUN ya registrado'});

  // si no es admin el solicitante (no hay token aquí), forzamos rol Cliente
  rol = 'Cliente';
  const id = users.length ? Math.max(...users.map(u=>u.id)) + 1 : 1;
  const contrasenaHash = bcrypt.hashSync(contrasena,10);
  const nuevo = { id, nombre, run, correo, contrasenaHash, rol };
  users.push(nuevo);
  return res.status(201).json({ id, nombre, run, correo, rol });
});

app.post('/api/auth/login', (req,res)=>{
  const { correo, contrasena } = req.body || {};
  const user = users.find(u => u.correo === correo);
  if(!user) return res.status(401).json({error:'Credenciales inválidas'});
  const ok = bcrypt.compareSync(contrasena || '', user.contrasenaHash);
  if(!ok) return res.status(401).json({error:'Credenciales inválidas'});
  const token = jwt.sign({ id:user.id, rol:user.rol, correo:user.correo, nombre:user.nombre }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, user: { id:user.id, nombre:user.nombre, correo:user.correo, rol:user.rol }});
});

app.get('/api/auth/profile', authRequired, (req,res)=>{
  const u = users.find(x => x.id === req.user.id);
  if(!u) return res.status(404).json({error:'No encontrado'});
  res.json({ id:u.id, nombre:u.nombre, correo:u.correo, run:u.run, rol:u.rol });
});

// ===== Users (Admin) =====
app.get('/api/users', authRequired, adminOnly, (req,res)=> res.json(users.map(({contrasenaHash, ...rest})=>rest)));

app.get('/api/users/:id', authRequired, adminOnly, (req,res)=>{
  const u = users.find(x => x.id === Number(req.params.id));
  if(!u) return res.status(404).json({error:'No encontrado'});
  const { contrasenaHash, ...rest } = u;
  res.json(rest);
});

app.post('/api/users', authRequired, adminOnly, (req,res)=>{
  const { nombre, run, correo, contrasena, rol='Cliente' } = req.body || {};
  if(!nombre || !run || !correo || !contrasena) return res.status(400).json({error:'Campos requeridos'});
  if(!validarRUN(run)) return res.status(400).json({error:'RUN inválido'});
  if(users.some(u => u.correo === correo)) return res.status(409).json({error:'Correo ya registrado'});
  if(users.some(u => normalizarRUN(u.run) === normalizarRUN(run))) return res.status(409).json({error:'RUN ya registrado'});
  const id = users.length ? Math.max(...users.map(u=>u.id)) + 1 : 1;
  const contrasenaHash = bcrypt.hashSync(contrasena,10);
  const nuevo = { id, nombre, run, correo, contrasenaHash, rol };
  users.push(nuevo);
  const { contrasenaHash:_, ...rest } = nuevo;
  res.status(201).json(rest);
});

app.put('/api/users/:id', authRequired, adminOnly, (req,res)=>{
  const idx = users.findIndex(x => x.id === Number(req.params.id));
  if(idx === -1) return res.status(404).json({error:'No encontrado'});
  const { nombre, run, correo, rol } = req.body || {};
  if(!nombre || !run || !correo || !rol) return res.status(400).json({error:'Campos requeridos'});
  if(!validarRUN(run)) return res.status(400).json({error:'RUN inválido'});
  users[idx] = { ...users[idx], nombre, run, correo, rol };
  const { contrasenaHash, ...rest } = users[idx];
  res.json(rest);
});

app.patch('/api/users/:id/role', authRequired, adminOnly, (req,res)=>{
  const idx = users.findIndex(x => x.id === Number(req.params.id));
  if(idx === -1) return res.status(404).json({error:'No encontrado'});
  const { rol } = req.body || {};
  if(!rol) return res.status(400).json({error:'Rol requerido'});
  users[idx].rol = rol;
  const { contrasenaHash, ...rest } = users[idx];
  res.json(rest);
});

app.delete('/api/users/:id', authRequired, adminOnly, (req,res)=>{
  const idx = users.findIndex(x => x.id === Number(req.params.id));
  if(idx === -1) return res.status(404).json({error:'No encontrado'});
  const [delu] = users.splice(idx,1);
  const { contrasenaHash, ...rest } = delu;
  res.json(rest);
});

// ===== Blogs =====
app.get('/api/blogs', (req,res)=> res.json(blogs));
app.get('/api/blogs/:id', (req,res)=>{
  const b = blogs.find(x => x.id === Number(req.params.id));
  if(!b) return res.status(404).json({error:'No encontrado'});
  res.json(b);
});
app.post('/api/blogs', authRequired, adminOnly, (req,res)=>{
  const { titulo, autor, resumen, contenido } = req.body || {};
  if(!titulo) return res.status(400).json({error:'Título requerido'});
  const id = blogs.length ? Math.max(...blogs.map(b=>b.id)) + 1 : 1;
  const nuevo = { id, titulo, autor:autor||req.user.nombre, resumen:resumen||'', contenido:contenido||'' };
  blogs.push(nuevo);
  res.status(201).json(nuevo);
});
app.put('/api/blogs/:id', authRequired, adminOnly, (req,res)=>{
  const idx = blogs.findIndex(x => x.id === Number(req.params.id));
  if(idx === -1) return res.status(404).json({error:'No encontrado'});
  const { titulo, autor, resumen, contenido } = req.body || {};
  blogs[idx] = { ...blogs[idx], titulo, autor, resumen, contenido };
  res.json(blogs[idx]);
});
app.delete('/api/blogs/:id', authRequired, adminOnly, (req,res)=>{
  const idx = blogs.findIndex(x => x.id === Number(req.params.id));
  if(idx === -1) return res.status(404).json({error:'No encontrado'});
  const [delb] = blogs.splice(idx,1);
  res.json(delb);
});

// ===== Models =====
app.get('/api/models', (req,res)=> res.json(models));
app.get('/api/models/:id', (req,res)=>{
  const m = models.find(x => x.id === req.params.id);
  if(!m) return res.status(404).json({error:'No encontrado'});
  res.json(m);
});

// ===== Contact =====
app.post('/api/contact', (req,res)=>{
  const { nombre, correo, mensaje } = req.body || {};
  if(!nombre || !correo || !mensaje) return res.status(400).json({error:'Campos requeridos'});
  const item = { id: uuid(), nombre, correo, mensaje, ts: Date.now() };
  messages.push(item);
  res.status(201).json({ ok:true, recibido: item.id });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`API escuchando en http://localhost:${PORT}`));
