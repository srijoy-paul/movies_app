import React, { useContext } from "react";
import { tvSeriesContext } from "../App";
import Movie_card from "../components/Movie_card";
import { log } from "console";

function TvSeries() {
  const { tvSeries_data, setTvSeries_data } = useContext(tvSeriesContext);
  return (
    <div
      id="items_container"
      style={{ display: "flex", justifyContent: "center" }}
    >
      {tvSeries_data.map((tvserial, index) => {
        return (
          <Movie_card
            key={index}
            values={{
              poster_path: tvserial.poster_path,
              title: tvserial.original_name,
              description: tvserial.overview,
              release_date: tvserial.first_air_date,
              votes: tvserial.vote_average,
              id: tvserial.id,
              category: "tvseries",
              isBookmarked: tvserial.isBookmarked,
            }}
          />
        );
        console.log(tvserial);
      })}
    </div>
  );
}

export default TvSeries;
