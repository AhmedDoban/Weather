var inputval = document.querySelector("#cityinput");
var btn = document.querySelector("#add");
var city = document.querySelector("#cityoutput");
var descrip = document.querySelector("#description");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var hum = document.querySelector("#humidity");
var locationIcon = document.querySelector(".weather-icon .imgIcon");
apik = "118d349a7305ac6c68aabac02ca9c657";

// Get location of the user
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}
// Get position of the user
function showPosition(position) {
  let x = position.coords.latitude;
  let y = position.coords.longitude;
  let Api = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${x}&longitude=${y}`;
  FeachLocationApi(Api);
}
// call api to get the city
function FeachLocationApi(Api) {
  fetch(Api)
    .then((res) => res.json())
    .then((data) => (inputval.value = data.city));
  FeachWeatherApi();
}

//kelvin to celcious. 1 Kelvin is equal to -272.15 Celsius.
function convertion(val) {
  return (val - 273).toFixed(0);
}
// button event when click
btn.addEventListener("click", function () {
  FeachWeatherApi();
});

// weather Feach APi
function FeachWeatherApi() {
  getLocation();
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputval.value +
      "&appid=" +
      apik
  )
    .then((res) => res.json())
    .then((data) => {
      var nameval = data["name"];
      var descrip = data["weather"]["0"]["description"];
      var tempature = data["main"]["temp"];
      var humidity = data["main"]["humidity"];
      var wndspd = data["wind"]["speed"];
      const icon = data["weather"]["0"]["icon"];

      city.innerHTML = `${nameval}`;
      temp.innerHTML = `${convertion(tempature)}  &#176;`;
      description.innerHTML = `${descrip}`;
      wind.innerHTML = `${wndspd} km/h`;
      hum.innerHTML = `${humidity} % `;
      locationIcon.src = `/icons/${icon}.png`;
    });
}

window.addEventListener("load", (event) => {
  FeachWeatherApi();
});
