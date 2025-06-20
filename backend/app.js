const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const db = require("./config/db"); // Import kết nối SQLite từ db.js
const movieRoute = require("./routes/movieRoute");
const userRoute = require("./routes/userRoute");
const favoriteRoute = require("./routes/favoriteRoute");
const reviewRoute = require("./routes/reviewRoute");
const commentRoute = require("./routes/commentRoute");
const categoryRoute = require("./routes/categoryRoute");
const episodeRoute = require("./routes/episodeRoute"); // Import episodeRoute
// Middleware
app.use(cors());
app.use(express.json());

// Public folder 'images'
app.use("/images", express.static(path.join(__dirname, "images")));
//cho phép upload video lên cors domain khác và bên frontend thẻ video phải cócrossorigin="anonymous"
app.use("/videos", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use("/videos", express.static(path.join(__dirname, "videos")));
app.use("/", movieRoute);
app.use("/", userRoute);
app.use("/", favoriteRoute);
app.use("/", reviewRoute);
app.use("/", commentRoute);
app.use("/", categoryRoute);
app.use("/", episodeRoute); // Sử dụng episodeRoute

// 🚨 Xử lý 404 phải để CUỐI CÙNG
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
