import React from "react";
import styles from "./style.module.css";
import { Button } from "@mui/material";
import { BuildTwoTone } from "@mui/icons-material";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";

const data = {
  image:
    "https://product.hstatic.net/200000343865/product/tieu-thuyet-chuyen-the---thanh-guom-diet-quy---khoi-dau-cua-dinh-menh_aa8fa2512987465eac69516e166836eb_large.jpg",
  name: "Thanh gươm diệt quỷ",
  price: 49500,
  description:
    "Vào thời Taisho, có một cậu bé bán than với tấm lòng nhân hậu tên là Tanjiro. Những ngày yên bình bỗng chốc tan biến khi “Quỷ” đến tàn sát cả gia đình cậu, chỉ duy nhất người em gái Nezuko còn sống sót nhưng lại bị biến thành Quỷ. Mang trong mình quyết tâm giúp em gái trở lại làm người, Tanjiro cùng Nezuko bắt đầu cuộc hành trình tìm kiếm tung tích con quỷ đã ra tay với gia đình mình!! Cuộc phiêu lưu trên con đường kiếm sĩ đầy chông gai đã bắt đầu!!",
};
function ProductDetail() {
  return (
    <div style={{ paddingTop: "50px" }}>
      <div className={styles.info}>
        <img src={data.image} />
        <div className={styles.rightInfo}>
          <p>{data.name}</p>
          <p>{data.price}</p>
          <Button>
            Thêm vào giỏ hàng <ShoppingCartOutlined />
          </Button>
        </div>
      </div>
      <div className={styles.description}>
          <p>{data.description}</p>
      </div>
      <div className={styles.sameAuthor}></div>
    </div>
  );
}

export default ProductDetail;
