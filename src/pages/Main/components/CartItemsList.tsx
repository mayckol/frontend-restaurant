import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { ProductCategories } from "../../../enum/ProductCategories";
import { MaskCurrency } from "../../../helpers/Currency";
import styles from "./styles.module.css";

interface ICartResumeProps {
  onPrepareToPay: () => void;
  isBtnPayActive: boolean;
}
export function ICartItensList({
  onPrepareToPay,
  isBtnPayActive,
}: ICartResumeProps) {
  const {
    setItems,
    increaseProductQuantity,
    decreaseProductQuantity,
    cartItems,
  } = useContext(CartContext);

  function getIconPath(categoryId: number): string {
    if (categoryId === ProductCategories.MEAL) {
      return "/icon/meal.svg";
    }
    return "/icon/drink.svg";
  }
  return (
    <>
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
      </ul>
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
          disabled={isBtnPayActive}
        >
          pay
        </button>
      </div>
    </>
  );
}
