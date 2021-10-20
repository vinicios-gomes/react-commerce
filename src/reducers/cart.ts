import { ActionType, CartGlobalState, TYPES } from "./types";

export const cartReducer = (
  state: CartGlobalState,
  action: ActionType
): any => {
  switch (action.type) {
    case TYPES.ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case TYPES.REMOVE_PRODUCT:
      return state.products.filter((product) => product.id !== action.payload);
    case TYPES.CLEAR_CART:
      return { products: [] };
  }
};
