import { useReducer } from "react";
import { renderHook } from "@testing-library/react-hooks";
import { cartReducer } from "./cart";
import { CartGlobalState, TYPES } from "./types";
import { IProduct } from "../pages/product/IProduct";
import { act } from "react-dom/test-utils";

describe("Cart Reducer", () => {
  it("Should be able to add product in Cart", async () => {
    const cartInitialState: CartGlobalState = {
      products: [],
    };
    const product: IProduct = {
      createdAt: "2021-03-03",
      id: "1",
      image: "https://localhost/image",
      name: "Mock Product",
      price: "232.00",
      stock: 23,
      amount: 1,
    };

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

  it("Should be able to add key amount in product if not have", () => {
    const cartInitialState: CartGlobalState = {
      products: [],
    };
    const product: IProduct = {
      createdAt: "2021-03-03",
      id: "1",
      image: "https://localhost/image",
      name: "Mock Product",
      price: "232.00",
      stock: 23,
    };

    const { result } = renderHook(() =>
      useReducer(cartReducer, cartInitialState)
    );

    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: TYPES.ADD_PRODUCT, payload: product });
    });

    const [state] = result.current;
    expect(state.products).toStrictEqual([
      {
        createdAt: "2021-03-03",
        id: "1",
        image: "https://localhost/image",
        name: "Mock Product",
        price: "232.00",
        stock: 23,
        amount: 1,
      },
    ]);
  });

  it("Should be able to update amount if add a identical product in the cart", () => {
    const cartInitialState: CartGlobalState = {
      products: [
        {
          createdAt: "2021-03-03",
          id: "1",
          image: "https://localhost/image",
          name: "Mock Product",
          price: "232.00",
          stock: 23,
          amount: 1,
        },
      ],
    };

    const product: IProduct = {
      createdAt: "2021-03-03",
      id: "1",
      image: "https://localhost/image",
      name: "Mock Product",
      price: "232.00",
      stock: 23,
      amount: 1,
    };

    const { result } = renderHook(() =>
      useReducer(cartReducer, cartInitialState)
    );

    const [, dispatch] = result.current;

    act(() => {
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

  it("should be able to remove product in the cart", () => {
    const cartInitialState: CartGlobalState = {
      products: [
        {
          createdAt: "2021-03-03",
          id: "1",
          image: "https://localhost/image",
          name: "Mock Product",
          price: "232.00",
          stock: 23,
          amount: 1,
        },
      ],
    };

    const { result } = renderHook(() =>
      useReducer(cartReducer, cartInitialState)
    );

    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: TYPES.REMOVE_PRODUCT, payload: "1" });
    });

    const [state] = result.current;

    expect(state.products).toStrictEqual([]);
  });

  it("Should be able to clear cart", () => {
    const cartInitialState: CartGlobalState = {
      products: [
        {
          createdAt: "2021-03-03",
          id: "1",
          image: "https://localhost/image",
          name: "Mock Product",
          price: "232.00",
          stock: 23,
          amount: 1,
        },
      ],
    };
    const { result } = renderHook(() =>
      useReducer(cartReducer, cartInitialState)
    );

    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: TYPES.CLEAR_CART });
    });

    const [state] = result.current;

    expect(state.products).toStrictEqual([]);
  });

  it("Should be able to increment amount product in the cart", () => {
    const cartInitialState: CartGlobalState = {
      products: [
        {
          createdAt: "2021-03-03",
          id: "1",
          image: "https://localhost/image",
          name: "Mock Product",
          price: "232.00",
          stock: 23,
          amount: 1,
        },
      ],
    };

    const product: IProduct = {
      createdAt: "2021-03-03",
      id: "1",
      image: "https://localhost/image",
      name: "Mock Product",
      price: "232.00",
      stock: 23,
      amount: 1,
    };

    const { result } = renderHook(() =>
      useReducer(cartReducer, cartInitialState)
    );

    const [, dispatch] = result.current;

    act(() => {
      dispatch({
        type: TYPES.UPDATE_AMOUNT_PRODUCT_IN_CART,
        payload: { id: "1", amount: product.amount + 1 },
      });
    });

    const productUpdated: IProduct = {
      createdAt: "2021-03-03",
      id: "1",
      image: "https://localhost/image",
      name: "Mock Product",
      price: "232.00",
      stock: 23,
      amount: 2,
    };

    const [state] = result.current;

    expect(state.products).toStrictEqual([productUpdated]);
  });
  it("Should be able to increment amount product in the cart", () => {
    const spyConsoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const cartInitialState: CartGlobalState = {
      products: [
        {
          createdAt: "2021-03-03",
          id: "1",
          image: "https://localhost/image",
          name: "Mock Product",
          price: "232.00",
          stock: 23,
          amount: 1,
        },
      ],
    };

    const product: IProduct = {
      createdAt: "2021-03-03",
      id: "1",
      image: "https://localhost/image",
      name: "Mock Product",
      price: "232.00",
      stock: 23,
      amount: 1,
    };

    const { result } = renderHook(() =>
      useReducer(cartReducer, cartInitialState)
    );

    const [, dispatch] = result.current;

    act(() => {
      dispatch({
        type: TYPES.UPDATE_AMOUNT_PRODUCT_IN_CART,
        payload: { id: "2", amount: product.amount + 1 },
      });
    });

    expect(spyConsoleError.mock.calls[0][0]).toEqual(
      "An error has occurred when changing the amount!"
    );
  });

  it("Cannot update quantity to a value greater than stock", () => {
    const spyConsoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const cartInitialState: CartGlobalState = {
      products: [
        {
          createdAt: "2021-03-03",
          id: "1",
          image: "https://localhost/image",
          name: "Mock Product",
          price: "232.00",
          stock: 2,
          amount: 2,
        },
      ],
    };

    const product: IProduct = {
      createdAt: "2021-03-03",
      id: "1",
      image: "https://localhost/image",
      name: "Mock Product",
      price: "232.00",
      stock: 23,
      amount: 2,
    };

    const { result } = renderHook(() =>
      useReducer(cartReducer, cartInitialState)
    );

    const [, dispatch] = result.current;

    act(() => {
      dispatch({
        type: TYPES.UPDATE_AMOUNT_PRODUCT_IN_CART,
        payload: { id: "1", amount: product.amount + 1 },
      });
    });

    expect(spyConsoleError.mock.calls[0][0]).toEqual(
      "Sorry, you can't update the amount, out of stock"
    );
  });

  it("You cannot add a quantity of product greater than the product's stock", () => {
    const spyConsoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const cartInitialState: CartGlobalState = {
      products: [
        {
          createdAt: "2021-03-03",
          id: "1",
          image: "https://localhost/image",
          name: "Mock Product",
          price: "232.00",
          stock: 2,
          amount: 2,
        },
      ],
    };

    const product: IProduct = {
      createdAt: "2021-03-03",
      id: "1",
      image: "https://localhost/image",
      name: "Mock Product",
      price: "232.00",
      stock: 23,
      amount: 1,
    };

    const { result } = renderHook(() =>
      useReducer(cartReducer, cartInitialState)
    );

    const [, dispatch] = result.current;

    act(() => {
      dispatch({
        type: TYPES.ADD_PRODUCT,
        payload: product,
      });
    });

    expect(spyConsoleError.mock.calls[0][0]).toEqual(
      "Sorry, you can't add more items, out of stock"
    );
  });

  it("Should be able to decrement product amount in the cart", () => {
    const cartInitialState: CartGlobalState = {
      products: [
        {
          createdAt: "2021-03-03",
          id: "1",
          image: "https://localhost/image",
          name: "Mock Product",
          price: "232.00",
          stock: 23,
          amount: 2,
        },
      ],
    };

    const product: IProduct = {
      createdAt: "2021-03-03",
      id: "1",
      image: "https://localhost/image",
      name: "Mock Product",
      price: "232.00",
      stock: 23,
      amount: 2,
    };

    const { result } = renderHook(() =>
      useReducer(cartReducer, cartInitialState)
    );

    const [, dispatch] = result.current;

    act(() => {
      dispatch({
        type: TYPES.UPDATE_AMOUNT_PRODUCT_IN_CART,
        payload: { id: "1", amount: product.amount - 1 },
      });
    });

    const productUpdated: IProduct = {
      createdAt: "2021-03-03",
      id: "1",
      image: "https://localhost/image",
      name: "Mock Product",
      price: "232.00",
      stock: 23,
      amount: 1,
    };

    const [state] = result.current;

    expect(state.products).toStrictEqual([productUpdated]);
  });

  it("Must be remove the product from the cart if by decreasing the amount it reaches 0", () => {
    const cartInitialState: CartGlobalState = {
      products: [
        {
          createdAt: "2021-03-03",
          id: "1",
          image: "https://localhost/image",
          name: "Mock Product",
          price: "232.00",
          stock: 23,
          amount: 1,
        },
      ],
    };

    const product: IProduct = {
      createdAt: "2021-03-03",
      id: "1",
      image: "https://localhost/image",
      name: "Mock Product",
      price: "232.00",
      stock: 23,
      amount: 1,
    };

    const { result } = renderHook(() =>
      useReducer(cartReducer, cartInitialState)
    );

    const [, dispatch] = result.current;

    act(() => {
      dispatch({
        type: TYPES.UPDATE_AMOUNT_PRODUCT_IN_CART,
        payload: { id: "2", amount: product.amount - 1 },
      });
    });

    const [state] = result.current;

    expect(state.products).toStrictEqual([
      {
        createdAt: "2021-03-03",
        id: "1",
        image: "https://localhost/image",
        name: "Mock Product",
        price: "232.00",
        stock: 23,
        amount: 1,
      },
    ]);
  });
});
