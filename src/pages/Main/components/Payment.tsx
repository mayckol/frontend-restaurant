import { MaskCurrency } from "../../../helpers/Currency";
import styles from "./styles.module.css";
import { CartContext } from "../../../context/CartContext";
import { useContext, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  DatePickerComponent,
  InputTypeCardNumber,
  InputTypeCVV,
} from "../../../components/";

interface IPaymentDialog {
  isVisible: boolean;
  toggleIsVisible: () => void;
}
export function Payment({ isVisible, toggleIsVisible }: IPaymentDialog) {
  const [startDate, setStartDate] = useState(new Date());
  const [cardNumber, setCardNumber] = useState("");
  const [cardCVV, setCardCVV] = useState(undefined);
  const {
    totalCart,
    cartItems,
    shipping_value: shippingValue,
  } = useContext(CartContext);

  return isVisible && cartItems.length > 0 ? (
    <div className={styles.paymentContainer}>
      <span className={styles.paymentCloseButton} onClick={toggleIsVisible} />
      <form autoComplete="off" className={styles.wrapperForm}>
        <h1 className={styles.paymentTitle}>payment details</h1>
        <div className={styles.paymentInputs}>
          <input type="text" name="card-name" placeholder="name on card" />
          <InputTypeCardNumber value={cardNumber} setValue={setCardNumber} />
          <div className={styles.groupHorizontalInputs}>
            <DatePickerComponent
              setStartDate={setStartDate}
              dateFormat="MM/yyyy"
              startDate={startDate}
            />
            <InputTypeCVV value={cardCVV} setValue={setCardCVV} />
          </div>
        </div>
        <button className={styles.btnPayTotal} type="button">
          pay {<MaskCurrency value={totalCart + shippingValue} />}
        </button>
      </form>
    </div>
  ) : (
    <></>
  );
}
