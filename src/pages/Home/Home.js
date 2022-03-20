import React from "react";
import styles from "./Home.module.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import {
  useMediaQuery,
  ImageList,
  ImageListItem,
  Box,
  Link,
} from "@mui/material";

const imageBanner = [
  {
    url: "https://theme.hstatic.net/200000343865/1000796725/14/ms_banner_img1.jpg?v=225",
    caption: "Slide 1",
  },
  {
    url: "https://theme.hstatic.net/200000343865/1000796725/14/ms_banner_img3.jpg?v=225",
    caption: "Slide 2",
  },
  {
    url: "https://theme.hstatic.net/200000343865/1000796725/14/ms_banner_img5.jpg?v=225",
    caption: "Slide 3",
  },
];

function Home() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div>
      {!isMobile ? (
        <div className="slide-container">
          <Slide>
            {imageBanner.map((image, index) => (
              <div className="each-slide" key={index}>
                <img style={{ width: "100%" }} src={image?.url} />
              </div>
            ))}
          </Slide>
        </div>
      ) : (
        <Box>
          <ImageList cols={1} gap={5} sx={{ m: 0 }}>
            {imageBanner?.map((image, i) => (
              <ImageListItem key={image.id + i}>
                <img
                  style={{
                    width: "100%",
                  }}
                  src={image?.url}
                  alt={"Image Banner"}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )}
    </div>
  );
}

export default Home;
