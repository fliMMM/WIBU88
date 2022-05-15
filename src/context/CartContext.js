import { useEffect } from "react";
import { createContext, useReducer, useContext, useState } from "react";
import { ProductContext } from "./ProductContext";
import { AuthContext } from "./AuthContext";
import { apiUrl } from "./constants";
import axios from "axios";

export const CartContext = createContext(null);

function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(0);
  const { listProduct } = useContext(ProductContext);
  const {
    authState: { user },
  } = useContext(AuthContext);

  const addToCart = async (id) => {
    if (user !== null) {
      const data = { userId: user._id, productId: id };
      const res = await axios.post(`${apiUrl}/cart/create`, data);
      return res;
    }
    const p = listProduct.filter((item) => item._id === id);
    const name = p[0].name;
    const image = p[0].image;
    const price = p[0].price;
    const newCart = { name, image, price, quantity: 1, total: 0 };

    setCart([...cart, { ...newCart }]);
  };

  const getCartList = async () => {
    try {
      const res = await axios.get(`${apiUrl}/cart/`);
      setAmount(res.data.data.length);
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  const deleteCart = async (id) => {
    try {
      const res = await axios.delete(`${apiUrl}/cart/delete/${id}`);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }

  const updateToPaidCart = async() =>{
    try {
      const res = await axios.put(`${apiUrl}/cart/update`);
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const value = { addToCart, cart, getCartList ,deleteCart, updateToPaidCart, amount };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContextProvider;
