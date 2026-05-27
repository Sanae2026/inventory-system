"use client";
import { useUIStore } from "@/stores/ui-store";
import { useCategoriesQuery } from "@/hooks/use-categories";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Package, Tag } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { data: categories } = useCategoriesQuery();

  return (
    <aside
      className={`relative flex flex-col border-r bg-white transition-all duration-300 ${
        sidebarOpen ? "w-56" : "w-14"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        {sidebarOpen && (
          <span className="font-semibold text-sm">Inventario</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex flex-col gap-1 px-2">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
        >
          <Package className="h-4 w-4 shrink-0" />
          {sidebarOpen && <span>Productos</span>}
        </Link>
        <Link
          href="/categories"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
        >
          <Tag className="h-4 w-4 shrink-0" />
          {sidebarOpen && <span>Categorías</span>}
        </Link>
      </nav>
    </aside>
  );
}