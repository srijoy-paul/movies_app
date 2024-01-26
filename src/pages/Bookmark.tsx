import React, { useContext } from "react";
import { bookmarkedItemsContext } from "../App";
import Movie_card from "../components/Movie_card";

function Bookmark() {
  const bookmarkedItems = useContext(bookmarkedItemsContext);
  console.log("bookmark.tsx Bookmarked items", bookmarkedItems);

  return (
    <div
      id="items_container"
      style={{
        // border: "2px solid red",
        display: "flex",
        justifyContent: "center",
        padding: "12px 0",
        // width:  "100%",
      }}
    >
      {bookmarkedItems.map((movie, index) => {
        let favouriteReleaseDate;
        let favouriteName;
        if (movie.category === "movie") {
          favouriteReleaseDate = movie.release_date;
          favouriteName = movie.original_title;
        } else {
          favouriteReleaseDate = movie.first_air_date;
          favouriteName = movie.original_name;
        }
        return (
          <Movie_card
            key={index}
            values={{
              poster_path: movie.poster_path,
              title: favouriteName,
              description: movie.overview,
              release_date: favouriteReleaseDate,
              votes: movie.vote_average,
              id: movie.id,
              category: "movie",
              isBookmarked: movie.isBookmarked,
            }}
          />
        );
      })}
    </div>
  );
}

export default Bookmark;
