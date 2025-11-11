const API_URL = "https://website-xem-phim.onrender.com";


export async function fetchEpisodesByMovieId(movieId) {
  const res = await fetch(`${API_URL}/api/movies/${movieId}/episodes`);
  if (!res.ok) throw new Error("Không lấy được danh sách tập phim");
  return res.json();
}

export async function fetchAddEpisode(data) {
  const res = await fetch(`${API_URL}/api/episodes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Không thêm được tập phim");
  return res.json();
}

export async function fetchUpdateEpisode(episodeId, data) {
  const res = await fetch(`${API_URL}/api/episodes/${episodeId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Không sửa được tập phim");
  return res.json();
}

export async function fetchDeleteEpisode(episodeId) {
  const res = await fetch(`${API_URL}/api/episodes/${episodeId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Không xóa được tập phim");
  return res.json();
}
