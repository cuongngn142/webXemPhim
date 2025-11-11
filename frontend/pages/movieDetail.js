import { renderPage } from "../main.js";
import { fetchMovieById } from "../services/movieService.js";
import { fetchMoreMovies } from "../services/movieService.js";

const API_BASE_URL = "https://website-xem-phim.onrender.com";

export function renderDetailMoviePage(movieId, movieSlugName) {
  return `
 <section class="movie-details-section">

   <div class="background-movie">
      <img src="/assets/images/test.webp" alt="" />
    </div>
 
  <div class="main-content">

  <div class="movie-container">
     <div class="movie-info-left">
      <img class="poster-movie" src="" alt="${movieSlugName}" />
      <div class="watch-now">
        <p>Xem Ngay</p>
      </div>
      <div class="btn-play">
        <svg xmlns="http://www.w3.org/2000/svg" width="84px" height="84px" viewBox="0 0 50 50"><path fill="currentColor" d="M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17s-7.6 17-17 17zm0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15s15-6.7 15-15s-6.7-15-15-15z"/><path fill="currentColor" d="M20 33.7V16.3L35 25l-15 8.7zm2-14v10.5l9-5.3l-9-5.2z"/></svg>
      </div>
    </div>
    <div class="movie-info-right">
      <h2 class="movie-name"><strong>The Last of Us</strong></h2>

      <div class="movie-group">
        <p class="movie-rating"></p>
        <p class="release-year"></p>
        <p class="total-episodes"></p>
      </div>
      <div class="movie-group-genre"></div>
      <div class="movie-content">
      <p class="label">Loại phim:</p>
      <p class="movie-type"></p>
      </div>    
      <div class="movie-content">
      <p class="label">Thời lượng:</p>
      <p class="duration"></p>
      </div>   
      <div class="movie-content">
      <p class="label">Ngôn ngữ:</p>
      <p class="language"></p>
      </div> 
      <div class="movie-content">
        <p class="label">Quốc gia:</p>
        <p class="country"></p>
      </div>

      <div class="movie-content">
        <p class="label">Đạo diễn:</p>
        <p class="director"></p>
      </div>

      <div class="movie-content">
        <p class="label">Diễn viên:</p>
        <p class="cast"></p>
      </div>

      <div class="movie-desc">
        <p class="label">Nội dung:</p>
        <p class="content" id="movie-desc"></p>
        <a href="#" id="toggle-desc" class="see-more">Xem thêm</a>
      </div>
  </div>


  </div>
</section>

  `;
}

export function renderDetailMovieEventListener(movieId, movieSlugName) {
  renderMovieInfos(movieId);
  handleSeeMoreDesc();
  handleMovieWatchNowClickEvent(movieId, movieSlugName);
}

async function movieEpisodesList(movieId) {
  const movie = await fetchMovieById(movieId);
  if (!movie || !movie.Episodes) {
    return [];
  }
  return movie.Episodes;
}

async function renderMovieInfos(movieId) {
  const movie = await fetchMovieById(movieId);
  console.log(movie);
  if (!movie) return;
  const posterMovie = document.querySelector(".poster-movie");
  posterMovie.src = API_BASE_URL + movie.PosterUrl;
  const movieBackground = document.querySelector(".background-movie");
  movieBackground.querySelector("img").src = API_BASE_URL + movie.BackdropUrl;
  const movieName = document.querySelector(".movie-name");
  movieName.textContent = movie.Title;
  const movieRating = document.querySelector(".movie-rating");
  movieRating.textContent = "★" + movie.Rating;
  const movieReleaseYear = document.querySelector(".release-year");
  movieReleaseYear.textContent = movie.ReleaseYear;
  const movieTotalEpisodes = document.querySelector(".total-episodes");
  movieTotalEpisodes.textContent =
    movie.Episodes.length + " / " + movie.Episodes.length + " tập";
  const movieGroupGenre = document.querySelector(".movie-group-genre");
  movieGroupGenre.innerHTML = "";
  if (movie.Categories.length > 0) {
    movie.Categories.forEach((m) => {
      const p = document.createElement("p");
      p.classList.add("genre");
      p.textContent = m.Name;
      movieGroupGenre.appendChild(p);
    });
  } else {
    const p = document.createElement("p");
    p.classList.add("genre");
    p.textContent = "Không xác định";
    movieGroupGenre.appendChild(p);
  }

  const movieDesc = document.querySelector(".movie-desc .content");
  movieDesc.textContent = movie.Description;
  const movieType = document.querySelector(".movie-type");
  movieType.textContent = movie.MovieTypeId === 1 ? "Phim Lẻ" : "Phim Bộ";
  const director = document.querySelector(".director");
  director.textContent = movie.Director;
  const cast = document.querySelector(".cast");
  cast.textContent = movie.Cast;
  const language = document.querySelector(".language");
  language.textContent = movie.Language;
  const country = document.querySelector(".country");
  country.textContent = movie.Country;
  const duration = document.querySelector(".duration");
  const durationEpisodes = movie.Episodes[0].Duration / 60;
  duration.textContent = durationEpisodes + " phút/ tập";
}

async function handleMovieWatchNowClickEvent(movieId, movieSlugName) {
  //do movieEpisodesList trả về 1 promise do async và await từ fetch nên phải async ở đay để lấy dữ liệu
  const listEpisodes = await movieEpisodesList(movieId);
  document.body.addEventListener("click", (e) => {
    const item = e.target.closest(".movie-info-left");

    if (item) {
      const targetPath = `/play/movie/${movieId}/${movieSlugName}/${listEpisodes[0].EpisodeNumber}`;
      if (location.pathname !== targetPath) {
        history.pushState({}, "", targetPath);
      }
      renderPage(targetPath);
      return;
    }
  });
}

function handleSeeMoreDesc() {
  const desc = document.querySelector(".movie-desc");
  const toggle = document.querySelector("#toggle-desc");

  if (desc && toggle) {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      desc.classList.toggle("expanded");
      toggle.textContent = desc.classList.contains("expanded")
        ? "Thu gọn"
        : "Xem thêm";
    });
  }
}

/*
movie.Episodes.forEach((ep) => {
  const btn = document.createElement("button");
  btn.textContent = `Tập ${ep.EpisodeNumber}`;
  btn.addEventListener("click", () => {
    source.src = API_BASE_URL + ep.VideoUrl;
    video.load();
    video.play();
  });
  episodeContainer.appendChild(btn);
});
*/
