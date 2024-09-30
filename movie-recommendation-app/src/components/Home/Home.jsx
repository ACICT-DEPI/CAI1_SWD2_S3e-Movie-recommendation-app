import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../Sidebar";
import MovieList from "../MovieList";
import Header from "../Header";
import MovieDetail from "../MovieDetail";
import { getMedia } from "../../api";
import "../../App.css";



const Home = () => {
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
      <div className="app-container">
        <Sidebar />
        <Header
          newestMovies={newestMovies}
          onCategoryChange={handleCategoryChange}
          toggleFavourite={toggleFavourite}
          favourites={favourites}
        />
        <Routes>
       
			
          <Route
            path="/home"
            element={
              <MovieList
                category={category}
                type={mediaType}
                toggleFavourite={toggleFavourite}
                toggleWatchlist={toggleWatchlist}
                favourites={favourites}
                watchlist={watchlist}
              />
            }
          />
          <Route
            path="/favourites"
            element={
              <MovieList
                category="favourites"
                type="movie"
                toggleFavourite={toggleFavourite}
                toggleWatchlist={toggleWatchlist}
                favourites={favourites}
                watchlist={watchlist}
              />
            }
          />
          <Route
            path="/watch-list"
            element={
              <MovieList
                category="watch-list"
                type="movie"
                toggleFavourite={toggleFavourite}
                toggleWatchlist={toggleWatchlist}
                favourites={favourites}
                watchlist={watchlist}
              />
            }
          />
          <Route
            path="/coming-soon"
            element={
              <MovieList
                category="coming soon"
                type="movie"
                toggleFavourite={toggleFavourite}
                toggleWatchlist={toggleWatchlist}
                favourites={favourites}
                watchlist={watchlist}
              />
            }
          />
          <Route
            path="/trending"
            element={
              <MovieList
                category="trending"
                type="movie"
                toggleFavourite={toggleFavourite}
                toggleWatchlist={toggleWatchlist}
                favourites={favourites}
                watchlist={watchlist}
              />
            }
          />
          <Route
            path="/movie/:id"
            element={
              <MovieDetail
                movies={newestMovies}
                toggleFavourite={toggleFavourite}
                toggleWatchlist={toggleWatchlist}
                favourites={favourites}
                watchlist={watchlist}
              />
            }
          />
          <Route
            path="/series/:id"
            element={
              <MovieDetail
                movies={newestMovies}
                toggleFavourite={toggleFavourite}
                toggleWatchlist={toggleWatchlist}
                favourites={favourites}
                watchlist={watchlist}
              />
            }
          />
        </Routes>
      </div>
  );
};

export default Home;

