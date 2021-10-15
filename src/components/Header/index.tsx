import styles from "./styles.module.scss";
import { MdShoppingCart } from "react-icons/md";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <img src="/images/logo.png" alt="React Commerce" />

      <div className={styles.headerCart}>
        <div>
          <strong>My cart</strong>
          <span>0 Products</span>
        </div>
        <MdShoppingCart size={38} color="#000" />
        <span>0</span>
      </div>
    </header>
  );
}
