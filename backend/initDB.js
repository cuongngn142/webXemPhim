const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db.sqlite");

db.serialize(() => {
  db.run("PRAGMA foreign_keys = ON");
  db.run("PRAGMA journal_mode = WAL");
  // Tạo bảng Roles
  db.run(`
                CREATE TABLE IF NOT EXISTS Roles (
                    RoleId INTEGER PRIMARY KEY AUTOINCREMENT,
                    RoleName TEXT NOT NULL UNIQUE
                )
            `);

  // Tạo bảng Users
  db.run(`
                CREATE TABLE IF NOT EXISTS Users (
                    UserId INTEGER PRIMARY KEY AUTOINCREMENT,
                    Username TEXT NOT NULL UNIQUE,
                    Email TEXT NOT NULL UNIQUE,
                    Password TEXT NOT NULL,
                    FullName TEXT NOT NULL,
                    CreatedAt TEXT NOT NULL
                )
            `);

  // Tạo bảng UserRoles
  db.run(`
                CREATE TABLE IF NOT EXISTS UserRoles (
                    UserRoleId INTEGER PRIMARY KEY AUTOINCREMENT,
                    UserId INTEGER NOT NULL,
                    RoleId INTEGER NOT NULL,
                    UNIQUE (UserId, RoleId),
                    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE,
                    FOREIGN KEY (RoleId) REFERENCES Roles(RoleId) ON DELETE CASCADE
                )
            `);

  // Tạo bảng MovieTypes
  db.run(`
                CREATE TABLE IF NOT EXISTS MovieTypes (
                    MovieTypeId INTEGER PRIMARY KEY AUTOINCREMENT,
                    TypeName TEXT NOT NULL UNIQUE
                )
            `);

  // Tạo bảng Movies
  db.run(`
                CREATE TABLE IF NOT EXISTS Movies (
                    MovieId INTEGER PRIMARY KEY AUTOINCREMENT,
                    Title TEXT NOT NULL,
                    Description TEXT NOT NULL,
                    PosterUrl TEXT NOT NULL,
                    BackdropUrl TEXT NOT NULL,
                    Views INTEGER NOT NULL CHECK(Views >= 0),
                    CreatedAt TEXT NOT NULL,
                    ReleaseYear INTEGER NOT NULL CHECK(ReleaseYear >= 1888),
                    Director TEXT NOT NULL,
                    Cast TEXT NOT NULL,
                    Rating REAL NOT NULL CHECK(Rating >= 0 AND Rating <= 10),
                    Language TEXT NOT NULL,
                    Country TEXT NOT NULL,
                    MovieTypeId INTEGER NOT NULL,
                    FOREIGN KEY (MovieTypeId) REFERENCES MovieTypes(MovieTypeId) ON DELETE CASCADE
                )
            `);

  // Tạo bảng Episodes
  db.run(`
                CREATE TABLE IF NOT EXISTS Episodes (
                    EpisodeId INTEGER PRIMARY KEY AUTOINCREMENT,
                    MovieId INTEGER NOT NULL,
                    EpisodeNumber INTEGER NOT NULL CHECK(EpisodeNumber >= 1),
                    Title TEXT NOT NULL,
                    VideoUrl TEXT NOT NULL,
                    Duration INTEGER NOT NULL CHECK(Duration >= 0),
                    CreatedAt TEXT NOT NULL,
                    FOREIGN KEY (MovieId) REFERENCES Movies(MovieId) ON DELETE CASCADE
                )
            `);

  // Tạo bảng Categories
  db.run(`
                CREATE TABLE IF NOT EXISTS Categories (
                    CategoryId INTEGER PRIMARY KEY AUTOINCREMENT,
                    Name TEXT NOT NULL UNIQUE,
                    Description TEXT NOT NULL,
                    CreatedAt TEXT NOT NULL
                )
            `);

  // Tạo bảng MovieCategories
  db.run(`
                CREATE TABLE IF NOT EXISTS MovieCategories (
                    MovieCategoryId INTEGER PRIMARY KEY AUTOINCREMENT,
                    MovieId INTEGER NOT NULL,
                    CategoryId INTEGER NOT NULL,
                    UNIQUE (MovieId, CategoryId),
                    FOREIGN KEY (MovieId) REFERENCES Movies(MovieId) ON DELETE CASCADE,
                    FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId) ON DELETE CASCADE
                )
            `);

  // Tạo bảng Comments
  db.run(`
                CREATE TABLE IF NOT EXISTS Comments (
                    CommentId INTEGER PRIMARY KEY AUTOINCREMENT,
                    MovieId INTEGER NOT NULL,
                    UserId INTEGER NOT NULL,
                    Content TEXT NOT NULL,
                    CreatedAt TEXT NOT NULL,
                    isAnonymous INTEGER DEFAULT 0,
                    FOREIGN KEY (MovieId) REFERENCES Movies(MovieId) ON DELETE CASCADE,
                    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE
                )
            `);

  db.run(`
                CREATE TABLE IF NOT EXISTS UserReviews (
                    ReviewId INTEGER PRIMARY KEY AUTOINCREMENT,
                    MovieId INTEGER NOT NULL,
                    UserId INTEGER NOT NULL,
                    Rating INTEGER NOT NULL,
                    CreatedAt TEXT NOT NULL,
                    FOREIGN KEY (MovieId) REFERENCES Movies(MovieId) ON DELETE CASCADE,
                    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE
                )
            `);

  // Tạo bảng Favorites
  db.run(`
                CREATE TABLE IF NOT EXISTS Favorites (
                    FavoriteId INTEGER PRIMARY KEY AUTOINCREMENT,
                    UserId INTEGER NOT NULL,
                    MovieId INTEGER NOT NULL,
                    CreatedAt TEXT NOT NULL,
                    UNIQUE (UserId, MovieId),
                    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE,
                    FOREIGN KEY (MovieId) REFERENCES Movies(MovieId) ON DELETE CASCADE
                )
            `);

  // Tạo chỉ mục
  db.run(`CREATE INDEX IF NOT EXISTS idx_users_username ON Users(Username)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_users_email ON Users(Email)`);
  db.run(
    `CREATE INDEX IF NOT EXISTS idx_userroles_userid ON UserRoles(UserId)`
  );
  db.run(
    `CREATE INDEX IF NOT EXISTS idx_userroles_roleid ON UserRoles(RoleId)`
  );
  db.run(`CREATE INDEX IF NOT EXISTS idx_movies_title ON Movies(Title)`);
  db.run(
    `CREATE INDEX IF NOT EXISTS idx_movies_releaseyear ON Movies(ReleaseYear)`
  );
  db.run(
    `CREATE INDEX IF NOT EXISTS idx_episodes_movieid ON Episodes(MovieId)`
  );
  db.run(
    `CREATE INDEX IF NOT EXISTS idx_comments_movieid ON Comments(MovieId)`
  );
  db.run(
    `CREATE INDEX IF NOT EXISTS idx_favorites_userid ON Favorites(UserId)`
  );

  console.log("✅ Database initialized xong.");
  db.close();
});
