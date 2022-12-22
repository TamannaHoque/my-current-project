let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let now = new Date();
let day = days[now.getDay()];
let hour = now.getHours();
hour = hour <= 9 ? "0" + hour : hour;
let minutes = now.getMinutes();
minutes = minutes <= 9 ? "0" + minutes : minutes;

let h6 = document.querySelector("#date");
h6.innerHTML = `${day} ${hour}:${minutes}`;

/* Searching for city... */

function weatherDescription(response) {
  console.log(response);

  let cityName = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);

  let h1 = document.querySelector("h1");
  h1.innerHTML = cityName;

  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = temperature;

  let info = document.querySelector("#info");
  info.innerHTML = description;

  let humid = document.querySelector("#humidity");
  humid.innerHTML = humidity;

  let windy = document.querySelector("#wind");
  windy.innerHTML = wind;
}

function retrievePosition(findCity) {
  console.log(findCity);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${findCity}&appid=${apiKey}&units=metric`;
  axios.get(url).then(weatherDescription);
}

function searchCity(event) {
  event.preventDefault();
  let findCity = document.querySelector("#city").value;
  retrievePosition(findCity);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity);

function getCurrentPosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(weatherDescription);
}

function handleCurrentLocation(e) {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

let currentLocation = document.querySelector("#current");
currentLocation.addEventListener("click", handleCurrentLocation);

navigator.geolocation.getCurrentPosition(getCurrentPosition);
