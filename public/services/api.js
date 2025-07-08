export const API = {
  baseURL: "/api",
  getTopMovies: async () => {
    return await API.fetch("/movies/top");
  },
  getRandomMovies: async () => {
    return await API.fetch("/movies/random");
  },
  getMovieById: async (id) => {
    return await API.fetch(`/movies/${id}`);
  },
  searchMovies: async (q, order, genre) => {
    const queryString = args
      ? new URLSearchParams({ q, order, genre }).toString()
      : "";
    return await API.fetch("/movies/search?" + queryString);
  },
  fetch: async (serviceName, args) => {
    try {
      const response = await fetch(API.baseURL + serviceName);
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  },
};
