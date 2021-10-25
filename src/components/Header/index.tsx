import styles from "./styles.module.scss";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";
import { useContext } from "react";
import { cartContext } from "../../hooks/cart";

export function Header() {
  const { cartState } = useContext(cartContext);
  let totalItemsInCart = 0;

  const cartTotal = cartState.products.reduce(
    (prev, cur) => prev + cur.amount,
    0
  );

  return (
    <header className={styles.headerContainer}>
      <Link href="/">
        <img src="/images/logo.png" alt="React Commerce" />
      </Link>

      <Link href="/cart">
        <div data-cy="header-cart-link" className={styles.headerCart}>
          <div>
            <strong>My cart</strong>
            <span data-cy="header-cart-total">{cartTotal} Products</span>
          </div>
          <MdShoppingCart size={38} color="#fff" />
          <span>{cartTotal}</span>
        </div>
      </Link>
    </header>
  );
}
