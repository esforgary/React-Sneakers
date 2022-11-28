import React from "react";
import axios from "axios";

import Card from "../components/Card";

function Orders() {  
  const [orders, setOrders] = React.useState([]);  
  const [isLoading, setIsLoading] = React.useState(true);  

  React.useEffect(() => {
    (async ()=> {
      try {
        const {data} = await axios.get('https://637691c4b5f0e1eb850f3de5.mockapi.io/orders');
        setOrders(data.map((obj) => obj.items).flat());
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при запросе заказов..");
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Заказы</h1>        
      </div>            
      <div className="sneakers d-flex flex-wrap">
      {(isLoading ? [...Array(4)] : orders).map((item, index) => (
          <Card 
            key={index} 
            loading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;