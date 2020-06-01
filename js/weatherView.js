import { getWeather, getLocalTime, addFavoriteCity, checkfavoriteCityDublicate, removeFavoriteCity, showTargetCityWeather} from './controller.js';
import { mainScreenTemp, mainScreenWeatherDescription, mainScreenWeatherIcon, mainScreenTime, searchForm, searchFormInput, mainScreenActivatedCity, iconHeartImg, favoriteCitiesList, buttonDetails, buttonNow, buttonForecast, mainScreenDetails, mainMediaScreen, mainScreenMediaIcon, windDir, windSpeed, pressure, sunriseProp, sunsetProp, radiation } from './UiElements.js';

searchForm.addEventListener('submit', () => {
   showWeather() 
})
// searchForm.addEventListener('submit', showWeather)

iconHeartImg.addEventListener('click', () => {
    const isActiveCityExist = mainScreenActivatedCity.textContent;
    if (!isActiveCityExist) {
        return
    }
    if (iconHeartImg.src.slice(-24) == '/src/img/heart-white.png') {
        iconHeartImg.src = '../src/img/heart-black.png'
    } else {
        iconHeartImg.src = '../src/img/heart-white.png'
    }
    if (!checkfavoriteCityDublicate(isActiveCityExist)) {
        addFavoriteCity(isActiveCityExist)
    } else {
        removeFavoriteCity(isActiveCityExist)
    }
})

let favoriteCities = JSON.parse(localStorage.getItem('favoriteCities'))
if(favoriteCities) {   
    favoriteCities.forEach(city => {
        addFavoriteCity(city)
    });
}

searchFormInput.value = localStorage.getItem('lastWatchedCity')
showWeather(localStorage.getItem('lastWatchedCity'))

//TODO попробовать убрть функцию showTargetCityWeather и добавить ее колбеком
favoriteCitiesList.addEventListener('click', showTargetCityWeather)

buttonDetails.addEventListener('click', () => {
    buttonNow.classList.remove('button-active')
    buttonForecast.classList.remove('button-active')
    buttonDetails.classList.add('button-active')

    mainScreenDetails.classList.remove('hidden')
    mainMediaScreen.classList.add('media-screen--details')
    mainScreenMediaIcon.classList.add('media__icon--active')
    mainScreenWeatherIcon.classList.add('media__weather-icon--active')
    
})

export function showWeather(city=searchFormInput.value) {
    getWeather(city)
    .then(response => {
        const data = response.data[0]
        console.log(data)
        const {temp, weather: {description, icon}, timezone, wind_cdir_full, wind_spd, pres, sunrise, sunset, solar_rad} = data
        mainScreenTemp.textContent = Math.round(temp)
        mainScreenWeatherDescription.textContent = description
        mainScreenWeatherIcon.src = `../src/img/weather-icons/${icon}.png`
        mainScreenActivatedCity.textContent = searchFormInput.value
        windDir.textContent = wind_cdir_full 
        windSpeed.textContent = Math.round(wind_spd) + ' m/s'
        pressure.textContent = Math.round(pres) + ' mb'
        sunriseProp.textContent = sunrise
        sunsetProp.textContent = sunset
        radiation.textContent = Math.round(solar_rad) + ' W/m^2'
        getLocalTime(timezone)
            .then(response => {
                mainScreenTime.textContent = response.datetime.slice(11,16)
            })
            .catch(alert)
        localStorage.setItem('lastWatchedCity', city)
        })
    .then(() => {
        if(checkfavoriteCityDublicate(mainScreenActivatedCity.textContent)) {
            iconHeartImg.src = '../src/img/heart-black.png'
        } else {
            iconHeartImg.src = '../src/img/heart-white.png'
        }
    })
    .catch(alert)
}