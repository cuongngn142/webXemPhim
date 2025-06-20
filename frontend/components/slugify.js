export default function slugify(str) {
  return str
    .toLowerCase() // Viết thường toàn bộ
    .normalize("NFD") // Tách dấu ra khỏi chữ (ví dụ: "ố" -> "o" + dấu)
    .replace(/[\u0300-\u036f]/g, "") // Bỏ các dấu tách ra (dấu sắc, huyền...)
    .replace(/[^a-z0-9 ]/g, "") // Bỏ ký tự không phải chữ cái, số, khoảng trắng
    .replace(/\s+/g, "-"); // Thay khoảng trắng thành dấu gạch ngang
}
