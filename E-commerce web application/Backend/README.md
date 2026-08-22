# E-commerce Web Application — Backend

API REST para la gestión de clientes, productos, carritos y órdenes de compra de un e-commerce, desarrollada en **.NET 10** con **Entity Framework Core** y arquitectura por capas (Clean Architecture).

## Stack técnico

- **.NET 10** / C# 14
- **ASP.NET Core Web API**
- **Entity Framework Core 10** (SQLite)
- **JWT Bearer** para autenticación
- **BCrypt.Net-Next** para hash de contraseñas
- **Swagger / Swashbuckle** para documentación interactiva

## Arquitectura

El proyecto sigue una arquitectura por capas, con separación de responsabilidades:

```
Backend/
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

## Requisitos previos

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- Un editor/IDE (Visual Studio 2022+, Rider o VS Code)

## Puesta en marcha

1. **Cloná el repositorio** y ubicate en la carpeta `Backend`.

2. **Restaurá las dependencias:**
   ```bash
   dotnet restore
   ```

3. **Configurá la clave de JWT** en `TP1-REST-Vitek_Nicolas/appsettings.Development.json`:
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
   > ⚠️ La clave debe tener como mínimo 32 caracteres. En un entorno productivo, no debe versionarse en texto plano — usar variables de entorno o un gestor de secretos.

4. **Aplicá las migraciones** para crear la base de datos SQLite (se genera automáticamente en `TP1-REST-Vitek_Nicolas/ecommerce_db.db`):
   ```bash
   cd TP1-REST-Vitek_Nicolas
   dotnet ef database update --project ../Infraesctructure --startup-project .
   ```

5. **Corré la API:**
   ```bash
   dotnet run
   ```

6. Abrí Swagger UI en la URL que indique la consola (por ejemplo `https://localhost:7062/swagger`) para explorar y probar los endpoints.

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
| `POST` | `/api/productcart` | ✅ | Agrega un producto al carrito |
| `PATCH` | `/api/productcart` | ✅ | Actualiza la cantidad de un producto en el carrito |
| `DELETE` | `/api/productcart/{productId}` | ✅ | Quita un producto del carrito |
| `POST` | `/api/order` | ✅ | Confirma la compra y crea la orden a partir del carrito activo |
| `GET` | `/api/order/my-orders` | ✅ | Historial de órdenes del cliente autenticado |
| `GET` | `/api/order?from=&to=` | No | Reporte administrativo de ventas por rango de fechas |
| `GET` | `/api/product?name=&sort=` | No | Lista productos (filtro y orden opcionales) |
| `GET` | `/api/product/{id}` | No | Detalle de un producto |
| `GET` | `/api/client/{id}` | No | Datos de un cliente por ID |

La documentación completa e interactiva de cada endpoint (parámetros, modelos de request/response, códigos de error) está disponible en Swagger UI una vez que la API está corriendo.

## Modelo de datos

- **Client**: datos personales + credenciales de acceso (`Email`, `PasswordHash`).
- **Cart**: carrito de un cliente. `Status = true` indica carrito activo (abierto); se cierra (`false`) al confirmar una orden.
- **Product**: catálogo de productos.
- **ProductCart**: tabla intermedia entre `Cart` y `Product` (clave compuesta), con la cantidad de cada producto.
- **Order**: orden de compra generada a partir de un carrito cerrado, con el total calculado.

## Notas de diseño

- Los precios y totales usan `decimal` (no `double`) para evitar errores de redondeo en cálculos monetarios.
- Las contraseñas se almacenan hasheadas con BCrypt; nunca en texto plano.
- Cada cliente tiene un único carrito activo a la vez; se crea automáticamente al registrarse.