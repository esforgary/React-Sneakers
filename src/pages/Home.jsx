import Card from "../components/Card";
import AppContext from "../context";
import React from "react";
import { useSearch } from "../components/Hooks/useSearch";

function Home() {   
  const {items, onAddToCart, isLoading, onAddToFavorites} = React.useContext(AppContext);
  const {searchValue, onChangeSearchInput, setSearchValue} = useSearch();

    const renderItems = () => {
      const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue))
      
      return ((isLoading ? [...Array(12)] : filteredItems).map((item, index) => (
            <Card 
              key={index}
              onFavorite={(obj) => onAddToFavorites(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              loading={isLoading}
              {...item}
            />
        ))
      );
    } 
  
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className="search-block d-flex">
          <img src="img/search.svg" alt="search"/>
          {searchValue && <img onClick={() => setSearchValue('')} className="clear remove-btn" src="img/close.svg" alt="close"/>}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>
        </div>
      </div>            
      <div className="sneakers d-flex flex-wrap">
        {renderItems()}
      </div>
    </div>
  );
}

export default Home;