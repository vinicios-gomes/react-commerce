import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

interface IProduct {
  id: String;
  name: String;
  price: String;
  image: String;
  stock: Number;
  createdAt: String;
}

export default function Home({ data }: IProduct[]) {
  return (
    <>
      <Head>
        <title>Inicio | React Commerce</title>
      </Head>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    "https://5d6da1df777f670014036125.mockapi.io/api/v1/product"
  );
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};
