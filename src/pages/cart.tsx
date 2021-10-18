import {
  MdAddCircleOutline,
  MdDelete,
  MdRemoveCircleOutline,
} from "react-icons/md";
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
                <span>Price</span>
              </td>
              <td>
                <div>
                  <button type="button">
                    <MdRemoveCircleOutline size={20} color="#fff" />
                  </button>
                  <input type="text" readOnly value="1" />
                  <button type="button">
                    <MdAddCircleOutline size={20} color="#fff" />
                  </button>
                </div>
              </td>
              <td>
                <strong>Subtotal</strong>
              </td>
              <td>
                <button type="button">
                  <MdDelete size={20} color="#fff" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
