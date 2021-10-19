import { IProduct } from "../pages/product/IProduct";

export const getAllProducts = async () => {
  const data = await fetch(
    "https://5d6da1df777f670014036125.mockapi.io/api/v1/product"
  );
  return data.json();
};
export const getProductById = async (id) => {
  const data = await fetch(
    "https://5d6da1df777f670014036125.mockapi.io/api/v1/product"
  );
  const serializedData: IProduct[] = await data.json();

  const filteredProduct = serializedData.filter((product) => product.id === id);

  return filteredProduct;
};
