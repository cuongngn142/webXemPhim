import { fetchMoreMovies } from "../services/movieService.js";
import slugify from "../components/slugify.js";
const API_URL = "https://website-xem-phim.onrender.com";

export function renderPhimLePage() {
  return `
  <section class="movie-section movie-type">
    <div class="main-content">
      <div class="title">Phim Lẻ</div>
      <div class="movies-list phim-le" data-type="PhimLe"></div>
    </div>
  </section>
  `;
}

export function renderPhimLeEventListener() {
  renderListPhimle();
}

async function renderListPhimle() {
  const movies = await fetchMoreMovies();

  const filteredPhimLeMovies = movies.filter((movie) => movie.MovieTypeId === 1);
  
  const phimLe = document.querySelector(".movies-list.phim-le");
  filteredPhimLeMovies.forEach((movie) => {
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
    phimLe.appendChild(Movie);
  });
}
