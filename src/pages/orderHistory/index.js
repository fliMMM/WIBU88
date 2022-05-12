import { Stack } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import {orderContext} from '../../context/OrderContext';

function OrderHistory(){

  const {getHistory} = useContext(orderContext);
  const [order, setOrder] = useState([]);

  const getData = async () =>{
    const res = await getHistory();
    setOrder(res.data);
  }
  useEffect(()=>{
    getData();
  },[])

  console.log(order);
  return(
    <Stack ml={50} mr={50} direction='column'>
      {order.map((item, index)=>{
        return(
          <Stack key={index} direction='column'>
            <Stack>
              {item.products.map((i,index)=>{
                return(<h1 key={index}>hihi</h1>)
              })}
            </Stack>
          </Stack>
        )
      })}
    </Stack>
  )
}

export default OrderHistory;