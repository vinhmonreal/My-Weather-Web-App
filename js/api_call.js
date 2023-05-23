import {APIkey} from './secret.js'
export {makeAPICall};
//make API call to get weather data
async function makeAPICall(city) {
    let data;
    const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey}`);
    if(res.status == 200){
        data = await res.json();
        if (data[0] != undefined && data[0].lat != undefined && data[0].lon != undefined){
            const res2 = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=${APIkey}`);
            data = await res2.json();
            return data;
        }else{
            document.getElementsByClassName('city-name') .innerHTML = "Cannot get weather data!";
            alert("Cannot get weather data!")
        }
    }else{
        document.getElementsByClassName('city-name') .innerHTML = "Cannot get weather data!";
        alert("Cannot get lon and lat!")
    }
}
