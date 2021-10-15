import { GetStaticProps } from "next";
import Head from "next/head";
import { getAllProducts } from "../services/api";

interface IProduct {
  id: String;
  name: String;
  price: String;
  image: String;
  stock: Number;
  createdAt: String;
}

export default function Home({ data }: IProduct[]) {
  console.info(data);
  return (
    <>
      <Head>
        <title>Inicio | React Commerce</title>
      </Head>
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
