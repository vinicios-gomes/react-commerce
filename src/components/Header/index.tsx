import styles from "./styles.module.scss";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";
import { useContext } from "react";
import { cartContext } from "../../store/cart";

export function Header() {
  const { cartState } = useContext(cartContext);

  const totalItemsInCart = cartState.products.length;

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
