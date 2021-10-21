import styles from "./styles.module.scss";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";
import { useContext } from "react";
import { cartContext } from "../../hooks/cart";

export function Header() {
  const { cartState } = useContext(cartContext);
  let totalItemsInCart = 0;
  cartState.products.forEach((product) => {
    if (product.amount) {
      totalItemsInCart = totalItemsInCart + product.amount;
    } else {
      totalItemsInCart = totalItemsInCart + 1;
    }
  });

  return (
    <header className={styles.headerContainer}>
      <Link href="/">
        <img src="/images/logo.png" alt="React Commerce" />
      </Link>

      <Link href="/cart">
        <div className={styles.headerCart}>
          <div>
            <strong>My cart</strong>
            <span>{totalItemsInCart} Products</span>
          </div>
          <MdShoppingCart size={38} color="#fff" />
          <span>{totalItemsInCart}</span>
        </div>
      </Link>
    </header>
  );
}
