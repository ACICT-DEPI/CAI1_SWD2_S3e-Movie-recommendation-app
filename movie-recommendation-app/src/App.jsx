import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";
import MovieList from "./components/MovieList";
import { getMedia } from "./api";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Settings from "./components/Settings";
import Logout from "./components/Logout";
import "./App.css";

const App = () => {
  const [favourites, setFavourites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [mediaType, setMediaType] = useState("movie");
  const [category, setCategory] = useState("popular");
  const [newestMovies, setNewestMovies] = useState([]);

  const toggleFavourite = (media) => {
    setFavourites((prevFavourites) => {
      const isFavourite = prevFavourites.some(
        (favMedia) => favMedia.id === media.id
      );
      return isFavourite
        ? prevFavourites.filter((favMedia) => favMedia.id !== media.id)
        : [...prevFavourites, media];
    });
  };

  const toggleWatchlist = (movie) => {
    setWatchlist((prevWatchlist) => {
      const isInWatchlist = prevWatchlist.some((item) => item.id === movie.id);
      return isInWatchlist
        ? prevWatchlist.filter((item) => item.id !== movie.id)
        : [...prevWatchlist, movie];
    });
  };

  useEffect(() => {
    const fetchNewestMovies = async () => {
      try {
        const moviesResponse = await getMedia("movie", "popular");
        const seriesResponse = await getMedia("tv", "popular");

        const movies = Array.isArray(moviesResponse.results)
          ? moviesResponse.results
          : [];
        const series = Array.isArray(seriesResponse.results)
          ? seriesResponse.results
          : [];

        setNewestMovies([...movies, ...series]);
      } catch (error) {
        console.error("Error fetching newest movies:", error);
        setNewestMovies([]);
      }
    };
    fetchNewestMovies();
  }, []);

  const handleCategoryChange = (type, category) => {
    setMediaType(type);
    setCategory(category);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <>
              <Sidebar />
              <Header
                newestMovies={newestMovies}
                onCategoryChange={handleCategoryChange}
                toggleFavourite={toggleFavourite}
                favourites={favourites}
              />
              <MovieList
                category={category}
                type={mediaType}
                toggleFavourite={toggleFavourite}
                toggleWatchlist={toggleWatchlist}
                favourites={favourites}
                watchlist={watchlist}
              />
            </>
          }
        />
        <Route
          path="/favourites"
          element={
            <>
              <Sidebar />
              <Header
                newestMovies={newestMovies}
                onCategoryChange={handleCategoryChange}
                toggleFavourite={toggleFavourite}
                favourites={favourites}
              />
              <MovieList
                category="favourites"
                type="movie"
                toggleFavourite={toggleFavourite}
                toggleWatchlist={toggleWatchlist}
                favourites={favourites}
                watchlist={watchlist}
              />
            </>
          }
        />
        <Route
          path="/watch-list"
          element={
            <>
              <Sidebar />
              <Header
                newestMovies={newestMovies}
                onCategoryChange={handleCategoryChange}
                toggleFavourite={toggleFavourite}
                favourites={favourites}
              />
              <MovieList
                category="watch-list"
                type="movie"
                toggleFavourite={toggleFavourite}
                toggleWatchlist={toggleWatchlist}
                favourites={favourites}
                watchlist={watchlist}
              />
            </>
          }
        />
        <Route
          path="/coming-soon"
          element={
            <>
              <Sidebar />
              <Header
                newestMovies={newestMovies}
                onCategoryChange={handleCategoryChange}
                toggleFavourite={toggleFavourite}
                favourites={favourites}
              />
              <MovieList
                category="coming soon"
                type="movie"
                toggleFavourite={toggleFavourite}
                toggleWatchlist={toggleWatchlist}
                favourites={favourites}
                watchlist={watchlist}
              />
            </>
          }
        />
        <Route
          path="/trending"
          element={
            <>
              <Sidebar />
              <Header
                newestMovies={newestMovies}
                onCategoryChange={handleCategoryChange}
                toggleFavourite={toggleFavourite}
                favourites={favourites}
              />
              <MovieList
                category="trending"
                type="movie"
                toggleFavourite={toggleFavourite}
                toggleWatchlist={toggleWatchlist}
                favourites={favourites}
                watchlist={watchlist}
              />
            </>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <>
              <Sidebar />
              <Header
                newestMovies={newestMovies}
                onCategoryChange={handleCategoryChange}
                toggleFavourite={toggleFavourite}
                favourites={favourites}
              />
              <MovieDetail
                movies={newestMovies}
                toggleFavourite={toggleFavourite}
                toggleWatchlist={toggleWatchlist}
                favourites={favourites}
                watchlist={watchlist}
              />
            </>
          }
        />
        <Route
          path="/series/:id"
          element={
            <>
              <Sidebar />
              <Header
                newestMovies={newestMovies}
                onCategoryChange={handleCategoryChange}
                toggleFavourite={toggleFavourite}
                favourites={favourites}
              />
              <MovieDetail
                movies={newestMovies}
                toggleFavourite={toggleFavourite}
                toggleWatchlist={toggleWatchlist}
                favourites={favourites}
                watchlist={watchlist}
              />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <Sidebar />
              <Header
                newestMovies={newestMovies}
                onCategoryChange={handleCategoryChange}
                toggleFavourite={toggleFavourite}
                favourites={favourites}
              />
              <Settings />
            </>
          }
        />
        <Route
          path="/social"
          element={
            <>
              <Sidebar />
              <Header
                newestMovies={newestMovies}
                onCategoryChange={handleCategoryChange}
                toggleFavourite={toggleFavourite}
                favourites={favourites}
              />
              <div className=" ml-[340px] mt-24 text-white p-10 flex-row ">
                <table
                  className=" bg-zinc-800 rounded-xl w-[65vw] 
          shadow-md shadow-slate-300  "
                >
                  <h2 className="text-3xl mb-10 shadow-md rounded-xl p-4 bg-black shadow-gray-700 ">
                    Contact US
                  </h2>
                  <tr className=" flex flex-col mt-8 ml-8 w-[62vw] break-words text-wrap ">
                    <td className=" text-3xl mb-5 ">Lojaina Ayman:</td>
                    <td className=" text-2xl ml-8 mb-8">
                      lojainaaymanmohamed@gmail.com
                    </td>

                    <td className=" text-3xl mb-5">Shahd:</td>
                    <td className=" text-2xl ml-8 mb-9 ">
                      shahdelsayed@gmail.com
                    </td>
                  </tr>
                </table>
              </div>
            </>
          }
        />
        <Route
          path="/logout"
          element={
            <>
              <Sidebar />
              <Header
                newestMovies={newestMovies}
                onCategoryChange={handleCategoryChange}
                toggleFavourite={toggleFavourite}
                favourites={favourites}
              />
              <Logout />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
