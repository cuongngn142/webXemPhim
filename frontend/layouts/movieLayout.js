import renderFooter from "../components/footer.js";
import renderMovieHeader from "../components/movieHeader.js";

export default function renderMovieLayout(content) {
  return `
    <div class="layout-container layout--movie">
        ${renderMovieHeader()}
          <main>${content}</main>
        ${renderFooter()}
    </div>`;
}
