import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader"
import React from "react";
import AppContext from "../../context";

function Card({ id, parentId, title, price, imgUrl, onFavorite, onPlus, loading = false}) {
  const {isItemAddedToCart, isItemAddedToFavorited} = React.useContext(AppContext);

  const itemObj = {id, parentId, title, price,imgUrl};

  const onClickPlus = () => {
    onPlus(itemObj);
  }

  const onClickFavorite = () => {
    onFavorite(itemObj);
  }

  return (
    <div className={styles.card}>
      {
        loading ? (
          <ContentLoader 
          speed={2}
          width={150}
          height={220}
          viewBox="0 0 150 200"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="100" /> 
          <rect x="0" y="115" rx="5" ry="5" width="150" height="16" />
          <rect x="0" y="136" rx="5" ry="5" width="93" height="16" /> 
          <rect x="0" y="176" rx="5" ry="5" width="80" height="24" /> 
          <rect x="118" y="168" rx="5" ry="5" width="32" height="32" />
          </ContentLoader>
        ) : (
          <>
           <div>
             {onFavorite && <img className={styles.favorite} onClick={onClickFavorite} src={isItemAddedToFavorited(parentId) ? "img/liked.svg" : "img/unliked.svg"} alt="like"/>}
            </div>
              <img width={133} height={112} src={imgUrl} alt="sneakers"/>
              <h5>{title}</h5>
              <div className="d-flex justify-between align-cemter">
                <div className="d-flex flex-column">
                  <span>Цена:</span>
                  <b>{price} грн.</b>
                </div>
                {onPlus && <img className={styles.plus} onClick={onClickPlus} src={isItemAddedToCart(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"} alt="+"/>}
              </div>    
          </>
        )
      }  
    </div>
  );
}

export default Card;