import React from 'react';
import AppContext from '../../context';

import styles from "./Drawer.module.scss";

const Info = ({title, image, description}) => {
  
  const {setCartOpened} = React.useContext(AppContext);

  return (
    <div className={styles.cartEmpty}>
      <img className="mb-20" width="120px" src={image} alt="empty-cart"/>
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button className={styles.greenBtn} onClick={() => setCartOpened(false)}><img src="img/arrow.svg" alt="arrow"/> Вернуться назад</button>
    </div>
  )
}

export default Info;
