import React, {useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import { useNavigate } from "react-router-dom";
import Card from "../../../../components/Card/Card";

function Swipers({ product }) {
  const navigate = useNavigate();
  return (
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
      {product.map((data, index) => {
        return (
          <SwiperSlide
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`products/${data._id}`)}
          >
            <Card data={data} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Swipers;
