const API_URL = "http://localhost:3000";

export async function fetchHighRatedMovies() {
  try {
    const response = await fetch(`${API_URL}/api/movies/high-rated`);
    if (!response.ok) {
      throw new Error("Network đang chưa ổn định!");
    }
    const movies = await response.json();
    return movies;
  } catch (error) {
    console.error("Thất bại khi fetch high rated movies:", error);
    return [];
  }
}

export async function fetchMoreMovies() {
  try {
    const response = await fetch(`${API_URL}/api/movies`);
    if (!response.ok) {
      throw new Error("Network đang chưa ổn định!");
    }
    const movies = await response.json();
    return movies;
  } catch (error) {
    console.error("Thất bại khi fetch movies:", error);
    return [];
  }
}

export async function fetchMovieById(id) {
  try {
    const response = await fetch(`${API_URL}/api/movie/${id}`);
    if (!response.ok) {
      throw new Error("Network đang chưa ổn định!");
    }
    const findedMovie = await response.json();
    return findedMovie;
  } catch (error) {
    console.error("Thất bại khi fetch movies theo id:", error);
    return [];
  }
}

export async function deleteMovieById(id) {
  try {
    const response = await fetch(`${API_URL}/api/movie/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Xóa phim thất bại! Mạng không ổn định hoặc server lỗi.");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Thất bại khi xóa phim:", error);
    return null;
  }
}

export async function updateMovieById(id, updatedData) {
  try {
    const response = await fetch(`${API_URL}/api/movie/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(
        "Cập nhật phim thất bại! Mạng không ổn định hoặc server lỗi."
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Thất bại khi cập nhật phim:", error);
    return null;
  }
}

export async function fetchAddMovie(movieData) {
  try {
    const response = await fetch(`${API_URL}/api/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    });
    if (!response.ok) {
      throw new Error("Thêm phim thất bại!");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Lỗi khi thêm phim mới:", error);
    return null;
  }
}

// Thêm hàm gọi API cập nhật thể loại phim
export async function updateMovieCategories(movieId, categoryIds) {
  const res = await fetch(
    `http://localhost:3000/api/movies/${movieId}/categories`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ CategoryIds: categoryIds }),
    }
  );
  if (!res.ok) throw new Error("Cập nhật thể loại phim thất bại!");
  return res.json();
}
