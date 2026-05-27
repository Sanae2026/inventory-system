"use client";
import { useUIStore } from "@/stores/ui-store";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useUIStore();
  const [value, setValue] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value, setSearchQuery]);

  return (
    <Input
      placeholder="Buscar productos..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="max-w-sm"
    />
  );
}