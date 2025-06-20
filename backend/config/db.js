const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite", (err) => {
  if (err) {
    console.error(`Lỗi khi kết nối với SQLite, lỗi: ${err}`);
  } else {
    console.log(`Kết nối SQLite thành công`);
    // Bật ràng buộc foreign key
    db.run("PRAGMA foreign_keys = ON");
  }
});

module.exports = db;
