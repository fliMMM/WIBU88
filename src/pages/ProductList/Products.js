import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import styles from "./style.module.css";
import { Typography } from "@mui/material";
import { Select } from "@mui/material";
import { Grid } from "@mui/material";
import Card from "../../components/Card/Card";

import {
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { MenuItem } from "@mui/material";
import { ProductContext } from "../../context/ProductContext";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Pagination from "@mui/material/Pagination";

const cate = [
  {label: 'Action', value:'action'},
  {label: 'Romance', value:'romance'},
  {label: 'Drama', value:'drama'},
  {label: 'Sci', value:'action'},
  {label: 'Comedy', value:'action'},
  {label: 'School Life', value:'action'},
  {label: 'Fantasy', value:'action'},
]

function ProductList() {
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(false);
  const { getAll } = useContext(ProductContext);
  const [page, setPage] = useState(1)
  const [itemPerPage, setItemPerPAge] = useState(12);
  const handleChangePage =(e, value) =>{
    setPage(value)
  }
  const fetData = async () => {
    setFetching(true);
    const res = await getAll();
    setFetching(false);
    setData(res.data);
  };
  useEffect(() => {
    fetData();
  }, [page]);
  return (
    <div >
      <Stack direction={"row"} spacing={2} className={styles.container} >
        <Box
          sx={{
            minWidth: "250px",
          }}
        >
          <Stack
            direction={"row"}
            minWidth={"15%"}
            border={"1px solid #E6E6E6"}
            borderRadius="10px"
            height="40px"
          >
            <input className={styles.search} placeholder="tìm kiếm..." />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: "5px",
              }}
            >
              <SearchOutlinedIcon sx={{ cursor: "pointer", minWidth: "20%" }} />
            </div>
          </Stack>
          <Stack
            direction={"column"}
            border="1px solid #E6E6E6"
            mt={3}
            spacing={1}
            borderRadius="2px"
          >
            <Typography
              maxHeight={"50px"}
              color="white"
              textAlign={"left"}
              borderRadius="2px"
              backgroundColor="rgb(213,28,36)"
              padding={"10px"}
              fontWeight="bold"
            >
              Khoảng giá
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Tất cả"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Nhỏ hơn 100,000₫"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Từ 100,000₫ - 200,000₫"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Từ 200,000₫ - 300,000₫"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Lớn hơn 300,000₫"
              />
            </FormGroup>
          </Stack>

          <Stack
            direction={"column"}
            border="1px solid #E6E6E6"
            mt={3}
            spacing={1}
            borderRadius="2px"
          >
            <Typography
              maxHeight={"50px"}
              color="white"
              textAlign={"left"}
              borderRadius="2px"
              backgroundColor="rgb(213,28,36)"
              padding={"10px"}
              fontWeight="bold"
            >
              Thể loại
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Tất cả"
              />
              {cate.map((item)=>{
                return(
                  <FormControlLabel
                control={<Checkbox/>}
                label={item.label}
              />
                )
              })}
            </FormGroup>
          </Stack>
        </Box>
        <Box>
          <Stack direction={"column"} minWidth="800px" mb={2}>
            <Stack
              direction={"row"}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="h5">Sách mới phát hành</Typography>
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent="center"
                alignItems={"center"}
              >
                <Typography mr={2}>Sắp xếp</Typography>
                <FormControl>
                  <Select defaultValue="lastest">
                    <MenuItem value="lastest">Mới nhất</MenuItem>
                    <MenuItem value="1">Bán chạy nhất</MenuItem>
                    <MenuItem value="2">Tên A-Z</MenuItem>
                    <MenuItem value="3">Tên Z-A</MenuItem>
                    <MenuItem value="4">Giá tăng dần</MenuItem>
                    <MenuItem value="5">Giá giảm dần</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
            <Grid container></Grid>
          </Stack>
          {fetching === true && (
            <div style={{ margin: "400px 50%", minWidth: "100%" }}>
              <CircularProgress />
            </div>
          )}
          {fetching === false && (
            <Grid container spacing={2}>
              {data.map((item, index) => {
                return (
                  (index >=(itemPerPage * (page-1)) && index<= (itemPerPage * page -1 )) && (
                    <Grid item key={index} xs={3} md={3} lg={3}>
                      <Card data={item} />
                    </Grid>
                  )
                );
              })}
            </Grid>
          )}
          <Stack
            spacing={2}
            mt={3}
            mb={3}
            display={"flex"}
            flexDirection={"row"}
            justifyContent="center"
            alignItems={"center"}
          >
            <Pagination count={Math.floor(data.length/12) + 1} page={page} onChange={handleChangePage} variant="outlined" shape="rounded" />
          </Stack>
        </Box>
      </Stack>
      <Outlet />
    </div>
  );
}

export default ProductList;
