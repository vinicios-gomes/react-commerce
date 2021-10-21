import { AppProps } from "next/app";
import { Header } from "../components/Header";
import { CartProvider } from "../hooks/cart";
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
