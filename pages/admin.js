import Orden from "@/components/Orden";
import AdminLayout from "@/layout/AdminLayuout";
import axios from "axios";
import React from "react";
import useSWR from "swr";
/**
 *  retorna el AdminLayout component
 * @returns
 */
export default function Admin() {
  const fetcher = () => axios("/api/ordenes").then((datos) => datos.data);
  const { data, error, isLoading } = useSWR("/api/ordenes", fetcher, {
    refreshInterval: 100,
  });
  return (
    <AdminLayout pagina={"Admin"}>
      <h1 className="text-4xl font-black">Panel de Administracion</h1>
      <p className="text-2xl my-10">Administra las Ordenes</p>
      {data && data.length ? (
        data.map((orden) => <Orden key={orden.id} orden={orden} />)
      ) : (
        <p className=" text-red-500 font-bold text-2xl">
          No hay ordenes pendientes
        </p>
      )}
    </AdminLayout>
  );
}
