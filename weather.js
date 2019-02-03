let request = new XMLHttpRequest();
let forecastRequest = new XMLHttpRequest();
let APIKEY = "e29eb8d1c5b5af03fe199a9418288ce3";


function displayNicely(apiData) {
    apiData = JSON.parse(apiData);
    console.log(apiData);
    htmlString = apiData.name + " " + apiData.weather[0].description;
    htmlString += ` <img src = "http://openweathermap.org/img/w/${apiData.weather[0].icon}.png">` + '</br>';
    htmlString += "Temp:" + (apiData.main.temp - 273.15).toFixed(2) + " degrees celsius" + '</br>';
    htmlString += " Air Pressure" + (apiData.main.pressure) + "mb";
    document.getElementById("weatherData").innerHTML = htmlString;
}

function displayForecast(apiData1) {
    apiData1 = JSON.parse(apiData1);
    console.log(apiData1);
    
    
    htmlString = apiData1.city.name + " " 
  
    + (apiData1.list[0].main.temp - 273.15).toFixed(2) + "degrees celsius" + `<br>`;
    htmlString += apiData1.list[0].dt_txt + `<br>`;
    htmlString += "pressure" + apiData1.list[0].main.pressure + "mb" + `</br>`;
   
    document.getElementById("weatherData").innerHTML = htmlString;
}


function submitCity() {
    let cityName = document.getElementById("cityForm")["city"].value;
    request.open("Get", "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + APIKEY);

    request.send();
}

function submitForecastCity() {
    let cityName = document.getElementById("cityForm")["city"].value;
    forecastRequest.open("Get", "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&APPID=" + APIKEY);
    forecastRequest.send();
}

request.onreadystatechange = function() {
    if (this.readyState == 4) {
        if (this.status == 200) {
            displayNicely(this.responseText);

        }
        else if (this.status == 404) {
            document.getElementById("weatherData").innerHTML = "<h2>City not found! Please try again.</h2>";
        }
    }
}

forecastRequest.onreadystatechange = function() {
    if (this.readyState == 4) {
        if (this.status == 200) {
            displayForecast(this.responseText);
        }
    }
}
