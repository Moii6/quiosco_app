import useQuiosco from "@/hooks/useQuiosco";
import { formatoDinero } from "@/utils";
import Image from "next/image";
/**Componente que muestra un producto */
const Producto = ({ producto }) => {
  const { nombre, imagen, precio } = producto;
  const { handleClickAgregarProducto, handleChangeModal } = useQuiosco();
  return (
    <div className="border p-3">
      <Image
        src={`/assets/img/${imagen}.jpg`}
        alt={`imagen del platillo ${nombre}`}
        width={400}
        height={500}
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatoDinero(precio)}
        </p>

        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 text white w-full mt-5 p-3 text-white font-bold"
          onClick={() => {
            handleClickAgregarProducto(producto);
            handleChangeModal();
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default Producto;
