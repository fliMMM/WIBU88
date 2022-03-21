import React from "react";
import data from "./fakeData";
import { Button } from "@mui/material";
import { useState } from "react";
import styles from "./cart.module.css";
function Cart() {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const handleInput = (e) => {
    if (e.target.value === "") {
      setQuantity(0);
    } else {
      const temp = parseInt(e.target.value);
      if (temp) {
        setQuantity(temp);
      }
    }
  };
  return (
    <div className={styles.container}>
      {data.map((item, index) => {
        return (
          <div key={index} className={styles.cart}>
            <img className={styles.left} src={item.image} alt="phôto" />
            <div className={styles.right}>
              <p>{item.name}</p>
              <div className={styles.quantity}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDecreaseQuantity}
                >
                  -
                </Button>
                <input value={quantity} onChange={(e) => handleInput(e)} />
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleIncreaseQuantity}
                >
                  +
                </Button>
              </div>
            </div>
            <p className={styles.price}>
              {new Intl.NumberFormat("de-De", {
                style: "currency",
                currency: "VND",
              }).format(item.price * quantity)}
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
