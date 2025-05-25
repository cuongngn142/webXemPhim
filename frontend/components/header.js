
export default function renderHeader() {
  return `
    <header>
      <div class="main-content">
        <div class="header-left">
          <a href="/" data-link>
            <img src="/assets/icons/logo-website.png" alt="Logo" class="logo" />
            <h1 class="header-title">WebXemPhim</h1>
          </a> 
          <a href="#">Phim Lẻ</a>
          <a href="#">Phim Bộ</a>
          <a href="#phim-moi">Phim Mới</a>
          <div class="dropdown">
            <a href="#" class="dropdown-toggle">
              <p>Thể Loại</p>
              <svg class="icon-down" width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg class="icon-up" width="18px" height="18px" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 15L12 9L6 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <ul class="dropdown-menu">
              <li><a href="#tinh-cam">Tình cảm</a></li>
              <li><a href="#hanh-dong">Hành động</a></li>
              <li><a href="#hai-huoc">Hài hước</a></li>
              <li><a href="#vo-thuat">Võ thuật</a></li>
              <li><a href="#hoat-hinh">Hoạt hình</a></li>
              <li><a href="#vien-tuong">Viễn tưởng</a></li>
            </ul>
          </div>
        </div>

        <div class="header-right">
          <div class="search-box">
            <input type="text" class="search-input" placeholder="Tìm Kiếm Phim..." name="search" />
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="white" viewBox="0 0 512 512">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
            </svg>
            <ul class="dropdown-result"></ul>
          </div>

          <div class="favorite-movie">
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="white" viewBox="0 0 384 512">
              <path d="M0 48C0 21.5 21.5 0 48 0l0 48 0 393.4 130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4 336 48 48 48 48 0 336 0c26.5 0 48 21.5 48 48l0 440c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488L0 48z"/>
            </svg>
            <p>0</p>
          </div>

          <div class="user-info">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z" 
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Đăng nhập</span>
          </div>

          <div class="user-info-login-success">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z" 
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
             <span class="dropdown-toggle">Full Name</span>
            <div class="dropdown-menu">
            <ul>
            <li><span id="btn-logout">Đăng xuất</span></li>
            </ul>
            </div>
          </div>
        <div class="modal-overlay">
           <!-- Modal Login -->
          <div class="modal modal-login" data-modal="login">
            <h2 class="title">Đăng nhập</h2>
            <div class="login-content">
              <input type="text" class="login user-name" placeholder="Tên đăng nhập" require/>
              <input type="password" class="login password" placeholder="Mật khẩu" require/>
              <div class="checkbox-group">
                <input type="checkbox" id="agree-terms-login" />
                <label for="agree-terms-login">Tôi đồng ý điều khoản</label>
              </div>
              <input type="submit" id="btn-login" value="Đăng nhập" />
              <div class="login-sub-content">
                <p>Chưa có tài khoản?</p>
                <button class="load-form-register">Đăng ký</button>
              </div>
            </div>
          </div>

          <!-- Modal Register -->
          <div class="modal modal-register" data-modal="register">
            <h2 class="title">Đăng ký</h2>
            <div class="login-content">
              <input type="text" class="login full-name" placeholder="Họ tên" require/>
              <input type="text" class="login user-name" placeholder="Tên đăng nhập" require />
              <input type="email" class="login email" placeholder="Email" require />
              <input type="password" class="login password" placeholder="Mật khẩu" require/>
              <input type="password" class="login confirm-password" placeholder="Nhập lại mật khẩu" require/>
              <div class="checkbox-group">
                <input type="checkbox" id="agree-terms-register" />
                <label for="agree-terms-register">Tôi đồng ý điều khoản</label>
              </div>
              <input type="submit" id="btn-register" value="Đăng ký" />
              <div class="login-sub-content">
                <p>Đã có tài khoản?</p>
                <button class="load-form-login">Đăng nhập</button>
              </div>
            </div>
          </div>

        </div>

        </div>
      </div>
    </header>
  `;
}
