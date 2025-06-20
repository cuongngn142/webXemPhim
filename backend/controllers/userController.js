const userModel = require("../models/userModel");

const getAllUsers = async (req, res) => {
  try {
    //await giúp userModel.getAllUsers() lấy hết dữ liệu từ DB ra rồi mới gán vào users. nếu ko vừa gọi nó trả về dữ liệu luôn là {}
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;
    if (!username || !email || !password || !fullName) {
      return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin" });
    }
    const existingUser = await userModel.checkUserExists(username);
    if (existingUser) {
      return res.status(409).json({ error: "Username đã tồn tại" });
    }

    const userId = await userModel.registerUser(
      username,
      email,
      password,
      fullName
    );
    res.status(201).json({ message: "Đăng ký thành công", userId });
  } catch (err) {
    console.error("Đăng ký lỗi:", err);
    res.status(500).json({ error: "Lỗi khi đăng ký người dùng" });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.userId;
    const users = await userModel.getUserById(id);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const checkLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Thiếu username hoặc password" });
    }
    const user = await userModel.checkUserExists(username);
    if (!user || user.Password !== password) {
      return res.status(401).json({ error: "Sai tài khoản hoặc mật khẩu" });
    }
    // Trả về thông tin user (có thể bỏ password)
    const { Password, ...userInfo } = user;
    res.json(userInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, fullName } = req.body;
    if (!username || !email || !fullName) {
      return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin!" });
    }
    const result = await userModel.updateUser(userId, {
      username,
      email,
      fullName,
    });
    res.json({ message: "Cập nhật user thành công!", changes: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await userModel.deleteUser(userId);
    res.json({ message: "Xóa user thành công!", changes: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  getUserById,
  checkLogin,
  updateUser,
  deleteUser,
};
