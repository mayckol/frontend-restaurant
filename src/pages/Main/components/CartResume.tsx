import styles from "./styles.module.css";
import { CartContext } from "../../../context/CartContext";
import { ReactNode, useContext } from "react";
import { MaskCurrency } from "../../../helpers/Currency";
import { ICartItensList } from "./CartItemsList";

interface ICartResumeProps {
  onPrepareToPay: () => void;
  isBtnPayActive: boolean;
  isSuccessModal: boolean;
}
export function CartResume({
  onPrepareToPay,
  isBtnPayActive,
  isSuccessModal,
}: ICartResumeProps) {
  const {
    cartItems,
    shipping_value: shippingValue,
    totalCart,
  } = useContext(CartContext);

  function getBoxContainer(): ReactNode {
    if (!cartItems.length) {
      return (
        <span className={styles.emptyCart}>
          <span>Empty Cart</span>
          <img src="/icon/empty-cart.svg" alt="icon empty" />
        </span>
      );
    }
    if (cartItems.length > 0) {
      return (
        <ICartItensList
          onPrepareToPay={onPrepareToPay}
          isBtnPayActive={isBtnPayActive}
        />
      );
    }
  }

  return !isSuccessModal ? (
    <div className={styles.cartResume}>
      {cartItems.length > 0 && (
        <div>
          <h1 className={styles.total}>
            TOTAL: <MaskCurrency value={totalCart} />
          </h1>
          <h1 className={styles.total}>
            Shipping Value: <MaskCurrency value={shippingValue} />
          </h1>
        </div>
      )}
      {getBoxContainer()}
    </div>
  ) : (
    <div className={`${styles.cartResume} ${styles.modalSuccess}`}>
      <span>Success, Order successfully placed!</span>
    </div>
  );
}
