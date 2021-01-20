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

// Define API key
let apiKey = "cef90c55a8408d1a21a2c56bf78fb838";

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

// Append all searched items into the search history array as a list
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

// Append all the info about the searched city in the right hand column of the page
function renderWeatherData(cityName, cityTemp, cityHumidity, cityWindSpeed, cityWeatherIcon, uvVal) {
    cityNameEl.text(cityName)
    currentDateEl.text(`(${today})`)
    tempEl.text(`Temperature: ${cityTemp} °F`);
    humidityEl.text(`Humidity: ${cityHumidity}%`);
    windSpeedEl.text(`Wind Speed: ${cityWindSpeed} MPH`);
    uvIndexEl.text(`UV Index: ${uvVal}`);
    weatherIconEl.attr("src", cityWeatherIcon);
    forecastHeaderEL.text("5 Day Forecast");
}

// Get the weather information from external source for desired city
function getWeather() {

}

// Get forecast of 5 days for the desired city from external source
function getFiveDayForecast() {

}

// Define function to append 5 day forecast into card-row
function createCardForecast() {

}