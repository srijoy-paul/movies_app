import React, { useContext, useEffect, useState } from "react";
import Movie_card from "../components/Movie_card";
import { moviesContext } from "../App";

function Movies() {
  const { movies_data, setMovies_data } = useContext(moviesContext);

  return (
    <>
      <div id="items_container">
        {movies_data.map((movie, index) => {
          return <Movie_card key={index} />;
        })}
      </div>
    </>
  );
}

export default Movies;
