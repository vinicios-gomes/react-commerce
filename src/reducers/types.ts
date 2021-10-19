import { Dispatch } from "react";
import { IProduct } from "../pages/product/IProduct";

export interface GlobalStateInterface {
  products: IProduct[];
}

export type ActionType = {
  type: string;
  payload?: any;
};

export type ContextType = {
  globalState: GlobalStateInterface;
  dispatch: Dispatch<ActionType>;
};
