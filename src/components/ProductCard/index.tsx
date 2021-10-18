import styles from "./styles.module.scss";
import { IProduct } from "../../pages/index";
import { formatPrice } from "../../utils/formaters";
import { MdAddShoppingCart, MdShoppingCart } from "react-icons/md";
import { useContext } from "react";
import { CartContext, CartProvider } from "../../context/CartContext";

export function ProductCart(product: IProduct) {
  return (
    <div className={styles.productCartContainer}>
      <img src={product.image} alt={product.name} />
      <header>
        <strong>{product.name}</strong>

        <span>{formatPrice(product.price)}</span>

        <button>
          <div>
            <MdAddShoppingCart size={16} color="#fff" />
          </div>
          <span>Add to Cart</span>
        </button>
      </header>
    </div>
  );
}
