const api = {
  key: "2fa73590fd8b5a4c6e68098ad5625395",
  base: "https://api.openweathermap.org/data/2.5/",
};
getResults("Karachi");
const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  //console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>℃</span>`;

  let Weather = document.querySelector(".weather");
  Weather.innerText = weather.weather[0].main;
  bgSetter(weather);

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${Math.round(weather.main.temp_min)} ℃ / ${Math.round(
    weather.main.temp_max
  )} ℃`;
}

function bgSetter(weather) {
  const current = weather.weather[0].main;
  console.log(current);
  let body = document.getElementById("body");
  if (current == "Clear") {
    body.style.background = `url("Clear.jpg")`;
  } else if (current == "Snow") {
    body.style.background = `url("Snow.jpg")`;
  } else if (current == "Clouds") {
    body.style.background = `url("Cloudy.jpg")`;
  } else if (current == "Fog") {
    body.style.background = `url("Fog.jpg")`;
  } else if (current == "Haze") {
    body.style.background = `url("Haze.jpg")`;
  } else if (current == "Rain") {
    body.style.background = `url("Rain.jpg")`;
  } else if (current == "Smoke") {
    body.style.background = `url("Smoke.jpg")`;
  } else if (current == "Sunny") {
    body.style.background = `url("Sunny.jpg")`;
  } else if ("Thunder" in current) {
    body.style.background = `url("Clear.jpg")`;
  } else if ("wind" in current) {
    body.style.background = `url("Windy.jpg")`;
  }

  body.style.backgroundSize = `cover`;
  body.style.backgroundPosition = `top center`;
}

function dateBuilder(d) {
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

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let month = months[d.getMonth()];
  let date = d.getDate();
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}
