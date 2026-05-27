# Documentación de la API

## Categorías

### GET /api/categories
Devuelve todas las categorías con el número de productos asociados.
- **Respuesta exitosa:** 200 con array de categorías
- **Ejemplo de respuesta:**
```json
[{ "id": "abc", "name": "Electrónica", "_count": { "products": 4 } }]
```

### POST /api/categories
Crea una nueva categoría.
- **Cuerpo:** `{ "name": "string", "description": "string (opcional)" }`
- **Respuesta exitosa:** 201 con la categoría creada
- **Errores:** 400 si datos inválidos, 409 si el nombre ya existe

### PATCH /api/categories/[id]
Edita nombre o descripción de una categoría.
- **Cuerpo:** `{ "name": "string (opcional)", "description": "string (opcional)" }`
- **Respuesta exitosa:** 200 con la categoría actualizada
- **Errores:** 404 si no existe

### DELETE /api/categories/[id]
Elimina una categoría.
- **Respuesta exitosa:** 204 sin contenido
- **Errores:** 404 si no existe, 409 si tiene productos asociados

## Productos

### GET /api/products
Devuelve productos con filtros opcionales.
- **Query params:** `search`, `categoryId`, `sortBy`, `sortOrder`
- **Respuesta exitosa:** 200 con array de productos

### POST /api/products
Crea un nuevo producto.
- **Cuerpo:** `{ "name", "description", "price", "stock", "categoryId" }`
- **Respuesta exitosa:** 201 con el producto creado
- **Errores:** 400 si datos inválidos

### PATCH /api/products/[id]
Edita un producto.
- **Cuerpo:** cualquier campo del producto (todos opcionales)
- **Respuesta exitosa:** 200 con el producto actualizado
- **Errores:** 404 si no existe

### DELETE /api/products/[id]
Elimina un producto.
- **Respuesta exitosa:** 204 sin contenido
- **Errores:** 404 si no existe

### PATCH /api/products/[id]/stock
Actualiza solo el stock de un producto.
- **Cuerpo:** `{ "stock": number }`
- **Respuesta exitosa:** 200 con el producto actualizado
- **Errores:** 400 si stock negativo, 404 si no existe

## Por qué un endpoint separado para el stock

El endpoint `/stock` sigue el principio de responsabilidad única: solo hace
una cosa y la hace bien. Esto tiene varias ventajas:
- Se puede aplicar validación específica (no negativo) sin afectar al PATCH general.
- Es más fácil añadir lógica futura (alertas de stock bajo, historial de cambios).
- Queda claro en el código qué operaciones cambian el stock y cuáles editan otros campos.
