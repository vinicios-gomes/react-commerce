import { useContext } from "react";
import {
  MdAddCircleOutline,
  MdDelete,
  MdRemoveCircleOutline,
} from "react-icons/md";
import { TYPES } from "../../reducers/types";
import { cartContext } from "../../hooks/cart";
import { formatPrice } from "../../utils/formaters";
import style from "./cart.module.scss";

export default function Cart() {
  const { cartState, dispatch } = useContext(cartContext);

  const sortProductList = cartState.products.sort(
    (a, b) => parseFloat(a.id) - parseFloat(b.id)
  );

  let totalCartPrice = 0;
  cartState.products.forEach((product) => {
    totalCartPrice =
      totalCartPrice + product.amount * parseFloat(product.price);
  });

  function removeItemOfCart(id): void {
    dispatch({ type: TYPES.REMOVE_PRODUCT, payload: id });
  }

  function formatSubTotal(price: string, amount: number): string {
    const subtotal = parseInt(price) * amount;
    return formatPrice(subtotal);
  }

  function decreaseQtdProduct(id, amount) {
    dispatch({
      type: TYPES.UPDATE_AMOUNT_PRODUCT_IN_CART,
      payload: { id, amount: amount - 1 },
    });
  }

  function increaseQtdProduct(id, amount) {
    dispatch({
      type: TYPES.UPDATE_AMOUNT_PRODUCT_IN_CART,
      payload: { id, amount: amount + 1 },
    });
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
            {sortProductList.map((product) => (
              <tr key={product.id}>
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
                    <button
                      type="button"
                      onClick={() =>
                        decreaseQtdProduct(product.id, product.amount)
                      }
                    >
                      <MdRemoveCircleOutline size={20} color="#1c5d99" />
                    </button>
                    <input type="text" readOnly value={product.amount} />
                    <button
                      type="button"
                      onClick={() =>
                        increaseQtdProduct(product.id, product.amount)
                      }
                    >
                      <MdAddCircleOutline size={20} color="#1c5d99" />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>
                    {formatSubTotal(product.price, product.amount)}
                  </strong>
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
          <button type="submit">Continue to checkout</button>
          <div>
            <span>Total: </span>
            <strong>{formatPrice(totalCartPrice)}</strong>
          </div>
        </footer>
      </div>
    </>
  );
}
