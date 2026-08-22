# E-commerce Web Application — Frontend

Interfaz web del e-commerce, desarrollada en **JavaScript vanilla (ES6)** con clases, sin frameworks. Consume la API REST del backend con autenticación JWT.

## Stack técnico

- HTML5 / CSS3
- JavaScript ES6 (módulos nativos, clases)
- Sin frameworks ni bundlers — se sirve como archivos estáticos
- **nginx** + **Docker** para despliegue local

## Diseño

Sistema visual "Vidriera nocturna": fondo oscuro con acentos cian y ámbar, evocando la vidriera de un almacén de noche con el cartel de neón prendido. Tipografía `Space Grotesk` para títulos/marca, `Inter` para el resto.

## Arquitectura

```
Frontend/
├── Dockerfile               # Imagen nginx sirviendo los archivos estáticos
├── index.html               # Dashboard: productos, carrito, historial (requiere login)
├── login.html                # Punto de entrada: login y registro
├── css/
│   ├── app.css                 # Estilos del dashboard
│   └── login.css                # Estilos de login/registro
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

## Puesta en marcha con Docker (recomendado)

Esta es la forma principal de correr el proyecto.

### Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/), con virtualización habilitada (WSL2 en Windows).

### Levantar el proyecto completo (frontend + backend)

El `docker-compose.yml` vive en la **raíz del repositorio** (un nivel arriba de `Frontend/`) y levanta ambos servicios juntos. Parado ahí:

```bash
docker compose up --build
```

> En Windows, si el build falla por el motor "Bake" de Docker Compose, desactivalo para esa sesión de terminal:
> ```cmd
> set COMPOSE_BAKE=false
> docker compose up --build
> ```

El frontend queda disponible en `http://localhost:5500`. Como no hay sesión iniciada la primera vez, redirige automáticamente a `login.html` — usá la pestaña **"Crear cuenta"** para registrar tu primer cliente (la base arranca sin clientes precargados, solo con el catálogo de productos).

Para parar todo:
```bash
docker compose down
```

## Puesta en marcha sin Docker (desarrollo local)

Si preferís servir los archivos estáticos directamente:

### Requisitos previos

- El [backend](../Backend/README.md) corriendo localmente (por defecto en `http://localhost:7062` — ver nota sobre HTTP más abajo).
- Un servidor de archivos estáticos:
  - **Live Server** (extensión de VS Code), o
  - **live-server** (paquete de npm):
    ```bash
    npm install -g live-server
    ```

### Pasos

1. Verificá que `ApiClient.baseUrl` (en `js/api/ApiClient.js`) apunte a la URL correcta del backend.
2. Levantá el frontend, parado en la carpeta `Frontend/`:
   ```bash
   live-server --port=5500
   ```
   o, con Live Server de VS Code, clic derecho sobre `index.html` → "Open with Live Server".

   > ⚠️ El backend acepta CORS tanto desde `http://localhost:5500` como `http://127.0.0.1:5500`. Si servís en otro puerto u origen, hay que agregarlo en `Program.cs` del backend (`WithOrigins(...)`).

## Flujo de la aplicación

1. **`login.html`** — el usuario se registra o inicia sesión. La respuesta del backend incluye un JWT, que se guarda en `localStorage` junto con los datos básicos del cliente (nombre, apellido — nunca la contraseña).
2. Al loguearse, redirige a **`index.html`**, protegido por `auth-guard.js`.
3. **Productos**: catálogo con búsqueda y orden por precio. Agregar un producto ya existente en el carrito suma la cantidad, no falla.
4. **Carrito**: lista editable (sumar/restar/quitar), sincronizada en tiempo real contra el backend — no se guarda copia local del carrito.
5. **Confirmar compra**: crea la orden, muestra un resumen tipo factura, y abre un carrito nuevo automáticamente.
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