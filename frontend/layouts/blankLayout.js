import renderSideBar from "../components/sideBar.js";

export default function renderBlankLayout(content) {
  return `
    <div class="layout-container layout--blank">
      ${renderSideBar()}
      <main>${content}</main>
    </div>`;
}
