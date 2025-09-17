// html-include.js
class HtmlInclude extends HTMLElement {
  async connectedCallback() {
    const url = this.getAttribute('src');
    if (!url) return;

    const res = await fetch(url);           // file:// ではCORSで失敗 → 必ず http:// で
    if (!res.ok) return;
    const html = await res.text();

    const shadow = this.attachShadow({ mode: 'open' });

    // 共通CSSをShadow DOM内に読み込む
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'stylesheet.css';           // ルートに応じてパス調整
    shadow.appendChild(link);

    // 取得したHTMLを挿入（上書きにならないよう要素で包む）
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    shadow.appendChild(wrapper);
  }
}

customElements.define('html-include', HtmlInclude);
