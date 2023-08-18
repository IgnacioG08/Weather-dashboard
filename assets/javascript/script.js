// Global Variables
var data;
var APIKey = "70fce93dd67b82780f4df3ac5fb8b21a";
var city = ["Colton", "Riverside", "San Bernardino", "Fontana", "Ontario", "Redlands", "Moreno Valley", "Rialto"]


// Functions 

// Function grabs city searched
function getCity() {
    let city = document.getElementById("cityDataList").value;
    saveCity(city);
    getWeather(city);

}

// Grabs the data for the actual weather displayed
function getWeather(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    fetch(queryURL).then(function (response){
        if(response.ok) {
            response.json().then(function (data){
                console.log(data)
                let temp = data.main.temp
                let humidity = data.main.humidity
                let windSpeed = data.wind.speed
                let date = new Date()
                let month = date.getMonth() + 1
                let day = date.getDate()
                let year = date.getFullYear()
                let d = month + "/" + day + "/" + year
                let icon = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"

                let output = "<h2>" + data.name + "</h2>"
                output += "<h3>" + d + "</h3>"
                output += "<p> <img src='" + icon + "'> </p>"
                output += "<p> Temp: " + temp.toFixed(0) + "&deg; F </p>" 
                output += "<p> Humidity: " + humidity.toFixed(0) + " % </p>" 
                output += "<p> Wind Speed: " + windSpeed.toFixed(0) + " mph </p>" 
                document.querySelector(".data").innerHTML = output
                getForecast(city)
            })
        }
    })
}

// Grabs the future forecast for searched city
function getForecast(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;
    fetch(queryURL).then(function (response){
        if(response.ok) {
            response.json().then(function (data){
                console.log(data)
                let count = 1
                for(let i = 0; i < 40; i+=8) {
                    let date = data.list[i].dt_txt
                    let month = date.substring(5, 7)
                    let day = date.substring(8 ,10)
                    let year = date.substring(0, 4)
                    let d = month + "/" + day + "/" + year
                    document.querySelector("#day" + count + " .card-title").innerHTML = d
                    
                    let temp = data.list[i].main.temp
                    let humidity = data.list[i].main.humidity
                    let windSpeed = data.list[i].wind.speed
                    let icon = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png"
                    let output = "" 
                    output += "<p> <img src='" + icon + "'> </p>"
                    output += "<p> Temp: " + temp.toFixed(0) + "&deg; F </p>" 
                    output += "<p> Humidity: " + humidity.toFixed(0) + " % </p>" 
                    output += "<p> Wind Speed: " + windSpeed.toFixed(0) + " mph </p>"
                    document.querySelector("#day" + count + " .card-text").innerHTML = output
                    count++
                }
                
            })
        }
    })
}

// Local Storage
function saveCity(city) {
    let cities = localStorage.getItem("cities");
    if(cities) {
        if(cities.includes(city)) {
            return;
        }
        cities += city + ";"
    }
    else {
        cities = city + ";"
    }
    localStorage.setItem("cities", cities);
    loadCities();
}

// Buttons from local storage from previous searches
function loadCities() {
    document.getElementById("cities").innerHTML = "";
    let cities = localStorage.getItem("cities");
    if (cities) {
        let array = cities.split(";");
        for( let i = 0; i < array.length - 1; i++) {
            let city = array[i];
            let button = document.createElement("button");
            button.textContent = city;
            button.classList.add("btn");
            button.classList.add("btn-primary");
            button.classList.add("mb-3");
            button.addEventListener("click", function() {
                getWeather(city);
            })
            document.getElementById("cities").appendChild(button)
        }
    }
}

// Event Listener
window.onload = function() {
    document.getElementById("search").addEventListener("click", getCity)
    loadCities();
}









