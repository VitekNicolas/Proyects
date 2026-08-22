# E-commerce Web Application — Backend

API REST para la gestión de clientes, productos, carritos y órdenes de compra de un e-commerce, desarrollada en **.NET 10** con **Entity Framework Core** y arquitectura por capas (Clean Architecture).

## Stack técnico

- **.NET 10** / C# 14
- **ASP.NET Core Web API**
- **Entity Framework Core 10** (SQLite)
- **JWT Bearer** para autenticación
- **BCrypt.Net-Next** para hash de contraseñas
- **Swagger / Swashbuckle** para documentación interactiva
- **Docker** para despliegue local

## Arquitectura

El proyecto sigue una arquitectura por capas, con separación de responsabilidades:

```
Backend/
├── Dockerfile                  # Build multi-stage de la API
├── Domain/                    # Entidades del negocio (Client, Product, Cart, Order, ProductCart)
├── Application/                # Casos de uso, interfaces, DTOs, excepciones de negocio
│   ├── Interface/               # Contratos (Query/Command/Service)
│   ├── UserCase/                 # Implementación de la lógica de negocio
│   ├── Models/                   # DTOs de entrada (Request)
│   ├── Response/                 # DTOs de salida (Response)
│   └── Exceptions/                # Excepciones de dominio propias
├── Infraesctructure/           # Acceso a datos (EF Core), implementación de Queries/Commands
│   ├── Persistence/               # DbContext y factory
│   ├── Query/                     # Lecturas a la base de datos
│   ├── Command/                   # Escrituras a la base de datos
│   └── Migrations/                # Migraciones de EF Core
└── TP1-REST-Vitek_Nicolas/     # Capa de presentación (API)
    ├── Controllers/                # Endpoints REST
    ├── Extensions/                 # Extensiones (lectura de claims del JWT)
    └── Services/                   # Generación de tokens JWT
```

Cada capa depende únicamente de la capa inmediatamente inferior (`API → Application → Domain`, con `Infraesctructure` implementando las interfaces definidas en `Application`), lo que permite testear la lógica de negocio de forma aislada de la base de datos.

## Puesta en marcha con Docker (recomendado)

Esta es la forma principal de correr el proyecto — no requiere instalar el SDK de .NET localmente.

### Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/), con virtualización habilitada (WSL2 en Windows).

### Levantar el proyecto completo (backend + frontend)

El `docker-compose.yml` vive en la **raíz del repositorio** (un nivel arriba de `Backend/`), y levanta ambos servicios juntos. Parado ahí:

```bash
docker compose up --build
```

> En Windows, si el build falla con `failed to read dockerfile: open Dockerfile: no such file or directory` debido al motor "Bake" de Docker Compose, desactivalo para esa sesión de terminal:
> ```cmd
> set COMPOSE_BAKE=false
> docker compose up --build
> ```
> (en PowerShell: `$env:COMPOSE_BAKE="false"`)

La API queda disponible en `http://localhost:7062`, y Swagger en `http://localhost:7062/swagger`.

**La base de datos se crea y migra automáticamente** al arrancar el contenedor (`db.Database.Migrate()` en `Program.cs`) — no hace falta correr ningún comando de EF Core manualmente. Los datos persisten entre reinicios gracias al volumen `ecommerce_data` definido en el compose.

Para parar todo:
```bash
docker compose down
```
(agregar `-v` al final solo si además querés borrar la base de datos y empezar de cero)

Para ver los logs del backend en vivo:
```bash
docker compose logs -f backend
```

## Puesta en marcha sin Docker (desarrollo local)

Si preferís correr la API directamente con el SDK de .NET (por ejemplo, para debuggear paso a paso desde el IDE):

### Requisitos previos

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)

### Pasos

1. **Restaurá las dependencias:**
   ```bash
   dotnet restore
   ```

2. **Configurá la clave de JWT** en `TP1-REST-Vitek_Nicolas/appsettings.Development.json`:
   ```json
   {
     "Jwt": {
       "Key": "una-clave-secreta-de-al-menos-32-caracteres",
       "Issuer": "EcommerceApi",
       "Audience": "EcommerceApiUsers",
       "ExpiresInMinutes": "120"
     }
   }
   ```
   > ⚠️ La clave debe tener como mínimo 32 caracteres. No debe versionarse en texto plano en un entorno productivo.

3. **Corré la API** (las migraciones se aplican automáticamente al arrancar, igual que en Docker):
   ```bash
   cd TP1-REST-Vitek_Nicolas
   dotnet run
   ```

4. Abrí Swagger UI en la URL que indique la consola (por ejemplo `https://localhost:7062/swagger`).

## Autenticación

La API usa **JWT Bearer**. El flujo es:

1. El cliente se registra en `POST /api/auth/register` (o inicia sesión en `POST /api/auth/login`).
2. La respuesta incluye un `token`.
3. Ese token se envía en el header `Authorization: Bearer {token}` en cada request a un endpoint protegido.
4. El `clientId` del usuario se extrae del token — **nunca se toma de lo que envía el cliente en el body o la URL**, para evitar que un usuario opere sobre datos de otro.

En Swagger UI, hacé clic en el botón **Authorize** (🔒) y pegá el token (sin el prefijo `Bearer`, Swagger lo agrega automáticamente).

## Endpoints principales

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| `POST` | `/api/auth/register` | No | Registra un cliente nuevo (crea también su carrito) y devuelve un token |
| `POST` | `/api/auth/login` | No | Inicia sesión y devuelve un token |
| `GET` | `/api/cart` | ✅ | Carrito activo del cliente autenticado, con productos y total |
| `POST` | `/api/productcart` | ✅ | Agrega un producto al carrito (suma cantidad si ya estaba agregado) |
| `PATCH` | `/api/productcart` | ✅ | Actualiza la cantidad de un producto en el carrito |
| `DELETE` | `/api/productcart/{productId}` | ✅ | Quita un producto del carrito |
| `POST` | `/api/order` | ✅ | Confirma la compra, crea la orden y abre un carrito nuevo |
| `GET` | `/api/order/my-orders` | ✅ | Historial de órdenes del cliente autenticado |
| `GET` | `/api/order?from=&to=` | No | Reporte administrativo de ventas por rango de fechas |
| `GET` | `/api/product?name=&sort=` | No | Lista productos (filtro y orden opcionales) |
| `GET` | `/api/product/{id}` | No | Detalle de un producto |
| `GET` | `/api/client/{id}` | No | Datos de un cliente por ID |

La documentación completa e interactiva de cada endpoint está disponible en Swagger UI.

## Modelo de datos

- **Client**: datos personales + credenciales de acceso (`Email`, `PasswordHash`).
- **Cart**: carrito de un cliente. `Status = true` indica carrito activo (abierto); se cierra (`false`) al confirmar una orden, y se crea uno nuevo automáticamente.
- **Product**: catálogo de productos (precargado vía seed data).
- **ProductCart**: tabla intermedia entre `Cart` y `Product` (clave compuesta), con la cantidad de cada producto.
- **Order**: orden de compra generada a partir de un carrito cerrado, con el total calculado.

## Notas de diseño

- Los precios y totales usan `decimal` (no `double`) para evitar errores de redondeo en cálculos monetarios.
- Las contraseñas se almacenan hasheadas con BCrypt; nunca en texto plano.
- Cada cliente tiene un carrito activo en todo momento: se crea al registrarse, y se renueva automáticamente después de cada compra.
- Las migraciones de EF Core se aplican automáticamente al iniciar la aplicación (`Database.Migrate()`), tanto en Docker como en desarrollo local — no requiere pasos manuales.