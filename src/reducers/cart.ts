import { IProduct } from "../pages/product/IProduct";
import { ActionType, CartGlobalState, TYPES } from "./types";

export const cartReducer = (
  state: CartGlobalState,
  action: ActionType
): any => {
  switch (action.type) {
    case TYPES.ADD_PRODUCT:
      const productExists: IProduct = state.products.filter(
        (product) => product.id === action.payload.id
      )[0];

      const productsInStore: IProduct[] = state.products.filter(
        (product) => product.id !== action.payload.id
      );

      if (productExists) {
        if (productExists.amount) {
          return {
            ...state,
            products: [
              ...productsInStore,
              { ...productExists, amount: productExists.amount + 1 },
            ],
          };
        }
        return {
          ...state,
          products: [...productsInStore, { ...productExists, amount: 1 }],
        };
      }

      if (!action.payload.amount) {
        action.payload = { ...action.payload, amount: 1 };
      }

      return { ...state, products: [...state.products, action.payload] };
    case TYPES.REMOVE_PRODUCT:
      const filteredProducts = state.products.filter(
        (product) => product.id !== action.payload
      );
      return { ...state, products: filteredProducts };
    case TYPES.CLEAR_CART:
      return { ...state, products: [] };
    case TYPES.UPDATE_AMOUNT_PRODUCT_IN_CART:
      if (action.payload.amount <= 0) {
        const cartOutProduct = state.products.filter(
          (product) => product.id !== action.payload.id
        );
        return { products: cartOutProduct };
      }

      const productUpdate = state.products.filter(
        (product) => product.id === action.payload.id
      )[0];

      if (!productUpdate) {
        return console.error("An error has occurred when changing the amount!");
      }

      if (productUpdate.amount > 0) {
        const productList = state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, amount: action.payload.amount }
            : product
        );

        return {
          products: [...productList],
        };
      }
  }
};
