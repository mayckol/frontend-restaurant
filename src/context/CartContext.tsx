import { createContext, ReactNode } from "react";
import { ICart } from "../interface/ICart";
import { useCart } from "./hooks";

type Props = {
  children: ReactNode;
};

const CartContext = createContext<ICart>({ cartItems: [] } as ICart);

function CartProvider({ children }: Props) {
  const {
    cart,
    setItems,
    decreaseProductQuantity,
    increaseProductQuantity,
    totalCart,
  } = useCart();

  return (
    <CartContext.Provider
      value={{
        cartItems: cart.cartItems,
        setItems,
        decreaseProductQuantity,
        increaseProductQuantity,
        shipping_value: 9.9,
        totalCart: Number(totalCart),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
