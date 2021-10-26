import { MaskCurrency } from "../../../helpers/Currency";
import styles from "./styles.module.css";
import { CartContext } from "../../../context/CartContext";
import React, { useContext, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useCart } from "../../../context/hooks";
import {
  DatePickerComponent,
  InputTypeCardNumber,
  InputTypeCVV,
} from "../../../components/";
import { ICartItem } from "../../../interface";

interface IPaymentDialog {
  isVisible: boolean;
  toggleIsVisible: () => void;
  setIsSuccessModal: (value: boolean) => void;
}

interface ISubmitRequest {
  paymentData: {
    startDate: Date;
    cardNumber: string;
    cardCVV: string;
  };
  cartItems: ICartItem[];
}

export function Payment({
  isVisible,
  toggleIsVisible,
  setIsSuccessModal,
}: IPaymentDialog) {
  const [startDate, setStartDate] = useState(new Date());
  const [cardNumber, setCardNumber] = useState("");
  const [cardCVV, setCardCVV] = useState(undefined);
  const { store } = useCart();
  const {
    totalCart,
    cartItems,
    shipping_value: shippingValue,
    setItems,
  } = useContext(CartContext);

  async function submit(e: React.SyntheticEvent) {
    e.preventDefault();
    setItems([]);
    const data: ISubmitRequest = {
      paymentData: {
        startDate,
        cardCVV,
        cardNumber: cardNumber.replace(/\D/g, ""),
      },
      cartItems,
    };
    await store(data)
      .then(() => {
        toggleIsVisible();
      })
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => {
        setItems([]);
        setIsSuccessModal(true);
        setTimeout(() => {
          setIsSuccessModal(false);
        }, 2000);
      });
  }
  return isVisible && cartItems.length > 0 ? (
    <div className={styles.paymentContainer}>
      <span className={styles.paymentCloseButton} onClick={toggleIsVisible} />
      <form onSubmit={submit} autoComplete="off" className={styles.wrapperForm}>
        <h1 className={styles.paymentTitle}>payment details</h1>
        <div className={styles.paymentInputs}>
          <input type="text" name="card-name" placeholder="name on card" />
          <InputTypeCardNumber
            value={cardNumber}
            setValue={setCardNumber}
            isRequired={true}
          />
          <div className={styles.groupHorizontalInputs}>
            <DatePickerComponent
              setStartDate={setStartDate}
              dateFormat="MM/yyyy"
              startDate={startDate}
              isRequired={true}
            />
            <InputTypeCVV
              value={cardCVV}
              setValue={setCardCVV}
              isRequired={true}
            />
          </div>
        </div>
        <button className={styles.btnPayTotal} type="submit">
          pay {<MaskCurrency value={totalCart + shippingValue} />}
        </button>
      </form>
    </div>
  ) : (
    <></>
  );
}
