import {
  fetchMoreMovies,
  deleteMovieById,
  updateMovieById,
  fetchAddMovie,
  updateMovieCategories,
} from "../services/movieService.js";
import { fetchAllCategories } from "../services/categoryService.js";
const API_URL = "http://localhost:3000";

export function renderMoviePage() {
  return `
    <section class="movie-page">
      <div class="movie-page-header">
        <h2>Danh sách phim</h2>
        <button class="add-movie-btn">+ Thêm phim mới</button>
      </div>
      <div class="movie-list"></div>
      <!-- Popup sửa/thêm phim -->
      <div class="edit-movie-popup hidden">
        <div class="popup-content">
          <h3 id="popup-title">Sửa thông tin phim</h3>
          <form id="edit-movie-form" class="movie-form-modern wide-form">
            <div class="form-row">
              <div class="form-group">
                <label for="movie-title">Tên phim</label>
                <input id="movie-title" type="text" name="Title" required />
              </div>
              <div class="form-group">
                <label for="movie-year">Năm phát hành</label>
                <input id="movie-year" type="number" name="ReleaseYear" required />
              </div>
              <div class="form-group">
                <label for="movie-rating">Đánh giá</label>
                <input id="movie-rating" type="number" step="0.1" name="Rating" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="movie-director">Đạo diễn</label>
                <input id="movie-director" type="text" name="Director" required />
              </div>
              <div class="form-group">
                <label for="movie-cast">Diễn viên</label>
                <input id="movie-cast" type="text" name="Cast" required />
              </div>
              <div class="form-group">
                <label for="movie-language">Ngôn ngữ</label>
                <input id="movie-language" type="text" name="Language" required />
              </div>
              <div class="form-group">
                <label for="movie-country">Quốc gia</label>
                <input id="movie-country" type="text" name="Country" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="movie-poster">Poster URL</label>
                <input id="movie-poster" type="text" name="PosterUrl" required />
              </div>
              <div class="form-group">
                <label for="movie-backdrop">Backdrop URL</label>
                <input id="movie-backdrop" type="text" name="BackdropUrl" required />
              </div>
              <div class="form-group">
                <label for="movie-type">Loại phim</label>
                <select id="movie-type" name="MovieTypeId" required>
                  <option value="">Chọn loại phim</option>
                  <option value="1">Phim lẻ</option>
                  <option value="2">Phim bộ</option>
                </select>
              </div>
              <div class="form-group">
                <label for="movie-categories">Thể loại</label>
                <select id="movie-categories" name="CategoryIds" multiple required></select>
              </div>
            </div>
            <div class="form-group">
              <label for="movie-desc">Mô tả</label>
              <textarea id="movie-desc" name="Description" required></textarea>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-save">Lưu thông tin</button>
              <button type="button" id="close-edit-popup" class="btn-cancel">Hủy</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;
}

export function renderMoviePageEventListener() {
  initEventHandlers();
  loadMovies();
}

let currentEditingMovieId = null;

// Load danh sách phim
async function loadMovies() {
  const movies = await fetchMoreMovies();
  const movieListContainer = document.querySelector(".movie-list");
  movieListContainer.innerHTML = movies.map(renderMovieItem).join("");
}

// Tạo HTML cho từng phim
function renderMovieItem(movie) {
  return `
    <div class="movie-item" data-id="${movie.MovieId}"
         data-title="${encodeURIComponent(movie.Title || "")}"
         data-description="${encodeURIComponent(movie.Description || "")}"
         data-releaseyear="${movie.ReleaseYear || ""}"
         data-director="${encodeURIComponent(movie.Director || "")}"
         data-cast="${encodeURIComponent(movie.Cast || "")}"
         data-rating="${movie.Rating || ""}"
         data-language="${encodeURIComponent(movie.Language || "")}"
         data-country="${encodeURIComponent(movie.Country || "")}"
         data-posterurl="${encodeURIComponent(movie.PosterUrl || "")}"
         data-backdropurl="${encodeURIComponent(movie.BackdropUrl || "")}"
         data-movietypeid="${movie.MovieTypeId || ""}"
         data-categoryids="${
           Array.isArray(movie.CategoryIds)
             ? movie.CategoryIds.join(",")
             : movie.CategoryIds || ""
         }">
      <div class="movie-info">
        <img class="movie-thumb" src="${
          API_URL + movie.PosterUrl
            ? API_URL + movie.PosterUrl
            : "/assets/img/no-image.png"
        }" alt="${movie.Title}" />
        <div>
          <h4>${movie.Title} (${movie.ReleaseYear})</h4>
          <p class="movie-desc">${movie.Description || "Không có mô tả"}</p>
        </div>
      </div>
      <div class="movie-actions">
        <button class="edit-btn" title="Sửa phim">Sửa Phim</button>
        <button class="delete-btn" title="Xóa phim">Xóa Phim</button>
      </div>
    </div>
  `;
}

// Gán sự kiện cho các nút
function initEventHandlers() {
  const closeBtn = document.getElementById("close-edit-popup");
  const form = document.getElementById("edit-movie-form");
  const movieListContainer = document.querySelector(".movie-list");
  const addBtn = document.querySelector(".add-movie-btn");

  if (movieListContainer) {
    movieListContainer.addEventListener("click", handleMovieItemClick);
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", closePopup);
  }
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }
  if (addBtn) {
    addBtn.addEventListener("click", openAddPopup);
  }
}

// Xử lý click trong danh sách phim (Xóa / Sửa)
async function handleMovieItemClick(e) {
  const movieDiv = e.target.closest(".movie-item");
  if (!movieDiv) return;
  if (e.target.classList.contains("delete-btn")) {
    await handleDeleteMovie(movieDiv.dataset.id);
    return;
  }
  if (e.target.classList.contains("edit-btn")) {
    const movie = {
      MovieId: movieDiv.dataset.id,
      Title: decodeURIComponent(movieDiv.dataset.title),
      Description: decodeURIComponent(movieDiv.dataset.description),
      ReleaseYear: movieDiv.dataset.releaseyear,
      Director: decodeURIComponent(movieDiv.dataset.director),
      Cast: decodeURIComponent(movieDiv.dataset.cast),
      Rating: movieDiv.dataset.rating,
      Language: decodeURIComponent(movieDiv.dataset.language),
      Country: decodeURIComponent(movieDiv.dataset.country),
      PosterUrl: decodeURIComponent(movieDiv.dataset.posterurl),
      BackdropUrl: decodeURIComponent(movieDiv.dataset.backdropurl),
      MovieTypeId: movieDiv.dataset.movietypeid,
      CategoryIds: movieDiv.dataset.categoryids
        ? movieDiv.dataset.categoryids.split(",").map((id) => Number(id.trim()))
        : [],
    };
    openEditPopup(movie);
  }
}

// Xử lý xóa phim
async function handleDeleteMovie(movieId) {
  if (confirm("Bạn có chắc muốn xóa phim này?")) {
    await deleteMovieById(movieId);
    loadMovies();
  }
}

// Mở popup chỉnh sửa
function openEditPopup(movie) {
  currentEditingMovieId = movie.MovieId;
  document.getElementById("popup-title").textContent = "Sửa thông tin phim";
  const form = document.getElementById("edit-movie-form");

  form.Title.value = movie.Title || "";
  form.Description.value = movie.Description || "";
  form.ReleaseYear.value = movie.ReleaseYear || "";
  form.Director.value = movie.Director || "";
  form.Cast.value = movie.Cast || "";
  form.Rating.value = movie.Rating || "";
  form.Language.value = movie.Language || "";
  form.Country.value = movie.Country || "";
  form.PosterUrl.value = movie.PosterUrl || "";
  form.BackdropUrl.value = movie.BackdropUrl || "";
  form.MovieTypeId.value = movie.MovieTypeId || "";

  // Lấy danh sách thể loại từ API và set selected
  fetchAllCategories().then((categories) => {
    const select = form.CategoryIds;
    select.innerHTML = categories
      .map((cat) => `<option value="${cat.CategoryId}">${cat.Name}</option>`)
      .join("");
    let selectedCategoryIds = [];
    if (typeof movie.CategoryIds === "string") {
      selectedCategoryIds = movie.CategoryIds.split(",").map(Number);
    } else if (Array.isArray(movie.CategoryIds)) {
      selectedCategoryIds = movie.CategoryIds.map(Number);
    }
    for (const option of select.options) {
      option.selected = selectedCategoryIds.includes(Number(option.value));
    }
  });

  document.querySelector(".edit-movie-popup").classList.remove("hidden");
}

// Mở popup thêm phim mới
function openAddPopup() {
  currentEditingMovieId = null;
  const form = document.getElementById("edit-movie-form");
  document.getElementById("popup-title").textContent = "Thêm phim mới";
  form.reset();
  fetchAllCategories().then((categories) => {
    const select = form.CategoryIds;
    select.innerHTML = categories
      .map((cat) => `<option value="${cat.CategoryId}">${cat.Name}</option>`)
      .join("");
  });
  document.querySelector(".edit-movie-popup").classList.remove("hidden");
}

// Đóng popup
function closePopup() {
  const form = document.getElementById("edit-movie-form");
  const popup = document.querySelector(".edit-movie-popup");
  popup.classList.add("hidden");
  form.reset();
}

// Gửi form cập nhật/thêm phim
async function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById("edit-movie-form");
  const formData = new FormData(form);
  const movieData = Object.fromEntries(formData.entries());

  // Chuyển đổi kiểu dữ liệu
  movieData.ReleaseYear = Number(movieData.ReleaseYear);
  movieData.Rating = parseFloat(movieData.Rating || 0);
  movieData.MovieTypeId = Number(movieData.MovieTypeId || 0);

  // Lấy mảng thể loại
  const categoryIds = formData.getAll("CategoryIds").map(Number);

  if (currentEditingMovieId) {
    await updateMovieById(currentEditingMovieId, movieData);
    await updateMovieCategories(currentEditingMovieId, categoryIds); // <-- Gọi API cập nhật thể loại
  } else {
    const result = await fetchAddMovie(movieData);
    if (result && result.MovieId) {
      await updateMovieCategories(result.MovieId, categoryIds); // <-- Gọi API cập nhật thể loại cho phim mới
    }
  }
  closePopup();
  loadMovies();
}

// Hàm khởi tạo danh sách thể loại phim vào select box (nếu cần dùng riêng)
export async function initCategoryOptions(selectElement, selectedIds = []) {
  const categories = await fetchAllCategories();
  selectElement.innerHTML = categories
    .map((cat) => `<option value="${cat.CategoryId}">${cat.Name}</option>`)
    .join("");
  // Nếu có selectedIds (mảng id), focus các thể loại đã chọn
  for (const option of selectElement.options) {
    option.selected = selectedIds.includes(Number(option.value));
  }
}

// Gọi hàm khởi tạo danh sách thể loại phim khi tài liệu đã được tải hoàn toàn
document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("movie-categories");
  if (categorySelect) {
    initCategoryOptions(categorySelect);
  }
});
