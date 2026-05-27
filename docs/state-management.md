# Gestión del estado

## Estado del servidor vs estado de UI

### Estado del servidor (TanStack Query)
Son los datos que vienen de la base de datos y pueden cambiar en el servidor.
En este inventario: la lista de productos, las categorías, el stock actual.
TanStack Query los gestiona automáticamente: los cachea, los revalida cuando
quedan obsoletos y los sincroniza entre componentes.

### Estado de UI (Zustand)
Son los datos que solo existen en el navegador y no se guardan en la base de datos.
En este inventario: el texto de búsqueda, la categoría seleccionada, si el
sidebar está abierto o cerrado, el orden de la lista.

## El middleware `persist` de Zustand

`persist` guarda parte del estado en `localStorage` para que sobreviva al
recargar la página. En este proyecto solo persistimos `sidebarOpen` porque:

- Si el usuario colapsó el sidebar, querrá encontrarlo colapsado al volver.
- `searchQuery` y `selectedCategoryId` NO se persisten porque al volver a la
  app es mejor empezar con la vista limpia, sin filtros anteriores activos.

## `staleTime` vs `gcTime` en TanStack Query

- **staleTime:** tiempo durante el cual los datos se consideran frescos.
  Mientras están frescos, TanStack Query no hace nuevas peticiones al servidor.
  En este proyecto: 2 minutos para productos, 5 minutos para categorías.

- **gcTime:** tiempo que los datos permanecen en caché después de que ningún
  componente los esté usando. Pasado este tiempo se eliminan de memoria.
  En este proyecto: 10 minutos.

## Actualización optimista del stock

Cuando el usuario pulsa + o - en el stock:
1. TanStack Query actualiza el estado local inmediatamente (optimista).
2. Envía la petición al servidor en segundo plano.
3. Si el servidor responde con error, revierte el cambio al valor anterior (rollback).
4. Si responde con éxito, invalida la caché para obtener el dato oficial.

Esto hace que la UI responda al instante sin esperar al servidor.

## Estados de TanStack Query (React Query DevTools)

- **fresh:** datos recién obtenidos, dentro del staleTime. No se revalidan.
- **stale:** datos que han superado el staleTime. Se revalidan en el siguiente foco o montaje.
- **fetching:** petición en curso al servidor.