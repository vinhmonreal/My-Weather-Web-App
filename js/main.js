import {getDateTime, changeBackGround, isDarkOrLight } from './functions.js'
import {makeAPICall} from './api_call.js'

// Hide all css div at the beginning
for(let i = 0; i < 8; i++){
    document.getElementsByClassName("card")[i].style.display = "none";
}
for(let i = 0; i < 24; i++){
    document.getElementsByClassName("small-card")[i].style.display = "none";
}
document.getElementsByClassName("header")[0].style.display = "none";


// Get city name from user search bar
const button = document.getElementById('button');
const input = document.getElementById('input');
button.addEventListener('click', (e) => {
    e.preventDefault();
    const city = input.value;
    city ? renderWeatherData(city) : alert('Please enter a city name');
    input.value = '';
});

// create arrow to go back to top of the page
const arrow = document.createElement('arrow');
arrow.style.backgroundColor = "black";



// Render weather data to html
async function renderWeatherData(city) {

    // Get weather data from API call
    const data = await makeAPICall(city);
    console.log(data);
    if(data == undefined){
        return;
    }
    let sunrise0 = data.daily[0].sunrise;
    let sunset0 = data.daily[0].sunset;
    let sunrise1 = data.daily[1].sunrise;
    let sunset1 = data.daily[1].sunset;
    let currentTime = data.current.dt;
    let timezoneOffset = data.timezone_offset;// Timezone offset in seconds
    let currentIcon = data.current.weather[0].icon; // Current weather icon
    let dark_light = isDarkOrLight(sunrise0, sunset0,sunrise1, sunset1, currentTime); // Return either 'dark' or 'light'

    // Render Header for current weather
    let cityName = city.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    let currentTemp = data.current.temp;  // Current temperature in F
    let currentTempMin = data.daily[0].temp.min; // Min daily temperature in F
    let currentTempMax = data.daily[0].temp.max; // Max daily temperature in F
    let currentDateTime = getDateTime(data.current.dt, timezoneOffset).date; // Current date and time
    let currentDescription = data.current.weather[0].description; // Current weather description
    let currentIconUrl = `http://openweathermap.org/img/w/${currentIcon}.png`; // Current weather icon url from openweathermap.org
    document.getElementsByClassName("city-name")[0].innerHTML = cityName;
    document.getElementsByClassName("current-temp")[0].innerHTML = currentTemp + "°";
    document.getElementsByClassName("current-temp-min")[0].innerHTML = "L:" + currentTempMin + "°";
    document.getElementsByClassName("current-temp-max")[0].innerHTML = "H:" + currentTempMax + "°";
    document.getElementsByClassName("current-description")[0].innerHTML = currentDescription;
    document.getElementsByClassName("current-icon")[0].innerHTML = `<img src="${currentIconUrl}" alt="weather icon">`;
    document.getElementsByClassName("current-date-time")[0].innerHTML = currentDateTime;
    let header = document.getElementsByClassName("header")[0];
    header.style.display = "block";
    header.addEventListener('mouseover', () => {
        header.style.backgroundColor = "#a0d2eb";
        header.addEventListener('mouseout', () => {
            header.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        });
    });

    // Render Cards for current weather
    let temp = getDateTime(data.current.sunset, timezoneOffset);
    let temp2 = getDateTime(data.current.sunrise, timezoneOffset);
    let currentFeelsLike = data.current.feels_like;   // Current temperature feels like in F
    let currentHumidity = data.current.humidity; //  Humidilet
    let currentUvi = data.current.uvi; //Current UV index
    let currentPrecipitation; // Current precipitation in mm
    try{
        currentPrecipitation = data.minutely[0].precipitation // Current precipitation in mm
    }catch(err){
        currentPrecipitation = 0;
    }  // sometimes minutely data is not available worldwide
    let currentPressure = data.current.pressure; // Current pressure
    let currentWindSpeed = data.current.wind_speed; // Current wind speed in miles per hour
    const sunsetTime =  temp.hhmm
    const sunriseTime = temp2.hhmm
    const divSunrise = document.getElementsByClassName("card")[0];
    const divSunset = document.getElementsByClassName("card")[1];
    const divFeelsLike = document.getElementsByClassName("card")[2];
    const divHumidity = document.getElementsByClassName("card")[3];
    const divUvi = document.getElementsByClassName("card")[4];
    const divPrecipitation = document.getElementsByClassName("card")[5];
    const divWindSpeed = document.getElementsByClassName("card")[6];
    const divPressure = document.getElementsByClassName("card")[7];
    divSunset.innerHTML = '<br><br>' + "SUNSET" +'<br>' + sunsetTime;
    divSunrise.innerHTML = '<br><br>' + 'SUNRISE' + '<br>' + sunriseTime;
    divFeelsLike.innerHTML = '<br><br>' + 'FEELS LIKE' + '<br>' + currentFeelsLike + '°';
    divHumidity.innerHTML = '<br><br>' + 'HUMIDTIDY' + '<br>' + currentHumidity + '%';
    divUvi.innerHTML = '<br><br>' + 'UV INDEX<br>' + currentUvi ;
    divPrecipitation.innerHTML = '<br><br>' + 'PRECIPITATION<br>' + currentPrecipitation + '<br>mm';
    divWindSpeed.innerHTML = '<br><br>' + 'WIND<br>' + currentWindSpeed + 'mph';
    divPressure.innerHTML = '<br><br>' + 'PRESSURE<br>' + currentPressure + 'mb';
    for (let i = 0; i < 8; i++) {
        let card = document.getElementsByClassName("card")[i];
        document.getElementsByClassName("card")[i].style.display = "block";
        card.addEventListener('mouseover', () => {
            card.style.backgroundColor = "#a0d2eb";
            card.addEventListener('mouseout', () => {
                card.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
                //"rgba(255, 255, 255, 0.5)"; "rgba(255, 255, 255, 0.3)";
            }
            )
        });
    }

    // Render Cards for hourly weather
    const smallCard = document.getElementsByClassName("small-card")
    for(let i = 0; i < 24; i++){
        let hourlyTime = getDateTime(data.hourly[i].dt, timezoneOffset).amPm; // time in hour
        let hourlyTemp = data.hourly[i].temp;  // Current temperature in F
        let hourlyIcon = data.hourly[i].weather[0].icon; // Current weather icon id
        let hourlyIconUrl = `http://openweathermap.org/img/w/${hourlyIcon}.png`;
        smallCard[i].style.display = "block";
        smallCard[i].innerHTML = hourlyTime + '<br>' + `<img src="${hourlyIconUrl}" alt="weather icon">` + '<br>' + hourlyTemp + '°';
    }

    // Render table for 7 days weather
    const dailyTable = document.getElementsByClassName("daily-table")
    for(let i = 1; i < 8; i++){
        let dailyTime = getDateTime(data.daily[i].dt, timezoneOffset).date.slice(0, 10)
        let dailyTempMin = data.daily[i].temp.min; // Min daily temperature in F
        let dailyTempMax = data.daily[i].temp.max; // Max daily temperature in F
        let dailyPrecipitation = data.daily[i].pop; // Probability of precipitation
        let dailyWindSpeed = data.daily[i].wind_speed; // Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
        let dailyIcon = data.daily[i].weather[0].icon; // Current weather icon id
        let dailyIconUrl = `http://openweathermap.org/img/w/${dailyIcon}.png`;
        dailyTable[i].innerHTML = '<td>' + dailyTime + '</td>' + '<td>' + `<img src="${dailyIconUrl}" alt="weather icon">` + '</td>' + '<td>' + 'LOW' +'<br>' +dailyTempMin + '°' + '</td>' + '<td>' + 'HIGH'+'<br>' + dailyTempMax + '°' + '</td>' + '<td>'+'PRE'+'<br>' + dailyPrecipitation + 'mm' + '</td>' + '<td>' + 'WIND'+'<br>' + dailyWindSpeed + 'mph' + '</td>';
        //Add style for mouseover and mouseout
        let row = document.getElementsByClassName("daily-table")[i];
        // row.addEventListener("mouseover", function(){
        //     row.style.backgroundColor = "#a0d2eb";
        //     row.style.height = "85px";
        //     row.style.transition = "0.3s";
        //     row.addEventListener("mouseout", function(){
        //         row.style.height = "30px";
        //         i % 2 == 0 ? row.style.backgroundColor = "rgba(255, 255, 255, 0.5)" : row.style.backgroundColor = "rgba(255, 255, 255, 0.3)"
        //     }
        //     );
        // }
        // );
    }
    
    // Change background image based on light or dark and current weather id
    let currentWeatherId = data.current.weather[0].id; // Current weather id 200 Thunderstorm , 3xx Drizzle , 5xx Rain , 6xx Snow , 700 Atmosphere , 800 Clear , 8xx Clouds 
    let body = document.getElementById("body");
    body.style = changeBackGround(dark_light, currentWeatherId);
    body.style.backgroundSize = "cover";
} 



    






