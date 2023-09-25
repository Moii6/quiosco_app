import Producto from "@/components/Producto";
import useQuiosco from "@/hooks/useQuiosco";
import Layout from "@/layout/Layout";

/**
 * muestra las paginas que se utilizan durante todo el proceso de la app
 * tiene como base el header y sidebar
 * @returns
 */
export default function Home() {
  const { categoriaActual } = useQuiosco();
  return (
    <Layout pagina={`Menu : ${categoriaActual?.nombre}`}>
      <h1 className="text-4xl font-black">{categoriaActual?.nombre}</h1>
      <p className="text-2xl my-10">
        Elige y personaliza tu pedido a continuacion
      </p>
      <div className="grid gap-4 grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {categoriaActual?.productos?.map((producto) => (
          <Producto key={producto.id} producto={producto} />
        ))}
      </div>
    </Layout>
  );
}
