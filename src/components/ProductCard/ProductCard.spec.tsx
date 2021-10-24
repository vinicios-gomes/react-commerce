import { render, screen, fireEvent } from "@testing-library/react";
import { cartContext, CartProvider } from "../../hooks/cart";
import { ProductCart } from ".";
import { IProduct } from "../../pages/product/IProduct";
import { CartGlobalState } from "../../reducers/types";

describe("ProductCard Component", () => {
  const product: IProduct = {
    createdAt: "2021-03-03",
    id: "1",
    image: "https://localhost/image",
    name: "Mock Product",
    price: "2232.00",
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
    expect(screen.getByTestId("product-card-price")).toBeInTheDocument();
    expect(screen.getByTestId("product-card-price").innerHTML).toEqual(
      "R$ 2.232,00"
    );
  });

  it("Should be able to add product if click on button", () => {
    const initialState: CartGlobalState = {
      products: [],
    };

    const dispatch = jest.fn();

    render(
      <cartContext.Provider
        value={{
          cartState: initialState,
          dispatch: dispatch,
        }}
      >
        <ProductCart
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          id={product.id}
          stock={product.stock}
          createdAt={product.createdAt}
        />
      </cartContext.Provider>
    );

    const [addProduct] = screen.getAllByTestId("add-product");
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
    fireEvent.click(addProduct);

    // Delete amount, as the product object passes to the reducer and does not send amount, this responsibility is of the reducer.
    delete product.amount;
    expect(dispatch.mock.calls[0][0].payload).toStrictEqual(product);
  });
});
