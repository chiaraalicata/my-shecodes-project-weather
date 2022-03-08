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

// API variables

let apiKey = "7cf24a2441259043e3f7ca4927b8b80f";
let endPoint = "https://api.openweathermap.org/data/2.5/weather";

// search the city

function showSearchTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let updatedTemperature = document.querySelector("#actual-temperature");
  updatedTemperature.innerHTML = `${temperature}°C`;
  console.log(response);
}

function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-text-input");
  cityInput = cityInput.value.trim();
  let units = "metric";
  let apiUrl = `${endPoint}?q=${cityInput}&appid=${apiKey}&units=${units}`;

  let searchCityName = document.querySelector("#city-title");

  if (cityInput) {
    searchCityName.innerHTML = `${cityInput}`;
  } else {
    searchCityName.innerHTML = "Somewhere in the world...";
    alert(`Sorry, please enter a city.`);
  }
  axios.get(apiUrl).then(showSearchTemperature);
}

let userCitySearch = document.querySelector("#search-form");
userCitySearch.addEventListener("submit", citySearch);

// current location

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let updatedTemperature = document.querySelector("#actual-temperature");
  updatedTemperature.innerHTML = `${temperature}°C`;
  // console.log(response);
  let currentCity = response.data.name;
  let currentCityName = document.querySelector("#city-title");
  currentCityName.innerHTML = `${currentCity}`;
}

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `${endPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function currentCityButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentCityInfo = document.querySelector("#current-location");
currentCityInfo.addEventListener("click", currentCityButton);
