const API_URL = "https://website-xem-phim.onrender.com";

export async function fetchListComments() {
  try {
    const response = await fetch(`${API_URL}/api/comments`);
    if (!response.ok) {
      throw new Error("Network đang chưa ổn định!");
    }
    const rs = response.json();
    return rs;
  } catch (error) {
    console.error("Thất bại khi fetch get list comment:", error);
    return [];
  }
}

export async function fetchAddComment(data) {
  try {
    const response = await fetch(`${API_URL}/api/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network đang chưa ổn định!");
    }
    const rs = response.json();
    return rs;
  } catch (error) {
    console.error("Thất bại khi fetch add comment:", error);
    return [];
  }
}
