import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [modal, setModal] = useState(false);
  const [producto, setProducto] = useState({});
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState("");
  const [total, setTotal] = useState(0);
  const router = useRouter();
  //////////////////////////////////////////////FUNCIONES///////////////////////////
  const obtenerCategorias = async () => {
    const { data } = await axios("/api/categorias");
    setCategorias(data);
  };

  const handleClickCategoria = (id) => {
    const categoriaFiltrada = categorias.filter((cat) => cat.id === id);
    setCategoriaActual(categoriaFiltrada[0]);
    router.pathname != "/" && router.push("/");
  };

  const handleClickAgregarProducto = (producto) => {
    setProducto(producto);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleAgregarOrden = (producto) => {
    console.log(producto);
    if (pedido.some((productoSingle) => productoSingle.id === producto.id)) {
      const pedidoActualizado = pedido.map((prod) =>
        prod.id === producto.id ? producto : prod
      );
      setPedido(pedidoActualizado);
      toast.success("Se actualizo correctamente");
    } else {
      setPedido([...pedido, producto]);
      pedido.length < 1
        ? toast.info("Se agrego a un nuevo pedido")
        : toast.success("Se agrego correctamente");
    }
    setModal(false);
  };

  const handleEliminarElementoDeOrden = (id) => {
    console.log(id);
    const pedidoActualizado = pedido.filter((producto) => producto.id !== id);
    console.log(pedidoActualizado);
    setPedido(pedidoActualizado);
  };

  const buildNombrePedido = (e) => {
    setNombre(e.target.value);
  };
  const ordenar = async () => {
    try {
      await axios.post("/api/ordenes", {
        pedido,
        nombre,
        total,
        fecha: Date.now().toString(),
      });
      //reset a los valores de inicio para un nuevo pedido
      setCategoriaActual(categorias[0]);
      setPedido([]);
      setNombre("");
      setTotal(0);
      toast.success("Tu pedido se ha generado con exito!!");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };
  /////////////////////////////////////////////USEEFFECT/////////////////////////////
  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    /*let total = 0;
    pedido.map((producto) => {
      total += producto.precio * producto.cantidad;
    });*/
    const nuevoTotal = pedido.reduce(
      (total, producto) => producto.precio * producto.cantidad + total,
      0
    );
    setTotal(nuevoTotal);
  }, [pedido]);

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);
  //////////////////////////////////////////RETURN///////////////////////////////////
  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        modal,
        handleClickAgregarProducto,
        handleChangeModal,
        producto,
        handleAgregarOrden,
        pedido,
        setModal,
        handleEliminarElementoDeOrden,
        total,
        nombre,
        buildNombrePedido,
        ordenar,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
