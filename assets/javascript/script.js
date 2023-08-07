var data;

var APIKey = "70fce93dd67b82780f4df3ac5fb8b21a";
var city = ["Colton", "Riverside", "San Bernardino", "Fontana", "Ontario", "Redlands", "Moreno Valley", "Rialto"]
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city[0] + "&appid=" + APIKey;
fetch(queryURL);







