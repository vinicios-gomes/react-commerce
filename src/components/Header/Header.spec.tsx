import { render, screen } from "@testing-library/react";
import { CartStore } from "../../store/cart";
import { cartContext } from "../../store/cart";
import { Header } from ".";
import { IProduct } from "../../pages/product/IProduct";
import { CartGlobalState } from "../../reducers/types";

describe("Header Component", () => {
  it("render correctly", () => {
    render(
      <CartStore>
        <Header />
      </CartStore>
    );
    expect(screen.getByAltText("React Commerce")).toBeInTheDocument();
    expect(screen.getByText("My cart")).toBeInTheDocument();
  });
});
