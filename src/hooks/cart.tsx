import { ReactElement, ReactNode, useReducer, createContext } from "react";
import { cartReducer } from "../reducers/cart";
import { CartGlobalState, ContextType } from "../reducers/types";

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps): ReactElement {
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
