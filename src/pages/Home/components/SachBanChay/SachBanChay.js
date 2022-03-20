import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import { Typography, Button } from "@mui/material";
import fakeData from "../../../../fakeData";

function SachBanChay() {
  return (
    <>
      <Typography
        variant="h4"
        style={{ textAlign: "center", margin: "10px 0" }}
      >
        Truyện được mua nhiều
      </Typography>
      <Swiper
        loop={true}
        loopFillGroupWithBlank={true}
        autoplay={{
          delay: 2500,
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
        {fakeData.map((data, index) => (
          <SwiperSlide key={index} style={{cursor: "pointer"}}>
            <img src={data.image} alt="picture" />
            <Typography variant="h6">{data.name}</Typography>
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
        <Button variant="contained" color="error">
          Xem Thêm
        </Button>
      </div>
    </>
  );
}

export default SachBanChay;
