import { currentWeather, currentLocalTime } from './controller.js';
import { mainScreenTemp, mainScreenWeatherDescription, mainScreenWeatherIcon, mainScreenTime } from './UiElements.js';

// button.addEventListener('click', () => {
//     currentWeather()
// }) 
currentWeather('Tokio')
    .then(data => {
        console.log(data.data[0])
        mainScreenTemp.innerHTML = Math.round(data.data[0].temp) + '<sup>0</sup>'
        mainScreenWeatherDescription.innerHTML = data.data[0].weather.description
        mainScreenWeatherIcon.innerHTML = `<img src=../src/img/weather-icons/${data.data[0].weather.icon}.png width="140px">`
        currentLocalTime(data.data[0].timezone)
            .then(data => {
                mainScreenTime.innerHTML = data.datetime.slice(11,16)
            })
            .catch(alert)
    
    })
    .catch(alert)
    


