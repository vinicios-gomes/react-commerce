import { ReactElement, ReactNode, useReducer, createContext } from "react";
import { cartReducer } from "../reducers/cart";
import { CartGlobalState, ContextType } from "../reducers/types";

export function CartStore({ children }: { children: ReactNode }): ReactElement {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  return (
    <cartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </cartContext.Provider>
  );
}

export const cartContext = createContext({} as ContextType);
export const initialState: CartGlobalState = {
  products: [],
};
