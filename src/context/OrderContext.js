import { createContext, useState } from "react";

export const orderContext = createContext(null);

const OrderContextProvider = ({children}) =>{
  const [order, setOrder] = useState([]);

  const addToOrder = (list) =>{
    setOrder(list);
  }

  const value = {addToOrder, order}
  return(
    <orderContext.Provider value = {value}>
      {children}
    </orderContext.Provider>
  )
}

export default OrderContextProvider;