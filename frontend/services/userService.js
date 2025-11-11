const API_URL = "https://website-xem-phim.onrender.com";


export async function fetchAllUsers() {
  const res = await fetch(`${API_URL}/api/users`);
  if (!res.ok) throw new Error("Lỗi khi lấy danh sách user");
  return res.json();
}

export async function fetchUpdateUser(userId, data) {
  const res = await fetch(`${API_URL}/api/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Lỗi khi cập nhật user");
  return res.json();
}

export async function fetchDeleteUser(userId) {
  const res = await fetch(`${API_URL}/api/users/${userId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Lỗi khi xóa user");
  return res.json();
}

export async function fetchCheckLogin(data) {
  try {
    const response = await fetch(`${API_URL}/api/checklogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network đang chưa ổn định!");
    }
    const result = response.json();
    return result;
  } catch (error) {
    console.error("Thất bại khi fetch checklogin:", error);
    return [];
  }
}

export async function fetchRegisterUser(data) {
  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error("Thất bại khi fetch checklogin:", error);
    return [];
  }
}
export async function fetchUserById(id) {
  try {
    const response = await fetch(`${API_URL}/api/users/${id}`);
    if (!response.ok) {
      throw new Error("Network đang chưa ổn định!");
    }
    const findedUser = response.json();
    return findedUser;
  } catch (error) {
    console.error("Thất bại khi fetch user theo id:", error);
    return [];
  }
}
