import Card from "../components/Card";
import React from "react";

import AppContext from "../context";

function Favorites() {
  const {favorites, onAddToFavorites, isLoading} = React.useContext(AppContext);
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Избранное</h1>        
      </div>            
      <div className="sneakers d-flex flex-wrap">
      {(isLoading ? [...Array(4)] : favorites).map((item, index) => (
          <Card 
            key={index}
            onFavorite={onAddToFavorites}
            loading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;