import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/MovieDetail.css";

const MovieDetail = ({
  movies,
  toggleFavourite,
  favourites,
  toggleWatchlist,
  watchlist,
}) => {
  const { id } = useParams();
  const [videoKey, setVideoKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const movie = movies.find((item) => item.id === parseInt(id));

  if (!movie) {
    return <div>Movie not found. Please try again.</div>;
  }

  const handleWatchNow = async () => {
    setLoading(true);
    setError(null);
    const API_KEY = "50d455ea752173746f38acc0f25a17e9";
    const videoUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`;

    try {
      const response = await fetch(videoUrl);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const trailer = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          setVideoKey(trailer.key);
        } else {
          console.log("Trailer not found");
        }
      } else {
        console.log("No video found for this movie.");
      }
    } catch (error) {
      console.error("Error fetching video:", error);
      setError("Failed to fetch video. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWatchlist = () => {
    toggleWatchlist(movie);
  };

  const isSeries = movie.number_of_episodes || movie.episodes;

  return (
    <>
      <div className="movie-detail">
        <img
          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          alt={movie.title || movie.name}
          className="movie-poster"
        />
        <div className="movie-info">
          <h1>{movie.title || movie.name}</h1>
          <p className="rating">⭐ {movie.vote_average}/10</p>
          <p className="description">
            {movie.overview || "Description not available"}
          </p>
          <div className="action-buttons">
            <button className="watch-now" onClick={handleWatchNow}>
              Watch Now
            </button>
            <button className="watchlist-btn" onClick={handleAddToWatchlist}>
              {watchlist.some((item) => item.id === movie.id)
                ? "Remove from Watchlist"
                : "Add to Watchlist"}
            </button>
            <button className="fav-btn" onClick={() => toggleFavourite(movie)}>
              {favourites.some((fav) => fav.id === movie.id) ? "❤" : "♡"}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
          {isSeries && (
            <div className="episodes">
              <h3>Episodes:</h3>
              <p>
                Total Episodes:{" "}
                {movie.number_of_episodes || movie.episodes?.length || 0}
              </p>
              <ul>
                {movie.episodes?.map((episode, index) => (
                  <li key={index}>
                    {episode.name} (Episode {episode.episode_number})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {videoKey && (
        <div className="youtube-player-container">
          <iframe
            width="100%"
            height="500px"
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </>
  );
};

export default MovieDetail;
