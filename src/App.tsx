import {
  Dispatch,
  SetStateAction,
  createContext,
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

interface MoviesContextData {
  movies_data: object[];
  setMovies_data: Dispatch<SetStateAction<object[]>>;
}
export const moviesContext = createContext<MoviesContextData | null>(null);
function App() {
  const [movies_data, setMovies_data] = useState<object[]>([]);

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
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=faf8d698e3cb1b77632ad7410801e820",
        options
      );
      const data = await response.json();
      console.log(data);
      setMovies_data(data.results);
    })();
  }, []);
  return (
    <>
      <moviesContext.Provider
        value={{ movies_data: movies_data, setMovies_data: setMovies_data }}
      >
        <SideBar />
        <Routes>
          <Route path="/" element={<Movies />}></Route>
          <Route path="/tvseries" element={<TvSeries />}></Route>
          <Route path="/bookmarks" element={<Bookmark />}></Route>
        </Routes>
      </moviesContext.Provider>
    </>
  );
}

export default App;
