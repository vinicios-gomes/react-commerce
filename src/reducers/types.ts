import { Dispatch } from "react";
import { IProduct } from "../pages/product/IProduct";

export interface CartGlobalState {
  products: IProduct[];
}

export type ActionType = {
  type: string;
  payload?: any;
};

export type ContextType = {
  cartState: CartGlobalState;
  dispatch: Dispatch<ActionType>;
};
