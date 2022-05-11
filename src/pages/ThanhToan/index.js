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
import {orderContext} from '../../context/OrderContext'

function ThanhToan() {
  const {
    authState: { user },
  } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      user:user,
      fullname: "",
      phone: '',
      address: '',
      paymentMethod: ''
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const {order} = useContext(orderContext);
  console.log(order);
  return (
    <Stack direction={"row"} mt={7} ml={55} mr={55}>
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
          {user && <Typography variant='h6' sx={{fontWeight: 'bold'}}>Thêm địa chỉ khác: </Typography>}
          {user === null && <Typography>Địa chỉ nhận: </Typography>}
          <form onSubmit={(e)=>{
            formik.handleSubmit();
            e.preventDefault()
            }} style={{ width: "90%" }}>
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
            <FormControl fullWidth style={{marginTop: '20px'}}>
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

            <FormControl fullWidth sx={{marginTop:'20px'}}>
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
      <Box minWidth={"50%"} sx={{ backgroundColor: "blue" }}>
        thong tin
      </Box>
    </Stack>
  );
}

export default ThanhToan;
