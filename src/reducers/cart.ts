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
      return state.products.filter((product) => product.id !== action.payload);
    case TYPES.CLEAR_CART:
      return { products: [] };
  }
};
