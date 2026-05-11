# DataEscuela-ADM

Frontend en GitHub + backend en Google Apps Script (API Web App).

## Objetivo

Separar responsabilidades:

- Frontend: repositorio GitHub (versionado, PRs, issues, CI/CD).
- Backend: Apps Script como API HTTP (datos, auth, lógica con Sheets/Drive).

## Estructura inicial

- `frontend/` UI estática para GitHub Pages.
- `api-contract/` contrato de endpoints y formato de respuestas.

## Primeros pasos

1. Configurar URL de API en `frontend/config.js`.
2. Publicar `frontend/` con GitHub Pages.
3. Implementar endpoints mínimos en Apps Script:
   - `GET ?action=health`
   - `POST { action: "login" }`

## Flujo recomendado con Git

1. Crear rama por feature: `feature/nombre-corto`.
2. Commits chicos y descriptivos.
3. Pull request hacia `main` con checklist de pruebas.
4. Release por tags (`v0.1.0`, `v0.2.0`, ...).

## Próximo sprint sugerido

1. Autenticación básica (token simple o sesión).
2. Módulo de listado de inspectores.
3. Módulo de labores (consulta + alta).
4. Manejo global de errores API en frontend.
