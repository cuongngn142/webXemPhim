import { fetchMovieById } from "../services/movieService.js";
import {
  fetchListReivews,
  fetchAddReivews,
} from "../services/reviewService.js";

import {
  fetchAddFavorite,
  fetchListUserFavorites,
  fetchDeleteFavorite,
} from "../services/favoriteService.js";
import {
  fetchListComments,
  fetchAddComment,
} from "../services/commentService.js";
const API_BASE_URL = "http://localhost:3000";

export function renderPlayMoviePage(movieId, movieSlugName, movieEpisode) {
  return `
    <section class="movie-play-section">
      <div class="main-content">
        <video id="video-player" controls poster="" preload="auto" crossorigin="anonymous">
          <source id="video-source" src="" type="video/mp4" />
          Trình duyệt không hỗ trợ video.
        </video>
        <div class="group-services">
          <div class="btn add-favorite">
          <a href="#">
            <svg
              width="20px"
              height="20px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12.357 17.214L12 17l-5 3V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6.5M16 19h6m-3-3v6"
              />
            </svg>
            <span>Yêu thích</span>
          </a>
          </div>
          <div class="btn next-episode">
          <a href="#">
            <svg
              width="20px"
              height="20px"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                d="M400 96c0-8.8-7.2-16-16-16L64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320zM384 32c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l320 0zM320 256c0 6.7-2.8 13-7.7 17.6l-112 104c-7 6.5-17.2 8.2-25.9 4.4s-14.4-12.5-14.4-22l0-208c0-9.5 5.7-18.2 14.4-22s18.9-2.1 25.9 4.4l112 104c4.9 4.5 7.7 10.9 7.7 17.6z"
              />
            </svg>
            <span>Chuyển tập</span>
          </a>
          </div>
          <div class="btn review">
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              width="20px"
              height="20px"
              viewBox="0 0 512 512"
            >
              <path
                d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"
              />
            </svg>
            <span>Đánh giá</span>
          </a>
          </div>
            <div class="review-dropdown">
              <div class="star-rating" id="starRating">
                <span data-value="1">&#9733;</span>
                <span data-value="2">&#9733;</span>
                <span data-value="3">&#9733;</span>
                <span data-value="4">&#9733;</span>
                <span data-value="5">&#9733;</span>
              </div>
            <button id="submitReview">Gửi đánh giá</button>
            </div>
          <div class="btn comment">
          <a href="#comment">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              width="20px"
              height="20px"
              viewBox="0 0 512 512"
            >
              <path
                d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9l.3-.5z"
              />
            </svg>
            <span>Bình luận</span>
          </a>
          </div>
          <div class="btn error-report">
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              width="20px"
              height="20px"
              viewBox="0 0 512 512"
            >
              <path
                d="M48 24C48 10.7 37.3 0 24 0S0 10.7 0 24L0 64 0 350.5 0 400l0 88c0 13.3 10.7 24 24 24s24-10.7 24-24l0-100 80.3-20.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30l0-279.7c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L48 52l0-28zm0 77.5l96.6-24.2c27-6.7 55.5-3.6 80.4 8.8c54.9 27.4 118.7 29.7 175 6.8l0 241.8-24.4 9.1c-33.7 12.6-71.2 10.7-103.4-5.4c-48.2-24.1-103.3-30.1-155.6-17.1L48 338.5l0-237z"
              />
            </svg>
            <span>Báo lỗi</span>
          </a>
          </div>
        </div>
        <div class="episodes-content">
          <div class="title-group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              fill="currentColor"
              viewBox="0 0 448 512"
            >
              <path
                d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
              />
            </svg>
            <h2>Chọn tập phim</h2>
          </div>
          <div class="episodes-list"></div>
        </div>
      </div>
    </section>

    <section id="comment" class="comment-section">
      <div class="main-content">
        <div class="top-content">
          <div class="comment-group">
            <div class="comment-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32px"
                height="32px"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path
                  d="M88.2 309.1c9.8-18.3 6.8-40.8-7.5-55.8C59.4 230.9 48 204 48 176c0-63.5 63.8-128 160-128s160 64.5 160 128s-63.8 128-160 128c-13.1 0-25.8-1.3-37.8-3.6c-10.4-2-21.2-.6-30.7 4.2c-4.1 2.1-8.3 4.1-12.6 6c-16 7.2-32.9 13.5-49.9 18c2.8-4.6 5.4-9.1 7.9-13.6c1.1-1.9 2.2-3.9 3.2-5.9zM208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 41.8 17.2 80.1 45.9 110.3c-.9 1.7-1.9 3.5-2.8 5.1c-10.3 18.4-22.3 36.5-36.6 52.1c-6.6 7-8.3 17.2-4.6 25.9C5.8 378.3 14.4 384 24 384c43 0 86.5-13.3 122.7-29.7c4.8-2.2 9.6-4.5 14.2-6.8c15.1 3 30.9 4.5 47.1 4.5zM432 480c16.2 0 31.9-1.6 47.1-4.5c4.6 2.3 9.4 4.6 14.2 6.8C529.5 498.7 573 512 616 512c9.6 0 18.2-5.7 22-14.5c3.8-8.8 2-19-4.6-25.9c-14.2-15.6-26.2-33.7-36.6-52.1c-.9-1.7-1.9-3.4-2.8-5.1C622.8 384.1 640 345.8 640 304c0-94.4-87.9-171.5-198.2-175.8c4.1 15.2 6.2 31.2 6.2 47.8l0 .6c87.2 6.7 144 67.5 144 127.4c0 28-11.4 54.9-32.7 77.2c-14.3 15-17.3 37.6-7.5 55.8c1.1 2 2.2 4 3.2 5.9c2.5 4.5 5.2 9 7.9 13.6c-17-4.5-33.9-10.7-49.9-18c-4.3-1.9-8.5-3.9-12.6-6c-9.5-4.8-20.3-6.2-30.7-4.2c-12.1 2.4-24.8 3.6-37.8 3.6c-61.7 0-110-26.5-136.8-62.3c-16 5.4-32.8 9.4-50 11.8C279 439.8 350 480 432 480z"
                />
              </svg>
              <span class="comment-sub-title">Bình luận</span>
            </div>
            <span class="quantity">(0)</span>
          </div>
          <div class="type-tabs">
            <a href="#" data-type="comment" class="item active">Bình luận</a>
            <a href="#" data-type="review" class="item">Đánh giá</a>
          </div>
        </div>
        <div class="comment-area">
          <textarea
            name=""
            id="commentArea"
            placeholder="Viết bình luận"
          ></textarea>
          <div class="comment-group-services">
            <label class="checkbox-label">
              <input type="checkbox" />
              <span>Bình luận ẩn danh?</span>
            </label>
            <label class="submit-label">
              <span>Gửi</span>
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5004 12H5.00043M4.91577 12.2915L2.58085 19.2662C2.39742 19.8142 2.3057 20.0881 2.37152 20.2569C2.42868 20.4034 2.55144 20.5145 2.70292 20.5567C2.87736 20.6054 3.14083 20.4869 3.66776 20.2497L20.3792 12.7296C20.8936 12.4981 21.1507 12.3824 21.2302 12.2216C21.2993 12.082 21.2993 11.9181 21.2302 11.7784C21.1507 11.6177 20.8936 11.5019 20.3792 11.2705L3.66193 3.74776C3.13659 3.51135 2.87392 3.39315 2.69966 3.44164C2.54832 3.48375 2.42556 3.59454 2.36821 3.74078C2.30216 3.90917 2.3929 4.18255 2.57437 4.72931L4.91642 11.7856C4.94759 11.8795 4.96317 11.9264 4.96933 11.9744C4.97479 12.0171 4.97473 12.0602 4.96916 12.1028C4.96289 12.1508 4.94718 12.1977 4.91577 12.2915Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </label>
          </div>
        </div>

        <div class="user-comment-content">
          <div class="user-item">
            <img src="/assets/images/default-avt.jpg" alt="User Avatar" />
            <div class="content">
              <div class="user-info-comment">
                <span class="user-name-comment">Abc</span>
                <span class="comment-time">02/12/2025</span>
              </div>
              <div class="comment-content">
                <span>Phim này hay lắm!</span>
              </div>
            </div>
          </div>

          <div class="user-item">
            <img src="/assets/images/default-avt.jpg" alt="User Avatar" />
            <div class="content">
              <div class="user-info-comment">
                <span class="user-name-comment">Abc</span>
                <span class="comment-time">02/12/2025</span>
              </div>
              <div class="comment-content">
                <span>Phim này hay lắm!</span>
              </div>
            </div>
          </div>

          <div class="user-item">
            <img src="/assets/images/default-avt.jpg" alt="User Avatar" />
            <div class="content">
              <div class="user-info-comment">
                <span class="user-name-comment">Abc</span>
                <span class="comment-time">02/12/2025</span>
              </div>
              <div class="comment-content">
                <span>Phim này hay lắm!</span>
              </div>
            </div>
          </div>

        </div>
        <div class="user-review-content">
          
        </div>

      </div>
    </section>
  `;
}

export async function renderPlayMovieEventListener(
  movieId,
  movieSlugName,
  movieEpisode
) {
  const movie = await fetchMovieById(movieId);
  if (!movie) return;

  renderEpisodesList(movie, movieEpisode);
  loadVideoByEpisode(movie, movieEpisode - 1);
  handleEpisodeClick(movie, movieSlugName);
  handleClickItemActive();
  handleAddUserFavoriteMovie(movieId);
  handleClickReview(movieId);
  handleNextEpisodes(movie, movieSlugName);
  renderListUserReview(movieId);
  renderListUserComment(movieId);
  handleSubmitComment(movieId);
  checkListFavorite(movieId);
}

function renderEpisodesList(movie, activeEpisode) {
  const episodesList = document.querySelector(".episodes-list");
  if (!episodesList || !movie.Episodes?.length) return;

  episodesList.innerHTML = "";

  movie.Episodes.forEach((episode, index) => {
    const item = createEpisodeItem(
      episode.EpisodeNumber,
      index + 1 === Number(activeEpisode)
    );
    episodesList.appendChild(item);
  });
}

function createEpisodeItem(episodeNumber, isActive = false) {
  const p = document.createElement("p");
  p.classList.add("episodes-item");
  if (isActive) p.classList.add("active");

  const epText = episodeNumber < 10 ? `0${episodeNumber}` : `${episodeNumber}`;
  p.textContent = `Ep ${epText}`;
  return p;
}

function handleEpisodeClick(movie, movieSlugName) {
  const items = document.querySelectorAll(".episodes-item");

  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      console.log("Bạn đã click tập số", index + 1);

      document.querySelectorAll(".episodes-item.active").forEach((el) => {
        el.classList.remove("active");
      });
      item.classList.add("active");

      loadVideoByEpisode(movie, index);

      const targetPath = `/play/movie/${movie.MovieId}/${movieSlugName}/${
        index + 1
      }`;
      if (location.pathname !== targetPath) {
        history.pushState({}, "", targetPath);
      }
    });
  });
}

function loadVideoByEpisode(movie, index) {
  const video = document.getElementById("video-player");
  const source = document.getElementById("video-source");

  if (!movie.Episodes || index >= movie.Episodes.length) return;

  const episode = movie.Episodes[index];

  video.poster = API_BASE_URL + movie.BackdropUrl;
  source.src = API_BASE_URL + episode.VideoUrl;
  video.load();

  console.log("Đang phát:", episode);
}

function handleClickItemActive() {
  const items = document.querySelectorAll(".type-tabs .item");

  if (items.length === 0) return;
  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      items.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
      changeForm();
    });
  });
}

function changeForm() {
  const itemActive = document.querySelector(".type-tabs .item.active");
  console.log(itemActive);
  console.log(itemActive.dataset.type);

  if (!itemActive) return;

  if (itemActive.dataset.type === "comment") {
    document.querySelector(".user-comment-content").style.display = "block";
    document.querySelector(".comment-area").style.display = "block";
    document.querySelector(".comment-sub-title").textContent = "Bình luận";
    document.querySelector(".quantity").style.display = "block";
    document.querySelector(".user-review-content").style.display = "none";
  } else if (itemActive.dataset.type === "review") {
    document.querySelector(".user-comment-content").style.display = "none";
    document.querySelector(".comment-area").style.display = "none";
    document.querySelector(".comment-sub-title").textContent = "Đánh giá";
    document.querySelector(".quantity").style.display = "none";
    document.querySelector(".user-review-content").style.display = "block";
  }
}

async function checkListFavorite(id) {
  const btn = document.querySelector(".btn.add-favorite");
  const userID = localStorage.getItem("userId");
  const FavoriteMovie = await fetchListUserFavorites(userID);
  const exists = FavoriteMovie.some((movie) => movie.MovieId === Number(id));
  if (exists) {
    btn.innerHTML = `
          <a href="#">
          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 10.5L11 12.5L15.5 8M19 21V7.8C19 6.11984 19 5.27976 18.673 4.63803C18.3854 4.07354 17.9265 3.6146 17.362 3.32698C16.7202 3 15.8802 3 14.2 3H9.8C8.11984 3 7.27976 3 6.63803 3.32698C6.07354 3.6146 5.6146 4.07354 5.32698 4.63803C5 5.27976 5 6.11984 5 7.8V21L12 17L19 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
            <span>Bỏ Yêu thích</span>
          </a>
     `;
  }
}

// xử lý favorites
async function handleAddUserFavoriteMovie(id) {
  const btn = document.querySelector(".btn.add-favorite");

  if (!btn) return;
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const userID = localStorage.getItem("userId");

    if (!userID) {
      alert("Vui lòng đăng nhập để thêm vào yêu thích.");
      return;
    }
    console.log(typeof id);
    //id cũng đang là kiểu string
    const FavoriteMovie = await fetchListUserFavorites(userID);
    const exists = FavoriteMovie.some((movie) => movie.MovieId === Number(id));
    if (exists) {
      const data = {
        userId: userID,
        movieId: id,
      };
      const result = await fetchDeleteFavorite(data);
      if (result) {
        alert(result.message);
      } else {
        alert("Xóa thất bại!");
      }
      return;
    }
    const dataAdd = {
      userId: userID,
      movieId: id,
    };
    try {
      const data = await fetchAddFavorite(dataAdd);

      if (data && data.message) {
        alert(data.message);
      }
    } catch (error) {
      alert("Thêm vào yêu thích thất bại!");
      console.error("Lỗi thêm yêu thích:", error);
    }
  });
}

function handleClickReview(movieId) {
  const btn = document.querySelector(".btn.review");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const dropdown = document.querySelector(".review-dropdown");
    dropdown.classList.toggle("show");
  });
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".btn.review") &&
      !e.target.closest(".review-dropdown")
    ) {
      const dropdown = document.querySelector(".review-dropdown");
      if (!dropdown) return;
      dropdown.classList.remove("show");
      const listStars = document.querySelectorAll(".star-rating span");
      listStars.forEach((s) => s.classList.remove("active"));
    }
  });
  handleSelectStarReview(movieId);
}

function handleSelectStarReview(movieId) {
  const listStars = document.querySelectorAll(".star-rating span");
  listStars.forEach((star, index) => {
    star.addEventListener("click", () => {
      listStars.forEach((s) => s.classList.remove("active"));
      for (let i = 0; i <= index; i++) {
        listStars[i].classList.add("active");
      }
      handleSubmitReview(movieId);
    });
  });
}

function handleNextEpisodes(movie, movieSlugName) {
  const next = document.querySelector(".btn.next-episode");

  next.addEventListener("click", (e) => {
    e.preventDefault();

    const epActive = document.querySelector(".episodes-item.active");
    if (!epActive) return;

    // Lấy số tập hiện tại từ text của phần tử active
    const epText = epActive.textContent.trim().replace("Ep ", "").trim();
    const ep = Number(epText);

    const totalEpisodes = document.querySelectorAll(".episodes-item").length;
    const nextEpisode = ep + 1; //quan trọng
    /*
    Bạn dùng ep là số tập hiện tại (ví dụ tập 3), và so sánh ep <= totalEpisodes.
    Giả sử phim có 3 tập thì:
    Tập hiện tại: 3 (ep = 3)
    Tổng tập: 3 (totalEpisodes = 3)
    Khi bấm "next", bạn vẫn dùng ep = 3 để so sánh:
    3 <= 3 đúng, nên sẽ tiếp tục chuyển tập (mà thực ra đang muốn chuyển tập 4, không có).
    Bạn không tăng ep lên trước khi so sánh, nên lúc nào cũng thỏa điều kiện, không bao giờ vào else để báo đã hết tập.
    */
    if (nextEpisode <= totalEpisodes) {
      // Xóa trạng thái active của tập hiện tại
      epActive.classList.remove("active");

      // Cập nhật trạng thái active cho tập tiếp theo
      const nextEpisodeElement =
        document.querySelectorAll(".episodes-item")[nextEpisode - 1];
      if (nextEpisodeElement) {
        nextEpisodeElement.classList.add("active");
      }

      // Tải video cho tập tiếp theo (lưu ý index bắt đầu từ 0)
      loadVideoByEpisode(movie, nextEpisode - 1);

      // Cập nhật URL trong trình duyệt
      const targetPath = `/play/movie/${movie.MovieId}/${movieSlugName}/${nextEpisode}`;
      if (location.pathname !== targetPath) {
        history.pushState({}, "", targetPath);
      }
    } else {
      alert("Đã đến tập phim cuối, không thể chuyển tiếp!");
    }
  });
}

function handleSubmitReview(movieId) {
  const btn = document.querySelector("#submitReview");
  const userId = localStorage.getItem("userId");

  btn.onclick = (e) => {
    e.preventDefault();
    // Lấy tất cả các span.active trong .star-rating
    const stars = document.querySelectorAll(".star-rating span.active");
    if (!userId) {
      alert("Vui lòng đăng nhập trước khi đánh giá!");
      return;
    }
    // Chuyển NodeList sang mảng để dùng map
    const starsArray = Array.from(stars);

    // Giả sử mỗi span có thuộc tính data-star chứa số sao (ví dụ: data-star="3")
    // Nếu không, bạn phải lấy số sao theo cách khác, ví dụ lấy textContent rồi parseInt

    // Lấy mảng số sao của từng span active
    const starValues = starsArray.map((star) => {
      // Ví dụ lấy data-star attribute, nếu bạn lưu số sao ở đó
      return parseInt(star.getAttribute("data-value"), 10);
    });

    // Tìm số lớn nhất
    const maxStar = Math.max(...starValues);
    console.log("Số sao lớn nhất được chọn:", maxStar);
    const data = {
      MovieId: movieId,
      UserId: userId,
      Rating: maxStar,
    };
    const addReview = fetchAddReivews(data);
    if (addReview) {
      alert("Đánh giá thành công!");
    }
  };
}
async function renderListUserReview(movieId) {
  const users = await fetchListReivews();
  const parent = document.querySelector(".user-review-content");
  console.log(users);

  parent.innerHTML = "";

  users.forEach((user) => {
    if (user.MovieId !== Number(movieId)) return;

    const item = document.createElement("div");
    item.classList.add("user-item-review");

    const img = document.createElement("img");
    img.src = "/assets/images/default-avt.jpg";
    img.alt = "User Avatar";

    const content = document.createElement("div");
    content.classList.add("content");

    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info-review");

    const userName = document.createElement("span");
    userName.classList.add("user-name-review");
    userName.textContent = user.FullName;

    const reviewTime = document.createElement("span");
    reviewTime.classList.add("review-time");
    reviewTime.textContent = user.CreatedAt;

    userInfo.append(userName, reviewTime);

    const reviewContent = document.createElement("div");
    reviewContent.classList.add("review-content");

    const rating = document.createElement("span");
    rating.textContent = `${user.Rating}⭐`;

    reviewContent.append(rating);
    content.append(userInfo, reviewContent);
    item.append(img, content);

    parent.appendChild(item);
  });
}

async function renderListUserComment(movieId) {
  const users = await fetchListComments();
  const parent = document.querySelector(".user-comment-content");
  parent.innerHTML = "";
  let count = 0;
  users.forEach((user) => {
    if (user.MovieId !== Number(movieId)) return;
    count++;
    const item = document.createElement("div");
    item.classList.add("user-item");

    const img = document.createElement("img");
    img.src = "/assets/images/default-avt.jpg";
    img.alt = "User Avatar";

    const content = document.createElement("div");
    content.classList.add("content");

    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info-comment");

    const userName = document.createElement("span");
    userName.classList.add("user-name-comment");
    userName.textContent = user.isAnonymous === 1 ? "Ẩn danh" : user.FullName;

    const reviewTime = document.createElement("span");
    reviewTime.classList.add("comment-time");
    reviewTime.textContent = user.CreatedAt;

    userInfo.append(userName, reviewTime);

    const reviewContent = document.createElement("div");
    reviewContent.classList.add("comment-content");

    const comment = document.createElement("span");
    comment.textContent = user.Content;

    reviewContent.append(comment);
    content.append(userInfo, reviewContent);
    item.append(img, content);

    parent.appendChild(item);
  });
  document.querySelector(".quantity").textContent = `(${count})`;
}

function handleSubmitComment(movieId) {
  const btn = document.querySelector(".submit-label");

  if (btn) {
    btn.onclick = async () => {
      const checkBox = document.querySelector(".checkbox-label input");
      const isCheck = checkBox.checked ? 1 : 0;
      const textArea = document.getElementById("commentArea");
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Vui lòng đăng nhập trước khi bình luận!");
        return;
      }
      const data = {
        MovieId: movieId,
        UserId: userId,
        Content: textArea.value,
        isAnonymous: isCheck,
      };
      const result = await fetchAddComment(data);
      if (result) {
        alert("Thêm bình luận thành công!");
        textArea.value = ""; // Xóa nội dung sau khi gửi
        renderListUserComment(movieId); // Reload lại danh sách comment
      }
    };
  }
}
