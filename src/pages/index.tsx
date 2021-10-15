import { GetStaticProps } from "next";
import Head from "next/head";
import { ProductCart } from "../components/ProductCard";
import { getAllProducts } from "../services/api";
import styles from "./home.module.scss";

export interface IProduct {
  id: string;
  name: string;
  price: string;
  image: string;
  stock: number;
  createdAt: string;
}

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Inicio | React Commerce</title>
      </Head>

      <div className={styles.listProducts}>
        {data.map((product: IProduct) => (
          <ProductCart
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            id={product.id}
            stock={product.stock}
            createdAt={product.createdAt}
          />
        ))}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllProducts();

  return {
    props: {
      data,
    },
    revalidate: 60 * 60 * 24,
  };
};
