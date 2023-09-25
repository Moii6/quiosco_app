import { Component, createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const QuioscoContext = createContext();
/**
 *
 * @param {Component} children
 * @returns todos los servicios que se necesitan para el funcionamiento de la app
 */
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
  /**
   * Obtiene las categorias desde la base de datos
   */
  const obtenerCategorias = async () => {
    const { data } = await axios("/api/categorias");
    setCategorias(data);
  };
  /**
   * identifica que categoria se ha selccionado
   * @param {Int} id identificador de la categoria seleccionada
   */
  const handleClickCategoria = (id) => {
    const categoriaFiltrada = categorias.filter((cat) => cat.id === id);
    setCategoriaActual(categoriaFiltrada[0]);
    router.pathname != "/" && router.push("/");
  };
  /**
   * identifica el producto seleccionado
   * @param {Object} producto objecto con la informacion del producto seleccionado
   */
  const handleClickAgregarProducto = (producto) => {
    setProducto(producto);
  };

  /**
   * controla mla visibilidad del modal
   */
  const handleChangeModal = () => {
    setModal(!modal);
  };

  /**
   * Agrega un producto a la orden
   * @param {Object} producto Objecto con la informacion del producto que se quiere agregar a la orden
   */
  const handleAgregarOrden = (producto) => {
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

  /**
   * Elimina un producto de una orden
   * @param {int} id identificador de un producto
   */
  const handleEliminarElementoDeOrden = (id) => {
    const pedidoActualizado = pedido.filter((producto) => producto.id !== id);
    setPedido(pedidoActualizado);
  };

  /**
   * setea el nombre del pedido
   * @param {Event} e evento de un elemento del DOM
   */
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

  /**
   * Obtiene las categorias, se ejecuta cuando incia el componente
   */
  useEffect(() => {
    obtenerCategorias();
  }, []);

  /**
   * Obtiene el total de la orden
   */
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

  /**
   * cuando las categorias cambian, selecicona la primera como la categoria default para mostrar
   */
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
