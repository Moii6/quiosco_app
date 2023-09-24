import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  switch (req.method) {
    case "POST":
      try {
        const orden = await prisma.orden.create({
          data: {
            nombre: req.body.nombre,
            total: req.body.total,
            pedido: req.body.pedido,
            fecha: req.body.fecha,
          },
        });
        console.log(orden);
        res.json(orden);
      } catch (error) {
        console.log(error.message);
      } finally {
      }
      break;
    case "PUT":
      /**esta seccion no se utiliza, en su lugar se crea la carpeta y el archivo ordenes/[id].js
       * para hacerlo de forma dinamica
       */
      console.log("updating from ordenes.js");
      break;

    default:
      const ordenes = await prisma.orden.findMany({
        where: {
          estado: false,
        },
      });
      res.status(200).json(ordenes);
      break;
  }
}
