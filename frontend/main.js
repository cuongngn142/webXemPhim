import renderMovieLayout from "./layouts/movieLayout.js";
import renderMainLayout from "./layouts/mainLayout.js";
import renderBlankLayout from "./layouts/blankLayout.js";
import { renderNotFound } from "./pages/404.js";
import { renderHomePage } from "./pages/home.js";
import { renderDetailMoviePage } from "./pages/movieDetail.js";
import { renderHomeEventListener } from "./pages/home.js";
import { renderDetailMovieEventListener } from "./pages/movieDetail.js";
import { renderPlayMoviePage } from "./pages/moviePlay.js";
import {
  renderStatisticalPage,
  renderStatisticalPageEventListener,
} from "./pages/Statistical.js";
import {
  renderEpisodesPage,
  renderEpisodesPageEventListener,
} from "./pages/Episodes.js";
import {
  renderMoviePage,
  renderMoviePageEventListener,
} from "./pages/Movies.js";
import { renderUserPage, renderUserPageEventListener } from "./pages/Users.js";
import { renderPlayMovieEventListener } from "./pages/moviePlay.js";
import {
  openModal,
  changeForm,
  handleLogout,
  handleLoginSubmit,
  handleRegisterSubmit,
} from "./pages/home.js";
import {
  renderCategoriesPageEventListener,
  renderCategoriesPage,
} from "./pages/Categories.js";
import { renderPhimLePage, renderPhimLeEventListener } from "./pages/phimLe.js";
import { renderPhimBoPage, renderPhimBoEventListener } from "./pages/phimBo.js";
import {
  renderFavoritePage,
  renderFavoriteEventListener,
} from "./pages/ListFavorite.js";
import { fetchUserById } from "./services/userService.js";
import checkLogin from "./components/checkLogin.js";
const app = document.getElementById("app");
app.innerHTML = "";
const routes = {
  "/": {
    title: "WebXemPhim - Phim Hay - Phim Mới",
    render: () => renderHomePage(),
    layout: renderMainLayout,
  },
  "/dashboard/statistical": {
    title: "Statistical - Phim Hay - Phim Mới",
    render: () => renderStatisticalPage(),
    layout: renderBlankLayout,
  },
  "/dashboard/movie": {
    title: "Movie - Phim Hay - Phim Mới",
    render: () => renderMoviePage(),
    layout: renderBlankLayout,
  },
  "/dashboard/episode": {
    title: "Episode - Phim Hay - Phim Mới",
    render: () => renderEpisodesPage(),
    layout: renderBlankLayout,
  },
  "/dashboard/user": {
    title: "Users - Phim Hay - Phim Mới",
    render: () => renderUserPage(),
    layout: renderBlankLayout,
  },
  "/dashboard/category": {
    title: "Category - Phim Hay - Phim Mới",
    render: () => renderCategoriesPage(),
    layout: renderBlankLayout,
  },
  "/detail/movie/:id/:slug": {
    title: "Chi Tiết Phim - Phim Hay - Phim Mới",
    render: (params) => renderDetailMoviePage(params.id, params.slug),
    layout: renderMovieLayout,
  },
  "/play/movie/:id/:slug/:episode": {
    title: "Xem phim - Phim Hay - Phim Mới",
    render: (params) =>
      renderPlayMoviePage(params.id, params.slug, params.episode),
    layout: renderMovieLayout,
  },
  "/phimLe": {
    title: "List Phim Lẻ - Phim Hay - Phim Mới",
    render: () => renderPhimLePage(),
    layout: renderMovieLayout,
  },
  "/phimBo": {
    title: "List Phim Bộ - Phim Hay - Phim Mới",
    render: () => renderPhimBoPage(),
    layout: renderMovieLayout,
  },
  "/danh-sach/phim-yeu-thich": {
    title: "Phim Yêu Thích - Phim Hay - Phim Mới",
    render: () => renderFavoritePage(),
    layout: renderMovieLayout,
  },
};

function parsePath(path) {
  const parts = path.split("/").filter((part) => part !== "");
  if (parts[0] === "detail" && parts[1] === "movie" && parts[2]) {
    return {
      route: "/detail/movie/:id/:slug",
      params: { id: parts[2], slug: parts[3] },
    };
  } else if (
    parts[0] === "play" &&
    parts[1] === "movie" &&
    parts[2] &&
    parts[3] &&
    parts[4]
  ) {
    return {
      route: "/play/movie/:id/:slug/:episode",
      params: { id: parts[2], slug: parts[3], episode: parts[4] },
    };
  }
  return { route: path, params: {} };
}

// Khi dùng location.pathname, nó sẽ lấy toàn bộ phần đường dẫn (path) sau domain – từ dấu / đầu tiên cho đến hết path, không bao gồm query (?) hay hash (#).
export async function renderPage(path) {
  const { route, params } = parsePath(path);
  const config = routes[route];
  let title = "";
  let mainContent = "";
  let layoutFn = renderMainLayout;

  if (config) {
    title = config.title;
    layoutFn = config.layout || renderMainLayout;
    mainContent = await config.render(params);
  } else {
    title = "WebXemPhim - 404";
    mainContent = renderNotFound();
  }

  document.title = title;
  app.innerHTML = layoutFn(mainContent);
  checkLogin();
  openModal();
  changeForm();
  handleLogout();
  handleCLickMovieType();
  handleActiveSideBarMenu();
  setActiveSidebarMenuByRoute();
  handleClickDashBoard();
  const reg = document.getElementById("btn-register");
  if (reg) {
    reg.addEventListener("click", handleRegisterSubmit);
  }
  const log = document.getElementById("btn-login");
  if (log) {
    log.addEventListener("click", handleLoginSubmit);
  }
  if (route === "/") {
    renderHomeEventListener();
  } else if (route === "/detail/movie/:id/:slug") {
    renderDetailMovieEventListener(params.id, params.slug);
  } else if (route === "/play/movie/:id/:slug/:episode") {
    renderPlayMovieEventListener(params.id, params.slug, params.episode);
  } else if (route === "/phimLe") {
    renderPhimLeEventListener();
  } else if (route === "/phimBo") {
    renderPhimBoEventListener();
  } else if (route === "/danh-sach/phim-yeu-thich") {
    renderFavoriteEventListener();
  } else if (route === "/dashboard/statistical") {
    renderStatisticalPageEventListener();
  } else if (route === "/dashboard/movie") {
    renderMoviePageEventListener();
  } else if (route === "/dashboard/user") {
    renderUserPageEventListener();
  } else if (route === "/dashboard/category") {
    renderCategoriesPageEventListener();
  } else if (route === "/dashboard/episode") {
    renderEpisodesPageEventListener();
  }
}

export function handleClickDashBoard() {
  const btn = document.querySelector("#btn-dashboard");
  if (!btn) return;

  // Xóa sự kiện cũ nếu có (tránh add nhiều lần)
  btn.replaceWith(btn.cloneNode(true));
  const newBtn = document.querySelector("#btn-dashboard");

  newBtn.addEventListener("click", async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Bạn chưa đăng nhập!");
      return;
    }
    const user = await fetchUserById(userId);
    if (!user || !user.Roles) {
      alert("Không lấy được thông tin người dùng!");
      return;
    }
    const checkRoles = user.Roles.some((role) => role.RoleName === "Admin");
    if (!checkRoles) {
      alert("Bạn không có quyền truy cập vào trang này!");
      return;
    }
    const targetPath = `/dashboard/statistical`;
    if (location.pathname !== targetPath) {
      history.pushState({}, "", targetPath);
    }
    renderPage(targetPath);
  });
}

function handleActiveSideBarMenu() {
  const lisst = document.querySelectorAll(".sidebar ul li");

  lisst.forEach((li) => {
    li.querySelector("a").addEventListener("click", () => {
      document
        .querySelector(".sidebar ul li.active")
        .classList.remove("active");
      li.classList.add("active");
    });
  });
}

function setActiveSidebarMenuByRoute() {
  const path = window.location.pathname;
  const items = document.querySelectorAll(".sidebar ul li");
  items.forEach((li) => {
    const link = li.querySelector("a");
    if (link && link.getAttribute("href") === path) {
      li.classList.add("active");
    } else {
      li.classList.remove("active");
    }
  });
}

function handleCLickMovieType() {
  const btnPhimLe = document.querySelector(".phim-le");
  const btnPhimBo = document.querySelector(".phim-bo");
  const btnFavorite = document.querySelector(".favorite-movie");

  if (btnPhimLe) {
    btnPhimLe.addEventListener("click", () => {
      const targetPath = `/phimLe`;
      if (location.pathname !== targetPath) {
        history.pushState({}, "", targetPath);
      }
      renderPage(targetPath);
      return;
    });
  } else if (btnPhimBo) {
    btnPhimBo.addEventListener("click", () => {
      const targetPath = `/phimBo`;
      if (location.pathname !== targetPath) {
        history.pushState({}, "", targetPath);
      }
      renderPage(targetPath);
      return;
    });
  }

  if (btnFavorite) {
    btnFavorite.addEventListener("click", () => {
      if (!localStorage.getItem("userId")) {
        alert("Vui lòng đăng nhập trước khi vào mục yêu thích!");
        return;
      }
      const targetPath = `/danh-sach/phim-yeu-thich`;
      if (location.pathname !== targetPath) {
        history.pushState({}, "", targetPath);
      }
      renderPage(targetPath);
      return;
    });
  }
}

//sự kiện scroll header sẽ đổi background color
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const scrollTop = document.getElementById("btn-scroll-top");
  if (!header) return;
  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
  if (window.scrollY > 600) {
    scrollTop.style.display = "block";
  } else {
    scrollTop.style.display = "none";
  }
});

function navigate(e) {
  e.preventDefault();
  //Cấu trúc a[data-link] có nghĩa là: Chọn tất cả các thẻ <a> có thuộc tính data-link
  const link = e.target.closest("a[data-link]");
  if (!link) return;
  const path = link.getAttribute("href");
  /*Nếu đường dẫn mới khác đường dẫn hiện tại:
    Cập nhật lịch sử trình duyệt (không tải lại trang) bằng history.pushState.
    Gọi renderPage(path) để hiển thị nội dung tương ứng.*/
  if (path !== location.pathname) {
    // history.pushState(state, title, url)
    history.pushState({}, "", path);
    renderPage(path);
  }
}

// sự kiện xử lý nút next prev trên trình duyệt
window.addEventListener("popstate", () => {
  let currentPath = location.pathname;
  renderPage(currentPath);
});

document.addEventListener("click", (e) => {
  const link = e.target.closest("a[data-link]");
  if (link) {
    navigate(e);
  }
});

if (location.pathname === "/index.html") {
  history.replaceState({}, "", "/");
}
//khi ấn vào các mục focus theo #id nó lưu #id trên url, nên đoạn dưới là xóa #id đó khỏi url
if (window.location.hash) {
  // Xử lý theo hash (nếu cần)
  const id = window.location.hash.substring(1); // bỏ dấu #
  // Sau khi xử lý xong, xóa #id
  history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search
  );
}

renderPage(location.pathname);
