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
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import { ProductContext } from "../../context/ProductContext";

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
  const { addToCart } = useContext(CartContext);
  const [cart, setCart] = useState([]);

  useEffect(()=>{
    const cart = JSON.parse(localStorage.getItem('cart'));
    setCart(cart);
  },[])

  const getData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/products/${id}`);
      setProduct(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = (id) => {
    addToCart(id);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className={styles.container}>
        <img src={product?.image} alt="" />
        <div className={styles.right}>
          <p className={styles.name}>{product?.name}</p>
          <Typography mb={'15px'} variant="h4" color={"red"}>Giá: 
              {' ' + new Intl.NumberFormat("de-De", {
                style: "currency",
                currency: "VND",
              }).format(product?.price)}
            </Typography>
          <div className={styles.info}>
            <Typography>
              <b>Tác Giả: </b> {product?.author}
            </Typography>
            <Typography>
              <b>Thể Loại: </b>
              {product?.categories.map((cate) => {
                return cate + ",";
              })}
            </Typography>
            <Typography>
              <b>Đối tượng: </b>
              {product?.target}
            </Typography>
            <Typography>
              <b>Khuôn khổ: </b>
              {product?.khuonKho}
            </Typography>
            <Typography>
              <b>Số trang: </b>
              {product?.soTrang}
            </Typography>
            <Typography>
              <b>Định dạng: </b>
              {product?.categories.map((cate) => {
                return cate + ",";
              })}
            </Typography>
            <Typography>
              <b>Trọng lượng: </b>
              {product?.weight}
            </Typography>
            <Typography>
              <b>Bộ sách: </b>
              {product?.combo}
            </Typography>
            

            {/* <Typography component="legend" variant="p">
          <b>Yêu thích</b>
        </Typography> */}
            {/* <StyledRating
              name="customized-color"
              defaultValue={product?.rating}
              getLabelText={(value) =>
                `${value} Heart${value !== 1 ? "s" : ""}`
              }
              precision={1}
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            /> */}
          </div>
          <br />
          <div>
            <Button
              onClick={() => handleAddToCart(product._id)}
              fullWidth
              variant="contained"
              style={{ marginTop: "10px" }}
            >
              Thêm vào giỏ hàng{" "}
              <ShoppingCartOutlined sx={{ marginLeft: "10px" }} />
            </Button>
            <Button fullWidth variant="contained" style={{ marginTop: "10px" }}>
              Đọc thử <MenuBookRoundedIcon sx={{ marginLeft: "10px" }} />
            </Button>
          </div>
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
