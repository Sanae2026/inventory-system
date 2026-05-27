import { ProductList } from "@/components/inventory/product-list";
import { SearchBar } from "@/components/inventory/search-bar";
import { CategoryFilter } from "@/components/inventory/category-filter";
import { ProductForm } from "@/components/inventory/product-form";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Productos</h1>
        <ProductForm />
      </div>
      <SearchBar />
      <CategoryFilter />
      <ProductList />
    </div>
  );
}