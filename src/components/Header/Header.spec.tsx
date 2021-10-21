import { render, screen } from "@testing-library/react";
import { CartProvider } from "../../hooks/cart";
import { cartContext } from "../../hooks/cart";
import { Header } from ".";
import { IProduct } from "../../pages/product/IProduct";
import { CartGlobalState } from "../../reducers/types";

describe("Header Component", () => {
  it("render correctly", () => {
    render(
      <CartProvider>
        <Header />
      </CartProvider>
    );
    expect(screen.getByAltText("React Commerce")).toBeInTheDocument();
    expect(screen.getByText("My cart")).toBeInTheDocument();
  });

  it("Should be showing 0 if there is nothing in the cart", () => {
    const { getByText } = render(
      <CartProvider>
        <Header />
      </CartProvider>
    );
    expect(getByText("0")).toBeInTheDocument();
  });

  it("Should be showing the amount of the products in the cart", () => {
    const product: IProduct = {
      createdAt: "2021-03-03",
      id: "1",
      image: "https://localhost/image",
      name: "Mock Product",
      price: "232.00",
      stock: 23,
      amount: 1,
    };

    const initialState: CartGlobalState = {
      products: [product],
    };

    render(
      <cartContext.Provider
        value={{ dispatch: jest.fn(), cartState: initialState }}
      >
        <Header />
      </cartContext.Provider>
    );

    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
