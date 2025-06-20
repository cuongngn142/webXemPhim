import { fetchMoreMovies } from "../services/movieService.js";
import { fetchAllUsers } from "../services/userService.js";
import { fetchAllCategories } from "../services/categoryService.js";
import { fetchListComments } from "../services/commentService.js";
import { fetchListReivews } from "../services/reviewService.js";

export function renderStatisticalPage() {
  return `
    <section class="statistical-page">
      <h2>Thống kê</h2>
      <div class="statistical-list">
        <div class="stat-item" id="stat-movie"><span class="stat-number">...</span><span>Phim</span></div>
        <div class="stat-item" id="stat-user"><span class="stat-number">...</span><span>Người dùng</span></div>
        <div class="stat-item" id="stat-category"><span class="stat-number">...</span><span>Thể loại</span></div>
        <div class="stat-item" id="stat-comment"><span class="stat-number">...</span><span>Bình luận</span></div>
        <div class="stat-item" id="stat-review"><span class="stat-number">...</span><span>Đánh giá</span></div>
      </div>
    </section>
  `;
}

export function renderStatisticalPageEventListener() {
  loadStatistical();
}

async function loadStatistical() {
  try {
    const [movies, users, categories, comments, reviews] = await Promise.all([
      fetchMoreMovies(),
      fetchAllUsers(),
      fetchAllCategories(),
      fetchListComments(),
      fetchListReivews(),
    ]);
    document.querySelector("#stat-movie .stat-number").textContent =
      movies.length;
    document.querySelector("#stat-user .stat-number").textContent =
      users.length;
    document.querySelector("#stat-category .stat-number").textContent =
      categories.length;
    document.querySelector("#stat-comment .stat-number").textContent =
      comments.length;
    document.querySelector("#stat-review .stat-number").textContent =
      reviews.length;
  } catch (err) {
    document
      .querySelectorAll(".stat-number")
      .forEach((e) => (e.textContent = "Lỗi"));
  }
}
