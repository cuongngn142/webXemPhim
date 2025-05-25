const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const db = require("./config/db"); // Import kết nối SQLite từ db.js
const movieRoute = require("./routes/movieRoute");
const userRoute = require("./routes/userRoute");
const favoriteRoute = require("./routes/favoriteRoute");

// Middleware
app.use(cors());
app.use(express.json());

// Public folder 'images'
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/", movieRoute);
app.use("/", userRoute);
app.use("/", favoriteRoute);

// 🚨 Xử lý 404 phải để CUỐI CÙNG
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
