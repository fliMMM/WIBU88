import React from "react";
import {
  Input,
  FormControl,
  InputLabel,
  Button,
  Paper,
  Grid,
  Typography,
  Form,
  FormHelperText,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  username: yup
    .string()
    .required("Bạn chưa nhập tài khoản!"),
  email: yup
    .string()
    .email("Email không đúng định dạng!")
    .required("Bạn chưa nhập email!"),
  password: yup
    .string()
    .min(8, "Mật khẩu tối thiểu 8 kí tự")
    .required("Bạn chưa điền mật khẩu"),
  confirmPassword: yup
    .string()
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Không khớp với mật khẩu"),
    })
    .min(8, "Mật khẩu tối thiểu 8 ký tự")
    .required("Bạn chưa điền mật khẩu xác nhận!"),
});
function DangKi() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Grid container justify="center" alignContent="center">
      <Grid
        item
        xs={6}
        md={4}
        style={{
          margin: "50px auto",
        }}
      >
        <Paper
          elevation={4}
          style={{ padding: "20px 15px", marginTop: "30px" }}
        >
          <Typography textAlign={"center"} height={"30px"} variant="h3" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Username</InputLabel>
              <Input
                name="username"
                fullWidth
                id="username"
                
                error={
                  formik.touched?.username && Boolean(formik.errors?.username)
                }
                onChange={formik.handleChange}
              />
              <FormHelperText error id="username">
                {formik.touched.username && formik.errors.username}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Email</InputLabel>
              <Input
                name="email"
                fullWidth
                id="email"
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
              <FormHelperText error id="email">
                {formik.touched.email && formik.errors.email}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Address</InputLabel>
              <Input
                name="address"
                fullWidth
                id="address"
                onChange={formik.handleChange}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Password</InputLabel>
              <Input
                fullWidth
                name="password"
                type="password"
                id="password"
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              />
              <FormHelperText error id="password">
                {formik.touched.password && formik.errors.password}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Confirm Password</InputLabel>
              <Input
                fullWidth
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
              />
              <FormHelperText error id="confirmPassword">
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Button variant="extendedFab" color="primary" type="submit">
                Signup
              </Button>
            </FormControl>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default DangKi;
