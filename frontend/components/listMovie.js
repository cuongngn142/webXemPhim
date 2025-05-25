export function createMovieListSection(sectionId, title, typeList, classTypeList) {
  return `
  <section class="movie-section">
    <div class="main-content">
      <div id="${sectionId}" class="title">${title}</div>
      <div class="movies-list ${classTypeList}" data-type="${typeList}"></div>
      <div class="arrow-list">
        <svg class="left-arrow ${classTypeList}" width="36px" height="36px" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
        <svg class="right-arrow ${classTypeList}" width="36px" height="36px" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </div>
    </div>
  </section>
  `;
}
