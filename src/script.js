// display real date of the year, week and time

let now = new Date();
let currentTime = document.querySelector("#day-and-time");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let year = now.getFullYear();
let date = now.getDate();
currentTime.innerHTML = `${day}, ${month} ${date} </br> ${year} </br> 
${hours}:${minutes}`;

// forecast for the next 4 days

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function getForecast(coordinates) {
  let apiKey = "7cf24a2441259043e3f7ca4927b8b80f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 5) {
      forecastHTML =
        forecastHTML +
        `   <div class="col-2 next-weather">
            ${formatDay(forecastDay.dt)} 
            <br />
            <hr />
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" width="42" />
            <hr />
            <span class="max-temperature">
            ${Math.round(forecastDay.temp.max)}° </span>
            <span class="min-temperature">${Math.round(
              forecastDay.temp.min
            )}°</span> <br />
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// integration of real data API
function changeFunnyPhrase(phrase) {
  if (
    phrase === "clear sky" ||
    phrase === "few clouds" ||
    phrase === "scattered clouds"
  ) {
    return "Today is the perfect day to take a walk outside 🌻";
  }
  if (
    phrase === "broken clouds" ||
    phrase === "mist" ||
    phrase === "overcast clouds" ||
    phrase === "haze"
  ) {
    return `You can't make a cloudy day a sunny day, but can embrace it and decide it's going to be a good day after all. ☁️🌈`;
  }
  if (phrase === "shower rain" || phrase === "rain") {
    return "It's time for 💃🏽 in the 🌧, but don't forget your ☂️";
  }
  if (phrase === "thunderstorm" || phrase === "heavy snow") {
    return "Maybe it's better to stay 🏠. Read a 📖 and enjoy a cup of hot 🍵";
  }
  if (phrase === "snow" || phrase === "light snow") {
    return "Do you want to built a ☃️?";
  }
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#actual-temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description-weather");
  let feelsLike = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let changePhrase = document.querySelector("#funny-phrase");
  changePhrase.innerHTML = changeFunnyPhrase(
    response.data.weather[0].description
  );
  celsiusTemperature = response.data.main.temp;
  getFeelsLike = response.data.main.feels_like;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLike.innerHTML = `Feels Like: ${Math.round(getFeelsLike)}°`;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "7cf24a2441259043e3f7ca4927b8b80f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

// Unit conversion buttons

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#actual-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#actual-temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

// get the current position

function getCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=7cf24a2441259043e3f7ca4927b8b80f`;
  axios.get(apiUrl).then(displayTemperature);
}
function clickCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}
let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", clickCurrent);

// change the funny phrase based on the weather

// default city on the app

search("San Francisco");
