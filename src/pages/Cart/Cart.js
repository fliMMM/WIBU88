import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import styles from "./cart.module.css";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import ProductContext from "../../context/ProductContext";
import { useEffect } from "react";

function Cart() {
  //const { cart } = useContext(CartContext);
  const [cart, setCart] = useState([]);

  console.log(cart);

  useEffect(()=>{
    const cart = JSON.parse(localStorage.getItem('cart'));
    setCart(cart);
  },[])

  // const handleIncreaseQuantity = () => {
  //   setQuantity(quantity + 1);
  // };
  // const handleDecreaseQuantity = () => {
  //   if (quantity > 0) {
  //     setQuantity(quantity - 1);
  //   }
  // };
  // const handleInput = (e) => {
  //   if (e.target.value === "") {
  //     setQuantity(0);
  //   } else {
  //     const temp = parseInt(e.target.value);
  //     if (temp) {
  //       setQuantity(temp);
  //     }
  //   }
  // };
  return (
    <div className={styles.container}>
      {cart?.map((item, index) => {
        return (
          <div key={index} className={styles.cart}>
            <img className={styles.left} src={item.image} alt="phôto" />
            <div className={styles.right}>
              <p>{item.name}</p>
              <div className={styles.quantity}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() =>{
                    item.quantity--
                  }}
                >
                  -
                </Button>
                <input value={item.quantity}  />
                <Button
                  variant="contained"
                  color="success"
                  onClick={()=>{
                    item.quantity++;
                  }}
                >
                  +
                </Button>
              </div>
            </div>
            <p className={styles.price}>
              {new Intl.NumberFormat("de-De", {
                style: "currency",
                currency: "VND",
              }).format(item.price * item.quantity)}
            </p>
          </div>
        );
      })}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button fullWidth color="success" variant="contained">
          Thanh Toán
        </Button>
      </div>
    </div>
  );
}

export default Cart;
