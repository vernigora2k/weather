import { currentWeather, currentLocalTime } from './controller.js';
import { mainScreenTemp, mainScreenWeatherDescription, mainScreenWeatherIcon, mainScreenTime } from './UiElements.js';

// button.addEventListener('click', () => {
//     currentWeather()
// }) 
currentWeather('Tokio')
    .then(data => {
        console.log(data.data[0])
        console.log(data.data[0].temp)
        mainScreenTemp.innerHTML = Math.round(data.data[0].temp) + '<sup>0</sup>'
        console.log(data.data[0].weather.description)
        console.log(mainScreenWeatherDescription)
        mainScreenWeatherDescription.innerHTML = data.data[0].weather.description
        mainScreenWeatherIcon.innerHTML = `<img src=../src/img/weather-icons/${data.data[0].weather.icon}.png width="140px">`
        mainScreenTime.innerHTML = `${currentLocalTime('Tokio').then()}`
    })
    .catch(alert)
    
currentLocalTime('America/Mexico_City')
    .then(data => {
        console.log(data.datetime.slice(11,16))
        return data.datetime.slice(11,16)
    })
    .catch(alert)

