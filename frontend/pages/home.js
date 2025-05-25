import { createMovieListSection } from "../components/listMovie.js";
// prettier-ignore
import { fetchHighRatedMovies, fetchMoreMovies} from "../services/movieService.js";
// prettier-ignore
import { fetchCheckLogin, fetchRegisterUser } from "../services/userService.js";
// prettier-ignore
import { fetchAddFavorite, fetchListUserFavorites,} from "../services/favoriteService.js";

const API_URL = "http://localhost:3000";

export function renderHomePage() {
  return `    
  <section class="featured-section">
    <div class="featured-movie">
      <div class="featured-movie-item">
      <div class="slides-wrapper">
        <div class="slide-container">
          <div class="slide-default" style="background-color:rgb(242, 180, 110); width: 100%; height: 800px; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: white; font-weight:700;">
            Hiện không có phim đề xuất nào.
          </div>
        </div>
          <div class="featured-movie-item-content">
        <div class="featured-movie-item-name">
          <p></p>
        </div>
        <div class="featured-movie-item-info">
            <p class="title">Overview</p>
            <div class="desc">
              <p></p>
            </div>
        </div>
      </div>
      <div class="featured-movie-icon">
        <svg class="btn-play" fill="#fff" width="28px" height="28px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
        <svg class="btn-favorite"  width="28px" height="28px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.357 17.214L12 17l-5 3V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6.5M16 19h6m-3-3v6"/></svg>
      </div>
      <div class="featured-movie-dot-list">
        <span class="dot active"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
      </div>
    </div>
  </section>

  ${createMovieListSection(
    "phim-de-xuat",
    "Phim đề xuất",
    "High Rated",
    "high-rated"
  )}
  ${createMovieListSection("phim-moi", "Phim mới", "Newest", "newest")}
  ${createMovieListSection("tinh-cam", "Phim Tình cảm", "Romance", "romance")}
  ${createMovieListSection("hanh-dong", "Phim Hành động", "Action", "action")}
  ${createMovieListSection("hai-huoc", "Phim Hài hước", "Comedy", "comedy")}
  ${createMovieListSection(
    "vo-thuat",
    "Phim Võ thuật",
    "Martial Arts",
    "martial-arts"
  )}
  ${createMovieListSection(
    "hoat-hinh",
    "Phim Hoạt hình",
    "Animation",
    "animation"
  )}
  ${createMovieListSection(
    "vien-tuong",
    "Phim Viễn tưởng",
    "Science Fiction",
    "science-fiction"
  )}
`;
}

export function renderEventListener() {
  renderRecommendedMovies();
  renderMovies();
  focusListMovie();
  searchMovies();
  openModal();
  changeForm();
  handleLogout();
  handleAddUserFavoriteMovie();
  document
    .getElementById("btn-register")
    .addEventListener("click", handleRegisterSubmit);
  document
    .getElementById("btn-login")
    .addEventListener("click", handleLoginSubmit);
}

function changeURLWithMovieId() {
  const movieItem = document.querySelectorAll(".movies-item");
  const btnPlay = document.querySelector(".btn-play");
  const activeSlide = document.querySelector(".slide.active");

  const movieId = activeSlide.getAttribute("data-id");

  movieItem.forEach((item) => {
    const movieID = item.dataset.id;
    item.addEventListener("click", () => {
      history.pushState({}, "", `/movie/${movieID}`);
    });
  });

  btnPlay.addEventListener("click", () => {
    if (!movieId) return;
    history.pushState({}, "", `/movie/${movieId}`);
  });
}

//render list phim để xuất và banner
async function renderRecommendedMovies() {
  const movies = await fetchHighRatedMovies();
  const slideContainer = document.querySelector(".slide-container");
  if (!slideContainer) return;

  slideContainer.innerHTML = "";
  if (movies.length > 0) {
    const defaultSlide = document.querySelector(".slide-default");
    if (defaultSlide) {
      defaultSlide.remove();
    }
  }

  movies.slice(0, 5).forEach((movie) => {
    const slide = document.createElement("div");
    slide.classList.add("slide");
    slide.setAttribute("data-id", movie.MovieId);
    slide.setAttribute("data-overview", movie.Description);

    const img = document.createElement("img");
    img.src = `${API_URL}${movie.BackdropUrl}`;
    img.alt = movie.Title;

    slide.appendChild(img);
    slideContainer.appendChild(slide);
  });

  movies.forEach((movie) => {
    const recommendedMovie = document.createElement("div");
    recommendedMovie.classList.add("movies-item");
    recommendedMovie.setAttribute("data-id", movie.MovieId);
    const img = document.createElement("img");
    img.classList.add("movie-img");
    img.src = `${API_URL}${movie.PosterUrl}`;
    img.alt = movie.Title;
    const name = document.createElement("h2");
    name.classList.add("movie-name");
    name.textContent = movie.Title;
    const movieList = document.querySelector(".movies-list.high-rated");
    if (movieList) {
      recommendedMovie.append(img, name);
      movieList.appendChild(recommendedMovie);
    }
  });
  setupSlider();
  setupSubSlider("high-rated");
  changeURLWithMovieId();
}

//rewnder list các phim khác
async function renderMovies() {
  const movies = await fetchMoreMovies();

  // 1. Render danh sách phim mới (newest)
  const newestList = document.querySelector(".movies-list.newest");
  if (newestList) {
    const newestMovies = [...movies].sort(
      (a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt)
    );
    newestMovies.forEach((movie) => {
      const Movie = document.createElement("div");
      Movie.classList.add("movies-item");
      Movie.setAttribute("data-id", movie.MovieId);

      const img = document.createElement("img");
      img.classList.add("movie-img");
      img.src = `${API_URL}${movie.PosterUrl}`;
      img.alt = movie.Title;

      const name = document.createElement("h2");
      name.classList.add("movie-name");
      name.textContent = movie.Title;

      Movie.append(img, name);
      newestList.appendChild(Movie);
    });

    setupSubSlider("newest");
    changeURLWithMovieId();
  }

  // 2. Render theo từng thể loại
  document.querySelectorAll(".movies-list").forEach((movieList) => {
    const type = movieList.dataset.type;
    if (type === "newest" || type === "high-rated") return;

    // Lọc phim có thể loại trùng với 'type'
    const filteredMovies = movies.filter(
      (movie) =>
        Array.isArray(movie.Categories) &&
        movie.Categories.some((cat) => cat.Name === type)
    );

    filteredMovies.forEach((movie) => {
      const Movie = document.createElement("div");
      Movie.classList.add("movies-item");
      Movie.setAttribute("data-id", movie.MovieId);

      const img = document.createElement("img");
      img.classList.add("movie-img");
      img.src = `${API_URL}${movie.PosterUrl}`;
      img.alt = movie.Title;

      const name = document.createElement("h2");
      name.classList.add("movie-name");
      name.textContent = movie.Title;

      Movie.append(img, name);
      movieList.appendChild(Movie);
    });
    setupSubSlider(type);
  });
}

async function searchMovies() {
  const input = document.querySelector(".search-input");
  const dropdown = document.querySelector(".dropdown-result");

  let movies = [];
  movies = await fetchMoreMovies();

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();

    if (!query) {
      dropdown.style.display = "none";
      dropdown.innerHTML = "";
      return;
    }

    // Lọc phim theo tên chứa query
    const filtered = movies.filter(
      (movie) => movie.Title && movie.Title.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      dropdown.style.display = "none";
      dropdown.innerHTML = "";
      return;
    }
    dropdown.innerHTML = filtered
      .map(
        (movie) =>
          `<li><a href="#" data-title="${movie.Title}">${movie.Title}</a></li>`
      )
      .join("");

    dropdown.style.display = "block";
  });

  dropdown.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      const selectedTitle = e.target.getAttribute("data-title");
      input.value = selectedTitle;
      dropdown.style.display = "none";
      dropdown.innerHTML = "";
      console.log("Đã chọn phim:", selectedTitle);
    }
  });

  // Ẩn dropdown khi click ra ngoài
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-box")) {
      dropdown.style.display = "none";
      dropdown.innerHTML = "";
    }
  });
}

// prettier-ignore
async function handleLoginSubmit(e) {
  e.preventDefault();
  const userName = document.querySelector(".modal-login .user-name").value.trim();
  const password = document.querySelector(".modal-login .password").value;
  const checkboxStatus = document.getElementById('agree-terms-login');

  if (!checkboxStatus.checked) {
    alert('Vui lòng đồng ý các điều khoản!');
    return;
  }

  if (!userName || !password) {
    alert('Vui lòng nhập đầy đủ thông tin!');
    return;
  }

  const data = { username: userName, password: password }
  try {
  const user = await fetchCheckLogin(data);
    if(user && user.UserId){
      alert('Đăng nhập thành công!');
      document.querySelector('.user-info').style.display = 'none';

      const loginSuccess = document.querySelector(".user-info-login-success");
      loginSuccess.style.display = 'flex';
      loginSuccess.querySelector("span").textContent = user.FullName;

      document.querySelector(".modal.modal-login").style.display = "none";
      document.querySelector(".modal-overlay").style.display = "none";
      document.body.style.overflow = "";

      localStorage.setItem('userId', user.UserId);
      const userID = localStorage.getItem('userId');
      getListUserFavoriteMovies(userID); 
    }else {
      alert('Tài khoản hoặc mật khẩu không đúng!');
    }
    } catch (error) {
    alert('Đăng nhập thất bại!');
    console.error('Lỗi khi đăng nhập:', error);
  }
}

function handleLogout() {
  const userInfoSuccess = document.querySelector(".user-info-login-success");
  const logoutBtn = document.getElementById("btn-logout");

  userInfoSuccess.addEventListener("click", (e) => {
    // Chỉ toggle khi click vào chính container hoặc dropdown-toggle, tránh vô tình đóng mở do bấm logout
    if (e.target !== logoutBtn) {
      userInfoSuccess.classList.toggle("dropdown-active");
    }
  });

  logoutBtn.parentElement.addEventListener("click", () => {
    alert("Đăng xuất thành công!");
    document.querySelector(".user-info").style.display = "flex";
    const loginSuccess = document.querySelector(".user-info-login-success");
    loginSuccess.style.display = "none";
    // Ẩn dropdown khi đăng xuất
    userInfoSuccess.classList.remove("dropdown-active");
    const count = document.querySelector(".favorite-movie p");
    if (count) count.textContent = "0";
    localStorage.removeItem("userId");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".user-info-login-success")) {
      userInfoSuccess.classList.remove("dropdown-active");
    }
  });
}

// prettier-ignore
async function handleRegisterSubmit(e) {
  e.preventDefault();
  const fullName = document
    .querySelector(".modal-register .full-name")
    .value.trim();
  const userName = document
    .querySelector(".modal-register .user-name")
    .value.trim();
  const email = document
    .querySelector(".modal-register .email")
    .value.trim();
  const password = document.querySelector(".modal-register .password").value;
  const confirmPassword = document.querySelector(
    ".modal-register .confirm-password"
  ).value;

  if(password !== confirmPassword){
    alert('Mật khẩu không trùng nhau!');
    return;
  }

  const checkboxStatus = document.getElementById('agree-terms-register');
 if (!checkboxStatus.checked) {
  alert('Vui lòng đồng ý các điều khoản!');
  return;
  }

  const dataRegister ={
    userName: userName,
    email: email,
    password: password,
    fullName: fullName
  }
  const data = await fetchRegisterUser(dataRegister)
    // Nếu thành công
    alert(data.message);
    const overlay = document.querySelector(".modal-overlay");
    overlay.style.display = "none";
    const modalLogin = document.querySelector('.modal.modal-login');
    modalLogin.style.display = 'block';
    const modalRegister = document.querySelector('.modal.modal-register');
    modalRegister.style.display = 'none';
    document.body.style.overflow = "";

}

function focusListMovie() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, null, `#${targetId}`);
      }
    });
  });
}

// xử lý favorites
async function handleAddUserFavoriteMovie() {
  document
    .querySelector(".btn-favorite")
    .addEventListener("click", async () => {
      const activeSlide = document.querySelector(".slide.active");

      const userID = localStorage.getItem("userId");
      const movieId = activeSlide.getAttribute("data-id");

      if (!userID) {
        alert("Vui lòng đăng nhập để thêm vào yêu thích.");
        return;
      }
      const dataAdd = {
        userId: userID,
        movieId: movieId,
      };
      try {
        const data = await fetchAddFavorite(dataAdd);

        if (data && data.message) {
          alert(data.message);
        } else {
          alert("Đã thêm vào danh sách yêu thích!");
        }
      } catch (error) {
        alert("Thêm vào yêu thích thất bại!");
        console.error("Lỗi thêm yêu thích:", error);
      }
    });
}

// lấy danh sách favorites của user
async function getListUserFavoriteMovies(userID) {
  console.log(userID);
  const list = await fetchListUserFavorites(userID);
  const count = document.querySelector(".favorite-movie p");
  count.textContent = list.length;
}

function setupSubSlider(type) {
  const list = document.querySelector(`.movies-list.${type}`);
  const leftArrow = document.querySelector(`.left-arrow.${type}`);
  const rightArrow = document.querySelector(`.right-arrow.${type}`);

  if (!list || !leftArrow || !rightArrow) return;

  const scrollAmount = 240; // mỗi lần cuộn ~1 item (bao gồm khoảng cách/gap)

  leftArrow.addEventListener("click", () => {
    list.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  });

  rightArrow.addEventListener("click", () => {
    list.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  });
}

function setupSlider() {
  const container = document.querySelector(".slides-wrapper .slide-container");
  const dots = document.querySelectorAll(".featured-movie-dot-list .dot");
  const p = document.querySelector(".featured-movie-item-name p");
  const desc = document.querySelector(".desc p");
  const slides = container.querySelectorAll(".slide");
  const img = container.querySelectorAll("img");

  let currentIndex = 0;

  function showSlide(index) {
    container.style.transform = `translateX(-${index * 100}%)`;

    p.textContent = img[index].alt;
    desc.textContent = slides[index].dataset.overview;

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    //active cho slide để thêm favorites
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    currentIndex = index;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });
  setInterval(() => {
    const nextIndex = (currentIndex + 1) % dots.length;
    showSlide(nextIndex);
  }, 5000);

  showSlide(0);
}

//open modal
function openModal() {
  const btn = document.querySelector(".user-info");
  const loginModal = document.querySelector(".modal-login");
  const registerModal = document.querySelector(".modal-register");
  const overlay = document.querySelector(".modal-overlay");

  btn.addEventListener("click", () => {
    loginModal.style.display = "block";
    registerModal.style.display = "none";
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";
  });

  document.addEventListener("click", (e) => {
    const isClickInsideModal = e.target.closest(".modal");
    const isClickOnBtn = e.target.closest(".user-info");

    if (!isClickInsideModal && !isClickOnBtn) {
      loginModal.style.display = "none";
      registerModal.style.display = "none";
      overlay.style.display = "none";
      document.body.style.overflow = "";
    }
  });
}

function changeForm() {
  const loginForm = document.querySelector(".modal-login");
  const registerForm = document.querySelector(".modal-register");

  document.addEventListener("click", (e) => {
    const registerBtn = e.target.closest(".load-form-register");
    const loginBtn = e.target.closest(".load-form-login");

    if (registerBtn) {
      e.preventDefault();
      loginForm.style.display = "none";
      registerForm.style.display = "block";
    }

    if (loginBtn) {
      e.preventDefault();
      registerForm.style.display = "none";
      loginForm.style.display = "block";
    }
  });
}
