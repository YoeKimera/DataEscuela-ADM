# API Contract (lite)

Base URL (Apps Script Web App):

`https://script.google.com/macros/s/TU_DEPLOYMENT_ID/exec`

## Respuesta estándar

```json
{
  "success": true,
  "data": {},
  "error": null,
  "meta": {
    "requestId": "abc123",
    "timestamp": "2026-05-11T03:00:00Z"
  }
}
```

## GET health

Request:

`GET /exec?action=health`

Response data:

```json
{
  "service": "DataEscuela-API",
  "status": "ok",
  "version": "v1"
}
```

## POST login (stub inicial)

Request body:

```json
{
  "action": "login",
  "username": "usuario",
  "password": "secreto"
}
```

Response data:

```json
{
  "token": "jwt-o-token-propio",
  "user": {
    "id": "123",
    "name": "Nombre Apellido",
    "role": "admin"
  }
}
```
