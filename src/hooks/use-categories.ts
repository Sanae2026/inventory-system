import { useQuery } from "@tanstack/react-query";

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Error al cargar las categorías");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });
}