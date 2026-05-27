"use client";
import { useUpdateStockMutation, useDeleteProductMutation } from "@/hooks/use-products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

export function ProductCard({ product }: { product: any }) {
  const updateStock = useUpdateStockMutation();
  const deleteProduct = useDeleteProductMutation();

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">{product.name}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-red-400 hover:text-red-600"
            onClick={() => deleteProduct.mutate(product.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <Badge variant="outline" className="w-fit text-xs">
          {product.category.name}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {product.description && (
          <p className="text-sm text-gray-500">{product.description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">
            {Number(product.price).toFixed(2)} €
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() =>
                updateStock.mutate({
                  productId: product.id,
                  stock: Math.max(0, product.stock - 1),
                })
              }
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">
              {product.stock}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() =>
                updateStock.mutate({
                  productId: product.id,
                  stock: product.stock + 1,
                })
              }
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}