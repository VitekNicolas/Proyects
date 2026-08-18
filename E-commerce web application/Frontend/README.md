# E-commerce Web Application — Frontend

Interfaz web del e-commerce, desarrollada en **JavaScript vanilla (ES6)** con clases, sin frameworks. Consume la API REST del backend con autenticación JWT.

## Stack técnico

- HTML5 / CSS3
- JavaScript ES6 (módulos nativos, clases)
- Sin frameworks ni bundlers — se sirve como archivos estáticos

## Diseño

Sistema visual "Vidriera nocturna": fondo oscuro con acentos cian y ámbar, evocando la vidriera de un almacén de noche con el cartel de neón prendido. Tipografía `Space Grotesk` para títulos/marca, `Inter` para el resto.

## Arquitectura

```
Frontend/
├── index.html              # Dashboard: productos, carrito, historial (requiere login)
├── login.html               # Punto de entrada: login y registro
├── css/
│   ├── app.css                # Estilos del dashboard
│   └── login.css               # Estilos de login/registro
└── js/
    ├── app.js                # Punto de entrada de index.html
    ├── auth-guard.js          # Redirige a login.html si no hay sesión
    ├── api/
    │   └── ApiClient.js         # fetch centralizado, header Authorization automático,
    │                             # limpieza de $id/$values de EF Core, manejo de 401
    ├── services/                # Un servicio por recurso del backend
    │   ├── AuthService.js
    │   ├── ProductService.js
    │   ├── CartService.js
    │   └── OrderService.js
    ├── components/               # Piezas de UI reutilizables
    │   ├── ProductCard.js
    │   ├── CartItemRow.js
    │   └── InvoiceModal.js
    ├── pages/                     # Una clase por sección/vista
    │   ├── LoginPage.js
    │   ├── ProductsPage.js
    │   ├── CartPage.js
    │   └── OrdersPage.js
    └── utils/
        └── toast.js                # Notificaciones breves no bloqueantes
```

Cada `Service` es responsable de un único recurso del backend y no conoce el DOM. Cada `Page`/`Component` conoce el DOM pero no arma URLs ni fetches directamente — siempre pasa por un `Service`. `ApiClient` es la única clase que sabe hablar HTTP con el backend.

## Requisitos previos

- El [backend](../Backend/README.md) corriendo localmente (por defecto en `https://localhost:7062`).
- Un servidor de archivos estáticos. Cualquiera de estas opciones funciona:
  - **Live Server** (extensión de VS Code)
  - **live-server** (paquete de npm, con auto-reload):
    ```bash
    npm install -g live-server
    ```
  - **http-server** (paquete de npm, sin auto-reload):
    ```bash
    npm install -g http-server
    ```

## Puesta en marcha

1. Verificá que el backend esté corriendo y que `ApiClient.baseUrl` (en `js/api/ApiClient.js`) apunte a la URL correcta:
   ```javascript
   static baseUrl = "https://localhost:7062/api";
   ```

2. Levantá el frontend, parado en la carpeta `Frontend/`:
   ```bash
   live-server --port=5500
   ```
   o, con Live Server de VS Code, clic derecho sobre `index.html` → "Open with Live Server".

3. El navegador va a abrir en `http://127.0.0.1:5500` (o `http://localhost:5500`, según el servidor que uses). Como no hay sesión iniciada, `auth-guard.js` va a redirigir automáticamente a `login.html`.

   > ⚠️ El backend tiene CORS configurado para aceptar tanto `http://localhost:5500` como `http://127.0.0.1:5500`. Si servís el frontend en otro puerto u origen, hay que agregarlo en `Program.cs` del backend (`WithOrigins(...)`).

## Flujo de la aplicación

1. **`login.html`** — el usuario se registra o inicia sesión. La respuesta del backend incluye un JWT, que se guarda en `localStorage` junto con los datos básicos del cliente (nombre, apellido — nunca la contraseña).
2. Al loguearse, redirige a **`index.html`**, protegido por `auth-guard.js`.
3. **Productos**: catálogo con búsqueda y orden por precio. Agregar un producto ya existente en el carrito suma la cantidad, no falla.
4. **Carrito**: lista editable (sumar/restar/quitar), sincronizada en tiempo real contra el backend — no se guarda copia local del carrito.
5. **Confirmar compra**: crea la orden, muestra un resumen tipo factura, y limpia el carrito (el backend abre uno nuevo automáticamente).
6. **Mis compras**: historial de órdenes propias del cliente, agrupadas por fecha, con detalle expandible.

## Sobre `localStorage`

Solo se usa para dos cosas, ambas livianas y no sensibles:
- El **token JWT**, para no requerir login en cada recarga de página.
- Los **datos básicos del cliente** (nombre/apellido), para mostrarlos en la barra de navegación sin pedirlos de nuevo al backend.

El carrito **no** vive en `localStorage` — es siempre una consulta en vivo a `GET /api/cart`, para evitar desincronización entre pestañas o dispositivos.

## Autenticación

Todas las rutas del dashboard requieren sesión iniciada. `ApiClient` agrega automáticamente el header `Authorization: Bearer {token}` en cada request. Si el backend responde `401` (token vencido o inválido), `ApiClient` limpia la sesión y redirige a `login.html` sin intervención manual del resto del código.

## Notas de diseño

- Sin frameworks: cada `Page`/`Component` es una clase ES6 que renderiza su propio fragmento de DOM y expone callbacks (`onAdd`, `onUpdate`, `onRemove`) para comunicarse con quien la instancia.
- Botón "Agregar al carrito" en estilo *outline* (cian) para distinguirlo visualmente del CTA principal "Confirmar compra" (ámbar sólido) — evita que ambos compitan por la misma jerarquía visual.
- Los inputs de cantidad ocultan las flechas nativas del navegador (`type="number"`) en favor de los propios controles +/-, para mantener el texto centrado y el estilo consistente.
