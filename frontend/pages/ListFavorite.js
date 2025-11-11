import { fetchListUserFavorites } from "../services/favoriteService.js";
import slugify from "../components/slugify.js";
const API_URL = "https://website-xem-phim.onrender.com";

export function renderFavoritePage() {
  return `
  <section class="movie-section movie-type">
    <div class="main-content">
      <div class="title">Phim Yêu Thích</div>
      <div class="movies-list phim-yeu-thich data-type="PhimYeuThich"></div>
    </div>
  </section>
  `;
}

export function renderFavoriteEventListener() {
  renderListFavorite();
}

async function renderListFavorite() {
  const userId = localStorage.getItem("userId");
  const movies = await fetchListUserFavorites(userId);

  const PhimYeuThich = document.querySelector(".movies-list.phim-yeu-thich");
  movies.forEach((movie) => {
    const Movie = document.createElement("div");
    Movie.classList.add("movies-item");
    Movie.setAttribute("data-id", movie.MovieId);

    const img = document.createElement("img");
    img.classList.add("movie-img");
    img.src = `${API_URL}${movie.PosterUrl}`;
    img.alt = slugify(movie.Title);

    const name = document.createElement("h2");
    name.classList.add("movie-name");
    name.textContent = movie.Title;

    Movie.append(img, name);
    PhimYeuThich.appendChild(Movie);
  });
}
