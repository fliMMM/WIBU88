import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import { Typography, Button } from "@mui/material";
import fakeData from "../../../../fakeData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function SachMoi() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:9999/api/products/')
    .then(res=>setProduct(res.data.data))
  },[])
  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Typography
        variant="h4"
        style={{ textAlign: "center", margin: "30px 0 20px 0" }}
      >
        Truyện mới cập nhật
      </Typography>
      <Swiper
        loop={true}
        loopFillGroupWithBlank={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          400: {
            slidesPerView: 1.25,
            spaceBetween: 50,
          },
          900: {
            slidesPerView: 3.5,
            spaceBetween: 40,
          },
          1200: {
            slidesPerView: 4.5,
            spaceBetween: 50,
          },
          1536: {
            slidesPerView: 5.5,
            spaceBetween: 50,
          },
        }}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        {product.map((data, index) => (
          <SwiperSlide
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`products/${data._id}`)}
          >
            <img
              style={{ width: "100%", height: '270px' }}
              src={data.image}
              alt=""
            />
            <Typography variant="p">{data.name}</Typography>
            <Typography color={"red"}>
              {new Intl.NumberFormat("de-De", {
                style: "currency",
                currency: "VND",
              }).format(data.price)}
            </Typography>
          </SwiperSlide>
        ))}
      </Swiper>
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
