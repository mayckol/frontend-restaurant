import { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./styles.module.css";
import { useProduct } from "../../../hooks";
import { IProduct } from "../../../interface";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { MaskCurrency } from "../../../helpers/Currency";

interface ICarouselComponent {
  category?: number;
}

const CarouselComponent = ({ category }: ICarouselComponent) => {
  const { getAll, products } = useProduct();
  const {
    cartItems,
    setItems,
    decreaseProductQuantity,
    increaseProductQuantity,
  } = useContext(CartContext);

  useEffect(() => {
    getAll();
  }, [getAll]);

  function updateProductQuantity(
    productId: number,
    event: React.FormEvent<HTMLInputElement>
  ) {
    const quantity = Number(event.currentTarget.value);
    const product = products.find((p) => p.id === productId) as IProduct;
    let cartItem = cartItems.find((ci) => ci.product.id === productId);
    if (!cartItem) {
      cartItem = {
        product,
        quantity,
        price: product.price,
      };
    } else {
      cartItem.quantity = quantity;
    }

    if (cartItem && cartItem.quantity === 0) {
      setItems([...cartItems.filter((ci) => ci.product.id !== productId)]);
      return;
    }
    setItems([
      ...cartItems.filter((ci) => ci.product.id !== productId),
      cartItem,
    ]);
  }

  return (
    <Carousel centerMode={true} centerSlidePercentage={70} autoPlay={true}>
      {products
        .filter((product) => {
          if (category) {
            return product.category === category;
          }
          return product;
        })
        .sort((a, b) => a.id - b.id)
        .map((product, idx) => (
          <div key={idx}>
            <img src={product.path_img} alt="item menu" />
            <div className="legend">
              <div className={styles.groupVertical}>
                <h1 className={styles.productPrice}>
                  <MaskCurrency value={product.price} />
                </h1>
                <p className={styles.productDescription}>
                  {product.description}
                </p>
                <div className={styles.groupHorizontal}>
                  <span
                    className={styles.btnQuantity}
                    onClick={() => decreaseProductQuantity(product)}
                  >
                    <img src="/icon/minus.svg" alt="item menu" />
                  </span>
                  <input
                    className={styles.productQuantity}
                    type="number"
                    name="product"
                    value={
                      cartItems?.find((p) => p.product.id === product.id)
                        ?.quantity | 0
                    }
                    onChange={(e) => updateProductQuantity(product.id, e)}
                  />
                  <span
                    className={styles.btnQuantity}
                    onClick={() => increaseProductQuantity(product)}
                  >
                    <img src="/icon/plus.svg" alt="item menu" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </Carousel>
  );
};

export { CarouselComponent };
