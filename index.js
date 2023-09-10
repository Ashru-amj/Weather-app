// JavaScript code in weather.js

// API key and URL for weather data
const apiKey = "75f14c23aea2c9b6daba3e6f7c7c5339";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Select elements from the HTML document
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon");
const weather1 = document.querySelector(".weather");

// Function to fetch and display weather data
async function checkWeather(city) {
    try {
        // Fetch weather data from the API
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        const data = await response.json();

        // Display weather information in the HTML elements
        cityElement.textContent = data.name;
        tempElement.textContent = Math.round(data.main.temp) + "°C";
        humidityElement.textContent = data.main.humidity + "%";
        windElement.textContent = data.wind.speed + " km/h";

        // Set the weather icon based on the weather condition
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "clear.png"
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "rain.png"
        } else if (data.weather[0].main == "Drizzel") {
            weatherIcon.src = "drizzel.png"
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "snow.png"
        }

        // Display the weather information container
        document.querySelector(".weather").style.display = "block";

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
    const city = searchBox.value;
    if (city.trim() !== "") {
        // Call the checkWeather function with the entered city
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});
