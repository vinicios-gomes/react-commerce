import { AppProps } from "next/app";
import { Header } from "../components/Header";
import { CartProvider } from "../context/CartContext";
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CartProvider>
        <Header />
        <Component {...pageProps} />
      </CartProvider>
    </>
  );
}

export default MyApp;
