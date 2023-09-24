import useQuiosco from "@/hooks/useQuiosco";
import { formatoDinero } from "@/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ModalProducto = () => {
  const { producto, handleChangeModal, handleAgregarOrden, pedido } =
    useQuiosco();
  const [cantidad, setCantidad] = useState(1);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    if (pedido.some((pedidoSingle) => pedidoSingle.id === producto.id)) {
      const productoEditado = pedido.find((ped) => ped.id === producto.id);
      setCantidad(productoEditado.cantidad);
      setIsEdited(true);
    }
  }, [producto, pedido]);

  const modificarCantidad = (operacion) => {
    if (
      (cantidad <= 1) & (operacion === "minus") ||
      (cantidad >= 5) & (operacion === "plus")
    )
      return;
    operacion === "plus"
      ? setCantidad(cantidad + 1)
      : setCantidad(cantidad - 1);
  };
  return (
    <div className="md:flex gap-10">
      <div className="md:w-1/3">
        <Image
          width={300}
          height={400}
          src={`/assets/img/${producto.imagen}.jpg`}
          alt={`Imagen del Producto ${producto.nombre}`}
        />
      </div>
      <div className="md:w-2/3">
        <div className="flex justify-end">
          <button onClick={handleChangeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>
        <p className="mt-5 font-black text-5xl text-amber-500">
          {formatoDinero(producto.precio)}
        </p>
        <div className="flex gap-4 mt-5">
          <button name="minus" onClick={() => modificarCantidad("minus")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <p className="text-3xl">{cantidad}</p>
          <button name="plus" onClick={() => modificarCantidad("plus")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <button
          onClick={() => handleAgregarOrden({ ...producto, cantidad })}
          className="bg-indigo-600 hover:bg-indigo-800 px-5 py-5 mt-5 text-white font-bold uppercase rounded"
        >
          {isEdited ? "Guardar Cambios" : "Añadir al pedido"}
        </button>
      </div>
    </div>
  );
};

export default ModalProducto;
