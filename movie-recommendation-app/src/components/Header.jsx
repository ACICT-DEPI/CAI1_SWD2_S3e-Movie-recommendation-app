import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = ({
  newestMovies = [],
  onCategoryChange,
  toggleFavourite,
  favourites = [],
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [headerHeight, setHeaderHeight] = useState(50);
  const [hideMovieDetails, setHideMovieDetails] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const trendingMovies = Array.isArray(newestMovies)
    ? newestMovies.slice(0, 5)
    : [];

  useEffect(() => {
    if (trendingMovies.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingMovies.length);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [trendingMovies.length]);

  const currentMovie =
    trendingMovies.length > 0 ? trendingMovies[currentIndex] : null;
  const backgroundImage = currentMovie?.backdrop_path
    ? `url(https://image.tmdb.org/t/p/original/${currentMovie.backdrop_path})`
    : "";

  const isHomePage = location.pathname === "/home";
  const isFavourite =
    currentMovie && favourites.some((fav) => fav.id === currentMovie.id);

  useEffect(() => {
    setHeaderHeight(isHomePage ? 340 : 50);
    setHideMovieDetails(!isHomePage);
  }, [isHomePage]);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    if (isHomePage) {
      const newHeight = Math.max(50, 340 - scrollPosition * 3.5);
      setHeaderHeight(newHeight);
      setHideMovieDetails(newHeight <= 280);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const handleSearchInputChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const apiKey = "50d455ea752173746f38acc0f25a17e9";
    const searchUrl = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
      query
    )}&api_key=${apiKey}`;

    try {
      const response = await fetch(searchUrl);
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSuggestionClick = (movie) => {
    setSearchQuery("");
    setSearchResults([]);
    navigate(`/movie/${movie.id}`);
  };

  return (
    <header
      className={`header ${isHomePage ? "full" : "short"}`}
      style={{
        backgroundImage: isHomePage ? backgroundImage : "none",
        height: `${headerHeight}px`,
      }}
    >
      <div className="header-overlay">
        <div className="header-left">
          <nav>
            <ul>
              <li>
                <Link
                  to="/home"
                  onClick={() => onCategoryChange("movie", "popular")}
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/home"
                  onClick={() => onCategoryChange("tv", "popular")}
                >
                  Series
                </Link>
              </li>
            </ul>
          </nav>

          {isHomePage && currentMovie ? (
            <div
              className={`movie-details ${hideMovieDetails ? "hidden" : ""}`}
            >
              <h1>{currentMovie.title}</h1>
              <p>{new Date(currentMovie.release_date).getFullYear()}</p>
              <p>{currentMovie.vote_average}/10</p>
              <div className="header-buttons">
                <button className="watch-now">Watch Now</button>
                <button
                  className="favourite"
                  onClick={() => toggleFavourite(currentMovie)}
                  aria-label={`Toggle favourite for ${currentMovie.title}`}
                >
                  {isFavourite ? "❤" : "♡"}
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <div className="header-right">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            {searchResults.length > 0 && (
              <ul className="suggestions-dropdown">
                {searchResults
                  .filter(
                    (item) =>
                      (item.title &&
                        item.title
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())) ||
                      (item.name &&
                        item.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()))
                  )
                  .map((item) => (
                    <li
                      key={item.id}
                      onClick={() => handleSuggestionClick(item)}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                        alt={item.title || item.name}
                        className="suggestion-poster"
                      />
                      {item.title || item.name} (
                      {new Date(
                        item.release_date || item.first_air_date
                      ).getFullYear()}
                      )
                    </li>
                  ))}
              </ul>
            )}
            <i className="fas fa-search"></i>
          </div>
          <i className="fas fa-bell notification-icon"></i>

          <i className="fas fa-user-circle profile-icon"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
