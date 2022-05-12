import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swipers from "../Swiper/Swiper";
import { ProductContext } from "../../../../context/ProductContext";
import { useContext } from "react";

function Slide({ cat }) {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);

  const { getProductByCat } = useContext(ProductContext);

  const getData = async () => {
    const _cat = { cat: cat.cat };
    const res = await getProductByCat(_cat);
    setProduct(res.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    product && (
      <div style={{ width: "80%", margin: "0 auto" }}>
        <Typography
          variant="h4"
          style={{ textAlign: "center", margin: "30px 0 20px 0" }}
        >
          {cat.title}
        </Typography>
        {product && <Swipers product={product} />}

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
    )
  );
}

export default Slide;
