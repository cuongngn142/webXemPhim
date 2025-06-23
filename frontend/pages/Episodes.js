import { fetchMoreMovies } from "../services/movieService.js";
import {
  fetchEpisodesByMovieId,
  fetchAddEpisode,
  fetchUpdateEpisode,
  fetchDeleteEpisode,
} from "../services/episodeService.js";

const API_URL = "http://localhost:3000";

export function renderEpisodesPage() {
  return `
    <section class="episodes-page">
      <div class="episodes-page-header">
        <h2>Quản lý tập phim</h2>
        <div>
          <label for="movie-select">Chọn phim:</label>
          <select id="movie-select"></select>
          <button id="add-episode-btn" class="add-episode-btn">+ Thêm tập mới</button>
        </div>
      </div>
      <div class="episode-list"></div>
      <div class="edit-episode-popup hidden">
        <div class="popup-content wide-popup">
          <h3 id="popup-episode-title">Thêm/Sửa tập phim</h3>
          <form id="edit-episode-form" class="episode-form-modern">
            <div class="form-row">
              <div class="form-group">
                <label>Số tập</label>
                <input type="number" name="EpisodeNumber" required />
              </div>
              <div class="form-group">
                <label>Tên tập</label>
                <input type="text" name="Title" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Video URL</label>
                <input type="text" name="VideoUrl" required />
              </div>
              <div class="form-group">
                <label>Thời lượng (phút)</label>
                <input type="number" name="Duration" required />
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-save">Lưu thông tin</button>
              <button type="button" id="close-edit-episode-popup" class="btn-cancel">Hủy</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;
}

export function renderEpisodesPageEventListener() {
  loadMovieOptions();
  document.getElementById("add-episode-btn").onclick = openAddEpisodePopup;
  document.getElementById("close-edit-episode-popup").onclick =
    closeEpisodePopup;
  document.getElementById("edit-episode-form").onsubmit =
    handleEpisodeFormSubmit;
  document.getElementById("movie-select").onchange = loadEpisodes;
  loadEpisodes();
}

let currentEditingEpisodeId = null;
let currentMovieId = null;

async function loadMovieOptions() {
  const movies = await fetchMoreMovies();
  const select = document.getElementById("movie-select");
  select.innerHTML = movies
    .map((m) => `<option value="${m.MovieId}">${m.Title}</option>`)
    .join("");
  currentMovieId = select.value;
  // GỌI LUÔN loadEpisodes() ở đây để hiển thị tập phim của phim đầu tiên
  await loadEpisodes();
}

async function loadEpisodes() {
  const select = document.getElementById("movie-select");
  currentMovieId = select.value;
  if (!currentMovieId) {
    return;
  }
  const episodes = await fetchEpisodesByMovieId(currentMovieId);

  const list = document.querySelector(".episode-list");
  list.innerHTML = episodes.length
    ? episodes.map(renderEpisodeItem).join("")
    : `<div style="color:#aaa;text-align:center;padding:32px 0;">Chưa có tập phim nào</div>`;
  list
    .querySelectorAll(".edit-episode-btn")
    .forEach(
      (btn) =>
        (btn.onclick = () => openEditEpisodePopup(btn.closest(".episode-item")))
    );
  list
    .querySelectorAll(".delete-episode-btn")
    .forEach(
      (btn) =>
        (btn.onclick = () =>
          handleDeleteEpisode(btn.closest(".episode-item").dataset.id))
    );
}

function renderEpisodeItem(ep) {
  return `
    <div class="episode-item" data-id="${ep.EpisodeId}"
      data-episodenumber="${ep.EpisodeNumber}"
      data-title="${encodeURIComponent(ep.Title)}"
      data-videourl="${encodeURIComponent(ep.VideoUrl)}"
      data-duration="${ep.Duration}">
      <div>
        <strong>Tập ${ep.EpisodeNumber}: ${ep.Title}</strong><br>
        <span style="color:#aaa">Thời lượng: ${ep.Duration} phút</span>
      </div>
      <div class="episode-actions">
        <button class="edit-btn edit-episode-btn">Sửa</button>
        <button class="delete-btn delete-episode-btn">Xóa</button>
      </div>
    </div>
  `;
}

function openAddEpisodePopup() {
  currentEditingEpisodeId = null;
  const form = document.getElementById("edit-episode-form");
  form.reset();
  document.getElementById("popup-episode-title").textContent = "Thêm tập phim";
  document.querySelector(".edit-episode-popup").classList.remove("hidden");
}

function openEditEpisodePopup(item) {
  currentEditingEpisodeId = item.dataset.id;
  const form = document.getElementById("edit-episode-form");
  form.EpisodeNumber.value = item.dataset.episodenumber;
  form.Title.value = decodeURIComponent(item.dataset.title);
  form.VideoUrl.value = decodeURIComponent(item.dataset.videourl);
  form.Duration.value = item.dataset.duration;
  document.getElementById("popup-episode-title").textContent = "Sửa tập phim";
  document.querySelector(".edit-episode-popup").classList.remove("hidden");
}

function closeEpisodePopup() {
  document.querySelector(".edit-episode-popup").classList.add("hidden");
}

async function handleEpisodeFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const data = {
    MovieId: currentMovieId,
    EpisodeNumber: form.EpisodeNumber.value,
    Title: form.Title.value,
    VideoUrl: form.VideoUrl.value,
    Duration: form.Duration.value,
  };
  if (currentEditingEpisodeId) {
    await fetchUpdateEpisode(currentEditingEpisodeId, data);
  } else {
    await fetchAddEpisode(data);
  }
  closeEpisodePopup();
  loadEpisodes();
}

async function handleDeleteEpisode(id) {
  if (confirm("Bạn có chắc muốn xóa tập phim này?")) {
    await fetchDeleteEpisode(id);
    loadEpisodes();
  }
}
