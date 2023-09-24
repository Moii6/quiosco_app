import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const prisma = new PrismaClient();
    const { id } = req.query; //aunque en la base datos el id es int en el query se presenta como string
    const ordenActualizada = await prisma.orden.update({
      where: {
        // son las condiciones para actualiza, where id = id
        id: parseInt(id), //el id viene como string en el query, hay que madarlo como int para que coincida con el tipo en la base datos
      },
      data: {
        //los datos nuevos
        estado: true,
      },
    });
    res.status(200).json(ordenActualizada);
  }
}
