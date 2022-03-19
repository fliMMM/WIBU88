import React from "react";
import {
  Input,
  FormControl,
  InputLabel,
  Button,
  Paper,
  Grid,
  Typography,
  FormHelperText,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  username: yup.string().required("Bạn chưa nhập tài khoản!"),

  password: yup
    .string()
    .required("Bạn chưa nhập mật khẩu!"),
});

function DangNhap() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
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
          style={{ padding: "20px 40px", marginTop: "30px" }}
        >
          <Typography variant="h3" textAlign={"center"} height={"30px"} gutterBottom>
            Sign In
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
              <Button variant="extendedFab" color="primary" type="submit">
                SignIn
              </Button>
            </FormControl>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default DangNhap;
