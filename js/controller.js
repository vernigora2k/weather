import {apiRequest} from './apiClient.js';
import { iconHeartImg, favoriteLocationsList } from './UiElements.js';

export function getWeather(city) {
    const config = {"method": "GET"}
    return apiRequest(city, config)
}

export function getLocalTime(region) {
    return apiRequest(region)
}

export function addFavoriteCity (city) {
    let div = document.createElement('div')
    div.classList.add('favorite-city')
    let p = document.createElement('p')
    p.classList.add('favorite-city-item')
    p.textContent = city
    p.id = city.split(' ').join('')
    div.appendChild(p)
    favoriteLocationsList.append(div)
    localStorage.setItem(`city-${city}`, city)
}

export function removeFavoriteCity (city) {
    let favoriteCities = document.querySelectorAll('.favorite-city-item')
    favoriteCities.forEach(favoriteCity => {
        if (favoriteCity.innerHTML == city) {
            favoriteCity.parentNode.parentNode.removeChild(favoriteCity.parentNode)
            localStorage.removeItem(`city-${city}`)
        } 
    }) 
}

export function checkfavoriteCityDublicate(city) {
    const favoriteCityItem = document.querySelector(`#${city.split(' ').join('')}`)
    if(favoriteCityItem) {
        return (city === favoriteCityItem.textContent)
    }
}