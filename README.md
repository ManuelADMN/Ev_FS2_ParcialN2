# Denoise – Bluetech AI (React + Webpack)

Aplicación SPA en **React** para **Denoise** (Ciencia de Datos e IA, foco Bluetech). Incluye:
- Páginas: Home, Nosotros (DenoiseSH, DenoQ, Oddie), Blogs (>=2), Contacto, Tests (Verificación de test's aplicados).
- Autenticación (Login/Logout) y **CRUD de usuarios** con **roles** (Administrador, Vendedor, Cliente).
- **Validaciones**: RUN (módulo 11) y **correos solo** `@denoise.*` o `@duocuc.*`.
- Diseño **responsivo** (Bootstrap) y componentes estilo Atomic Design.
- **Pruebas unitarias** con **Jasmine/Karma** en carpeta separada (`/tests`).

## Requisitos
- Node.js 18+ y Google Chrome (para ChromeHeadless en pruebas).

## Instalación y ejecución (App React)
```bash
npm install
npm run dev        # abre http://localhost:5173
npm run build      # genera /dist
npm run preview    # sirve /dist
```

## Credenciales de ejemplo
- **Administrador**: `admin@denoise.com` / `admin123`

## Estructura
```
/src (React)
  /components (atoms, molecules, organisms, pages)
  /context (AuthContext)
  /routes (RutaPrivada)
  /utils (validaciones, almacenamiento, datosBlogs)
/tests (Jasmine + Karma, aislado)
/docs (ERS y cobertura de tests)
```

## Pruebas (Jasmine/Karma)
```bash
cd tests
npm install
npm test
```
