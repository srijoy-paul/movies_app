import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

function CarouselComponent() {
  const images = [
    "https://cdn.pixabay.com/photo/2023/10/02/14/51/flowers-8289321_640.png",
    "https://cdn.pixabay.com/photo/2023/09/10/15/15/flowers-8245210_640.png",
    "https://cdn.pixabay.com/photo/2023/09/04/17/04/saturn-8233220_640.png",
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWY4ZDY5OGUzY2IxYjc3NjMyYWQ3NDEwODAxZTgyMCIsInN1YiI6IjY1OTMxNTdkZWJiOTlkNWYxYTllNzBmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iS5NgaktnAakqmxRBgnpKLXB7kQ4jxZfHltB5t6PymA",
        },
      };

      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${API_KEY}",
        options
      );
      const fetchedData = await response.json();
      setData(fetchedData.results);
      console.log(fetchedData.results);
      console.log("inside useeffect");
    })();
  }, []);
  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 5, padding: "0 12px" }}>
        <Carousel sx={{}}>
          {data.map((image, i) => (
            <Paper key={i} elevation={10} sx={{ borderRadius: "5px" }}>
              <Box
                component="div"
                sx={{
                  width: "100%",
                  height: "350px",
                  objectFit: "cover",
                  //   border: "2px solid red",
                  backgroundImage: `url("https://image.tmdb.org/t/p/w185/${image.poster_path}")`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "between",
                  borderRadius: "5px",
                }}
                // src={`https://image.tmdb.org/t/p/w185/${image.poster_path}`}
                // alt={`Slide ${i}`}
              />
            </Paper>
          ))}
        </Carousel>
      </Box>
    </>
  );
}

function Item(props) {
  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.100",
        color: "#fff",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        p: 4,
        border: "2px solid blue",
        backgroundImage: `url("${props.img_path}")`,
      }}
      elevation={10}
    >
      <Typography variant="h4">{props.item.name}</Typography>
      <Typography>{props.item.description}</Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2, alignSelf: "center" }}
      >
        Learn More
      </Button>
    </Paper>
  );
}

export default CarouselComponent;
