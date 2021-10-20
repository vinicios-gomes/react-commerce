import { useContext } from "react";
import {
  MdAddCircleOutline,
  MdDelete,
  MdRemoveCircleOutline,
} from "react-icons/md";
import { TYPES } from "../../reducers/types";
import { cartContext } from "../../store/cart";
import { formatPrice } from "../../utils/formaters";
import style from "./cart.module.scss";

export default function Cart() {
  const { cartState, dispatch } = useContext(cartContext);

  function removeItemOfCart(id) {
    dispatch({ type: TYPES.REMOVE_PRODUCT, payload: id });
  }

  return (
    <>
      <div className={style.cartContainer}>
        <table>
          <thead>
            <tr>
              <th />
              <th>PRODUCT</th>
              <th>AMOUNT</th>
              <th>SUBTOTAL</th>
            </tr>
          </thead>
          <tbody>
            {cartState.products.map((product) => (
              <tr>
                <td>
                  <figure>
                    <img src={product.image}></img>
                  </figure>
                </td>
                <td>
                  <strong>{product.name}</strong>
                  <span>{formatPrice(product.price)}</span>
                </td>
                <td>
                  <div>
                    <button type="button">
                      <MdRemoveCircleOutline size={20} color="#1c5d99" />
                    </button>
                    <input type="text" readOnly value={1} />
                    <button type="button">
                      <MdAddCircleOutline size={20} color="#1c5d99" />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{formatPrice(12)}</strong>
                </td>
                <td>
                  <button
                    onClick={() => removeItemOfCart(product.id)}
                    type="button"
                  >
                    <MdDelete size={20} color="#1c5d99" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <footer className={style.footer}>
          <button type="submit">Continuar para o check-out</button>
          <div>
            <span>Total: </span>
            <strong>{formatPrice(152.0)}</strong>
          </div>
        </footer>
      </div>
    </>
  );
}
