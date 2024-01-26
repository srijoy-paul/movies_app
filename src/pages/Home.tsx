import { Box, Button, Paper, Typography } from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";
import CarouselComponent from "../components/CarouselComponent";
import { moviesContext } from "../App";
import Movie_card from "../components/Movie_card";
import { log } from "console";
import Framer from "../components/framer";
import { Scrollbar } from "react-scrollbars-custom";
import Scrollbars from "react-custom-scrollbars-2";
import InfiniteScroll from "react-infinite-scroll-component";

// let datasContext;
// let recomendedDatasContext;
// export const datasContext = createContext({ datas: [], SetDatas: });
// export const recomendedDatasContext = createContext({
//   recomendedDatas: [],
//   SetRecomendedDatas,
// });
function Home() {
  // const [movies_data, setMovies_data] = useContext(moviesContext);
  const [datas, SetDatas] = useState([]);
  const [recomendedDatas, SetRecomendedDatas] = useState([]);
  // datasContext = createContext({ datas });
  // recomendedDatasContext=createContext({ recomendedDatas });

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
        "https://api.themoviedb.org/3/trending/all/day?language=en-US",
        options
      );

      const response2 = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        options
      );

      const trending_data = await response.json();
      const recomended_data = await response2.json();
      // console.log(trending_data.results, recomended_data.results);

      const trending = trending_data.results.map((trendItem) => {
        trendItem = { ...trendItem, isBookmarked: false };
        return trendItem;
      });
      const recomended = recomended_data.results.map((recomendedItem) => {
        recomendedItem = { ...recomendedItem, isBookmarked: false };
        return recomendedItem;
      });

      SetDatas(trending);
      SetRecomendedDatas(recomended);
    })();
  }, []);
  return (
    <>
      <CarouselComponent />
      <Box sx={{ padding: "12px 0px" }}>
        <Typography
          sx={{
            padding: "0 5px",
            color: "black",
            fontSize: "larger",
            fontWeigth: "800",
          }}
        >
          Trending
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: "15px",
            // width: "100%",
            overflowX: "scroll",
            // border: "2px solid red",
            padding: "7px 0 7px 12px",
          }}
        >
          {datas.map((data, index) => {
            let favouriteReleaseDate;
            let favouriteName;
            if (data.category === "movie") {
              favouriteReleaseDate = data.release_date;
              favouriteName = data.original_title;
            } else {
              favouriteReleaseDate = data.first_air_date;
              favouriteName = data.original_name;
            }
            console.log(data);

            return (
              // <Box key={index} sx={{ border: "2px solid red" }}>
              <Movie_card
                key={index}
                values={{
                  poster_path: data.poster_path,
                  title: data.favouriteName,
                  description: data.overview,
                  release_date: favouriteReleaseDate,
                  votes: data.vote_average,
                  id: data.id,
                  category: "movie",
                  isBookmarked: data.isBookmarked,
                }}
              />
              // </Box>
            );
          })}
        </Box>
      </Box>
      {/* <Box>
        <Framer />
      </Box> */}

      <Box sx={{ padding: "12px 0px" }}>
        <Typography sx={{ padding: "0 5px" }}>Recomended</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
            padding: "7px 0 7px 12px",
          }}
        >
          {recomendedDatas.map((data, index) => {
            // let favouriteReleaseDate;
            // let favouriteName;
            // console.log("now", data);

            // if (data.category === "movie") {
            //   favouriteReleaseDate = data.release_date;
            //   favouriteName = data.original_title;
            // } else {
            //   favouriteReleaseDate = data.first_air_date;
            //   favouriteName = data.original_name;
            // }
            // console.log(data);

            return (
              <Box key={index} sx={{}}>
                <Movie_card
                  key={index}
                  values={{
                    poster_path: data.poster_path,
                    title: data.original_title,
                    description: data.overview,
                    release_date: data.release_date,
                    votes: data.vote_average,
                    id: data.id,
                    category: "movie",
                    isBookmarked: data.isBookmarked,
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
}

// export datasContext;
// export recomendedDatasContext;
export default Home;

// export const trending_provider = ({ children }) => {
//   return (
//     <datasContext.Provider value={{ datas, SetDatas }}>
//       {children}
//     </datasContext.Provider>
//   );
// };
