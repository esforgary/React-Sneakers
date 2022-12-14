import React from "react";
import {Link} from "react-router-dom";

import AppContext from "../../context";
import { useCart } from "../Hooks/useCart";

import styles from "./Header.module.scss";

function Header() {
  const {setCartOpened} = React.useContext(AppContext);  
  const {totalPrice} = useCart();
    return (
        <header className="d-flex justify-between align-center p-40">
          <Link to={process.env.PUBLIC_URL + "/"}>
            <div className="d-flex align-center">
               <img height={40} width={40} src={process.env.PUBLIC_URL + "/img/logo.png"} alt="logo"/>
                <div>
                    <h3 className="text-uppercase">React Sneakers</h3>
                    <p className="opacity-5">Магазин лучших кроссовок</p>
                </div> 
            </div> 
          </Link>
            <ul className="d-flex">
                <li onClick={() => setCartOpened(true)} className="mr-25 cu-p">
                    <img height={18} width={18} src={process.env.PUBLIC_URL + "/img/cart.svg"} alt="cart"/>
                    <span>{totalPrice > 0 ? `${totalPrice} грн.` : null}</span>
                </li>
                <li className="mr-20 cu-p">
                    <Link to={process.env.PUBLIC_URL + "/favorites"}>
                      <img height={18} width={18} src={ process.env.PUBLIC_URL + "/img/favorite.svg"} alt="favorite"/>
                    </Link>
                </li>
                <li className="cu-p">
                  <Link to={process.env.PUBLIC_URL + "/orders"}>
                    <img height={18} width={18} src={process.env.PUBLIC_URL + "/img/user.svg"} alt="user"/>
                    </Link>
                </li>
            </ul>            
        </header>
    );
}

export default Header;
