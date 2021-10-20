import { formatPrice } from "./formaters";

describe("Formater Utils", () => {
  it("Return correctly price formated", () => {
    const priceFormated = formatPrice(2330.0);
    expect(priceFormated).toEqual("R$ 2.330,00");
  });
});
