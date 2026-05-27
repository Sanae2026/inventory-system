# Arquitectura del sistema

## Diagrama de capas

Navegador (React)
├── Estado de UI: Zustand         → filtros, búsqueda, sidebar
└── Estado del servidor: TanStack Query → productos, categorías
Servidor (Next.js App Router)
├── API Routes (/api/*)           → endpoints REST con Prisma
└── Server Components             → páginas renderizadas en servidor
Base de datos (PostgreSQL / Neon)
├── categories                    → catálogo de categorías
└── products                      → productos con precio, stock y categoría

## Por qué Next.js sin Express separado

Con Next.js App Router, las API Routes viven en el mismo proyecto que
los componentes de React. No necesitas un servidor Express separado porque:

- Las rutas en `src/app/api/` son endpoints HTTP reales que se despliegan
  como funciones serverless en Vercel.
- El mismo repositorio gestiona frontend y backend, simplificando el
  despliegue y las variables de entorno.
- No hay CORS que configurar porque frontend y API comparten el mismo dominio.

## Modelo de datos

### Por qué `price` usa Decimal y no Float

`Float` tiene imprecisión en punto flotante. Por ejemplo, `0.1 + 0.2 = 0.30000000000000004`.
En un sistema de inventario esto causaría errores en cálculos de precios y totales.
`Decimal(10, 2)` almacena el número exacto con dos decimales, como hacen los sistemas bancarios.

### Diferencia entre DATABASE_URL y DIRECT_URL en Neon

- `DATABASE_URL`: conexión pooled (PgBouncer). Reutiliza conexiones existentes,
  ideal para el servidor Next.js que recibe muchas peticiones simultáneas.
- `DIRECT_URL`: conexión directa a PostgreSQL. Necesaria para las migraciones
  de Prisma porque requieren una conexión persistente sin pooling.