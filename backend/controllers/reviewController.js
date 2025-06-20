const reviewModel = require("../models/reviewModel");

const getAllReview = async (req, res) => {
  try {
    const list = await reviewModel.getAllReview();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addReview = async (req, res) => {
  try {
    const { MovieId, UserId, Rating } = req.body;
    const rs = await reviewModel.addReview(MovieId, UserId, Rating);
    res.json(rs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllReview, addReview };

/*
| Thuộc tính   | Khi dùng                        |
| ------------ | ------------------------------- |
| `req.body`   | Dữ liệu từ form/JSON (POST/PUT) |
| `req.params` | Dữ liệu trong URL path          |
| `req.query`  | Dữ liệu dạng query string (`?`) |

| Tình huống                                    | Bạn nên dùng | Lý do                                                   |
| --------------------------------------------- | ------------ | ------------------------------------------------------- |
| Gửi dữ liệu để **tạo mới**, như đánh giá phim | `req.body`   | Vì dữ liệu được truyền qua body, không cần lộ trong URL |
| **Xác định một resource** qua ID              | `req.params` | Rõ ràng, RESTful – ví dụ `/movies/1` là phim có ID = 1  |
| **Tìm kiếm, lọc**, ví dụ: ?search=action      | `req.query`  | Vì không thao tác dữ liệu mà chỉ filter                 |

*/