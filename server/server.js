import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security and Middleware
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// ===== In-Memory Data =====
const users = []; // { id, name, email, passwordHash, role, status, run }
const blogs = [
  { id: 1, title: 'Welcome to Denoise', author: 'Team', summary: 'Summary', content: 'Initial content' }
];
const models = [
  { id: 'denoise-sh', name: 'DenoiseSH', description: 'Salmon Health AI' },
  { id: 'denoq', name: 'DenoQ', description: 'Data Quality' },
  { id: 'oddie', name: 'Oddie', description: 'AI Orchestrator' }
];
const messages = [];

// ===== Helpers =====
function normalizeRUN(rut) { return rut?.toString().replace(/\./g, '').replace(/-/g, '').toUpperCase() || ''; }
function dvRUN(num) {
  let M = 0, S = 1; for (; num; num = Math.floor(num / 10)) S = (S + num % 10 * (9 - M++ % 6)) % 11;
  return S ? S - 1 : 'K';
}
function validateRUN(fullRut) {
  const clean = normalizeRUN(fullRut);
  const body = clean.slice(0, -1), dv = clean.slice(-1);
  if (!/^\d+$/.test(body)) return false;
  const dvCalc = String(dvRUN(parseInt(body, 10)));
  return String(dv).toUpperCase() === dvCalc.toString();
}
function validateEmail(c) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c || ''); } // Simplified regex

// ===== Auth Middleware =====
function authRequired(req, res, next) {
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Token required' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { id, role, email, name }
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
function adminOnly(req, res, next) {
  if (req.user?.role !== 'Admin') return res.status(403).json({ error: 'Admin only' });
  next();
}

// ===== Seed Admin =====
function ensureAdmin() {
  const exists = users.find(u => u.email === 'admin@denoise.com');
  if (!exists) {
    const hash = bcrypt.hashSync('admin123', 10);
    users.push({
      id: 1, name: 'Admin', email: 'admin@denoise.com',
      passwordHash: hash, role: 'Admin', status: 'Active', run: '11111111-1'
    });
  }
}
ensureAdmin();

// ===== Health =====
app.get('/api/health', (req, res) => res.json({ ok: true, ts: Date.now() }));

// ===== Auth =====
app.post('/api/auth/register', (req, res) => {
  let { name, email, password, role, run } = req.body || {};

  if (!name || !email || !password) return res.status(400).json({ error: 'Missing required fields' });

  // Optional RUN validation if provided
  if (run && !validateRUN(run)) return res.status(400).json({ error: 'Invalid RUN' });

  if (!validateEmail(email)) return res.status(400).json({ error: 'Invalid email format' });
  if (users.some(u => u.email === email)) return res.status(409).json({ error: 'Email already registered' });

  // Default role User
  role = 'User';
  const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const passwordHash = bcrypt.hashSync(password, 10);

  const newUser = { id, name, email, passwordHash, role, status: 'Active', run: run || '' };
  users.push(newUser);

  const { passwordHash: _, ...userResponse } = newUser;
  return res.status(201).json(userResponse);
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  console.log('Login attempt:', email, password);
  const user = users.find(u => u.email === email);
  if (!user) {
    console.log('User not found');
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const ok = bcrypt.compareSync(password || '', user.passwordHash);
  if (!ok) {
    console.log('Password mismatch');
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, role: user.role, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '8h' });
  console.log('Login success for:', user.email);

  const { passwordHash: _, ...userResponse } = user;
  res.json({ token, user: userResponse });
});

app.get('/api/auth/profile', authRequired, (req, res) => {
  const u = users.find(x => x.id === req.user.id);
  if (!u) return res.status(404).json({ error: 'Not found' });
  const { passwordHash: _, ...rest } = u;
  res.json(rest);
});

// ===== Users (Admin) =====
app.get('/api/users', authRequired, adminOnly, (req, res) => {
  console.log('GET /api/users called by', req.user.email);
  res.json(users.map(({ passwordHash, ...rest }) => rest));
});

app.get('/api/users/:id', authRequired, adminOnly, (req, res) => {
  const u = users.find(x => x.id === Number(req.params.id));
  if (!u) return res.status(404).json({ error: 'Not found' });
  const { passwordHash, ...rest } = u;
  res.json(rest);
});

app.post('/api/users', authRequired, adminOnly, (req, res) => {
  console.log('POST /api/users called', req.body);
  const { name, email, password, role = 'User', run } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
  if (users.some(u => u.email === email)) return res.status(409).json({ error: 'Email exists' });

  const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const passwordHash = bcrypt.hashSync(password, 10);
  const newUser = { id, name, email, passwordHash, role, status: 'Active', run: run || '' };
  users.push(newUser);
  const { passwordHash: _, ...rest } = newUser;
  console.log('User created:', newUser);
  res.status(201).json(rest);
});

app.put('/api/users/:id', authRequired, adminOnly, (req, res) => {
  const idx = users.findIndex(x => x.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });

  const { name, email, role, status, password } = req.body || {};

  // Prepare update object
  const updateData = { ...users[idx], name, email, role, status };

  // Only update password if provided and not empty
  if (password && password.trim() !== '') {
    updateData.passwordHash = bcrypt.hashSync(password, 10);
  }

  users[idx] = updateData;

  const { passwordHash, ...rest } = users[idx];
  res.json(rest);
});

app.delete('/api/users/:id', authRequired, adminOnly, (req, res) => {
  const idx = users.findIndex(x => x.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const [delu] = users.splice(idx, 1);
  const { passwordHash, ...rest } = delu;
  res.json(rest);
});

// ===== Blogs =====
app.get('/api/blogs', (req, res) => res.json(blogs));

// ===== Extra Data (Projects, Team, System) =====
const projects = [
  {
    title: "Análisis Acuícola con IA",
    description: "Optimizamos la salmonicultura mediante modelos de IA que analizan la biomasa, detectan enfermedades tempranamente y mejoran la alimentación. Aumente su eficiencia y sostenibilidad con datos precisos en tiempo real.",
    icon: "ChartPieIcon",
    projectName: "DenoQ"
  },
  {
    title: "Monitoreo Ambiental Minero",
    description: "Ofrecemos soluciones de IA para evaluar y predecir el impacto ambiental de proyectos mineros. Monitoree la calidad del agua, aire y suelo para garantizar el cumplimiento normativo y una operación responsable.",
    icon: "CircleStackIcon",
    projectName: "DenoM"
  },
  {
    title: "Gestión Sostenible de Recursos",
    description: "Nuestros modelos predictivos le ayudan a gestionar recursos naturales de forma eficiente. Analizamos variables complejas para anticipar cambios y optimizar el uso de recursos, promoviendo un futuro sostenible.",
    icon: "GlobeEuropeAfricaIcon",
    projectName: "DenoR"
  }
];

const team = [
  {
    id: 'guillermo-cerda',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
    name: 'Guillermo Cerda',
    title: 'Estratega de Tecnología',
    followers: 420,
    posts: 35,
    bio: 'Lidera la visión técnica de Denoise. 15+ años diseñando sistemas distribuidos y arquitecturas cloud resilientes. Su enfoque combina la robustez de la ingeniería tradicional con la agilidad de los nuevos paradigmas de IA.',
    skills: ['Cloud Architecture', 'IoT Systems', 'Strategic Leadership', 'Kubernetes']
  },
  {
    id: 'manuel-diaz',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
    name: 'Manuel Diaz',
    title: 'Científico de Datos Principal',
    followers: 385,
    posts: 52,
    bio: 'PhD MIT. Especialista en Deep Learning y reconocimiento de patrones biológicos. Manuel transforma el caos de los datos no estructurados en modelos predictivos de alta precisión, liderando la investigación fundamental de Denoise.',
    skills: ['Deep Learning', 'Computer Vision', 'Predictive Modeling', 'Python']
  },
  {
    id: 'diego-aravena',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
    name: 'Diego Aravena',
    title: 'Desarrollador Full Stack Senior',
    followers: 290,
    posts: 28,
    bio: 'Experto en React y visualización de datos con D3.js. Diego es el arquitecto detrás de nuestras interfaces, asegurando que la complejidad de los datos procesados se traduzca en una experiencia de usuario intuitiva y fluida.',
    skills: ['React', 'D3.js', 'UX/UI Design', 'Node.js']
  }
];

app.get('/api/projects', (req, res) => res.json(projects));
app.get('/api/team', (req, res) => res.json(team));
app.get('/api/system/status', (req, res) => res.json({ status: "OPERATIONAL", uptime: "99.98%", timestamp: new Date().toISOString() }));
app.get('/api/sensors', (req, res) => {
  const data = Array.from({ length: 5 }, (_, i) => ({ id: `sensor-${i}`, val: Math.random() * 100, unit: "ppm" }));
  res.json(data);
});

// ===== Contact =====
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });
  const item = { id: uuidv4(), name, email, message, ts: Date.now() };
  messages.push(item);
  res.status(201).json({ ok: true, id: item.id });
});

// ===== Static Files =====
app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
