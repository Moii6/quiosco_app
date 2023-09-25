import { useContext } from "react";
import QuioscoContext from "../context/QuioscoProvider";
/**
 * hook personalizado para el quioscoProvider
 */
const useQuiosco = () => {
  return useContext(QuioscoContext);
};
export default useQuiosco;
