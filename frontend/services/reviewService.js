const API_URL = "https://website-xem-phim.onrender.com";


export async function fetchListReivews() {
  try {
    const response = await fetch(`${API_URL}/api/reviews`);
    if (!response.ok) {
      throw new Error("Network đang chưa ổn định!");
    }
    const rs = response.json();
    return rs;
  } catch (error) {
    console.error("Thất bại khi fetch get list Review:", error);
    return [];
  }
}

export async function fetchAddReivews(data) {
  try {
    const response = await fetch(`${API_URL}/api/review`, {
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
    console.error("Thất bại khi fetch add Review:", error);
    return [];
  }
}
