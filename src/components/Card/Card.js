import React from "react";
import { Box, Typography } from "@mui/material";
import { CardActionArea } from "@mui/material";

function Card({data}) {
  return (
    <Box>
      <img style={{ width: "100%", height: "270px" }} src={data.image} alt="" />
      <Typography variant="p">{data.name}</Typography>
      <Typography color={"red"}>
        {new Intl.NumberFormat("de-De", {
          style: "currency",
          currency: "VND",
        }).format(data.price)}
      </Typography>
    </Box>
  );
}

export default Card;
