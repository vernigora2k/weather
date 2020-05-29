import { getWeather, getLocalTime, imgSrcChanger, newFavoriteCityAdd, checkfavoriteCityDublicate, newFavoriteCityRemove } from './controller.js';
import { mainScreenTemp, mainScreenWeatherDescription, mainScreenWeatherIcon, mainScreenTime, searchForm, searchFormInput, mainScreenActivatedCity, favoriteLocationsList, iconHeartImg } from './UiElements.js';

searchForm.addEventListener('submit', () => {
   showCurrentWeather() 
})
// searchForm.addEventListener('submit', showCurrentWeather)

iconHeartImg.addEventListener('click', () => {
    const isActiveCityExist = mainScreenActivatedCity.textContent;
    if (!isActiveCityExist) {
        return
    }
    imgSrcChanger()
    if (!checkfavoriteCityDublicate(isActiveCityExist)) {
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