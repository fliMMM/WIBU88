import axios from "axios";
import { createContext, useState } from "react";
import { apiUrl } from "./constants";

export const orderContext = createContext(null);

const OrderContextProvider = ({children}) =>{
  const [order, setOrder] = useState([]);

  const addToOrder = (list) =>{
    setOrder(list);
  }

  const addNewOrder = async(data) =>{
    try{
      const res = await axios.post(`${apiUrl}/orders/`, data)
      return res.data;
    }catch(e){
      console.log(e);
    }
  }

  const getHistory = async () =>{
    try{
      const res  = await axios.get(`${apiUrl}/orders/`);
      return res.data
    }catch(e){
      console.log(e);
    }
  }

  const value = {addToOrder, order,addNewOrder, getHistory}
  return(
    <orderContext.Provider value = {value}>
      {children}
    </orderContext.Provider>
  )
}

export default OrderContextProvider;