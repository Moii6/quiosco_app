import ResumenProducto from "@/components/ResumenProducto";
import useQuiosco from "@/hooks/useQuiosco";
import Layout from "@/layout/Layout";

/**
 * Renderuza los elementos de la pagina resumen
 * @returns
 */
export default function Resumen() {
  const { pedido } = useQuiosco();
  return (
    <div>
      <Layout pagina="Resumen">
        <h1 className="text-4xl font-black">Resumen</h1>
        <p className="text-2xl my-10">Revisa tu pedido</p>
        {pedido.length === 0 ? (
          <p className="text-center text-2xl">
            No hay nada para mostrar, selecciona algun alimento
          </p>
        ) : (
          pedido.map((producto) => (
            <ResumenProducto key={producto.id} producto={producto} />
          ))
        )}
      </Layout>
    </div>
  );
}
