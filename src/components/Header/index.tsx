import styles from "./styles.module.scss";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";

export function Header() {
  function handleSidebar(status) {}

  return (
    <header className={styles.headerContainer}>
      <Link href="/">
        <img src="/images/logo.png" alt="React Commerce" />
      </Link>

      <Link href="/cart">
        <div className={styles.headerCart}>
          <div>
            <strong>My cart</strong>
            <span>0 Products</span>
          </div>
          <MdShoppingCart size={38} color="#fff" />
          <span>0</span>
        </div>
      </Link>
    </header>
  );
}
