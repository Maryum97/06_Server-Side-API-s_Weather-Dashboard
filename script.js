// Call classes from search column
var searchBtn = $(".search-button");
var searchInput = $(".search-input");
var searchHistoryEl = $(".search-history");

// Call classes from city-info column 
var cityNameEl = $(".city-name");
var currentDateEl = $(".current-date");
var weatherIconEl = $(".weather-icon");
var temperatureEl = $(".temperature");
var humidityEl = $(".humidity");
var windSpeedEl = $(".wind-speed");
var uvIndexEl = $(".uv-index");
var forecastHeaderEl = $(".5-day-forecast-header");
var cardRow = $(".card-row");

// Define API key
var apiKey = "cef90c55a8408d1a21a2c56bf78fb838";

// Set current date using moment.js in a current date variable
var today = moment().format("DD/MM/YYYY");
console.log(today);

// Get items from local storage
if (JSON.parse(localStorage.getItem("searchHistory")) === null) {
    console.log("searchHistory not found")
}

else {
    console.log("searchHistory loaded into searchHistoryArr");
    renderSearchHistory();
}

// Add event listener to search button
searchBtn.on("click", function (e) {
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
$(document).on("click", ".historyEntry", function () {
    console.log("clicked history item")
    let thisElement = $(this);
    getWeather(thisElement.text());
})

// Declare functions

// Append all searched items into the search history array as a list;
// i.e. names of searhced cities
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
    cityNameEl.text(cityName);
    currentDateEl.text(today);
    temperatureEl.text("Temperature: " + cityTemp + " °F");
    humidityEl.text("Humidity: " + cityHumidity);
    windSpeedEl.text("Wind Speed: " + cityWindSpeed + " MPH");
    uvIndexEl.text("UV Index: " + uvVal);
    weatherIconEl.attr("src", cityWeatherIcon);
    forecastHeaderEl.text("5 Day Forecast");
}

// Get the weather information from external source for desired city, including the UV index
function getWeather(desiredCity) {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + desiredCity + "&appid=" + apiKey + "&units=imperial";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function (weatherData) {
        let cityObj = {
            cityName: weatherData.name,
            cityTemp: weatherData.main.temp,
            cityHumidity: weatherData.main.humidity,
            cityWindSpeed: weatherData.wind.speed,
            cityUVIndex: weatherData.coord,
            cityWeatherIconName: weatherData.weather[0].icon
            }
    let queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + cityObj.cityUVIndex.lat + "&lon=" + cityObj.cityUVIndex.lon + "&units=imperial";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(uvData) {
        if (JSON.parse(localStorage.getItem("searchHistory")) == null) {
            let searchHistoryArray = [];
            // Keep user from adding the same city to the searchHistory array list more than once
            if (searchHistoryArray.indexOf(cityObj.cityName) === -1) {
                searchHistoryArray.push(cityObj.cityName);
                // store our array of searches and save 
                localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArray));
                let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
                renderSearchHistory();
            }

            else {
                console.log("City already in searchHistory. Not adding to history list")
                let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
            }
        }

        else {
            let searchHistoryArray = JSON.parse(localStorage.getItem("searchHistory"));
            // Keep user from adding the same city to the searchHistory array list more than once
            if (searchHistoryArray.indexOf(cityObj.cityName) === -1) {
                searchHistoryArray.push(cityObj.cityName);
                // store our array of searches and save 
                localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArray));
                let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
                renderSearchHistory();
            }
            
            else {
                console.log("City already in searchHistory. Not adding to history list")
                let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
            }
        }

    })

});

// Call the function to get a five day forecast of the same city (desiredCity)
getFiveDayForecast();

// Declare the function here;
// within the function getWeather(desiredCity)
function getFiveDayForecast() {
    cardRow.empty();
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + desiredCity+ "&appid=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(fiveDayResponse) {
        for (var i = 0; i < fiveDayResponse.list.length; i+=8 ) { // looping it 8 times for the cards to show up for the next 5 days, maximun
            let cityObj = {
                date: fiveDayResponse.list[i].dt_txt,
                icon: fiveDayResponse.list[i].weather[0].icon,
                temp: fiveDayResponse.list[i].main.temp,
                humidity: fiveDayResponse.list[i].main.humidity
            }

            let dateStr = cityObj.date;
                let trimmedDate = dateStr.substring(0, 10); 
                let weatherIcon = `https:///openweathermap.org/img/w/${cityObj.icon}.png`;
                createForecastCard(trimmedDate, weatherIcon, cityObj.temp, cityObj.humidity);
        }
    })
}

}

// Define function to append 5 day forecast into card-row
function createForecastCard(date, icon, temp, humidity) {

    // HTML elements we will create to later
    let fiveDayCardEl = $("<div>").attr("class", "five-day-card");
    let cardDate = $("<h3>").attr("class", "card-text");
    let cardIcon = $("<img>").attr("class", "weatherIcon");
    let cardTemp = $("<p>").attr("class", "card-text");
    let cardHumidity = $("<p>").attr("class", "card-text");

    cardRow.append(fiveDayCardEl);
    cardDate.text(date);
    cardIcon.attr("src", icon);
    cardTemp.text("Temp: " + temp + "°F");
    cardHumidity.text("Humidity: " + humidity + "%");
    fiveDayCardEl.append(cardDate, cardIcon, cardTemp, cardHumidity);

}