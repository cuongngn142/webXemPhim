import renderBlankLayout from "./layouts/blankLayout.js";
import renderMainLayout from "./layouts/mainLayout.js";
import { renderNotFound } from "./pages/404.js";
import { renderHomePage } from "./pages/home.js";
import { renderMoviePage } from "./pages/movie.js";
import { renderEventListener } from "./pages/home.js";
const app = document.getElementById("app");

const routes = {
  "/": {
    title: "WebXemPhim - Phim Hay - Phim Mới",
    render: () => renderHomePage(),
    layout: renderMainLayout,
  },
  "/movie/:id": {
    title: "Xem Phim - Phim Hay - Phim Mới",
    render: (params) => renderMoviePage(params.id),
    layout: renderBlankLayout,
  },
};

// Khi dùng location.pathname, nó sẽ lấy toàn bộ phần đường dẫn (path) sau domain – từ dấu / đầu tiên cho đến hết path, không bao gồm query (?) hay hash (#).
async function renderPage(path) {
  let route = routes[path];
  let layoutFn = renderMainLayout;
  let title = "";
  let mainContent = "";
  if (route) {
    title = route.title;
    mainContent = await route.render();
    layoutFn = renderMainLayout;
  } else {
    title = "WebXemPhim - 404";
    mainContent = renderNotFound();
    layoutFn = renderMainLayout;
  }
  document.title = title;
  app.innerHTML = layoutFn(mainContent);
  renderEventListener();
}


//sự kiện scroll header sẽ đổi background color
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const scrollTop = document.getElementById("btn-scroll-top");
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
  renderPage(location.pathname);
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
