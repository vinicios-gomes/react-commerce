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
      const productUpdate = state.products.filter(
        (product) => product.id === action.payload.id
      )[0];

      const arrayOfProducts = state.products.filter(
        (product) => product.id !== action.payload.id
      );

      if (productUpdate) {
        if (productUpdate.amount <= 0) {
          const productIndex = state.products.findIndex(
            (p) => p.id === action.payload.id
          );
          if (productIndex >= 0) {
            const newArr = state.products.slice().splice(productIndex, 1);
            return { ...state, products: newArr };
          }
        }

        if (productUpdate.amount > 0) {
          productUpdate.amount = action.payload.amount;
          return {
            ...state,
            products: [...arrayOfProducts, productUpdate],
          };
        }
      }
  }
};
