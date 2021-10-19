import { ActionType, CartGlobalState } from "./types";

export const cartReducer = (
  state: CartGlobalState,
  action: ActionType
): any => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    case "REMOVE_PRODUCT":
      return state.products.filter((product) => product.id !== action.payload);
    case "RESET_STORE":
      return { products: [] };
  }
};
