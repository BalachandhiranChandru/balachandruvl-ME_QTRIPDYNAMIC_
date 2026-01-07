
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  try {
    const urlParams = new URLSearchParams(search);
    const city = urlParams.get("city");
    // console.log("city", city);
    return city;
  } catch (error) {
    return null;
  }

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const url = config.backendEndpoint + "/adventures?city=" + city;
    // console.log("url", url);
    const response = await fetch(url);
    const data = await response.json();
    // console.log("data", data);
    return data;
  } catch (error) {
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  // console.log("adventures",adventures)
  const dataaContainer=document.getElementById("data");
  dataaContainer.innerHTML="";
  // const containerElement = document.getElementById("data");

  adventures && adventures.length && adventures.forEach((adventure) => {
    const divElement = document.createElement("div");
    divElement.className = "col-6 col-lg-3 mb-4";
    divElement.innerHTML = `
    <a href="detail/?adventure=${adventure.id}" id=${adventure.id}>
            <div class="activity-card">
            <div class="category-banner">${adventure.category}</div>
            <img class="img-responsive" src="${adventure.image}" alt="" />
                <div class="activity-card-text text-md-center w-100 mt-3 px-2">
                    <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
                        <h5 class="text-left">${adventure.name}</h5>
                        <p>₹${adventure.costPerHead}</p>
                    </div>
                    <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
                        <h5 class="text-left">Duration</h5>
                        <p>${adventure.duration} Hours</p>
                    </div>
                </div>
            </div>
        </a>
    `;
    const containerElement = document.getElementById("data");
    containerElement.appendChild(divElement);

  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredlist=list.filter(adventure=>adventure.duration>low && adventure.duration <=high);
  return filteredlist;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, selectedCategoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const filteredlist=list.filter(adventure=>selectedCategoryList.includes(adventure.category));
  return filteredlist;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // console.log(filters,"filters in filter function");
  const isDurationThere=filters["duration"] && filters["duration"].length>0;
  const isCategoryThere=filters["category"] && filters["category"].length>0;
  
  if(isDurationThere && isCategoryThere){
    const filteredDuration=filters["duration"];
    const splitDuration=filteredDuration.split('-');
    const low=splitDuration[0];
    const high=splitDuration[1];

    const filterByDurationAdventures=filterByDuration(list,low,high);

    const categoryList=filters["category"];
    const filterByCategoryAdventures=filterByCategory(filterByDurationAdventures,categoryList);

    return filterByCategoryAdventures;

  }else if(filters["duration"].length){
    const filteredDuration=filters["duration"];
    const splitDuration=filteredDuration.split('-');
    const low=splitDuration[0];
    const high=splitDuration[1];

    const filterByDurationAdventures=filterByDuration(list,low,high);

    return filterByDurationAdventures;

  }else if(filters["category"].length){
    const categoryList=filters["category"];
    const filterByCategoryAdventures=filterByCategory(list,categoryList);
    return filterByCategoryAdventures;
    
  }else{
    return list;
  }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));

  // return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an 
const filterString=localStorage.getItem("filters");
let filterObject;
if(filterString){
   filterObject=JSON.parse(filterString);
}else{
  return null;
}
// const filterObject=JSON.parse(filterString);
// console.log(filterString);
// console.log(filterObject);
const duration=filterObject["duration"];
const durationSelectElement=document.getElementById("duration-select");

let i=0;
Array.from(durationSelectElement.options).forEach((option,index)=>{
  let value=option.value;
  if(value==duration){
    i=index;
  }
})

console.dir(durationSelectElement);
durationSelectElement.selectedIndex=i+"";

  // Place holder for functionality to work in the Stubs
  return filterObject;
  // return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const categoryFilter=filters["category"];
  categoryFilter.forEach(key=>{
    let newElem=document.createElement("div");
    newElem.className="category-filter";
    newElem.innerHTML=`<div>${key}</div>`;
    document.getElementById("category-list").appendChild(newElem);
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
