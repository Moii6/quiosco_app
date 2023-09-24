import { productos } from "@/prisma/data/productos";
import { PrismaClient } from "@prisma/client";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const categorias = await prisma.categoria.findMany({
    include: {
      productos: true,
    },
  });
  res.status(200).json(categorias);
}
