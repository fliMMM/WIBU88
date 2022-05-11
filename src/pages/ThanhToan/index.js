import React from "react";
import {
  Grid,
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
import { useContext } from "react";
import { useFormik } from "formik";
import { orderContext } from "../../context/OrderContext";
import { useState } from "react";

function ThanhToan() {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const { order } = useContext(orderContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const formik = useFormik({
    initialValues: {
      user: user,
      fullname: "",
      phone: "",
      address: "",
      paymentMethod: "",
    },
    onSubmit: async (values) => {
      const products = order.map((item) => {
        return {
          name: item.product.name,
          price: item.product.price * item.quantity,
        };
      });
      const price = products.map((item) => item.price);
      const totalPrice = price.reduce((pre, curr) => pre + curr);
      setTotalPrice(totalPrice);
      const data = { products, ...values, totalPrice };
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
              <InputLabel id="demo-simple-select-label">
                Phương thức thanh toán
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.paymentMethod}
                name="paymentMethod"
                onChange={formik.handleChange}
              >
                <MenuItem value="COD">Thanh toán khi giao hàng ()COD</MenuItem>
                <MenuItem value="MOMO">Ví Momo</MenuItem>
                <MenuItem value="ZALO">ZaloPay</MenuItem>
                <MenuItem value="SHOPEE">ShopeePay</MenuItem>
              </Select>
            </FormControl>

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
          {order.map((item, index) => {
            return (
              <Stack key={index} direction='row' spacing={1} mb={1} >
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
                <Typography style={{minWidth:'25%'}}>
                  {new Intl.NumberFormat("de-De", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.product.price * item.quantity)}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Box>
    </Stack>
  );
}

export default ThanhToan;
