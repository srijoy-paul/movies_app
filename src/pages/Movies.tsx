import React, { SetStateAction, useContext, useEffect, useState } from "react";
import Movie_card from "../components/Movie_card";
import { moviesContext } from "../App";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/Loader";

function Movies() {
  const { movies_data, setMovies_data } = useContext(moviesContext);
  const [loading, setLoading] = useState<boolean>();
  // console.log("i am", movies_data);

  const BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchData = async () => {
    console.log("called");
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${
        movies_data.page + 1
      }&sort_by=popularity.desc&api_key=${API_KEY}`,
      options
    );
    const parsedResponse = await response.json();
    console.log(parsedResponse);
    setLoading(false);
    setMovies_data({
      movies: movies_data.movies.concat(parsedResponse.results),
      page: movies_data.page + 1,
      totalResults: parsedResponse.total_results,
    });
  };
  // fetchData();

  return (
    <>
      <InfiniteScroll
        dataLength={movies_data.movies.length}
        next={fetchData}
        hasMore={movies_data.movies.length !== movies_data.total_results}
        loader={loading === false ? <Loader /> : null}
      >
        <div
          id="items_container"
          style={{
            minHeight: "100vh",
            border: "2px solid blue",
            display: "flex",
            justifyContent: "center",
            padding: "12px 0",
          }}
        >
          {movies_data.movies.map((movie, index) => {
            return (
              <Movie_card
                key={index}
                values={{
                  poster_path: movie.poster_path,
                  title: movie.original_title,
                  description: movie.overview,
                  release_date: movie.release_date,
                  votes: movie.vote_average,
                  id: movie.id,
                  category: "movie",
                  isBookmarked: movie.isBookmarked,
                }}
              />
            );
          })}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default Movies;
