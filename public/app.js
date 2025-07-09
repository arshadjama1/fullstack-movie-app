import Router from "./services/Router.js";
import { Loader } from "./components/Loader.js";

window.addEventListener("DOMContentLoaded", () => {
  window.app.Router.init();
});

window.app = {
  Router,
  search: (event) => {
    event.preventDefault();
    const q = document.querySelector("input[type=search]").value;
    console.log("User query: ", q);

    // TODO: API CALLS
  },
};
