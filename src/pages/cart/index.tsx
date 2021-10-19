import {
  MdAddCircleOutline,
  MdDelete,
  MdRemoveCircleOutline,
} from "react-icons/md";
import { formatPrice } from "../../utils/formaters";
import style from "./cart.module.scss";
export default function Cart() {
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
            <tr>
              <td>
                <figure>
                  <img src="img"></img>
                </figure>
              </td>
              <td>
                <strong>Product Tilte</strong>
                <span>{formatPrice(144.22)}</span>
              </td>
              <td>
                <div>
                  <button type="button">
                    <MdRemoveCircleOutline size={20} color="#1c5d99" />
                  </button>
                  <input type="text" readOnly value="1" />
                  <button type="button">
                    <MdAddCircleOutline size={20} color="#1c5d99" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{formatPrice(12)}</strong>
              </td>
              <td>
                <button type="button">
                  <MdDelete size={20} color="#1c5d99" />
                </button>
              </td>
            </tr>
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
