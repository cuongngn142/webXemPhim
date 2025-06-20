import {
  fetchAllCategories,
  fetchAddCategory,
  fetchUpdateCategory,
  fetchDeleteCategory,
} from "../services/categoryService.js";

export function renderCategoriesPage() {
  return `
    <section class="category-page">
      <div class="category-page-header">
        <h2>Danh sách thể loại</h2>
        <button class="add-category-btn">+ Thêm thể loại</button>
      </div>
      <div class="category-list"></div>
      <div class="edit-category-popup hidden">
        <div class="popup-content">
          <h3 id="popup-category-title">Sửa thể loại</h3>
          <form id="edit-category-form" class="category-form-modern">
            <input type="text" name="Name" placeholder="Tên thể loại" required />
            <textarea name="Description" placeholder="Mô tả" required></textarea>
            <div class="form-actions">
              <button type="submit" class="btn-save">Lưu Thông Tin</button>
              <button type="button" id="close-edit-category-popup" class="btn-cancel">Hủy</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;
}

export function renderCategoriesPageEventListener() {
  loadCategories();
  initCategoryEventHandlers();
}

let currentEditingCategoryId = null;

async function loadCategories() {
  const categories = await fetchAllCategories();
  const categoryList = document.querySelector(".category-list");
  categoryList.innerHTML = categories
    .map(
      (cat) => `
      <div class="category-item" data-id="${cat.CategoryId}"
        data-name="${encodeURIComponent(cat.Name)}"
        data-description="${encodeURIComponent(cat.Description)}">
        <div>
          <strong>${cat.Name}</strong><br>
          <span style="color:#aaa">${cat.Description}</span>
        </div>
        <div class="category-actions">
          <button class="edit-btn">Sửa</button>
          <button class="delete-btn">Xóa</button>
        </div>
      </div>
    `
    )
    .join("");
}

function initCategoryEventHandlers() {
  const categoryList = document.querySelector(".category-list");
  const closeBtn = document.getElementById("close-edit-category-popup");
  const form = document.getElementById("edit-category-form");
  const addBtn = document.querySelector(".add-category-btn");

  if (categoryList) {
    categoryList.addEventListener("click", handleCategoryItemClick);
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", closeCategoryPopup);
  }
  if (form) {
    form.addEventListener("submit", handleCategoryFormSubmit);
  }
  if (addBtn) {
    addBtn.addEventListener("click", openAddCategoryPopup);
  }
}

function handleCategoryItemClick(e) {
  const catDiv = e.target.closest(".category-item");
  if (!catDiv) return;
  const catId = catDiv.dataset.id;

  if (e.target.classList.contains("delete-btn")) {
    handleDeleteCategory(catId);
  }
  if (e.target.classList.contains("edit-btn")) {
    openEditCategoryPopup(catDiv, catId);
  }
}

async function handleDeleteCategory(catId) {
  if (confirm("Bạn có chắc muốn xóa thể loại này?")) {
    await fetchDeleteCategory(catId);
    loadCategories();
  }
}

function openEditCategoryPopup(catDiv, catId) {
  currentEditingCategoryId = catId;
  const form = document.getElementById("edit-category-form");
  document.getElementById("popup-category-title").textContent = "Sửa thể loại";
  form.Name.value = decodeURIComponent(catDiv.dataset.name || "");
  form.Description.value = decodeURIComponent(catDiv.dataset.description || "");
  document.querySelector(".edit-category-popup").classList.remove("hidden");
}

function openAddCategoryPopup() {
  currentEditingCategoryId = null;
  const form = document.getElementById("edit-category-form");
  document.getElementById("popup-category-title").textContent = "Thêm thể loại";
  form.reset();
  document.querySelector(".edit-category-popup").classList.remove("hidden");
}

function closeCategoryPopup() {
  document.querySelector(".edit-category-popup").classList.add("hidden");
}

async function handleCategoryFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById("edit-category-form");
  const data = {
    name: form.Name.value,
    description: form.Description.value,
  };
  if (currentEditingCategoryId) {
    await fetchUpdateCategory(currentEditingCategoryId, data);
  } else {
    await fetchAddCategory(data);
  }
  closeCategoryPopup();
  loadCategories();
}
