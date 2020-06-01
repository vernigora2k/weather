import { apiRequest } from './apiClient.js';
import { favoriteCitiesList, searchFormInput, forecastDesk } from './UiElements.js';
import {showWeather} from './weatherView.js';

export function getWeather(city, forecast) {
    const config = {"method": "GET"}
    if(forecast) {
        return apiRequest(city, config, forecast)
    } else {
        return apiRequest(city, config)
    }
}

export function getLocalTime(region) {
    return apiRequest(region)
}

export function addFavoriteCity(city) {
    let div = document.createElement('div')
    div.classList.add('favorite-city')
    let p = document.createElement('p')
    p.classList.add('favorite-city-item')
    p.textContent = city
    p.id = city.split(' ').join('')
    div.appendChild(p)
    favoriteCitiesList.append(div)
    addToStorage(city)
}

export function removeFavoriteCity(city) {
    let favoriteCities = document.querySelectorAll('.favorite-city-item')
    favoriteCities.forEach(favoriteCity => {
        if (favoriteCity.innerHTML == city) {
            favoriteCity.parentNode.parentNode.removeChild(favoriteCity.parentNode)
            removeFromStorage(city)

        } 
    }) 
}

function addToStorage(city) {
    let favoriteCities = JSON.parse(localStorage.getItem('favoriteCities'))
    if (favoriteCities){
        favoriteCities = favoriteCities.filter(elem => elem != city) //delite dublicate
        favoriteCities.push(city)
    } else {
        favoriteCities = []
        favoriteCities.push(city)
    }
    localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities))
}

function removeFromStorage(city) {
    let favoriteCities = JSON.parse(localStorage.getItem('favoriteCities'))
    favoriteCities.forEach((elem,i) => {
        if (elem == city) {
            favoriteCities.splice(i,1)
        }
    })
    localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities))
}

export function checkfavoriteCityDublicate(city) {
    const favoriteCity = document.querySelector(`#${city.split(' ').join('')}`)
    if(favoriteCity) {
        return (city === favoriteCity.textContent)
    }
}

export function showTargetCityWeather() {
    let favoriteCities = document.querySelectorAll('.favorite-city')
    favoriteCities.forEach(city => city.classList.remove('favorite-city--active'))
    let cityParentTag = event.target.closest('.favorite-city')
    cityParentTag.classList.add('favorite-city--active')
    let city = event.target.closest('div').childNodes[0].textContent
    searchFormInput.value = city
    showWeather(city)
}

export function showForecastPlate(response, days) {
    console.log(response)
    const {city_name, timezone, data} = response
    console.log(response.data.length)
    forecastDesk.innerHTML = ''
    
    data.forEach((forecastDay, i) => {
        if(i<days) {
            const {datetime, high_temp, low_temp, pop, weather: {description}} = forecastDay
            console.log(datetime, high_temp, low_temp, pop, description)
            let div = document.createElement('div')
            div.classList.add('forecastDay')
            let dateTime = document.createElement('p')
            dateTime.classList.add('datetime')
            dateTime.textContent = datetime
            let highTemp = document.createElement('p')
            highTemp.classList.add('hightemp')
            highTemp.textContent = 'max temp: ' + Math.round(high_temp)
            let lowTemp = document.createElement('p')
            lowTemp.classList.add('lowtemp')
            lowTemp.textContent = 'low temp: ' + Math.round(low_temp)
            let Pop = document.createElement('p')
            Pop.classList.add('pop')
            Pop.textContent = 'Prob.of.Prec. : ' + pop
            let Description = document.createElement('p')
            Description.classList.add('forecastDescription')
            Description.textContent = description
            div.appendChild(dateTime)
            div.appendChild(highTemp)
            div.appendChild(lowTemp)
            div.appendChild(Pop)
            div.appendChild(Description)
            forecastDesk.append(div)
        }
    })
}