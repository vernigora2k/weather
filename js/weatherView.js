import { getCurrentWeather, currentLocalTime, capitalizeFirstLetter, imgSrcChanger, newFavoriteCityAdd, iconHeartClassChange, favoriteCityDublicateChecker, newFavoriteCityRemove } from './controller.js';
import { mainScreenTemp, mainScreenWeatherDescription, mainScreenWeatherIcon, mainScreenTime, searchForm, searchFormInput, mainScreenActivatedCity, mainScreenIconHeart, favoriteLocationsList, iconHeartImg } from './UiElements.js';

searchForm.addEventListener('submit', () => {
   showCurrentWeather() 
})
// searchForm.addEventListener('submit', showCurrentWeather)

mainScreenIconHeart.addEventListener('click', () => {
    const isActiveCityExist = mainScreenActivatedCity.textContent;
    if (!isActiveCityExist) {
        return
    }
    imgSrcChanger()
    iconHeartClassChange()
    if (!favoriteCityDublicateChecker(isActiveCityExist)) {
        newFavoriteCityAdd(isActiveCityExist)
    } else {
        newFavoriteCityRemove(isActiveCityExist)
    }
})

//TODO:
let favoriteCities = []
Object.keys(localStorage).forEach(function(key){
    console.log(localStorage.getItem(key));
    if(key.slice(0,5) == 'city-')
    favoriteCities.push(localStorage.getItem(key))
 });
console.log(favoriteCities)
favoriteCities.forEach(city => {
    newFavoriteCityAdd(city)
})
//  searchFormInput.value = 'kyiv'
//  showCurrentWeather('kyiv')


function showCurrentWeather(city=searchFormInput.value) {
    getCurrentWeather(city)
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
        mainScreenActivatedCity.innerHTML = `${capitalizeFirstLetter(searchFormInput.value)}`
    })
    .catch(alert)
    .then(() => {
        if(favoriteCityDublicateChecker(mainScreenActivatedCity.innerHTML)) {
            imgSrcChanger('active')
        } else {
            iconHeartImg.src = '../src/img/heart-white.png'
        }
    })
}