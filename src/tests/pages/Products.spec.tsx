import { render, screen, fireEvent } from "@testing-library/react";
import Posts, { getServerSideProps } from "../../pages/product/[id]";
import { IProduct } from "../../pages/product/IProduct";
import { mocked } from "ts-jest/utils";
import { getProductById } from "../../services/api";
import { cartContext, initialState } from "../../hooks/cart";
import { CartGlobalState } from "../../reducers/types";
import Product from "../../pages/product/[id]";

jest.mock("../../services/api");

describe("Home Page", () => {
  it("Render correctly", () => {
    const products: IProduct[] = [
      {
        createdAt: "2021-03-03",
        id: "1",
        image: "https://localhost/image",
        name: "Mock Product",
        price: "232.00",
        stock: 23,
      },
    ];

    render(<Posts products={products} />);

    expect(screen.getByText("Mock Product")).toBeInTheDocument();
    expect(screen.getByText("R$ 232,00")).toBeInTheDocument();
    expect(screen.getByAltText("Mock Product")).toBeInTheDocument();
    expect(screen.getByText("Stock: 23")).toBeInTheDocument();
  });

  it("Should be able to add product to cart", () => {
    const initialState: CartGlobalState = {
      products: [],
    };

    const dispatch = jest.fn();

    const product: IProduct[] = [
      {
        createdAt: "2021-03-03",
        id: "1",
        image: "https://localhost/image",
        name: "Mock Product",
        price: "232.00",
        stock: 23,
      },
    ];

    render(
      <cartContext.Provider
        value={{ cartState: initialState, dispatch: dispatch }}
      >
        <Product products={product} />
      </cartContext.Provider>
    );

    const [addProductToCartButton] = screen.getAllByTestId(
      "add-product-to-cart"
    );
    fireEvent.click(addProductToCartButton);
    expect(dispatch.mock.calls[0][0].payload).toStrictEqual({
      createdAt: "2021-03-03",
      id: "1",
      image: "https://localhost/image",
      name: "Mock Product",
      price: "232.00",
      stock: 23,
    });
  });

  it("Load get product data", async () => {
    const fetchMocked = mocked(getProductById);

    fetchMocked.mockReturnValueOnce({
      createdAt: "2021-03-03",
      id: "1",
      image: "https://localhost/image",
      name: "Mock Product",
      price: "232.00",
      stock: 23,
    } as any);

    const response = await getServerSideProps({ params: { id: "1" } } as any);
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          products: expect.objectContaining({
            createdAt: "2021-03-03",
            id: "1",
            image: "https://localhost/image",
            name: "Mock Product",
            price: "232.00",
            stock: 23,
          }),
        },
      })
    );
  });
});
