import { useReducer } from "react";
import { renderHook } from "@testing-library/react-hooks";
import { cartReducer } from "./cart";
import { CartGlobalState, TYPES } from "./types";
import { IProduct } from "../pages/product/IProduct";
import { act } from "react-dom/test-utils";

describe("Cart Reducer", () => {
  const product: IProduct = {
    createdAt: "2021-03-03",
    id: "1",
    image: "https://localhost/image",
    name: "Mock Product",
    price: "232.00",
    stock: 23,
    amount: 1,
  };

  const cartInitialState: CartGlobalState = {
    products: [],
  };

  it("Should be able to add product in Cart", async () => {
    const { result } = renderHook(() =>
      useReducer(cartReducer, cartInitialState)
    );

    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: TYPES.ADD_PRODUCT, payload: product });
    });

    const [state] = result.current;
    expect(state.products).toStrictEqual([product]);
  });

  it("Should be able to update amount if add a identical product in the cart", () => {
    const { result } = renderHook(() =>
      useReducer(cartReducer, cartInitialState)
    );

    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: TYPES.ADD_PRODUCT, payload: product });
      dispatch({ type: TYPES.ADD_PRODUCT, payload: product });
    });

    const updatedProduct: IProduct = {
      createdAt: "2021-03-03",
      id: "1",
      image: "https://localhost/image",
      name: "Mock Product",
      price: "232.00",
      stock: 23,
      amount: 2,
    };

    const [state] = result.current;
    expect(state.products).toStrictEqual([updatedProduct]);
  });
});
