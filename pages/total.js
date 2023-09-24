import useQuiosco from "@/hooks/useQuiosco";
import Layout from "@/layout/Layout";
import { formatoDinero } from "@/utils";
import { useCallback, useEffect, useState } from "react";

export default function Total() {
  const { total, nombre, buildNombrePedido, ordenar, pedido } = useQuiosco();
  const [isnombre, setIsNombre] = useState(false);

  const comprobarPedido = useCallback(() => {
    return pedido.length === 0 || nombre === "" || nombre.length < 3;
  }, [pedido, nombre]);

  const colocarPedido = (e) => {
    e.preventDefault();
    ordenar();
  };

  useEffect(() => {
    comprobarPedido();
  }, [pedido, comprobarPedido]);
  return (
    <div>
      <Layout pagina="Resumen">
        <h1 className="text-4xl font-black">Total</h1>
        <p className="text-2xl my-10">Total del pedido</p>
        <form onSubmit={colocarPedido}>
          <div>
            <label
              htmlFor="nombre"
              className="block uppercase text-slate-800 font-bold text-xl"
            >
              Ingresa tu nombre
            </label>
            {isnombre && (
              <p className="font-bold text-red-700 mt-3">
                Ingresa un nombre valido
              </p>
            )}
            <input
              id="nombre"
              type="text"
              className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
              value={nombre}
              onChange={buildNombrePedido}
            />
          </div>
          <div className="mt-10">
            <p className="text-2xl">
              Total a pagar:{" "}
              <span className="font-bold">{formatoDinero(total)}</span>
            </p>
          </div>
          <div className="mt-5">
            <input
              type="submit"
              value="Confirmar Pedido"
              disabled={comprobarPedido()}
              className={`${
                comprobarPedido()
                  ? "bg-indigo-100"
                  : "bg-indigo-600 hover:bg-indigo-800"
              }  w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}
            />
          </div>
        </form>
      </Layout>
    </div>
  );
}
