import React from "react";
import {
  Stack,
  Box,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { Typography } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import { useFormik } from "formik";
import { orderContext } from "../../context/OrderContext";
import { CartContext } from "../../context/CartContext";
import { useState } from "react";
import { useSnackbar } from "notistack";

function ThanhToan() {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const { order, addNewOrder } = useContext(orderContext);
  const { updateToPaidCart } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const products = order.map((item) => {
      return {
        name: item.product.name,
        price: item.product.price * item.quantity,
        quantity: item.quantity,
      };
    });
    setProducts(products);
    const price = products.map((item) => item.price);
    if (order.length > 0) {
      const totalPrice = price.reduce((pre, curr) => pre + curr);
      setTotalPrice(totalPrice);
    }
  }, [order]);

  const formik = useFormik({
    initialValues: {
      user: user,
      userId: user._id,
      fullname: "",
      phone: "",
      address: "",
      paymentMethod: "",
    },
    onSubmit: async (values) => {
      const data = { products, ...values, totalPrice };
      const res = await addNewOrder(data);
      if (res.success === true) {
        await updateToPaidCart();
        enqueueSnackbar(res.message, { variant: "success" });
      }
      if (res.success === false) {
        enqueueSnackbar(res.message, { variant: "error" });
      }
    },
  });
  return (
    <Stack direction={"row"} mt={7} ml={50} mr={50}>
      <Box minWidth={"50%"}>
        <Typography variant="p">Thông tin thanh toán</Typography>
        {user && (
          <Stack direction={"row"} spacing={1} mt={3} mb={3}>
            <img
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#D8D8D8",
                borderRadius: "10px",
              }}
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              alt=""
            />
            <Stack>
              <Typography>
                {user.username} ({user.email})
              </Typography>
              <Typography>Đăng xuất</Typography>
            </Stack>
          </Stack>
        )}
        <Stack>
          {user && (
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Thêm địa chỉ khác:{" "}
            </Typography>
          )}
          {user === null && <Typography>Địa chỉ nhận: </Typography>}
          <form
            onSubmit={(e) => {
              formik.handleSubmit();
              e.preventDefault();
            }}
            style={{ width: "90%" }}
          >
            <FormControl fullWidth margin="normal">
              <InputLabel>Họ và tên</InputLabel>
              <Input
                name="fullname"
                fullWidth
                id="fullname"
                onChange={formik.handleChange}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Số điện thoại</InputLabel>
              <Input
                name="phone"
                fullWidth
                id="phone"
                onChange={formik.handleChange}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Địa chỉ</InputLabel>
              <Input
                name="address"
                fullWidth
                id="address"
                onChange={formik.handleChange}
              />
            </FormControl>
            <FormControl fullWidth style={{ marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-label" style={{ marginTop: "-10px" }}>
                Phương thức thanh toán
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.paymentMethod}
                name="paymentMethod"
                onChange={formik.handleChange}
              >
                <MenuItem value="COD">Thanh toán khi giao hàng (COD)</MenuItem>
                <MenuItem value="MOMO">Ví Momo</MenuItem>
                <MenuItem value="ZALO">ZaloPay</MenuItem>
                <MenuItem value="QR">QR</MenuItem>
              </Select>
            </FormControl>
            {formik.values.paymentMethod === "QR" && (
              <img src={require("../../image/rickRollQR.png")} style={{width:'300px'}} alt="" />
            )}
            <FormControl fullWidth sx={{ marginTop: "20px" }}>
              <Button
                variant="contained"
                fullWidth
                color="success"
                type="submit"
              >
                Thanh toán
              </Button>
            </FormControl>
          </form>
        </Stack>
      </Box>
      <Box minWidth={"50%"} sx={{ backgroundColor: "#FAFAFA" }}>
        <Stack ml={5} mt={2}>
          {order?.map((item, index) => {
            return (
              <Stack key={index} direction="row" spacing={1} mb={1}>
                <Stack direction="row" spacing={1} minWidth={"75%"}>
                  <img
                    style={{ width: "60px", borderRadius: "5px" }}
                    src={item.product.image}
                    alt=""
                  />
                  <Typography>
                    {item.product.name} x {item.quantity}
                  </Typography>
                </Stack>
                <Typography style={{ minWidth: "25%" }}>
                  {new Intl.NumberFormat("de-De", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.product.price * item.quantity)}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
        <Stack
          direction="row"
          ml={5}
          spacing={6}
          style={{ borderTop: "1px solid #E1E1E1" }}
          mt={2}
        >
          <FormControl margin="normal" style={{ minWidth: "65%" }}>
            <InputLabel>Mã giảm giá</InputLabel>
            <Input
              name="voucher"
              fullWidth
              id="voucher"
              //onChange={formik.handleChange}
            />
          </FormControl>
          <Button
            variant="contained"
            style={{ minWidth: "25%", height: "100%", margin: "25px auto" }}
          >
            Sử dụng
          </Button>
        </Stack>
        <Stack ml={5} pt={2} style={{ borderTop: "1px solid #E1E1E1" }} mt={2}>
          <Stack direction={"row"}>
            <Typography minWidth={"75%"}>Tạm tính: </Typography>
            <Typography>
              {new Intl.NumberFormat("de-De", {
                style: "currency",
                currency: "VND",
              }).format(totalPrice)}
            </Typography>
          </Stack>
          <Stack direction={"row"}>
            <Typography minWidth={"75%"}>Phí vận chuyển: </Typography>
            <Typography>
              {new Intl.NumberFormat("de-De", {
                style: "currency",
                currency: "VND",
              }).format(20000)}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          ml={5}
          direction="row"
          pt={2}
          style={{ borderTop: "1px solid #E1E1E1" }}
          mt={2}
        >
          <Typography minWidth={"75%"}>Tạm tính: </Typography>
          <Typography>
            {new Intl.NumberFormat("de-De", {
              style: "currency",
              currency: "VND",
            }).format(totalPrice + 20000)}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}

export default ThanhToan;
