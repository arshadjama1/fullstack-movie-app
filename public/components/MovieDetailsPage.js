import { API } from "../services/api.js";

export default class MovieDetailsPage extends HTMLElement {
  id = null;
  movie = null;

  constructor() {
    super();
  }

  async render() {
    try {
      this.movie = await API.getMovieById(this.id);
    } catch (e) {
      console.log(e);
      return;
    }
    const template = document.getElementById("template-movie-details");
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.querySelector("h2").textContent = this.movie.title;
    this.querySelector("h3").textContent = this.movie.tagline;
    this.querySelector("img").src = this.movie.poster_url;
    this.querySelector("#trailer").dataset.url = this.movie.trailer_url;
    this.querySelector("#overview").textContent = this.movie.overview;
    this.querySelector("#metadata").innerHTML = `                        
            <dt>Release Date</dt>
            <dd>${this.movie.release_year}</dd>                        
            <dt>Score</dt>
            <dd>${this.movie.score} / 10</dd>                        
            <dt>Original languae</dt>
            <dd>${this.movie.language}</dd>                        
        `;

    const ulGenres = this.querySelector("#genres");
    ulGenres.innerHTML = "";
    this.movie.genres.forEach((genre) => {
      const li = document.createElement("li");
      li.textContent = genre.name;
      ulGenres.appendChild(li);
    });

    const ulCast = this.querySelector("#cast");
    ulCast.innerHTML = "";
    this.movie.casting.forEach((actor) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <img src="${
                  actor.image_url ?? "/images/generic_actor.jpg"
                }" alt="Picture of ${actor.last_name}">
                <p>${actor.first_name} ${actor.last_name}</p>
            `;
      ulCast.appendChild(li);
    });
  }

  connectedCallback() {
    this.id = this.params[0];

    this.render();
  }
}

customElements.define("details-page", MovieDetailsPage);
