import { API } from "../services/api.js";
import { MovieItem } from "./MovieItem.js";

export default class HomePage extends HTMLElement {
  constructor() {
    super();
  }

  async render() {
    const topMovies = await API.getTopMovies();
    const randomMovies = await API.getRandomMovies();

    renderMovies(topMovies, document.querySelector("#top-10 ul"));
    renderMovies(randomMovies, document.querySelector("#random ul"));

    function renderMovies(movies, element) {
      element.innerHTML = "";
      movies.forEach((movie) => {
        const li = document.createElement("li");
        li.appendChild(new MovieItem(movie));
        element.appendChild(li);
      });
    }
  }

  connectedCallback() {
    const template = document.getElementById("template-home");
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.render();
  }
}

customElements.define("home-page", HomePage);
