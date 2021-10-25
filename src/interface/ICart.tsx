import { ICartItem } from "./ICartItem";
import { IProduct } from "./IProduct";

export interface ICart {
  cartItems?: ICartItem[];
  shipping_value?: number;
  totalCart?: number;
  setItems?(cartItems: ICartItem[]): void;
  decreaseProductQuantity?(product: IProduct): void;
  increaseProductQuantity?(product: IProduct): void;
}
