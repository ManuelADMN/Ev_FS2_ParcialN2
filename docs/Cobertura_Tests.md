# Cobertura de Testing (Jasmine/Karma)

## Alcance
- **Validaciones:** RUN (módulo 11), correo corporativo/educativo (dominios @denoise.* y @duocuc.*).
- **Roles:** Verificación de `esAdmin(rol)`.
- **CRUD + Auth (mock):** agregar, actualizar, eliminar, login y logout.
- **DOM helper:** `setError`.

## Casos ejecutados (14)
1. RUN válido
2. RUN con DV incorrecto
3. RUN con formato inválido
4. Correo dominios válidos
5. Correo dominios inválidos
6. Contraseña con más de 8 caracteres
7. Contraseña con menos de 8 caracteres
8. esAdmin por rol
9. CRUD: agregar usuario
10. CRUD: actualizar usuario
11. CRUD: eliminar usuario
12. Auth: login/logout
13. DOM: setError marca/limpia

## Resultados esperados
- Todas las pruebas pasan en ChromeHeadless vía Karma.
- Las funciones principales de validación, permisos y lógica básica están cubiertas.
