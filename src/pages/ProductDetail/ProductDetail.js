import React from "react";
import { useMediaQuery } from "@mui/material";
import { Button, Grid, Typography } from "@mui/material";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { apiUrl } from "../../context/constants";
import axios from "axios";
import { useState } from "react";
import styles from "./style.module.css";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});
function ProductDetail() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState();
  const [cart, setCart] = useState([])

  const getData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/products/${id}`);
      setProduct(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = (id) =>{
    setCart([...cart, id])
    //localStorage.setItem('cart', cart);
    
  }

  useEffect(() => {
    getData();
  }, []);
  console.log(cart);
  return (
    <div>
      <div className={styles.container}>
      <img src={product?.image} alt="" />
      <div className={styles.right}>
        <h3>{product?.name}</h3>
        <Typography><b>Tác Giả:</b> {product?.author}</Typography>
        <Typography><b>Thể Loại:</b>{product?.categories.map((cate)=>{
          return cate + ',';
        })}</Typography>
        {/* <Typography component="legend" variant="p">
          <b>Yêu thích</b>
        </Typography> */}
        <StyledRating
          name="customized-color"
          defaultValue={product?.rating}
          getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
          precision={1}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        />
        <br />
        <Button onClick={()=>handleAddToCart(product._id)} fullWidth variant="contained" style={{ marginTop: "10px" }}>
          Thêm vào giỏ hàng <ShoppingCartOutlined />
        </Button>
      </div>
    </div>
    <div className={styles.bottom}>
      <p className={styles.title}>Nội dung</p>
      <p className={styles.des}>{product?.description}</p>
    </div>

    <div className={styles.bottom}>
      <p className={styles.title}>Bình luận</p>
      <p className={styles.des}>{product?.description}</p>
    </div>
    </div>
  );
}

export default ProductDetail;
