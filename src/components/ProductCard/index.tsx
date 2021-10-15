import styles from "./styles.module.scss";
import { IProduct } from "../../pages/index";
import { formatPrice } from "../../utils/formaters";
import { MdAddShoppingCart, MdShoppingCart } from "react-icons/md";
import Loader from "react-loader-spinner";

export function ProductCart({ name, price, image, loading }: IProduct) {
  return (
    <div className={styles.productCartContainer}>
      <img src={image} alt={name} />
      <header>
        <h1>{name}</h1>
        <span>{formatPrice(price)}</span>
        <button>
          {loading ? (
            <Loader type="Oval" color="#38b2ac" />
          ) : (
            <div>
              <MdShoppingCart size={16} color="#38b2ac" />
            </div>
          )}
          <span>Add to Cart</span>
        </button>
      </header>
    </div>
  );
}
