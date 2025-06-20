const db = require("../config/db");

const getAllCategories = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM Categories", [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

const addCategory = (name, description) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO Categories (Name, Description, CreatedAt) VALUES (?, ?, ?)",
      [name, description, new Date().toISOString()],
      function (err) {
        if (err) return reject(err);
        resolve({ CategoryId: this.lastID });
      }
    );
  });
};

const updateCategory = (id, name, description) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE Categories SET Name = ?, Description = ? WHERE CategoryId = ?",
      [name, description, id],
      function (err) {
        if (err) return reject(err);
        resolve({ changes: this.changes });
      }
    );
  });
};

const deleteCategory = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM Categories WHERE CategoryId = ?", [id], function (err) {
      if (err) return reject(err);
      resolve({ changes: this.changes });
    });
  });
};

module.exports = {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
