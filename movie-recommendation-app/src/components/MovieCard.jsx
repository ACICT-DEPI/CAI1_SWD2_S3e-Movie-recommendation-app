import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

const MovieCard = ({ movie, toggleFavourite, favourites }) => {
  const navigate = useNavigate();

  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date;
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";

  const isFavourite = favourites.some((favMovie) => favMovie.id === movie.id);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating / 2 - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`full-${i}`}
          icon={faStar}
          style={{ color: "#B197FC" }}
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FontAwesomeIcon
          key="half"
          icon={faStarHalfAlt}
          style={{ color: "#B197FC" }}
        />
      );
    }

    while (stars.length < 5) {
      stars.push(
        <FontAwesomeIcon
          key={`empty-${stars.length}`}
          icon={faStarEmpty}
          style={{ color: "#B197FC" }}
        />
      );
    }

    return stars;
  };

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={title}
      />
      <div className="movie-info">
        <h4>{title}</h4>
        <p>
          {releaseYear} | {renderStars(movie.vote_average)}
        </p>
      </div>
      <button
        className="fav-btn"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavourite(movie);
        }}
      >
        {isFavourite ? "❤" : "♡"}
      </button>
    </div>
  );
};

export default MovieCard;
