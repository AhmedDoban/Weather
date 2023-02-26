var inputval = document.querySelector("#cityinput");
var btn = document.querySelector("#add");
var city = document.querySelector("#cityoutput");
var descrip = document.querySelector(".description");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var feelsLike = document.querySelector(".feelsLike");
var VisabiltyDATA = document.querySelector("#Visabilty");
var hum = document.querySelector("#humidity");
var locationIcon = document.querySelector(".imgIcon");
let otherData = document.querySelector(".other-weather-container");

/****************************
 *  # Format Date
 * ********************************/
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var month = [
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
/****************************
 *  # Api General Data
 * ********************************/
api = "https://api.openweathermap.org/data/2.5/forecast?";
apiWeatherkey = "118d349a7305ac6c68aabac02ca9c657";
// All Data Shown
let AllData = [];

/*********************************
 *  # General Function I will Use it
 * ********************************/
//kelvin to celcious. 1 Kelvin is equal to -272.15 Celsius.
function convertion(val) {
  return (val - 273).toFixed(0);
}
// Get location of the user
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}
// Convert From Am to pm
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

// Remove All Childs to Show New Data
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// When Load Page
window.addEventListener(
  "load",
  (event) => {
    getLocation();
  },
  [0]
);

// Show The Data In Custom Format
function DetDate(value) {
  let currentDate = new Date(value);
  let cDay = currentDate.getDay();
  currentDate.getDate();
  return days[cDay] + " " + currentDate.getDate();
}

/*********************************
 *  #  Get position of the user
 * ********************************/
function showPosition(position) {
  let Latitude = position.coords.latitude;
  let Longitude = position.coords.longitude;
  let LocalFunctionAPi =
    api + `lat=${Latitude}&lon=${Longitude}&appid=${apiWeatherkey}`;
  FeachLocationApi(LocalFunctionAPi);
}
// Get Another Data of the user
function showAnotherData(Longitude, Latitude) {
  let LocalFunctionAPi =
    api + `lat=${Latitude}&lon=${Longitude}&appid=${apiWeatherkey}`;
  FeachLocationApi(LocalFunctionAPi);
}
/*********************************
 *  # Call The APi
 * ********************************/
// call api to get the city
async function FeachLocationApi(Api) {
  await fetch(Api)
    .then((res) => res.json())
    .then((data) => {
      inputval.value = data.city.name;
      city.innerHTML = data.city.name;
      locationIcon.src = `/icons/${data.list[0].weather[0].icon}.png`;
      temp.innerHTML = `${convertion(data.list[0].main.temp)}`;
      description.innerHTML = data.list[0].weather[0].description;
      feelsLike.innerHTML = `${convertion(
        data.list[0].main.feels_like
      )}  &#176;`;
      hum.innerHTML = `${data.list[0].main.humidity} %`;
      wind.innerHTML = `${data.list[0].wind.speed} km/h`;
      VisabiltyDATA.innerHTML = `${data.list[0].visibility / 1000} km/h`;
      AllData.splice(0, AllData.length);
      removeAllChildNodes(otherData);
      for (let i = 0; i < data.list.length; i++) {
        AllData.push(data.list[i]);
      }

      for (let i = 0; i < AllData.length; i = i + 8) {
        let src = `/icons/${AllData[i].weather[0].icon}.png`;
        letSugDiscription = AllData[i].weather[0].description;
        let MinHigh = convertion(AllData[i].main.temp);

        DevGenerator(
          DetDate(AllData[i].dt_txt),
          src,
          MinHigh,
          letSugDiscription,
          AllData[i]
        );
      }
    });
}

/**********************************
 *  # button event when click or When Enter
 * ********************************/
btn.addEventListener("click", function () {
  FeachWeatherApi();
});
inputval.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    FeachWeatherApi();
  }
});
/**********************************
 *  # weather Feach APi by input
 * ********************************/
function FeachWeatherApi() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputval.value +
      "&appid=" +
      apiWeatherkey
  )
    .then((res) => res.json())
    .then((data) => {
      AllData.splice(0, AllData.length);
      removeAllChildNodes(otherData);
      showAnotherData(data.coord.lon, data.coord.lat);
    });
}
/**********************************
 *  # get Data for 5 days
 * ********************************/
function DevGenerator(h3Value, imgSrc, pValue, h4Valu, currentData) {
  let CureentIndexData = AllData.indexOf(currentData);
  let div = document.createElement("div");
  div.classList.add("card");
  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode(`${h3Value}`);
  h3.appendChild(h3Text);
  div.appendChild(h3);
  let img = document.createElement("img");
  img.src = imgSrc;
  div.appendChild(img);
  let p = document.createElement("p");
  let pText = document.createTextNode(`${pValue}`);
  p.appendChild(pText);
  div.appendChild(p);
  let h4 = document.createElement("h4");
  let h4Text = document.createTextNode(`${h4Valu}`);
  h4.appendChild(h4Text);
  div.appendChild(h4);
  div.dataset.aos = "zoom-in";
  div.dataset.aos.easing = "ease-in-back";
  div.dataset.aos.duration = "2000";
  let input = document.createElement("input");
  input.type = "checkbox";
  input.name = h3Text.data;
  input.id = h3Text.data;
  let lab = document.createElement("label");
  lab.setAttribute("class", "more-details");
  lab.setAttribute("for", h3Text.data);
  let More_Details = document.createElement("h5");
  let More_Details_Text = document.createTextNode("More Details");
  More_Details.appendChild(More_Details_Text);
  let more_details_container = document.createElement("div");
  more_details_container.setAttribute("class", "more-details-container");
  for (let i = 0; i < 8; i++) {
    let data = document.createElement("div");
    data.className = "data";
    let h5 = document.createElement("h5");

    var dt = formatAMPM(new Date(AllData[CureentIndexData].dt_txt));
    let h5Data = document.createTextNode(dt);
    h5.appendChild(h5Data);
    let p = document.createElement("p");
    let pData = document.createTextNode(
      convertion(AllData[CureentIndexData].main.temp)
    );
    p.appendChild(pData);
    data.appendChild(h5);
    data.appendChild(p);
    more_details_container.appendChild(data);

    CureentIndexData++;
  }
  lab.appendChild(More_Details);
  lab.appendChild(more_details_container);
  div.appendChild(input);
  div.appendChild(lab);
  otherData.appendChild(div);
}
/****************************
 *  # Animations
 * ********************************/
AOS.init();
