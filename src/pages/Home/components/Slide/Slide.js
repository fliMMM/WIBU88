import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Typography, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swipers from "../Swiper/Swiper";
import { ProductContext } from "../../../../context/ProductContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Slide({ cat }) {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [fetching, setFetching] = useState(false);

  const { getProductByCat } = useContext(ProductContext);

  const getData = async () => {
    setFetching(true);
    const _cat = { cat: cat.cat };
    const res = await getProductByCat(_cat);
    setFetching(false);
    setProduct(res.data);
  };
  useEffect(() => {
    getData();
  }, []);

  if (fetching === true) {
    return (
      <div style={{ margin: "100px 50%", minWidth: "100%" }}>
        <CircularProgress />
      </div>
    );
  }
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
          <Link to="/all" style={{textDecoration: 'none'}}>
            <Button
              variant="contained"
              color="error"
            >
              Xem Thêm
            </Button>
          </Link>
        </div>
      </div>
    )
  );
}

export default Slide;
