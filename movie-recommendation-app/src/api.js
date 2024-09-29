import axios from "axios";

const API_KEY = "50d455ea752173746f38acc0f25a17e9";
const BASE_URL = "https://api.themoviedb.org/3";

export const getMedia = async (
  type = "movie",
  category = "popular",
  genreId = null,
  sortBy = "popularity.desc",
  page = 1
) => {
  try {
    let endpoint;

    if (type === "movie") {
      switch (category) {
        case "trending":
          endpoint = `/trending/movie/day`;
          break;
        case "popular":
          endpoint = `/movie/popular`;
          break;
        case "top_rated":
          endpoint = `/movie/top_rated`;
          break;
        case "upcoming":
          endpoint = `/movie/upcoming`;
          break;
        case "now_playing":
          endpoint = `/movie/now_playing`;
          break;
        case "genre":
          endpoint = `/discover/movie`;
          break;
        default:
          endpoint = `/movie/${category}`;
      }
    } else if (type === "tv") {
      switch (category) {
        case "trending":
          endpoint = `/trending/tv/day`;
          break;
        case "popular":
          endpoint = `/tv/popular`;
          break;
        case "top_rated":
          endpoint = `/tv/top_rated`;
          break;
        case "on_the_air":
          endpoint = `/tv/on_the_air`;
          break;
        case "airing_today":
          endpoint = `/tv/airing_today`;
          break;
        case "genre":
          endpoint = `/discover/tv`;
          break;
        default:
          endpoint = `/tv/${category}`;
      }
    }

    const params = {
      api_key: API_KEY,
      sort_by: sortBy,
      page: page,
    };

    if (genreId) {
      params.with_genres = genreId;
    }

    const response = await axios.get(`${BASE_URL}${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching media:", error);
    return { results: [], total_pages: 0 };
  }
};
