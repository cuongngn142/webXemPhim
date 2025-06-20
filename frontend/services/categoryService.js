const API_URL = "http://localhost:3000"; 

export async function fetchAllCategories() {
  const res = await fetch(`${API_URL}/api/categories`);
  if (!res.ok) throw new Error("Lỗi khi lấy danh sách thể loại");
  return res.json();
}

export async function fetchAddCategory(data) {
  const res = await fetch(`${API_URL}/api/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Lỗi khi thêm thể loại");
  return res.json();
}

export async function fetchUpdateCategory(id, data) {
  const res = await fetch(`${API_URL}/api/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Lỗi khi cập nhật thể loại");
  return res.json();
}

export async function fetchDeleteCategory(id) {
  const res = await fetch(`${API_URL}/api/categories/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Lỗi khi xóa thể loại");
  return res.json();
}
