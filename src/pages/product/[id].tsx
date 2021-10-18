import { GetServerSideProps } from "next";
import { MdAddShoppingCart } from "react-icons/md";
import { IProduct } from "..";
import { getAllProducts, getProductById } from "../../services/api";
import style from "./product.module.scss";

interface IProductProps {
  products: IProduct[];
}

export default function Product({ products }: IProductProps) {
  return (
    <>
      {products.map((product) => (
        <div className={style.product}>
          <img src={product.image} alt={product.name} />
          <div>
            <h1>{product.name}</h1>
            <span>{product.stock}</span>
            <strong>{product.price}</strong>
            <button>
              <div>
                <MdAddShoppingCart size={16} color="#fff" />
              </div>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;
  const products: IProduct[] = await getProductById(id);

  return {
    props: {
      products,
    },
  };
};
