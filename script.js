// Call classes from search column
let searchBtn = $(".search-button");
let searchInput = $(".search-input");
let searchHistoryEl = $(".search-history");

// Call classes from city-info column 
let cityNameEL = $(".city-name");
let currentDateEL = $(".current-date");
let weatherIconEL = $(".weather-icon");
let temperatureEL = $(".temperature");
let humidityEL = $(".humidity");
let windSpeedEL = $(".wind-speed");
let uvIndexEL = $(".uv-index");
let forecastHeaderEL = $(".5-day-forecast-header");
let cardRow = $(".card-row");

// Set current date using moment.js in a current date variable
var today = moment().format("DD/MM/YYYY");
console.log(today);

// Get items from local storage
if (JSON.parse(localStorage.getItem("searchHistory")) === null) {
    console.log("searchHistory not found")
}

else{
    console.log("searchHistory loaded into searchHistoryArray");
    // else, call the function that renders search history into the serach history div
    // renderSearchHistory();
}

// Add event listener to search button
searchBtn.on("click", function(e) {
    e.preventDefault();

    if (searchInput.val() === "") {
        alert("You must enter a city");
        return;
    }

    console.log("clicked button")
    getWeather(searchInput.val());

});

// When a city is appended to search history, ...
// its info must show on the page when it is clicked on in the search history list
$(document).on("click", ".historyEntry", function() {
    console.log("clicked history item")
    let thisElement = $(this);
    getWeather(thisElement.text());
})

// Define functions

function renderSearchHistory() {
    searchHistoryEl.empty();
    let searchHistoryArray = JSON.parse(localStorage.getItem("searchHistory"));
    // Create a for loop, to append city names in a list
    for (let i = 0; i < searchHistoryArray.length; i++) {
        let newListItem = $("<li>").attr("class", "historyEntry");
        newListItem.text(searchHistoryArray[i]);
        searchHistoryEl.prepend(newListItem);
    }
}


function renderWeatherData() {

}

function getWeather() {

}

function getFiveDayForecast() {

}

// get items from local storage to save in search history

// append new elements to the info column so that info of previous city is replaced with that of new city

// set 5 day forecast