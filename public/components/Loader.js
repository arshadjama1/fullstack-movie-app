export class Loader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const count = this.dataset.elements;
    const width = this.dataset.width;
    const height = this.dataset.height;

    for (let i = 0; i < count; i++) {
      const wrapper = document.createElement("div");
      wrapper.classList.add("loading-wave");
      wrapper.style.width = width;
      wrapper.style.height = height;
      wrapper.style.margin = "10px";
      wrapper.style.display = "inline-block";
      this.appendChild(wrapper);
    }
  }
}

customElements.define("app-loader", Loader);
