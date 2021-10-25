import { useMemo, useState } from "react";
import { ICart } from "../../interface/ICart";
import { ICartItem, IProduct } from "../../interface";

export const useCart = () => {
  const [cart, setCart] = useState<ICart>({
    cartItems: [],
    shipping_value: 19.9,
  });

  const setItems = (cartItems: ICartItem[]) =>
    setCart({
      cartItems,
    });

  function findByProduct(productId: number) {
    return cart.cartItems.find(
      (item) => item.product.id === productId
    ) as ICartItem;
  }

  const decreaseProductQuantity = (product: IProduct) => {
    let cartItem = findByProduct(product.id);
    if (!cartItem || cartItem.quantity === 1) {
      cart.cartItems.splice(
        cart.cartItems.findIndex((item) => item.product.id === product.id),
        1
      );
      setItems(cart.cartItems);
      return;
    }
    const updatedList = cart.cartItems.map((ci) => {
      if (ci.product.id === product.id) {
        ci.quantity--;
      }
      return ci;
    }) as ICartItem[];
    setItems(updatedList);
  };

  const increaseProductQuantity = (product: IProduct) => {
    let cartItem = findByProduct(product.id);
    if (!cartItem) {
      cartItem = {
        product: product,
        quantity: 1,
        price: product.price,
      };
      setItems([...cart.cartItems, cartItem]);
      return;
    }
    const updatedList = cart.cartItems.map((ci) => {
      if (ci.product.id === product.id) {
        ci.quantity++;
      }
      return ci;
    }) as ICartItem[];
    setItems(updatedList);
  };

  const totalCart = useMemo(() => {
    if (!cart.cartItems.length) {
      return 0.0;
    }
    return cart.cartItems
      .map((ci) => ci.price * ci.quantity)
      .reduce((prev, current) => prev + current)
      .toFixed(2);
  }, [cart.cartItems]);
  
  return {
    cart,
    setCart,
    setItems,
    decreaseProductQuantity,
    increaseProductQuantity,
    totalCart,
  };
};
