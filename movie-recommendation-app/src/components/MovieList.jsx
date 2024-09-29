import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "../styles/MovieList.css";
import { getMedia } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const GENRES = [
  { id: "28", name: "Action" },
  { id: "12", name: "Adventure" },
  { id: "16", name: "Animation" },
];

const YEARS = ["2024", "2023", "2022", "2021", "2020"];

const MovieList = ({
  category,
  type,
  toggleFavourite,
  toggleWatchlist,
  favourites,
  watchlist,
}) => {
  const [media, setMedia] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [sortType, setSortType] = useState("default");
  const [filterRating, setFilterRating] = useState(0);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      let results = [];

      try {
        if (category === "favourites") {
          results = favourites;
        } else if (category === "watch-list") {
          results = watchlist;
        } else if (category === "coming soon") {
          const response = await getMedia("movie", "upcoming");
          results = response.results || [];
        } else if (type && category) {
          const response = await getMedia(
            type,
            category,
            null,
            "popularity.desc",
            currentPage
          );
          results = response.results;
          setTotalPages(response.total_pages);
        }

        setMedia(results);

        handleFilterChange(results);
      } catch (error) {
        console.error("Error fetching media:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [category, type, currentPage, favourites, watchlist]);

  useEffect(() => {
    handleFilterChange(media);
  }, [media, filterRating, selectedGenre, selectedYear]);

  const handleSortChange = (event) => {
    const sortValue = event.target.value;
    setSortType(sortValue);

    const sorted = [...filteredMedia].sort((a, b) => {
      switch (sortValue) {
        case "title":
          return a.title.localeCompare(b.title);
        case "rating":
          return b.vote_average - a.vote_average;
        case "release":
          return new Date(b.release_date) - new Date(a.release_date);
        default:
          return 0;
      }
    });
    setFilteredMedia(sorted);
  };

  const handleFilterChange = (mediaToFilter) => {
    const filtered = mediaToFilter.filter((item) => {
      const matchesRating =
        filterRating > 0 ? item.vote_average >= filterRating : true;
      const matchesGenre = selectedGenre
        ? item.genre_ids.includes(parseInt(selectedGenre))
        : true;
      const matchesYear = selectedYear
        ? new Date(item.release_date).getFullYear() === parseInt(selectedYear)
        : true;

      return matchesRating && matchesGenre && matchesYear;
    });
    setFilteredMedia(filtered);
  };

  const toggleFilterOptions = () => {
    setShowFilterOptions((prev) => !prev);
  };

  const handleRatingChange = (e) => {
    setFilterRating(parseFloat(e.target.value));
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="movie-list">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {filteredMedia.length > 0 && (
            <h3 className="category-heading">
              {category === "favourites"
                ? "Your Favourites"
                : category === "watch-list"
                ? "Your Watchlist"
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </h3>
          )}

          {filteredMedia.length > 0 && (
            <div className="controls">
              <select
                className="sort-dropdown"
                onChange={handleSortChange}
                value={sortType}
              >
                <option value="default">Sort By</option>
                <option value="title">Title</option>
                <option value="rating">Rating</option>
                <option value="release">Release Date</option>
              </select>

              <button className="filter-button" onClick={toggleFilterOptions}>
                <FontAwesomeIcon icon={faFilter} />
              </button>

              {showFilterOptions && (
                <div className="filter-options">
                  <select
                    className="filter-dropdown"
                    onChange={handleRatingChange}
                  >
                    <option value="0">Rating</option>
                    <option value="8">8+</option>
                    <option value="7">7+</option>
                    <option value="6">6+</option>
                    <option value="5">5+</option>
                  </select>

                  <select
                    className="filter-dropdown"
                    onChange={handleGenreChange}
                  >
                    <option value="">Genre</option>
                    {GENRES.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>

                  <select
                    className="filter-dropdown"
                    onChange={handleYearChange}
                  >
                    <option value="">Year</option>
                    {YEARS.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <button className="apply-filter" onClick={handleFilterChange}>
                    Apply Filters
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="movie-list-grid">
            {filteredMedia.length > 0 ? (
              filteredMedia.map((item) => (
                <MovieCard
                  key={item.id}
                  movie={item}
                  toggleFavourite={toggleFavourite}
                  toggleWatchlist={toggleWatchlist}
                  favourites={favourites}
                  watchlist={watchlist}
                />
              ))
            ) : (
              <p className="no-favourites-message">
                {category === "favourites"
                  ? "Your favourite movies will appear here!"
                  : category === "watch-list"
                  ? "Movies added to your watchlist will appear here!"
                  : "No movies or series found in this category."}
              </p>
            )}
          </div>

          {filteredMedia.length > 0 && (
            <div className="pagination">
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MovieList;
