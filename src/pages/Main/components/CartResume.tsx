import styles from "./styles.module.css";
import { CartContext } from "../../../context/CartContext";
import { useContext } from "react";
import { ProductCategories } from "../../../enum/ProductCategories";
import { MaskCurrency } from "../../../helpers/Currency";

interface ICartResumeProps {
  onPrepareToPay: () => void;
}
export function CartResume({ onPrepareToPay }: ICartResumeProps) {
  const {
    cartItems,
    setItems,
    increaseProductQuantity,
    decreaseProductQuantity,
    shipping_value: shippingValue,
    totalCart
  } = useContext(CartContext);

  function getIconPath(categoryId: number): string {
    if (categoryId === ProductCategories.MEAL) {
      return "/icon/meal.svg";
    }
    return "/icon/drink.svg";
  }

  return (
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
      <ul>
        {cartItems.map((ci, idx) => {
          return (
            <li key={idx} className={styles.cartItem}>
              <span className={styles.iconCategoryProduct}>
                <img src={getIconPath(ci.product.id)} alt="icon" />
              </span>
              <h3>{ci.product.title}</h3>
              <div className={styles.groupQuantityIcons}>
                <span onClick={() => decreaseProductQuantity(ci.product)}>
                  <img src="/icon/minus-dark.svg" alt="icon" />
                </span>
                <span className={styles.quantity}>
                  {ci.quantity.toString().padStart(2, "0")}x
                </span>
                <span onClick={() => increaseProductQuantity(ci.product)}>
                  <img src="/icon/plus-dark.svg" alt="icon" />
                </span>
              </div>
              <h3>
                <MaskCurrency value={ci.product.price} />
              </h3>
            </li>
          );
        })}
        {!cartItems.length && (
          <li className={styles.emptyCart}>
            <span>Empty Cart</span>
            <img src="/icon/empty-cart.svg" alt="icon empty" />
          </li>
        )}
      </ul>
      {cartItems.length > 0 && (
        <div className={styles.btnGroup}>
          <button
            className={styles.btnClear}
            onClick={() => setItems([])}
            type="button"
          >
            clear
          </button>
          <button
            className={styles.btnPay}
            onClick={onPrepareToPay}
            type="button"
          >
            pay
          </button>
        </div>
      )}
    </div>
  );
}
