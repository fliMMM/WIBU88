import { useEffect } from "react";
import { createContext, useReducer, useContext, useState } from "react";
import { ProductContext } from "./ProductContext";


export const CartContext = createContext(null);


function CartContextProvider ({children}){
  const [cart, setCart] = useState([]);
  const {listProduct} = useContext(ProductContext);

  const addToCart = (id) =>{
    const p = listProduct.filter((item) => item._id === id);
    const name = p[0].name;
    const image = p[0].image;
    const price = p[0].price;
    const newCart = {name,image,price,quantity: 1, total: 0}
    
    setCart([...cart,{...newCart}]);
  }

  useEffect(()=>{
      localStorage.setItem('cart', JSON.stringify(cart));
  },[cart])
  const value = {addToCart, cart}
  return(
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider