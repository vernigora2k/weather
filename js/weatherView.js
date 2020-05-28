import { currentWeather, currentLocalTime, capitalizeFirstLetter, imgSrcChanger, newFavoriteCityAdd, iconHeartClassChange, favoriteCityDublicateChecker } from './controller.js';
import { mainScreenTemp, mainScreenWeatherDescription, mainScreenWeatherIcon, mainScreenTime, searchForm, searchFormInput, mainScreenActivatedCity, mainScreenIconHeart, favoriteLocationsList } from './UiElements.js';

// button.addEventListener('click', () => {
//     currentWeather()
// }) 

searchForm.addEventListener('submit', () => {
    console.log(searchFormInput)
    currentWeather(searchFormInput.value)
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
})

mainScreenIconHeart.addEventListener('click', () => {
    if (mainScreenActivatedCity.innerHTML) {
        // let newCity = mainScreenActivatedCity.innerHTML
        imgSrcChanger()
        iconHeartClassChange()
        // console.log(newCity)
        console.log(favoriteCityDublicateChecker(mainScreenActivatedCity.innerHTML))
        if (!favoriteCityDublicateChecker(mainScreenActivatedCity.innerHTML)) {
            newFavoriteCityAdd(mainScreenActivatedCity.innerHTML)
        }
    }
})


    


