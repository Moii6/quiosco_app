import { formatoDinero } from "@/utils";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";
/**Componente para mostrar una orden, utilizado en el perfil de admnistrador */
export default function Orden(orden) {
  const { id, nombre, total, pedido } = orden.orden;

  const completarOrden = async () => {
    try {
      /**se puede obtener el request actualizado si se desea mostrarlo en otra parte dela pp
       * hay que tener en cuenta que el request lo debe de retornar la api para recivirlo aqui
       * actualmente la api lo retorna pero aqui no se recive
       * revisar api/ordenes/[id].js linea 17
       */
      //const data = await axios.post(`/api/ordenes/${id}`);
      await axios.post(`/api/ordenes/${id}`);
      toast.success("Se completo la orden!! :) ");
    } catch (error) {
      console.log(error.mesage);
      toast.error("Ocurrio un error :(");
    }
  };
  return (
    <div className="border p-10 space-y-5">
      <h3 className="text-2xl font-bold">Numero de orden: {id}</h3>
      <p className="text-lg font-bold">Cliente {nombre}</p>
      <div>
        {pedido.map((platillo) => (
          <div
            key={platillo.id}
            className="py-3 flex border-b last-of-type:border-0 items-center"
          >
            <div className="w-32">
              <Image
                width={400}
                height={500}
                src={`/assets/img/${platillo.imagen}.jpg`}
                alt="Imagen del producto"
              />
            </div>
            <div className="p-5 space-y-2">
              <h4 className="text-xl font-bold text-amber-500">
                {platillo.nombre}
              </h4>
              <p className="text-lg font-bold">Cantidad: {platillo.cantidad}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="md:flex md:items-center md:justify-between my-10">
        <p className="mt-5 font-black text-4xl text-amber-500">
          Total a Pagar: {formatoDinero(total)}
        </p>
        <button
          type="submit"
          onClick={completarOrden}
          className="bg-indigo-600 hover:bg-indigo-800 text-white mt-5 md:mt-0 py-3 px-10 uppercase font-bold rounded-lg"
        >
          Completar orden
        </button>
      </div>
    </div>
  );
}
