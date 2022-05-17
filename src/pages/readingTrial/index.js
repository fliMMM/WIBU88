import React from "react";
import { Box } from "@mui/material";
import { useState } from "react";

const init =  [];
for(let i = 1; i <= 59; i++){
  init.push(i)
}

function ReadingTrial() {
  
  return (
    <Box backgroundColor='#111111' pt={10} minHeight={'calc(100vh - 50px)'}>
      <Box ml={60} mr={60} minHeight='calc(100vh - 50px)'>
        {init.map((item, index)=>{
          return index <10 && <img key={index} width="100%" src={`http://i331.ntcdntempv26.com/data/images/26017/521374/00${item}-fix.jpg?data=net`} alt=""/>
        })}
        {init.map((item, index)=>{
          return index >=10 && <img key={index} width="100%" src={`http://i331.ntcdntempv26.com/data/images/26017/521374/0${item}-fix.jpg?data=net`} alt=""/>
        })}
      </Box>
    </Box>
  );
}

export default ReadingTrial;
