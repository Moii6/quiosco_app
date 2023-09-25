import { useRouter } from "next/router";
import React from "react";
/**Componente que muestra la barra de navegacion y progreso */
const pasos = [
  { paso: 1, nombre: "Menu", url: "/" },
  { paso: 2, nombre: "Resumen", url: "/resumen" },
  { paso: 3, nombre: "Datos y Total", url: "/total" },
];

const Pasos = () => {
  const router = useRouter();

  /**Se utiliza para calcular el porcentaje de la barra de progreso */
  const calcularPorcentaje = () => {
    let porcentaje;
    switch (router.pathname) {
      case "/":
        porcentaje = 2;
        break;
      case "/resumen":
        porcentaje = 50;
        break;
      case "/total":
        porcentaje = 100;
        break;
      default:
        porcentaje = 0;
        break;
    }
    return porcentaje;
  };
  return (
    <>
      <div className="flex justify-between mb-5">
        {pasos.map((paso) => (
          <button
            className="text-2xl font-bold"
            key={paso.paso}
            onClick={() => {
              router.push(paso.url);
            }}
          >
            {paso.nombre}
          </button>
        ))}
      </div>
      <div className="bg-gray-100 mb-10">
        <div
          className="h-2 rounded-full text-xs text-center text-white bg-amber-500"
          style={{ width: `${calcularPorcentaje()}%` }}
        ></div>
      </div>
    </>
  );
};

export default Pasos;
