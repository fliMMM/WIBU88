import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Card({ data }) {
  const navigate = useNavigate();
  return (
    <Box style={{ cursor: "pointer" }}>
      <img
        onClick={() => navigate(`/products/${data._id}`)}
        style={{ width: "100%", height: "270px" }}
        src={data.image}
        alt=""
      />
      <Typography onClick={() => navigate(`/products/${data._id}`)} variant="p">
        {data.name}
      </Typography>
      <Typography
        onClick={() => navigate(`/products/${data._id}`)}
        color={"red"}
      >
        {new Intl.NumberFormat("de-De", {
          style: "currency",
          currency: "VND",
        }).format(data.price)}
      </Typography>
    </Box>
  );
}

export default Card;
