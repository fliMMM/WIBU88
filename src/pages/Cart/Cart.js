import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import styles from "./cart.module.css";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { orderContext } from "../../context/OrderContext";
import { useContext } from "react";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { Link} from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const {
    authState: { user },
  } = useContext(AuthContext);
  const { getCartList, deleteCart } = useContext(CartContext);
  const {addToOrder} = useContext(orderContext);

  const getAll = async () => {
    const res = await getCartList();
    setCart(res.data.data);
  };

  useEffect(() => {
    if (user !== null) {
      getAll();
    }

    if (user === null) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      setCart(cart);
    }
  }, [reload]);

  useEffect(() =>{
    addToOrder(cart);
  },[addToOrder, cart])

  const handleIncreaseQuantity = (id) => {
    const newCart = [...cart];
    const p = cart.filter((item) => item._id === id);
    p[0].quantity++;
    for (let i = 0; i < cart.length; i++) {
      if (newCart[i]._id === id) {
        newCart[i] = p[0];
        setCart(newCart);
        break;
      }
    }
  };
  const handleDecreaseQuantity = (id) => {
    const newCart = [...cart];
    const p = cart.filter((item) => item._id === id);
    if (p[0].quantity > 0) {
      p[0].quantity--;
      for (let i = 0; i < cart.length; i++) {
        if (newCart[i]._id === id) {
          newCart[i] = p[0];
          setCart(newCart);
          break;
        }
      }
    }
  };
  const handleInput = (e, id) => {
    if (e.target.value === "") {
      const newCart = [...cart];
      const p = cart.filter((item) => item._id === id);
      p[0].quantity = 0;
      for (let i = 0; i < cart.length; i++) {
        if (newCart[i]._id === id) {
          newCart[i] = p[0];
          setCart(newCart);
          break;
        }
      }
    } else {
      const temp = parseInt(e.target.value);
      if (temp) {
        const newCart = [...cart];
        const p = cart.filter((item) => item._id === id);
        p[0].quantity = temp;
        for (let i = 0; i < cart.length; i++) {
          if (newCart[i]._id === id) {
            newCart[i] = p[0];
            setCart(newCart);
            break;
          }
        }
      }
    }
  };

  const handleDeleteCart = async (id) => {
    const res = await deleteCart(id);
    if (res.success === true) {
      setReload(!reload);
    }
  };
  return (
    <>
      <>
        {user && cart.length !== 0 ? (
          <div className={styles.container}>
            {cart.map((item, index) => {
              return (
                <div key={index} className={styles.cart}>
                  <img
                    className={styles.left}
                    src={item.product.image}
                    alt="phôto"
                  />
                  <div className={styles.right}>
                    <p>{item.product.name}</p>
                    <div className={styles.quantity}>
                      {item.quantity > 0 && (
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDecreaseQuantity(item._id)}
                        >
                          -
                        </Button>
                      )}
                      {item.quantity === 0 && (
                        <Button
                          onClick={() => handleDeleteCart(item._id)}
                          variant="contained"
                          color="error"
                        >
                          Xóa
                        </Button>
                      )}
                      <input
                        value={item.quantity}
                        onChange={(e) => handleInput(e, item._id)}
                      />
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleIncreaseQuantity(item._id)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <p className={styles.price}>
                    {new Intl.NumberFormat("de-De", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.product.price * item.quantity)}
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
              <Link
                to="/order"
                style={{ textDecoration: "none", width: "100%" }}
              >
                <Button fullWidth color="success" variant="contained">
                  Thanh Toán
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <Typography
            display={user === null && "none"}
            textAlign={"center"}
            mt={40}
            variant="h1"
          >
            Ban da mua j dau :((
          </Typography>
        )}
      </>
      <>
        {user === null && (
          <div className={styles.container}>
            {cart.map((item, index) => {
              return (
                <div key={index} className={styles.cart}>
                  <img className={styles.left} src={item.image} alt="phôto" />
                  <div className={styles.right}>
                    <p>{item.name}</p>
                    <div className={styles.quantity}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDecreaseQuantity(item._id)}
                      >
                        -
                      </Button>
                      <input
                        value={item.quantity}
                        onChange={(e) => handleInput(e, item._id)}
                      />
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleIncreaseQuantity(item._id)}
                      >
                        +
                      </Button>
                    </div>
                    {item.quantity === 0 && (
                      <Button
                        onClick={() => handleDeleteCart(item._id)}
                        variant="contained"
                        color="error"
                        sx={{
                          marginTop: "15px",
                          marginLeft: "27%",
                          width: "45%",
                        }}
                      >
                        Xóa
                      </Button>
                    )}
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
        )}
      </>
    </>
  );
}

export default Cart;
