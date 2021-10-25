import myData from "../../fixtures/products.json";

describe("Product page and ", () => {
  beforeEach(() => {
    cy.visit("/product/1", {
      onBeforeLoad: (win) => {
        let nextData;

        Object.defineProperty(win, "__NEXT_DATA__", {
          set(o) {
            o.props.pageProps.products = [myData.products[0]];
            nextData = o;
            console.info(o);
          },
          get() {
            return nextData;
          },
        });
      },
    });
  });

  it("Should be able to list product info after render page", () => {
    cy.get("[data-cy=product-data] > img").should("have.length", 1);
    cy.get("[data-cy=product-data] > div h1").should("have.length", 1);

    cy.get("[data-cy=product-stock]").should("have.text", "Stock: 65171");

    cy.get("[data-cy=product-price]").should("have.text", "Price: R$ 289,00");
  });

  it("Should be able to add product to cart and navigate to the cart", () => {
    cy.get("[data-testid=add-product-to-cart]").click();
    cy.get("[data-cy=header-cart-total]").should("have.text", "1 Products");

    cy.get("[data-cy=header-cart-link]").click();
    cy.url().should("include", "/cart");

    cy.get("tbody > tr > td > strong")
      .first()
      .should("have.text", "My Mocked Product");

    cy.get("[data-cy=cart-continue-checkout]")
      .should("have.text", "Continue to checkout")
      .click();
  });
});
