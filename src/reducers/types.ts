import { Dispatch } from "react";
import { IProduct } from "../pages/product/IProduct";

export interface CartGlobalState {
  products: IProduct[];
}

export type ActionType = {
  type: TYPES;
  payload?: any;
};

export type ContextType = {
  cartState: CartGlobalState;
  dispatch: Dispatch<ActionType>;
};

export enum TYPES {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  CLEAR_CART,
}
