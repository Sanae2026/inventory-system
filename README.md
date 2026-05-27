# Inventory System

Sistema de gestión de inventario profesional con Next.js, Prisma y PostgreSQL.

Aplicación web completa para gestionar productos y categorías de un inventario, con filtros en tiempo real, búsqueda, ajuste de stock optimista y base de datos en la nube.

## Despliegue

| | URL |
|---|---|
| Frontend | Vercel |

## Características

1. CRUD completo de productos y categorías con validación de datos
2. Filtros por categoría y búsqueda en tiempo real gestionados con Zustand
3. Actualización optimista del stock con rollback automático ante errores

## Tecnologías

### Frontend

| Tecnología | Uso |
|---|---|
| Next.js 15 | Framework principal con App Router |
| TypeScript | Tipado estático del código |
| Tailwind CSS | Estilos y diseño de la interfaz |
| Shadcn UI | Componentes de interfaz accesibles |

### Backend

| Tecnología | Uso |
|---|---|
| Next.js API Routes | Endpoints REST serverless |
| Prisma | ORM para acceso a la base de datos |
| Zod | Validación de datos en los endpoints |

### Auxiliares

| Tecnología | Uso |
|---|---|
| Neon | Base de datos PostgreSQL en la nube |
| Zustand | Estado de UI (filtros, sidebar) |
| TanStack Query | Estado del servidor y caché de datos |
| Vercel | Despliegue en producción |

## Estructura del proyecto
inventory-system/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── categories/
│   │   │   │   ├── route.ts           # GET y POST categorías
│   │   │   │   └── [id]/route.ts      # PATCH y DELETE categoría
│   │   │   └── products/
│   │   │       ├── route.ts           # GET y POST productos
│   │   │       └── [id]/
│   │   │           ├── route.ts       # PATCH y DELETE producto
│   │   │           └── stock/route.ts # PATCH stock
│   │   ├── categories/
│   │   │   └── page.tsx               # Página de categorías
│   │   ├── providers.tsx              # QueryClientProvider
│   │   ├── layout.tsx                 # Layout con sidebar
│   │   └── page.tsx                   # Página principal de productos
│   ├── components/
│   │   ├── inventory/
│   │   │   ├── category-filter.tsx    # Filtro por categoría
│   │   │   ├── product-card.tsx       # Tarjeta de producto
│   │   │   ├── product-form.tsx       # Formulario de creación
│   │   │   ├── product-list.tsx       # Lista de productos
│   │   │   └── search-bar.tsx         # Búsqueda con debounce
│   │   └── sidebar.tsx                # Sidebar colapsable
│   ├── hooks/
│   │   ├── use-categories.ts          # Hook de categorías
│   │   └── use-products.ts            # Hooks de productos y mutaciones
│   ├── lib/
│   │   ├── db.ts                      # Instancia global de Prisma
│   │   └── query-client.ts            # Configuración de TanStack Query
│   └── stores/
│       └── ui-store.ts                # Store de Zustand para UI
├── prisma/
│   ├── schema.prisma                  # Modelos de datos
│   └── seed.ts                        # Datos de ejemplo
├── docs/
│   ├── arquitectura.md
│   ├── api.md
│   └── state-management.md
└── README.md

## Descargar y ejecutar

```bash
git clone https://github.com/Sanae2026/inventory-system.git
cd inventory-system
```

Crea un archivo `.env` con tus credenciales:

```env
DATABASE_URL="tu_cadena_de_conexion_neon"
DIRECT_URL="tu_cadena_de_conexion_neon"
```

```bash
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

## Desplegar en Vercel

### Frontend

1. Importa el repositorio en [vercel.com](https://vercel.com)
2. Añade `DATABASE_URL` y `DIRECT_URL` en las variables de entorno
3. Añade `"postinstall": "prisma generate"` en los scripts de `package.json`

---

Desarrollado durante las prácticas en Corner Estudios — Sanae — 2026
