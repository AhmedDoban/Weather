var inputval = document.querySelector('#cityinput')
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput')
var descrip = document.querySelector('#description')
var temp = document.querySelector('#temp')
var wind = document.querySelector('#wind')
// var img = document.querySelector('#wicon')
var locationIcon = document.querySelector('.weather-icon');
apik = "118d349a7305ac6c68aabac02ca9c657"

//kelvin to celcious. 1 Kelvin is equal to -272.15 Celsius.

function convertion(val){
    return (val - 273).toFixed(2)
}
//Now we have to collect all the information with the help of fetch method
btn.addEventListener('click', function(){

//This is the api link from where all the information will be collected

        fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputval.value+'&appid='+apik)
        .then(res => res.json())
        .then(data => {

//Now you need to collect the necessary information with the API link. Now I will collect that information and store it in different constants.

            var nameval = data['name']
            var descrip = data['weather']['0']['description']
            var tempature = data['main']['temp']
            var wndspd = data['wind']['speed']
            // weerImageString = data['weather']['0']['icon']
            const icon = data['weather']['0']['icon']
//Now with the help of innerHTML you have to make arrangements to display all the information in the webpage.
            city.innerHTML=`<span>${nameval}<span>`
            temp.innerHTML = `Temperature <br> <span>${ convertion(tempature)} C</span>`
            description.innerHTML = `Sky Conditions <br> <span>${descrip}<span>`
            wind.innerHTML = `Wind Speed <br><span>${wndspd} km/h<span>`
            locationIcon.innerHTML = `<img src="/assets/icons/${icon}.png">`;

            // img.innerHTML = `<img src=http://openweathermap.org/img/w/"+${weerImageString}+.png" alt=${data['weather']['0']['main']}>`

        })

//Now the condition must be added that what if you do not input anything in the input box.
        .catch(err => alert('You entered Wrong city name'))
    })
//If you click on the submit button without inputting anything in the input box or typing the wrong city name then the above text can be seen.




/*
ــــــــــــــــــــــــــــــــــــــــــــــــــ
left menu
ــــــــــــــــــــــــــــــــــــــــتــــــــــ
*/
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days =["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"];
const d = new Date();

let month = months[d.getMonth()];
function day(x){
    let day=days[d.getDay()+x]
    return day
}

window.onload=function data(){
    document.getElementById("day").innerHTML=day(1)
    document.getElementById("month").innerHTML = d.getDate() + " " + month;
    document.getElementById("day1").innerHTML=day(2)
    document.getElementById("month1").innerHTML = d.getDate()+1 + " " + month;
    document.getElementById("day2").innerHTML=day(3)
    document.getElementById("month2").innerHTML = d.getDate()+2 + " " + month;
    document.getElementById("day3").innerHTML=day(4)
    document.getElementById("month3").innerHTML = d.getDate()+3 + " " + month;
    document.getElementById("day4").innerHTML=day(5)
    document.getElementById("month4").innerHTML = d.getDate()+4 + " " + month;
}
