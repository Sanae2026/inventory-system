import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const updateCategorySchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const result = updateCategorySchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  try {
    const category = await db.category.update({
      where: { id: params.id },
      data: result.data,
    });
    return NextResponse.json(category);
  } catch {
    return NextResponse.json(
      { error: "Categoría no encontrada" },
      { status: 404 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const products = await db.product.count({
    where: { categoryId: params.id },
  });

  if (products > 0) {
    return NextResponse.json(
      { error: "No se puede eliminar una categoría con productos asociados" },
      { status: 409 }
    );
  }

  try {
    await db.category.delete({ where: { id: params.id } });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json(
      { error: "Categoría no encontrada" },
      { status: 404 }
    );
  }
}