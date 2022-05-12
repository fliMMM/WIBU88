import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../../../../context/constants";
import Swipers from "../Swiper/Swiper";

function SachMoi() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/products/new`)
      .then((res) => setProduct(res.data.data));
  }, []);
  //console.log(product);
  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Typography
        variant="h4"
        style={{ textAlign: "center", margin: "30px 0 20px 0" }}
      >
        Truyện mới cập nhật
      </Typography>
      <Swipers product = {product}/>
      
      <div
        style={{
          width: "100%",
          paddingTop: "10px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={() => navigate("products")}
          variant="contained"
          color="error"
        >
          Xem Thêm
        </Button>
      </div>
    </div>
  );
}

export default SachMoi;
