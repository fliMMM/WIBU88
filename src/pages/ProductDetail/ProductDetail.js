import React from "react";
import { useMediaQuery } from "@mui/material";
import { Button, Grid, Typography } from "@mui/material";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styled from "styled-components";
const data = {
  image:
    "https://product.hstatic.net/200000343865/product/tieu-thuyet-chuyen-the---thanh-guom-diet-quy---khoi-dau-cua-dinh-menh_aa8fa2512987465eac69516e166836eb_large.jpg",
  name: "Thanh gươm diệt quỷ",
  price: 49500,
  description:
    "Vào thời Taisho, có một cậu bé bán than với tấm lòng nhân hậu tên là Tanjiro. Những ngày yên bình bỗng chốc tan biến khi “Quỷ” đến tàn sát cả gia đình cậu, chỉ duy nhất người em gái Nezuko còn sống sót nhưng lại bị biến thành Quỷ. Mang trong mình quyết tâm giúp em gái trở lại làm người, Tanjiro cùng Nezuko bắt đầu cuộc hành trình tìm kiếm tung tích con quỷ đã ra tay với gia đình mình!! Cuộc phiêu lưu trên con đường kiếm sĩ đầy chông gai đã bắt đầu!!",
  rating: 5,
};

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});
function ProductDetail() {
  const isModile = useMediaQuery("max-width:768px");
  return (
    <div style ={{
      width: "39%",
      margin: "0 auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingTop : "100px"
    }}>
      <Grid
        container
      >
        <Grid item xs={12} md={6}>
          <img src={data.image} />
        </Grid>
        <Grid item xs={12} md={6} paddingLeft={"10px"}>
          <Typography variant="h4">{data.name}</Typography>
          <br />
          <Typography variant="p">Nội Dung: {data.description}</Typography>
          <br />
          <br />
          <Typography component="legend" variant="p">
            Yêu thích
          </Typography>
          <StyledRating
            name="customized-color"
            defaultValue={data.rating}
            getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          />
          <br />
          <Button variant="contained" style={{ marginTop: "10px" }}>
            Thêm vào giỏ hàng <ShoppingCartOutlined />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductDetail;
