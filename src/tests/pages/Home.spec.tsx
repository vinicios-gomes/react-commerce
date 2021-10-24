import { render, screen } from "@testing-library/react";
import Home, { getStaticProps } from "../../pages/";
import { IProduct } from "../../pages/product/IProduct";
import { mocked } from "ts-jest/utils";
import { getAllProducts } from "../../services/api";

jest.mock("../../services/api");

describe("Home Page", () => {
  it("Render Correctly", () => {
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

    render(<Home products={product} />);

    expect(screen.getByText("Mock Product")).toBeInTheDocument();
    expect(screen.getByText("R$ 232,00")).toBeInTheDocument();
    expect(screen.getByText("More Details")).toBeInTheDocument();
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const fetchMocked = mocked(getAllProducts);

    fetchMocked.mockReturnValueOnce([
      {
        createdAt: "2021-03-03",
        id: "1",
        image: "https://localhost/image",
        name: "Mock Product",
        price: "232.00",
        stock: 23,
      },
    ] as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          products: [
            expect.objectContaining({
              name: "Mock Product",
              price: "232.00",
              image: "https://localhost/image",
            }),
          ],
        },
      })
    );
  });
});
