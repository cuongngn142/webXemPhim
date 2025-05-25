import renderFooter from "../components/footer.js";
import renderHeader from "../components/header.js";

export default function renderMainLayout(content) {
  return `
    <div class="layout-container layout--main">
      ${renderHeader()}
      <main>${content}</main>
      ${renderFooter()}
    </div>`;
}

