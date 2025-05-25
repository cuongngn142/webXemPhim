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
    const movies = response.json();
    return movies;
  } catch (error) {
    console.error("Thất bại khi fetch movies:", error);
    return [];
  }
}
