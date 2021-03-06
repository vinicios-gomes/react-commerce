import { GetServerSideProps } from "next";
import { useContext } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { TYPES } from "../../reducers/types";
import { getProductById } from "../../services/api";
import { cartContext } from "../../hooks/cart";
import { formatPrice } from "../../utils/formaters";
import { IProduct } from "./IProduct";
import style from "./product.module.scss";

interface IProductProps {
  products: IProduct[];
}

export default function Product({ products }: IProductProps) {
  const { dispatch } = useContext(cartContext);

  function addProductToCart() {
    dispatch({ type: TYPES.ADD_PRODUCT, payload: products[0] });
  }

  return (
    <>
      <div className={style.container}>
        {products.map((product) => (
          <div
            data-cy="product-data"
            key={product.id}
            className={style.product}
          >
            <img src={product.image} alt={product.name} />

            <div className={style.description}>
              <h1>{product.name}</h1>
              <span data-cy="product-stock">Stock: {product.stock}</span>
              <span data-cy="product-price">
                Price: <strong>{formatPrice(product.price)}</strong>
              </span>
              <button
                data-testid="add-product-to-cart"
                onClick={addProductToCart}
              >
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
