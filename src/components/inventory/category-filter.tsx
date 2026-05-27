"use client";
import { useCategoriesQuery } from "@/hooks/use-categories";
import { useUIStore } from "@/stores/ui-store";
import { Badge } from "@/components/ui/badge";

export function CategoryFilter() {
  const { data: categories, isLoading } = useCategoriesQuery();
  const { selectedCategoryId, selectCategory } = useUIStore();

  if (isLoading) return <div className="text-sm text-gray-400">Cargando...</div>;

  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant={selectedCategoryId === null ? "default" : "outline"}
        className="cursor-pointer"
        onClick={() => selectCategory(null)}
      >
        Todas
      </Badge>
      {categories?.map((cat: any) => (
        <Badge
          key={cat.id}
          variant={selectedCategoryId === cat.id ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => selectCategory(cat.id)}
        >
          {cat.name}
        </Badge>
      ))}
    </div>
  );
}