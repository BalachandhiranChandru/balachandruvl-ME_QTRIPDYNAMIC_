import config from "../conf/index.js";

async function init() {
  // debugger;
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log("From Init");

  //Updates the DOM with the cities
  if (cities && cities.length) {
    // debugger;
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  // console.log(config.backendEndpoint+"cities");
  try {
    // console.log("fetch city");
    const url = config.backendEndpoint + "/cities";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data, 'city data');
    return data;
  } catch (error) {
    // console.log(error);
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  // console.log("fetch activityToDOM");
  const divElement = document.createElement("div");

  divElement.className = "col-6 col-lg-3 mb-4";
  divElement.innerHTML = `
  <a href="pages/adventures/?city=${id}" id="${id}">
  <div class="tile">
    <div class="tile-text text-center">
        <h5>${city}</h5>
        <p>${description}</p>
    </div>
    <img class="img-responsive" src="${image}">
  </div>
  </a>`;

  const containerElement=document.getElementById("data");
  containerElement.appendChild(divElement);

}

export { init, fetchCities, addCityToDOM };
