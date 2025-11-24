# ERS – Especificación de Requisitos de Software (Denoise – Bluetech AI)

## 1. Introducción
**Propósito:** Definir los requisitos funcionales y no funcionales de la SPA de Denoise.  
**Ámbito:** Sitio web público con secciones Home, Nosotros, Blogs, Contacto; autenticación; CRUD de usuarios con roles y validaciones.  
**Definiciones:** RUN (RUT) chileno, Bluetech, CRUD, SPA.

## 2. Descripción General
**Perspectiva:** Frontend React sin backend; persistencia en LocalStorage.  
**Usuarios:** Administrador, Vendedor, Cliente.  
**Restricciones:** Uso de React, Bootstrap, validaciones JS, pruebas Jasmine/Karma.  
**Suposiciones:** Admin inicial pre-cargado (admin@denoise.com / admin123).

## 3. Requisitos Específicos
### 3.1 Requisitos Funcionales (RF)
- **RF1**: Registrar usuarios (Nombre, RUN, Correo, Contraseña). Rol por defecto: Cliente.
- **RF2**: Validar RUN (módulo 11) y correos solo @denoise.* o @duocuc.*
- **RF3**: Iniciar/Cerrar sesión.
- **RF4**: Panel Admin con CRUD de usuarios (crear, listar, editar, eliminar).
- **RF5**: Rutas públicas: Home, Nosotros (DenoiseSH, DenoQ, Oddie), Blogs (>=2), Contacto.
- **RF6**: Proteger ruta /admin para Administrador.
- **RF7**: SPA con navegación sin recarga.

### 3.2 Requisitos No Funcionales (RNF)
- **RNF1**: Diseño responsivo (Bootstrap).
- **RNF2**: Componentización estilo Atomic Design.
- **RNF3**: Código y UI en español.
- **RNF4**: Pruebas unitarias con Jasmine/Karma en carpeta separada.
- **RNF5**: Persistencia local (LocalStorage).
- **RNF6**: Semilla de usuario administrador disponible.

## 4. Interfaces
- **UI:** Navbar superior, contenido central, footer.  
- **Software:** React, react-router-dom, Bootstrap; Jasmine/Karma para testing.

## 5. Criterios de Aceptación
- Registro válido solo con @denoise.* o @duocuc.* y RUN válido.
- Acceso a /admin solo para Administrador autenticado.
- CRUD de usuarios operativo (alta, modificación, baja).
- Pruebas unitarias ejecutables con Karma (ChromeHeadless), pasando validaciones clave.
