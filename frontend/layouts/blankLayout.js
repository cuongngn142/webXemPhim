
export default function renderBlankLayout(content) {
  return `
    <div class="layout-container layout--blank">
      <main>${content}</main>
    </div>`;
}
