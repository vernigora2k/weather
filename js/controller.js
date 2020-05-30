import {apiRequest} from './apiClient.js';
import { iconHeartImg, favoriteCitiesList } from './UiElements.js';

export function getWeather(city) {
    const config = {"method": "GET"}
    return apiRequest(city, config)
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

