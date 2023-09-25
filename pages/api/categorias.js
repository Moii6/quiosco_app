import { productos } from "@/prisma/data/productos";
import { PrismaClient } from "@prisma/client";

/**
 * Controla el servicio de get de las categorias
 * @param {*} req
 * @param {*} res
 */

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const categorias = await prisma.categoria.findMany({
    include: {
      productos: true,
    },
  });
  res.status(200).json(categorias);
}
