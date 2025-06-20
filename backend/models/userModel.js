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
    const query = `
      SELECT 
        u.UserId, u.Username, u.Email, u.FullName, u.CreatedAt,
        r.RoleId, r.RoleName AS RoleName
      FROM Users u
      JOIN UserRoles ur ON u.UserId = ur.UserId
      JOIN Roles r ON ur.RoleId = r.RoleId
      WHERE u.UserId = ?
    `;
    db.all(query, [UserId], (err, rows) => {
      if (err) {
        console.error("Lỗi khi truy vấn dữ liệu:", err);
        return reject(err);
      }
      if (!rows || rows.length === 0) return resolve(null);

      const user = {
        UserId: rows[0].UserId,
        Username: rows[0].Username,
        Email: rows[0].Email,
        FullName: rows[0].FullName,
        CreatedAt: rows[0].CreatedAt,
        Roles: rows.map((row) => ({
          RoleId: row.RoleId,
          RoleName: row.RoleName,
        })),
      };
      resolve(user);
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

const updateUser = (userId, updatedData) => {
  return new Promise((resolve, reject) => {
    const { username, email, fullName } = updatedData;
    db.run(
      "UPDATE Users SET Username = ?, Email = ?, FullName = ? WHERE UserID = ?",
      [username, email, fullName, userId],
      function (err) {
        if (err) return reject(err);
        resolve({ changes: this.changes });
      }
    );
  });
};

const deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM Users WHERE UserID = ?", [userId], function (err) {
      if (err) return reject(err);
      resolve({ changes: this.changes });
    });
  });
};

module.exports = {
  getAllUsers,
  registerUser,
  checkUserExists,
  getUserById,
  updateUser,
  deleteUser,
};

/*
| Mục đích                   | Dùng lệnh   | Trả về                                              |
| -------------------------- | ----------- | --------------------------------------------------- |
| Thêm / xoá / cập nhật      | `db.run()`  | Không có dữ liệu, chỉ `this.lastID`, `this.changes` |
| Lấy 1 dòng dữ liệu         | `db.get()`  | `{}` Object                                         |
| Lấy nhiều dòng             | `db.all()`  | `[{},{},...]` Mảng                                  |
| Lặp qua từng dòng (tối ưu) | `db.each()` | Callback từng dòng                                  |
*/
