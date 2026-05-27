import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const updateStockSchema = z.object({
  stock: z.number().int().min(0, "El stock no puede ser negativo"),
});

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const result = updateStockSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    const product = await db.product.update({
      where: { id: params.id },
      data: { stock: result.data.stock },
      include: { category: { select: { id: true, name: true } } },
    });
    return NextResponse.json(product);
  } catch {
    return NextResponse.json(
      { error: "Producto no encontrado" },
      { status: 404 }
    );
  }
}