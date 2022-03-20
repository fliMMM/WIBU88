import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import { Typography } from "@mui/material";
import fakeData from "../../../../fakeData";


function SachMoi() {
  return (
    <>
      <Typography
        variant="h4"
        style={{ textAlign: "center", margin: "10px 0" }}
      >
        Truyện mới cập nhật
      </Typography>
      <Swiper
        spaceBetween={30}
        loop={true}
        loopFillGroupWithBlank={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
            400: {
              slidesPerView: 1.5,
              spaceBetween: 20,
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
          <SwiperSlide key={index}>
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
      <Typography style={{textAlign: "end", cursor: "pointer"}} color={"red"}>Xem Thêm</Typography>
    </>
  );
}

export default SachMoi;
