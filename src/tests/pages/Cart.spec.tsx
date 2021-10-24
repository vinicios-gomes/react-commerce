import { render, screen, fireEvent } from "@testing-library/react";
import { cartContext } from "../../hooks/cart";
import Cart from "../../pages/cart";
import { CartGlobalState } from "../../reducers/types";

describe("Cart Page", () => {
  it("Render Correctly", () => {
    const initialState: CartGlobalState = {
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

    const dispatch = jest.fn();

    render(
      <cartContext.Provider
        value={{
          cartState: initialState,
          dispatch: dispatch,
        }}
      >
        <Cart />
      </cartContext.Provider>
    );

    expect(screen.getByText("Mock Product")).toBeInTheDocument();
    expect(screen.getByText("R$ 232,00")).toBeInTheDocument();
    expect(screen.getAllByTestId("product-amount")).toHaveLength(1);

    const total = screen.getByTestId("cart-total");
    expect(total.innerHTML).toBe("R$ 464,00");
  });
  it("Should be able to increment amount of the product", () => {
    const initialState: CartGlobalState = {
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

    const dispatch = jest.fn();

    const { rerender } = render(
      <cartContext.Provider
        value={{
          cartState: initialState,
          dispatch: dispatch,
        }}
      >
        <Cart />
      </cartContext.Provider>
    );

    const [incrementProductInTheCart] = screen.getAllByTestId(
      "cart-increment-product"
    );
    fireEvent.click(incrementProductInTheCart);

    expect(dispatch.mock.calls[0][0].payload).toStrictEqual({
      id: "1",
      amount: 2,
    });

    // update amount to initialState
    initialState.products[0].amount = 2;

    // Rerender to fix new amount
    rerender(
      <cartContext.Provider
        value={{
          cartState: initialState,
          dispatch: dispatch,
        }}
      >
        <Cart />
      </cartContext.Provider>
    );

    const [productAmountUpdate] = screen.getAllByTestId("product-amount");
    expect((productAmountUpdate as HTMLInputElement).value).toBe("2");
  });
  it("Should be able to decrement amount of the product", () => {
    const initialState: CartGlobalState = {
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

    const dispatch = jest.fn();

    const { rerender } = render(
      <cartContext.Provider
        value={{
          cartState: initialState,
          dispatch: dispatch,
        }}
      >
        <Cart />
      </cartContext.Provider>
    );

    const [decrementProductInTheCart] = screen.getAllByTestId(
      "cart-decrement-product"
    );
    fireEvent.click(decrementProductInTheCart);

    expect(dispatch.mock.calls[0][0].payload).toStrictEqual({
      id: "1",
      amount: 1,
    });

    // update amount to initialState
    initialState.products[0].amount = 1;

    // Rerender to fix new amount
    rerender(
      <cartContext.Provider
        value={{
          cartState: initialState,
          dispatch: dispatch,
        }}
      >
        <Cart />
      </cartContext.Provider>
    );

    const [productAmountUpdate] = screen.getAllByTestId("product-amount");

    expect((productAmountUpdate as HTMLInputElement).value).toBe("1");
  });
});
