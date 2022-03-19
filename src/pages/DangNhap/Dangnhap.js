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
  username: yup.string().required("Khong duoc de trong"),

  password: yup
    .string()
    .min(8, "Mat khau toi thieu 8 ki tu")
    .required("Khong duoc de trong!"),
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
          style={{ padding: "20px 15px", marginTop: "30px" }}
        >
          <Typography variant="headline" gutterBottom>
            SignIn
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
              <FormHelperText id="username">
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
              <FormHelperText id="password">
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
