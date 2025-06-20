import { getListUserFavoriteMovies } from "../pages/home.js";

export default function checkLogin() {
  const id = localStorage.getItem("userId");
  const fullName = localStorage.getItem("userName");
  const loginSection = document.querySelector(".user-info");
  const successSection = document.querySelector(".user-info-login-success");

  if (!loginSection || !successSection) return;

  if (id) {
    loginSection.style.display = "none";
    successSection.style.display = "flex";
    successSection.querySelector("span").textContent = fullName;
    getListUserFavoriteMovies(id);
  } else {
    loginSection.style.display = "flex";
    successSection.style.display = "none";
  }
}