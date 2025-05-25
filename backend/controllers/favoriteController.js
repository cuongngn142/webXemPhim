const favoriteModel = require("../models/favoriteModel");
const userModel = require("../models/userModel");
const movieModel = require("../models/movieModel");

const getAllUserFavoriteMovies = async (req, res) => {
  try {
    const list = await favoriteModel.getAllUserFavoriteMovies();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserFavoriteMovie = async (req, res) => {
  try {
    const userId = req.params.userId;
    const list = await favoriteModel.getUserFavoriteMovieByUserId(userId);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addUserFavoriteMovie = async (req, res) => {
  try {
    const { userId, movieId } = req.body;
    const checkUser = await userModel.getUserById(userId);
    const checkMovie = await movieModel.getMovieById(movieId);
    if (!checkUser) {
      return res.status(401).json({ error: "Vui lòng đăng nhập" });
    }
    if (!checkMovie) {
      return res.status(404).json({ error: "Phim không tồn tại" });
    }
    const favoriteId = await favoriteModel.addUserFavoriteMovie(
      userId,
      movieId
    );
    res.status(201).json({ message: "Thêm thành công", favoriteId });
  } catch (err) {
    console.error("Thêm lỗi:", err);
    res.status(500).json({ error: "Lỗi khi thêm yêu thích" });
  }
};

module.exports = {
  getAllUserFavoriteMovies,
  getUserFavoriteMovie,
  addUserFavoriteMovie,
};

/*
res.status(số)
2xx = ✅ Thành công
4xx = ❌ Sai từ phía người dùng
5xx = ❌ Lỗi phía server

| Status  | Ý nghĩa    | Thường dùng cho                                  |
| ------- | ---------- | ------------------------------------------------ |
| **200** | OK         | Request thành công, trả về dữ liệu               |
| **201** | Created    | Tạo mới thành công (INSERT)                      |
| **204** | No Content | Thành công nhưng không trả dữ liệu (DELETE, PUT) |


| Status  | Ý nghĩa      | Khi nào dùng                                     |
| ------- | ------------ | ------------------------------------------------ |
| **400** | Bad Request  | Dữ liệu gửi sai, thiếu trường, định dạng sai     |
| **401** | Unauthorized | Chưa đăng nhập / chưa có token                   |
| **403** | Forbidden    | Có token nhưng không có quyền                    |
| **404** | Not Found    | Không tìm thấy tài nguyên                        |
| **409** | Conflict     | Trùng dữ liệu (ví dụ: username/email đã tồn tại) |

| Status  | Ý nghĩa               | Khi nào dùng                                |
| ------- | --------------------- | ------------------------------------------- |
| **500** | Internal Server Error | Lỗi logic, truy vấn SQL, lỗi không xác định |
| **502** | Bad Gateway           | Server trung gian nhận lỗi từ server gốc    |
| **503** | Service Unavailable   | Server quá tải / bảo trì                    |

*/
