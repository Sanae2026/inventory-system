import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Crear categorías
  const electronica = await prisma.category.upsert({
    where: { name: "Electrónica" },
    update: {},
    create: { name: "Electrónica", description: "Dispositivos y gadgets electrónicos" },
  });

  const ropa = await prisma.category.upsert({
    where: { name: "Ropa" },
    update: {},
    create: { name: "Ropa", description: "Prendas de vestir y accesorios" },
  });

  const hogar = await prisma.category.upsert({
    where: { name: "Hogar" },
    update: {},
    create: { name: "Hogar", description: "Artículos para el hogar" },
  });

  // Crear productos
  await prisma.product.createMany({
    skipDuplicates: true,
    data: [
      { name: "Laptop Pro 15", description: "Portátil de alto rendimiento", price: 1299.99, stock: 15, categoryId: electronica.id },
      { name: "Auriculares BT", description: "Auriculares inalámbricos con cancelación de ruido", price: 89.99, stock: 42, categoryId: electronica.id },
      { name: "Smartphone X12", description: "Último modelo con cámara de 108MP", price: 799.99, stock: 8, categoryId: electronica.id },
      { name: "Tablet 10\"", description: "Tablet para trabajo y entretenimiento", price: 349.99, stock: 23, categoryId: electronica.id },
      { name: "Camiseta Básica", description: "100% algodón, varios colores", price: 19.99, stock: 150, categoryId: ropa.id },
      { name: "Pantalón Vaquero", description: "Corte slim fit", price: 49.99, stock: 67, categoryId: ropa.id },
      { name: "Zapatillas Running", description: "Para correr y entrenar", price: 79.99, stock: 34, categoryId: ropa.id },
      { name: "Lámpara LED", description: "Lámpara de escritorio con regulador", price: 39.99, stock: 28, categoryId: hogar.id },
      { name: "Silla Ergonómica", description: "Silla de oficina con soporte lumbar", price: 249.99, stock: 12, categoryId: hogar.id },
      { name: "Cafetera Express", description: "Cafetera automática con molinillo", price: 189.99, stock: 19, categoryId: hogar.id },
    ],
  });

  console.log("✅ Semilla completada");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });