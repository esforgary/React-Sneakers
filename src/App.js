import React from "react";
import axios from "axios";
import {Route, Routes} from "react-router-dom";

import AppContext from "./context";

import Header from "./components/Header";
import Drawer from "./components/Drawer";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";  
import Orders from "./pages/Orders";

function App() {
  const [isLoading, setIsLoading] = React.useState(true);  
  const [favorites, setFavorites] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);  
  const [cartOpened, setCartOpened] = React.useState(false);
  
  React.useEffect(() => {
    (async ()=> {     
      try {
        const [cartsRes, itemsRes, favoritesRes] = await Promise.all([
          axios.get('https://637691c4b5f0e1eb850f3de5.mockapi.io/cart'), 
          axios.get('https://637691c4b5f0e1eb850f3de5.mockapi.io/items'), 
          axios.get('https://637691c4b5f0e1eb850f3de5.mockapi.io/favorites')
        ])    

        setIsLoading(false);
        setFavorites(favoritesRes.data);
        setCartItems(cartsRes.data);
        setItems(itemsRes.data);
      } catch (error) {
        alert('Ошибка загрузки данных');
        console.error(error);
      }
    })();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItems = cartItems.find(item =>  Number(item.parentId) === Number(obj.id))
      if (findItems) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://637691c4b5f0e1eb850f3de5.mockapi.io/cart/${findItems.id}`);
      } else {
        setCartItems(prev => [...prev, obj]);
        const {data} = await axios.post('https://637691c4b5f0e1eb850f3de5.mockapi.io/cart', obj);
        setCartItems(prev => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {...item, id: data.id}
          };
          return item;
        }));
      }       
    } catch (error) {
      console.error(error);
      alert('Не удалось добавить товар в корзину..');
    }
  };

  const onRemoveFromCart = (id) => {
    try {
      axios.delete(`https://637691c4b5f0e1eb850f3de5.mockapi.io/cart/${id}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
    } catch (error) {
      console.error(error);
      alert('Не удалось удалить товар из корзины');
    }
  };

  const isItemAddedToCart = (id) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id));
  };  

  const isItemAddedToFavorited = (id) => {
    return favorites.some(obj => Number(obj.parentId) === Number(id));
  };  

  const onAddToFavorites = async (obj) => {
    try {
      const favoritedItem = favorites.find(fevoriteObj => Number(fevoriteObj.parentId) === Number(obj.parentId))
      if (favoritedItem) {
        axios.delete(`https://637691c4b5f0e1eb850f3de5.mockapi.io/favorites/${obj.id}`);
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
      const {data} = await axios.post('https://637691c4b5f0e1eb850f3de5.mockapi.io/favorites', obj);
      setFavorites(prev => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в избранное');
    }
  };

  // Main //
  return (
    <AppContext.Provider value={{items, cartItems, onAddToCart, isItemAddedToCart, cartOpened, setCartOpened, setCartItems, onRemoveFromCart, favorites, setFavorites, onAddToFavorites, isItemAddedToFavorited, isLoading}}>
      <div className="wrapper clear">
      <Drawer/>
        <Header/>
        <Routes>
          <Route path="" exact element={<Home/>}/>
          <Route path="favorites" exact element={<Favorites/>}/>
          <Route path="orders" exact element={<Orders/>}/>
        </Routes>         
      </div>
    </AppContext.Provider>
  );
}

export default App;