"use client";
import { useProductsQuery } from "@/hooks/use-products";
import { ProductCard } from "./product-card";

export function ProductList() {
  const { data: products, isLoading, isError, refetch } = useProductsQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-40 rounded-xl border bg-gray-100 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <p className="text-gray-500">Error al cargar los productos.</p>
        <button
          onClick={() => refetch()}
          className="text-sm underline text-gray-600"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="py-12 text-center text-gray-400">
        No hay productos que coincidan con los filtros.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}