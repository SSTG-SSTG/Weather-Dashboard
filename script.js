    const cityInput = document.getElementById("city-input");
    const searchBtn = document.getElementById("search-btn");
    const loadingDiv = document.getElementById("loading");
    const errorMsg = document.getElementById("error-msg");
    const weatherInfo = document.getElementById("weather-info");

    const cityName = document.getElementById("city-name");
    const temperature = document.getElementById("temperature");
    const condition = document.getElementById("condition");
    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("wind-speed");

    // API Key
    const API_KEY = "66a15a64a55604fc3d9dcb862b77a7f6";

    async function getWeather(city) {
      if (!city) {
        showError("Please enter a city name!");
        return;
      }

      // Reset UI States
      loadingDiv.classList.remove("hidden");
      errorMsg.classList.add("hidden");
      weatherInfo.classList.add("hidden");

      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("City not found! Check spelling.");
          } else {
            throw new Error("Unable to fetch weather data.");
          }
        }

        const data = await response.json();

        // Update DOM Elements
        cityName.innerText = `${data.name}, ${data.sys.country}`;
        temperature.innerText = Math.round(data.main.temp);
        condition.innerText = data.weather[0].description;
        humidity.innerText = `${data.main.humidity}%`;
        windSpeed.innerText = `${data.wind.speed} km/h`;

        // Hide Loading, Show Data
        loadingDiv.classList.add("hidden");
        weatherInfo.classList.remove("hidden");

      } catch (error) {
        loadingDiv.classList.add("hidden");
        showError(error.message);
      }
    }

    function showError(message) {
      errorMsg.innerText = message;
      errorMsg.classList.remove("hidden");
    }

    // Event Listeners
    searchBtn.addEventListener("click", () => {
      getWeather(cityInput.value.trim());
    });

    cityInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        getWeather(cityInput.value.trim());
      }
    });