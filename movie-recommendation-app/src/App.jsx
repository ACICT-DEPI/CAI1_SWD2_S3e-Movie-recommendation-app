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
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
