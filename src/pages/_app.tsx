import { AppProps } from "next/app";
import { Header } from "../components/Header";
import { CartStore } from "../store/cart";
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CartStore>
        <Header />
        <Component {...pageProps} />
      </CartStore>
    </>
  );
}

export default MyApp;
