import { GetStaticProps } from "next";
import Head from "next/head";
import { ProductCart } from "../components/ProductCard";
import { getAllProducts } from "../services/api";
import styles from "./home.module.scss";
import { IProduct } from "./product/IProduct";

interface HomeProps {
  products: IProduct[];
}

export default function Home({ products }: HomeProps) {
  return (
    <>
      <Head>
        <title>Inicio | React Commerce</title>
      </Head>

      <div className={styles.listProducts}>
        {products.map((product: IProduct) => (
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
  const products = await getAllProducts();

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 24,
  };
};
