import { render, screen } from "@testing-library/react";
import { CartProvider } from "../../hooks/cart";
import { ProductCart } from ".";
import { IProduct } from "../../pages/product/IProduct";

describe("ProductCard Component", () => {
  const product: IProduct = {
    createdAt: "2021-03-03",
    id: "1",
    image: "https://localhost/image",
    name: "Mock Product",
    price: "232.00",
    stock: 23,
    amount: 1,
  };

  it("render correctly", () => {
    render(
      <CartProvider>
        <ProductCart
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          id={product.id}
          stock={product.stock}
          createdAt={product.createdAt}
        />
      </CartProvider>
    );

    expect(screen.getByAltText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
  });
});
