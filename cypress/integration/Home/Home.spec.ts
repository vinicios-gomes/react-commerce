import myData from "../../fixtures/products.json";

describe("Product list and cart interactions", () => {
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad: (win) => {
        let nextData;

        Object.defineProperty(win, "__NEXT_DATA__", {
          set(o) {
            o.props.pageProps.products = myData.products;
            nextData = o;
          },
          get() {
            return nextData;
          },
        });
      },
    });
  });

  it("Should be able to list all products after render page", () => {
    cy.get("[data-cy=product-card]").should("have.length", 2);

    cy.get("header > strong").first().should("have.text", "My Mocked Product");
    cy.get("header > strong").last().should("have.text", "My Mocked Product 2");

    cy.get("header > span").first().should("have.text", "R$ 289,00");
    cy.get("header > span").last().should("have.text", "R$ 281,00");
  });

  it("should be able to add product to cart", () => {
    cy.get("[data-testid=add-product]").first().click();

    cy.get("[data-cy=header-cart-total]").should("be.visible");
    cy.get("[data-cy=header-cart-total]").should("have.text", "1 Products");

    cy.get("[data-testid=add-product]").last().click();
    cy.get("[data-cy=header-cart-total]").should("have.text", "2 Products");
  });

  it("should be able to add product to cart and navigate to cart to view the products", () => {
    cy.get("[data-testid=add-product]").first().click();
    cy.get("[data-testid=add-product]").last().click();

    cy.get("[data-cy=header-cart-link]").click();
    cy.url().should("include", "/cart");

    cy.get("tbody > tr > td > strong")
      .first()
      .should("have.text", "My Mocked Product");
    cy.get("tbody > tr > td > span").first().should("have.text", "R$ 289,00");
    cy.get("tbody > tr > td > div > input[type=text]")
      .first()
      .should("have.value", "1");
  });

  it("should be able to remove product of the cart if amount decrement reach zero", () => {
    cy.get("[data-testid=add-product]").first().click();
    cy.get("[data-cy=header-cart-link]").click();
    cy.url().should("include", "/cart");

    cy.get("[data-cy=product-table-list-item]").should("have.length", 1);

    cy.get("tbody > tr > td > div > button[data-testid=cart-decrement-product]")
      .first()
      .click();

    cy.get("[data-cy=product-table-list-item]").should("have.length", 0);
  });

  it("should be able to update the one amount of the product and continue to checkout", () => {
    cy.get("[data-testid=add-product]").first().click();
    cy.get("[data-testid=add-product]").last().click();

    cy.get("[data-cy=header-cart-link]").click();
    cy.url().should("include", "/cart");

    cy.get("tbody > tr > td > strong")
      .first()
      .should("have.text", "My Mocked Product");
    cy.get("tbody > tr > td > span").first().should("have.text", "R$ 289,00");
    cy.get("tbody > tr > td > div > input[type=text]")
      .first()
      .should("have.value", "1");

    cy.get("tbody > tr > td > div > button[data-testid=cart-increment-product]")
      .first()
      .click();

    cy.get("tbody > tr > td > div > input[type=text]")
      .first()
      .should("have.value", "2");

    cy.get("[data-cy=cart-subtotal]").first().should("have.text", "R$ 578,00");
    cy.get("[data-cy=cart-continue-checkout]")
      .should("have.text", "Continue to checkout")
      .click();
  });
});
