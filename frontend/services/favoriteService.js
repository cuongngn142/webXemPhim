const API_URL = "https://website-xem-phim.onrender.com";


export async function fetchAddFavorite(data) {
  try {
    const response = await fetch(`${API_URL}/api/addFavorite`, {
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
    console.error("Thất bại khi fetch addFavorite:", error);
    return [];
  }
}

export async function fetchListUserFavorites(userID) {
  try {
    const response = await fetch(`${API_URL}/api/users/${userID}/favorites`);
    if (!response.ok) {
      throw new Error("Network đang chưa ổn định!");
    }
    const result = response.json();
    return result;
  } catch (error) {
    console.error("Thất bại khi fetch get list Favorite:", error);
    return [];
  }
}

export async function fetchDeleteFavorite(data) {
  try {
    const response = await fetch(`${API_URL}/api/deleteFavorite`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network đang chưa ổn định!");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Thất bại khi fetch deleteFavorite:", error);
    return null;
  }
}
