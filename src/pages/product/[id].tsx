import { GetServerSideProps } from "next";
import { useContext } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { getProductById } from "../../services/api";
import { cartContext } from "../../store/cart";
import { formatPrice } from "../../utils/formaters";
import { IProduct } from "./IProduct";
import style from "./product.module.scss";

interface IProductProps {
  products: IProduct[];
}

export default function Product({ products }: IProductProps) {
  const { dispatch } = useContext(cartContext);

  function addProductToCart() {
    dispatch({ type: "ADD_PRODUCT", payload: products[0] });
  }

  return (
    <>
      <div className={style.container}>
        {products.map((product) => (
          <div className={style.product}>
            <img src={product.image} alt={product.name} />

            <div className={style.description}>
              <h1>{product.name}</h1>
              <span>Stock: {product.stock}</span>
              <span>
                Price: <strong>{formatPrice(product.price)}</strong>
              </span>
              <button onClick={addProductToCart}>
                <div>
                  <MdAddShoppingCart size={16} color="#fff" />
                </div>
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
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
