import { getWeather, getLocalTime, addFavoriteCity, checkfavoriteCityDublicate, removeFavoriteCity } from './controller.js';
import { mainScreenTemp, mainScreenWeatherDescription, mainScreenWeatherIcon, mainScreenTime, searchForm, searchFormInput, mainScreenActivatedCity, iconHeartImg } from './UiElements.js';

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

//TODO:=======================================
// let favoriteCities = []
// Object.keys(localStorage).forEach(function(key){
//     console.log(localStorage.getItem(key));
//     if(key.slice(0,5) == 'city-')
//     favoriteCities.push(localStorage.getItem(key))
//  });
// console.log(favoriteCities)
// favoriteCities.forEach(city => {
//     addFavoriteCity(city)
// })

let favoriteCities = []
localStorage.getItem

//  searchFormInput.value = 'kyiv'
//  showCurrentWeather('kyiv')
//============================================

function showWeather(city=searchFormInput.value) {
    getWeather(city)
    .then(response => {
        console.log(response.data[0])
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