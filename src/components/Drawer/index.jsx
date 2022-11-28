import axios from "axios";
import React from "react";

import Info from "./Info";
import AppContext from "../../context";
import { useCart } from "../Hooks/useCart";

import styles from "./Drawer.module.scss";

const delay = () => new Promise ((resolve) => setTimeout(resolve, 1000));

function Drawer() {
  const {cartItems, setCartItems, cartOpened, setCartOpened, onRemoveFromCart} = React.useContext(AppContext);
  const {totalPrice} = useCart();

  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);

      const {data} = await axios.post('https://637691c4b5f0e1eb850f3de5.mockapi.io/orders', {items: cartItems});
      
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);  
      
      for (let index = 0; index < cartItems.length; index++) {
        const item = cartItems[index];
        await axios.delete('https://637691c4b5f0e1eb850f3de5.mockapi.io/cart/' + item.id);
        await delay; 
      }
      
    } catch (error) {
      alert('Не удалось оформить заказ..');
    }
    setIsLoading(false);
  }

  return (
    <div className={`${styles.overlay} ${cartOpened ? styles.overlayVisible : null}`}>
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between">
          Корзина 
          <img onClick={() => setCartOpened(false)} className={styles.removeBtn} src="img/btn-remove.svg" alt="в"/>
        </h2>
        {
          cartItems.length > 0 ? (
          <>
            <div className="items flex">
              {cartItems.map((obj) => (
                <div key={obj.id} className={styles.cartItem}>
                  <div style={{backgroundImage: `url(${obj.imgUrl})`}} className={styles.cartItemImg}></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} грн.</b>
                  </div>
                  <img className={styles.removeBtn} onClick={() => onRemoveFromCart(obj.id)} src="img/btn-remove.svg" alt="в"/>
                </div>
              ))}
            </div>
            <div className={styles.cartTotalBlock}>
              <ul>
                <li>
                  <span>Итого:</span>
                    <div></div>
                    <b>{totalPrice} грн.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{totalPrice / 100 * 5} грн.</b>
                </li>
              </ul>
              <button className={styles.greenBtn} disabled={isLoading} onClick={onClickOrder}>
                Оформить заказ 
                <img src="img/arrow.svg" alt="arrow"/>
              </button>
            </div>
          </>
          ) : (
            <Info
              title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
              description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
              image={isOrderComplete ? "img/complete-order.jpg" : "img/empty-cart.jpg"}
            />
          )
          }                
      </div>
    </div>
  );
}

export default Drawer;