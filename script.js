// Call classes from search column
let searchBtn = $(".search-button");
let searchInput = $(".search-input");
let searchHistory = $(".search-history");

// Call classes from city-info column 
let cityName = $(".city-name");
let currentDate = $(".current-date");
let weatherIcon = $(".weather-icon");
let temperature = $(".temperature");
let humidity = $(".humidity");
let windSpeed = $(".wind-speed");
let uvIndex = $(".uv-index");
let forecastHeader = $(".5-day-forecast-header");
let cardRow = $(".card-row");

// Set current date using moment.js in a current date variable
var today = moment().format("DD/MM/YYYY");
console.log(today);

// Get items from local storage
if (JSON.parse(localStorage.getItem("searchHistory")) === null) {
    console.log("searchHistory not found")
}

else{
    console.log("searchHistory loaded into searchHistoryDiv");
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

}

function getWeather() {

}

function renderWeatherDate() {

}

function getFiveDayForecast() {

}

// get items from local storage to save in search history

// append new elements to the info column so that info of previous city is replaced with that of new city

// set 5 day forecast