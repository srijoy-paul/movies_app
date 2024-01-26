import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Movies from "./pages/Movies";
import SideBar from "./components/SideBar";
import TvSeries from "./pages/TvSeries";
import Bookmark from "./pages/Bookmark";
import Home from "./pages/Home";
import { Box } from "@mui/material";
import { palette } from "@mui/system";
import { Scrollbars } from "react-custom-scrollbars-2";

// dotenv.config();

interface MoviesContextData {
  movies_data: {
    movies: object[];
    page: number;
    totalResults: number | null;
  };
  setMovies_data: Dispatch<
    SetStateAction<{
      movies: object[];
      page: number;
      totalResults: number | null;
    }>
  >;
}
interface tvSeriesContextData {
  tvSeries_data: object[];
  setTvSeries_data: Dispatch<SetStateAction<object[]>>;
}

interface handleBookmarkClickContext {
  handleBookmarkClick: () => void;
}
export const moviesContext = createContext<MoviesContextData | null>(null);
export const tvSeriesContext = createContext<tvSeriesContextData | null>(null);

export const handleBookmarkClickContext = createContext();
export const bookmarkedItemsContext = createContext();

function App() {
  const [movies_data, setMovies_data] = useState<{
    movies: object[];
    page: number;
    total_results: number | null;
  }>({
    movies: [],
    page: 1,
    total_results: null,
  });
  const [tvSeries_data, setTvSeries_data] = useState<object[]>([]);
  const [bookmarkedItems, setBookmarkedItems] = useState<object[]>([]);

  const BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN; //for vitejs we can't use process.env cause that's for using nodeJS envoirnment
  const API_KEY = import.meta.env.VITE_API_KEY;

  interface optionsType {
    method: string;
    headers: { accept: string; Authorization: string };
  }

  useEffect(() => {
    (async () => {
      const options: optionsType = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      };

      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${movies_data.page}&sort_by=popularity.desc&api_key=${API_KEY}`,
        options
      );
      const response2 = await fetch(
        `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${API_KEY}`,
        options
      );
      const data = await response.json();
      const data2 = await response2.json();

      console.log("data", data);
      //       page: 1
      // total_pages: 42057
      // total_results: 841128

      const moviesData = data.results.map((movie) => {
        const movieItem = { ...movie, isBookmarked: false };
        return movieItem;
      });
      const tvseries_data = data2.results.map((tvserial) => {
        tvserial = { ...tvserial, isBookmarked: false };
        return tvserial;
      });
      // console.log("inside useeffect", movies_data, tvseries_data);

      setMovies_data({
        movies: moviesData,
        page: data.page,
        total_results: data.total_results,
      });
      setTvSeries_data(tvseries_data);
    })();
  }, []);

  function handleBookmarkClick(category, id) {
    if (category === "movie") {
      const bookmarked = movies_data.movies.filter((movie) => {
        return movie.id === id;
      });
      // console.log(`Bookmarked ${category}`, bookmarked[0]);
      bookmarked[0] = { ...bookmarked[0], category: "movie" };
      // console.log(bookmarked[0].isBookmarked);

      if (bookmarked[0].isBookmarked === false) {
        // console.log("Have to bookmark");
        bookmarked[0].isBookmarked = true;
        // console.log(bookmarked[0].isBookmarked);
        setBookmarkedItems((prevValue) => {
          // console.log("here", [...prevValue, bookmarked[0]]);

          return [...prevValue, bookmarked[0]];
        });

        const updateMovie_data = movies_data.movies.map((movie) => {
          if (movie.id === id) return bookmarked[0];
          else return movie;
        });

        setMovies_data((prev) => {
          return { ...prev, movies: updateMovie_data };
        });
      } else {
        bookmarked[0].isBookmarked = false;
        // console.log("Already bookmark have to remove");
        let removeBookmarked = bookmarkedItems.filter((bookmarkItem) => {
          return bookmarkItem.id !== id;
        });
        setBookmarkedItems(removeBookmarked);

        const updateMovie_data = movies_data.movies.map((movie) => {
          if (movie.id === id) return bookmarked[0];
          else return movie;
        });

        setMovies_data((prev) => {
          return { ...prev, movies: updateMovie_data };
        });
      }
    }

    if (category === "tvseries") {
      const bookmarked = tvSeries_data.filter((tvserial) => {
        return tvserial.id === id;
      });
      bookmarked[0] = { ...bookmarked[0], category: "tvseries" };

      if (bookmarked[0].isBookmarked === false) {
        bookmarked[0].isBookmarked = true;
        setBookmarkedItems((prevValue) => {
          return [...prevValue, bookmarked[0]];
        });
      } else {
        let removeBookmarked = bookmarkedItems.filter((bookmarkItem) => {
          return bookmarkItem.id !== id;
        });
        setBookmarkedItems(removeBookmarked);
      }
    }
  }

  return (
    <>
      <moviesContext.Provider
        value={{ movies_data: movies_data, setMovies_data: setMovies_data }}
      >
        <tvSeriesContext.Provider
          value={{
            tvSeries_data: tvSeries_data,
            setTvSeries_data: setTvSeries_data,
          }}
        >
          <handleBookmarkClickContext.Provider value={{ handleBookmarkClick }}>
            <bookmarkedItemsContext.Provider value={bookmarkedItems}>
              <Box
                id="parent-container"
                sx={{
                  display: "flex",
                  height: "100vh",
                  flexDirection: { xs: "column", lg: "row" },
                  bgcolor: "#2a9d8f",
                  width: "100%",
                }}
              >
                <SideBar />
                <div
                  id="right_side"
                  style={{
                    overflowY: "scroll",
                    flex: "1",
                  }}
                >
                  {/* <p>hello</p> */}
                  <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/movies" element={<Movies />}></Route>
                    <Route path="/tvseries" element={<TvSeries />}></Route>
                    <Route path="/bookmarks" element={<Bookmark />}></Route>
                  </Routes>
                </div>
              </Box>
            </bookmarkedItemsContext.Provider>
          </handleBookmarkClickContext.Provider>
        </tvSeriesContext.Provider>
      </moviesContext.Provider>
    </>
  );
}

export default App;
