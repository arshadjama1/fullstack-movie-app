window.app = {
  search: (event) => {
    event.preventDefault();
    const q = document.querySelector("input[type=search]").value;
    console.log("User query: ", q);

    // TODO: API CALLS
  },
};
