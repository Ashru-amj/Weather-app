// // JavaScript code in weather.js

// // API key and URL for weather data
// const apiKey = "75f14c23aea2c9b6daba3e6f7c7c5339";
// const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// // Select elements from the HTML document
// const searchBox = document.querySelector(".search input");
// const searchBtn = document.querySelector(".search button");
// const cityElement = document.querySelector(".city");
// const tempElement = document.querySelector(".temp");
// const humidityElement = document.querySelector(".humidity");
// const windElement = document.querySelector(".wind");
// const weatherIcon = document.querySelector(".weather-icon");
// const weather1 = document.querySelector(".weather");

// // Function to fetch and display weather data
// async function checkWeather(city) {
//     try {
//         // Fetch weather data from the API
//         const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
//         const data = await response.json();

//         // Display weather information in the HTML elements
//         cityElement.textContent = data.name;
//         tempElement.textContent = Math.round(data.main.temp) + "°C";
//         humidityElement.textContent = data.main.humidity + "%";
//         windElement.textContent = data.wind.speed + " km/h";

//         // Set the weather icon based on the weather condition
//         if (data.weather[0].main == "Clouds") {
//             weatherIcon.src = "clouds.png";
//         } else if (data.weather[0].main == "Clear") {
//             weatherIcon.src = "clear.png"
//         } else if (data.weather[0].main == "Rain") {
//             weatherIcon.src = "rain.png"
//         } else if (data.weather[0].main == "Drizzel") {
//             weatherIcon.src = "drizzel.png"
//         } else if (data.weather[0].main == "Snow") {
//             weatherIcon.src = "snow.png"
//         }

//         // Display the weather information container
//         document.querySelector(".weather").style.display = "block";

//     } catch (error) {
//         console.error("An error occurred:", error);
//     }
// }

// // Event listener for the search button
// searchBtn.addEventListener("click", () => {
//     const city = searchBox.value;
//     if (city.trim() !== "") {
//         // Call the checkWeather function with the entered city
//         checkWeather(city);
//     } else {
//         alert("Please enter a city name.");
//     }
// });



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
const weatherContainer = document.querySelector(".weather");

// Select the canvas element
const temperatureChartCanvas = document.getElementById("temperatureChart").getContext("2d");

// Function to fetch and display weather data and temperature graph
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
            weatherIcon.src = "clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "drizzle.png"; // Corrected the typo
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "snow.png";
        }

        // Display the weather information container
        weatherContainer.style.display = "block";

        // Fetch hourly forecast data from the API
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
        const forecastData = await forecastResponse.json();

        // Extract hourly temperature data
        const hourlyTemps = forecastData.list.map(entry => entry.main.temp);

        // Create a temperature chart
        createTemperatureChart(hourlyTemps);

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Function to create and update the temperature chart
function createTemperatureChart(hourlyTemps) {
    const hoursOfDay = Array.from({ length: 24 }, (_, i) => `${i}h`);

    const temperatureChart = new Chart(temperatureChartCanvas, {
        type: 'line',
        data: {
            labels: hoursOfDay,
            datasets: [{
                label: 'Temperature (°C)',
                data: hourlyTemps,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: false,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time of Day'
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    },
                },
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        title: (tooltipItem) => {
                            const hourIndex = tooltipItem[0].index;
                            const currentTime = moment().format('HH:mm'); // Current time
                            const currentDate = moment().format('YYYY-MM-DD'); // Current date
                            return `Time: ${hoursOfDay[hourIndex]} | Current Time: ${currentTime} | Date: ${currentDate}`;
                        },
                        label: (context) => `Temperature: ${context.parsed.y}°C`,
                    },
                },
            },
        },
    });

    // Add click event to show temperature on click
    temperatureChartCanvas.onclick = function (event) {
        const activePoints = temperatureChart.getElementsAtEventForMode(event, 'index', { intersect: true });
        if (activePoints.length > 0) {
            const temperature = temperatureChart.data.datasets[0].data[activePoints[0].index];
            alert(`Temperature at ${hoursOfDay[activePoints[0].index]}: ${temperature}°C`);
        }
    };
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
