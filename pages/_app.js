import "../styles/globals.css";
import { QuioscoProvider } from "../context/QuioscoProvider";

/**
 * Componente principal que renderiza el layout y tiene establecido el provider
 * @param {*} param0
 * @returns
 */
export default function App({ Component, pageProps }) {
  return (
    <QuioscoProvider>
      <Component {...pageProps} />
    </QuioscoProvider>
  );
}
