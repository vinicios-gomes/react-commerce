import Link from "next/link";
import styles from "./styles.module.scss";
import { formatPrice } from "../../utils/formaters";
import { MdAddShoppingCart, MdInfoOutline } from "react-icons/md";
import { useContext } from "react";
import { IProduct } from "../../pages/product/IProduct";
import { cartContext } from "../../hooks/cart";
import { TYPES } from "../../reducers/types";

export function ProductCart(product: IProduct) {
  const { dispatch } = useContext(cartContext);

  function addProductToCart() {
    dispatch({ type: TYPES.ADD_PRODUCT, payload: product });
  }

  return (
    <div className={styles.productCartContainer}>
      <img src={product.image} alt={product.name} />
      <header>
        <strong>{product.name}</strong>

        <span>{formatPrice(product.price)}</span>

        <Link href={`/product/${product.id}`}>
          <i>
            <MdInfoOutline size={16} color="#000" />
            More Details
          </i>
        </Link>
        <button data-testid="add-product" onClick={addProductToCart}>
          <div>
            <MdAddShoppingCart size={16} color="#fff" />
          </div>
          <span>Add to Cart</span>
        </button>
      </header>
    </div>
  );
}
