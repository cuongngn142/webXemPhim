import { fetchMoreMovies } from "../services/movieService.js";
import slugify from "../components/slugify.js";
const API_URL = "http://localhost:3000";

export function renderPhimBoPage() {
  return `
  <section class="movie-section movie-type">
    <div class="main-content">
      <div class="title">Phim Bộ</div>
      <div class="movies-list phim-bo" data-type="PhimBo"></div>
    </div>
  </section>
  `;
}

export function renderPhimBoEventListener() {
  renderListPhimBo();
}

async function renderListPhimBo() {
  const movies = await fetchMoreMovies();

  const filteredPhimBoMovies = movies.filter(
    (movie) => movie.MovieTypeId === 2
  );

  const phimBo = document.querySelector(".movies-list.phim-bo");
  filteredPhimBoMovies.forEach((movie) => {
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
    phimBo.appendChild(Movie);
  });
}
