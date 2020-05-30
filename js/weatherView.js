import { getWeather, getLocalTime, addFavoriteCity, checkfavoriteCityDublicate, removeFavoriteCity, chooseFavoriteCity} from './controller.js';
import { mainScreenTemp, mainScreenWeatherDescription, mainScreenWeatherIcon, mainScreenTime, searchForm, searchFormInput, mainScreenActivatedCity, iconHeartImg, favoriteCitiesList } from './UiElements.js';

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

favoriteCitiesList.addEventListener('click', chooseFavoriteCity)

function showWeather(city=searchFormInput.value) {
    getWeather(city)
    .then(response => {
        const data = response.data[0]
        const {temp, weather: {description, icon}, timezone} = data
        mainScreenTemp.textContent = Math.round(temp)
        mainScreenWeatherDescription.textContent = description
        mainScreenWeatherIcon.src = `../src/img/weather-icons/${icon}.png`
        mainScreenActivatedCity.textContent = searchFormInput.value
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