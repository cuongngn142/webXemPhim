import {
  fetchAllUsers,
  fetchUpdateUser,
  fetchDeleteUser,
} from "../services/userService.js";

export function renderUserPage() {
  return `
    <section class="user-page">
      <div class="user-page-header">
        <h2>Danh sách người dùng</h2>
      </div>
      <div class="user-list"></div>
      <div class="edit-user-popup hidden">
        <div class="popup-content">
          <h3 id="popup-user-title">Sửa thông tin user</h3>
          <form id="edit-user-form" class="user-form-modern">
            <input type="text" name="Username" placeholder="Username" required />
            <input type="email" name="Email" placeholder="Email" required />
            <input type="text" name="FullName" placeholder="Họ tên" required />
            <div class="form-actions">
              <button type="submit" class="btn-save">Lưu Thông Tin</button>
              <button type="button" id="close-edit-user-popup" class="btn-cancel">Hủy</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;
}

export function renderUserPageEventListener() {
  loadUsers();
  initUserEventHandlers();
}

let currentEditingUserId = null;

async function loadUsers() {
  const users = await fetchAllUsers();
  const userList = document.querySelector(".user-list");
  userList.innerHTML = users
    .map(
      (user) => `
      <div class="user-item" data-id="${user.UserId}"
        data-username="${encodeURIComponent(user.Username)}"
        data-email="${encodeURIComponent(user.Email)}"
        data-fullname="${encodeURIComponent(user.FullName)}">
        <div>
          <strong>${user.Username}</strong> (${user.FullName})<br>
          <span style="color:#aaa">${user.Email}</span>
        </div>
        <div class="user-actions">
          <button class="edit-user-btn">Sửa</button>
          <button class="delete-user-btn">Xóa</button>
        </div>
      </div>
    `
    )
    .join("");
}

function initUserEventHandlers() {
  const userList = document.querySelector(".user-list");
  const closeBtn = document.getElementById("close-edit-user-popup");
  const form = document.getElementById("edit-user-form");

  if (userList) {
    userList.addEventListener("click", handleUserItemClick);
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", closeUserPopup);
  }
  if (form) {
    form.addEventListener("submit", handleUserFormSubmit);
  }
}

function handleUserItemClick(e) {
  const userDiv = e.target.closest(".user-item");
  if (!userDiv) return;
  const userId = userDiv.dataset.id;

  if (e.target.classList.contains("delete-user-btn")) {
    handleDeleteUser(userId);
  }
  if (e.target.classList.contains("edit-user-btn")) {
    openEditUserPopup(userDiv, userId);
  }
}

async function handleDeleteUser(userId) {
  if (confirm("Bạn có chắc muốn xóa user này?")) {
    await fetchDeleteUser(userId);
    loadUsers();
  }
}

function openEditUserPopup(userDiv, userId) {
  currentEditingUserId = userId;
  const form = document.getElementById("edit-user-form");
  document.getElementById("popup-user-title").textContent =
    "Sửa thông tin user";
  form.Username.value = decodeURIComponent(userDiv.dataset.username || "");
  form.Email.value = decodeURIComponent(userDiv.dataset.email || "");
  form.FullName.value = decodeURIComponent(userDiv.dataset.fullname || "");
  document.querySelector(".edit-user-popup").classList.remove("hidden");
}

function closeUserPopup() {
  document.querySelector(".edit-user-popup").classList.add("hidden");
}

async function handleUserFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById("edit-user-form");
  const updatedData = {
    username: form.Username.value,
    email: form.Email.value,
    fullName: form.FullName.value,
  };
  await fetchUpdateUser(currentEditingUserId, updatedData);
  closeUserPopup();
  loadUsers();
}
