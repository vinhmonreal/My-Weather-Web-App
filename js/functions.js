export {getDateTime, changeBackGround,isDarkOrLight }
// num passed in is in US Central Time. Add timezone offset to get Local Time
function getDateTime(num, timezoneOffset){
    num += parseInt(timezoneOffset) + 18000;
    let gmt = timezoneOffset / 3600;
    let year = Math.floor(num / 31557600) + 1970;
    let month = Math.ceil((num % 31557600) / 2629800);
    let day = Math.ceil((num % 31557600) / 86400);
    let hour = Math.ceil(((num % 31557600) % 86400) / 3600);
    let second = Math.ceil(((((num % 31557600) % 86400) % 3600) % 60));
    let minute = Math.ceil((((num % 31557600) % 86400) % 3600) / 60);
    let date_ = new Date(year, 0, day, hour, minute, second);
    date_ = date_.toString().slice(0, 24) + ' GMT' + gmt;   
    let amPm, hhmm
    if (parseInt(hour) > 12){
        amPm = parseInt(hour) - 12 + ' PM';
        minute >9 ? hhmm = parseInt(hour) - 12 + ':' + minute +  ' PM' : hhmm = parseInt(hour) - 12 + ':0' + minute + ' PM';
    }else{
        amPm = parseInt(hour) + ' AM';
        minute >9 ? hhmm = parseInt(hour) + ':' + minute +  ' AM' : hhmm = parseInt(hour) + ':0' + minute + ' AM';
    }
    return {'date': date_, 'amPm': amPm, 'hhmm' : hhmm};
}



function changeBackGround (dark_light, currentWeatherId) {
    switch (dark_light) {
        case 'dark':
            switch (currentWeatherId) {
                case 200: case 201: case 202: case 210: case 211: case 212: case 221: case 230: case 231: case 232:
                   return "background-image: url('../static/images/2xx-dark.jpg')";
                case 300: case 301: case 302: case 310: case 311: case 312: case 313: case 314: case 321:
                    return "background-image: url('../static/images/3xx-dark.jpg')";
                case 500: case 501: case 502: case 503: case 504: case 511: case 520: case 521: case 522: case 531:
                    return "background-image: url('../static/images/5xx-dark.jpg')";
                case 600: case 601: case 602: case 611: case 612: case 613: case 615: case 616: case 620: case 621: case 622:
                    return "background-image: url('../static/images/6xx-dark.jpg')"
                case 701: case 711: case 721: case 731: case 741: case 751: case 761: case 762: case 771: case 781:
                    return "background-image: url('../static/images/7xx-dark.webp')";
                case 800:
                    return "background-image: url('../static/images/800-dark.png');"
                case 801: case 802: case 803: case 804:
                    return "background-image: url('../static/images/8xx-dark.jpg');"
            }
        case 'light':
            switch (currentWeatherId) {
                case 200: case 201: case 202: case 210: case 211: case 212: case 221: case 230: case 231: case 232:
                    return "background-image: url('../static/images/2xx-light.webp');"
                case 300: case 301: case 302: case 310: case 311: case 312: case 313: case 314: case 321:
                    return "background-image: url('../static/images/3xx-light.jpg');"
                case 500: case 501: case 502: case 503: case 504: case 511: case 520: case 521: case 522: case 531:
                    return "background-image: url('../static/images/5xx-light.jpg');"
                case 600: case 601: case 602: case 611: case 612: case 613: case 615: case 616: case 620: case 621: case 622:
                    return "background-image: url('../static/images/6xx-light.webp');"
                case 701: case 711: case 721: case 731: case 741: case 751: case 761: case 762: case 771: case 781:
                    return "background-image: url('../static/images/7xx-light.avif');"
                case 800:
                    return "background-image: url('../static/images/800-light.avif');"
                case 801: case 802: case 803: case 804:
                    return "background-image: url('../static/images/8xx-light.jpg');"
            }
    }
}


function isDarkOrLight(sunrise0,sunset0,sunrise1,sunset1, currentTime){
    sunrise0 = parseInt(sunrise0)
    sunset0 = parseInt(sunset0)
    sunrise1 = parseInt(sunrise1)
    sunset1 = parseInt(sunset1)
    if(currentTime < sunrise0){return 'dark'}
    else if( currentTime > sunrise0 && currentTime < sunset0){return 'light'}
    else if(currentTime > sunset0 && currentTime < sunrise1){return 'dark'}
    else if(currentTime > sunrise1 && currentTime < sunset1){return 'light'}
    console.log(isItDark)
}