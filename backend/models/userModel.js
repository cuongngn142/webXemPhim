const db = require("../config/db");

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM Users u 
      LEFT JOIN UserRoles ur ON u.UserId = ur.UserId 
      LEFT JOIN Roles r ON r.RoleId = ur.RoleId
    `;

    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error("Lỗi khi JOIN:", err);
        return reject(err);
      }

      const userMap = {};

      for (const row of rows) {
        if (!userMap[row.UserId]) {
          userMap[row.UserId] = {
            UserId: row.UserId,
            Username: row.Username,
            Email: row.Email,
            Password: row.Password,
            FullName: row.FullName,
            CreatedAt: row.CreatedAt,
            Roles: [],
          };
        }

        if (row.RoleId) {
          userMap[row.UserId].Roles.push({
            RoleId: row.RoleId,
            RoleName: row.RoleName,
          });
        }
      }
      //Object.values sẽ chuyển object userMap {} này thành mảng [{}]
      resolve(Object.values(userMap));
    });
  });
};

const checkUserExists = (username) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Users WHERE Username = ?";
    db.get(query, [username], (err, user) => {
      if (err) return reject(err);
      resolve(user); // null nếu không có
    });
  });
};

const getUserById = (UserId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT UserId FROM Users WHERE UserId = ?`;
    db.get(query, [UserId], (err, row) => {
      if (err) {
        console.error("Lỗi khi truy vấn dữ liệu:", err);
        return reject(err);
      } else {
        console.log("Dữ liệu trả về:", row);
        resolve(row);
      }
    });
  });
};

const registerUser = (username, email, password, fullName) => {
  return new Promise((resolve, reject) => {
    const insertQuery = `
      INSERT INTO Users (Username, Email, Password, FullName, CreatedAt)
      VALUES (?, ?, ?, ?, datetime('now'))
    `;
    const insertUserRole = `
      INSERT INTO UserRoles (UserId, RoleId)
      VALUES (?, ?)
    `;

    db.run(insertQuery, [username, email, password, fullName], function (err) {
      if (err) return reject(err);

      const userId = this.lastID;
      //2 là roleId user
      db.run(insertUserRole, [userId, 2], (err) => {
        if (err) return reject(err);
        //chỉ resolve sau khi cả 2 câu lệnh đều thành công
        resolve(userId);
      });
    });
  });
};

module.exports = {
  getAllUsers,
  registerUser,
  checkUserExists,
  getUserById,
};

/*
| Mục đích                   | Dùng lệnh   | Trả về                                              |
| -------------------------- | ----------- | --------------------------------------------------- |
| Thêm / xoá / cập nhật      | `db.run()`  | Không có dữ liệu, chỉ `this.lastID`, `this.changes` |
| Lấy 1 dòng dữ liệu         | `db.get()`  | `{}` Object                                         |
| Lấy nhiều dòng             | `db.all()`  | `[{},{},...]` Mảng                                  |
| Lặp qua từng dòng (tối ưu) | `db.each()` | Callback từng dòng                                  |
*/
