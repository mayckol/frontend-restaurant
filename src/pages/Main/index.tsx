import { ProductCategories } from "../../enum/ProductCategories";
import { CarouselComponent } from "./components/Carousel";
import styles from "./styles.module.css";
import { CartProvider } from "../../context/CartContext";
import { CartResume } from "./components/CartResume";
import { useState } from "react";
import { Payment } from "./components/Payment";

export function MainPage() {
  const [isDialogPaymentActive, setIsDialogPaymentActive] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  function onPrepareToPay() {
    setIsDialogPaymentActive(!isDialogPaymentActive);
  }

  return (
    <CartProvider>
      <>
        <CartResume
          onPrepareToPay={onPrepareToPay}
          isBtnPayActive={isDialogPaymentActive}
          isSuccessModal={isSuccessModal}
        />
        <h1 className={`text-primary-lg ${styles.titleDarkYellow}`}>Meals</h1>
        <CarouselComponent {...{ category: ProductCategories.MEAL }} />
        <h1 className={`text-primary-lg ${styles.titleLightBrown}`}>Drinks</h1>
        <CarouselComponent {...{ category: ProductCategories.DRINK }} />
        <Payment
          isVisible={isDialogPaymentActive}
          toggleIsVisible={onPrepareToPay}
          setIsSuccessModal={setIsSuccessModal}
        />
      </>
    </CartProvider>
  );
}
