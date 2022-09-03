var inputval = document.querySelector("#cityinput");
var btn = document.querySelector("#add");
var city = document.querySelector("#cityoutput");
var descrip = document.querySelector("#description");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var hum = document.querySelector("#humidity");
var error = document.querySelector("#snackbar");

var locationIcon = document.querySelector(".weather-icon");
apik = "118d349a7305ac6c68aabac02ca9c657";

// date
let day = new Date();
//kelvin to celcious. 1 Kelvin is equal to -272.15 Celsius.
function convertion(val) {
  return (val - 273).toFixed(0);
}

btn.addEventListener("click", function () {
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

      city.innerHTML = `<h1>${nameval}</h1> <span>${day.getHours()}:${day.getMinutes()} - ${day.getDate()}-${day.getMonth()}-${day.getFullYear()} </span>`;
      temp.innerHTML = `<span>${convertion(tempature)}  &#176;</span>`;
      description.innerHTML = `<p>Sky Conditions </p> <span>${descrip}<span>`;
      wind.innerHTML = `Wind Speed <span>${wndspd} km/h<span>`;
      hum.innerHTML = `<p>humidity</p> ${humidity}%`;

      locationIcon.innerHTML = `<img src="/icons/${icon}.png">`;
    })

    .catch(
      (err) => (
        (error.className = "show"),
        (error.innerHTML = "You entered Wrong city name")
      ),
      setTimeout(function () {
        error.className = error.className.replace("show", "");
      }, 3000)
    );
});

