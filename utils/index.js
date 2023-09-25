/**
 * da formato de moneda a un entero
 * @param {Int} cantidad
 * @returns
 */
const formatoDinero = (cantidad) => {
  return cantidad.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export { formatoDinero };
