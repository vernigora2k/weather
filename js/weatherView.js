import { getWeather, getLocalTime, addFavoriteCity, checkfavoriteCityDublicate, removeFavoriteCity, showTargetCityWeather, showForecastPlate} from './controller.js';
import { mainScreenTemp, mainScreenWeatherDescription, mainScreenWeatherIcon, mainScreenTime, searchForm, searchFormInput, mainScreenActivatedCity, iconHeartImg, favoriteCitiesList, buttonDetails, buttonNow, buttonForecast, mainScreenDetails, mainMediaScreen, mainScreenMediaIcon, windDir, windSpeed, pressure, sunriseProp, sunsetProp, radiation, mainScreenTempIcon, mainScreenWeatherForecast, mainMedia, mainMediaMenu, buttonForecastSeven, buttonForecastTwoWeeks} from './UiElements.js';

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


favoriteCitiesList.addEventListener('click', showTargetCityWeather)

buttonNow.addEventListener('click',() => {
    buttonNow.classList.add('button-active')
    buttonDetails.classList.remove('button-active')
    buttonForecast.classList.remove('button-active')
    mainScreenDetails.classList.add('hidden')
    mainMediaScreen.classList.remove('media-screen--details')
    mainScreenMediaIcon.classList.remove('media__icon--active')
    mainScreenWeatherIcon.classList.remove('media__weather-icon--active')
    mainScreenWeatherForecast.classList.add('hidden')
    mainMediaScreen.classList.remove('hidden')
    mainMedia.classList.remove('row-main__media-active')
    mainMediaMenu.classList.add('media-menu--active')
})

buttonDetails.addEventListener('click', () => {
    buttonNow.classList.remove('button-active')
    buttonForecast.classList.remove('button-active')
    buttonDetails.classList.add('button-active')
    mainScreenDetails.classList.remove('hidden')
    mainMediaScreen.classList.add('media-screen--details')
    mainScreenMediaIcon.classList.add('media__icon--active')
    mainScreenWeatherIcon.classList.add('media__weather-icon--active')
    mainScreenWeatherForecast.classList.add('hidden')
    mainMediaScreen.classList.remove('hidden')
    mainMedia.classList.remove('row-main__media-active')
    mainMediaMenu.classList.add('media-menu--active')
})

buttonForecast.addEventListener('click', () => {
    buttonForecast.classList.add('button-active')
    buttonNow.classList.remove('button-active')
    buttonDetails.classList.remove('button-active')
    mainScreenWeatherForecast.classList.remove('hidden')
    mainMediaScreen.classList.add('hidden')
    mainMedia.classList.add('row-main__media-active')
    mainMediaMenu.classList.remove('media-menu--active')
    showForecast()
})

buttonForecastSeven.addEventListener('click', () => {
    buttonForecastTwoWeeks.classList.remove('forecast--active')
    buttonForecastSeven.classList.add('forecast--active')
    showForecast(searchFormInput.value, 7)
})

buttonForecastTwoWeeks.addEventListener('click', () => {
    buttonForecastSeven.classList.remove('forecast--active')
    buttonForecastTwoWeeks.classList.add('forecast--active')
    showForecast(searchFormInput.value, 14)
})

export function showForecast(city=searchFormInput.value, days=7) {
    getWeather(city, 'forecast')
    .then(response => {
        if(buttonForecastSeven.classList.contains('forecast--active')) {
            showForecastPlate(response, days)
        } else {
            showForecastPlate(response, 14)
        }
    })
    .catch(alert)

}

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