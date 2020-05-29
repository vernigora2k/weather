import {apiRequest} from './apiClient.js';
import { iconHeartImg, favoriteLocationsList } from './UiElements.js';

export function getWeather(city) {
    const config = {"method": "GET"}
    return apiRequest(city, config)
}

export function getLocalTime(region) {
    return apiRequest(region)
}

imgSrcChanger.i = 0;
imgSrcChanger.images = ['../src/img/heart-white.png', '../src/img/heart-black.png'];
export function imgSrcChanger(status='inactive') {
    if (status == 'active') {
        iconHeartImg.src = '../src/img/heart-black.png'
    } else {
        imgSrcChanger.i++
        if (imgSrcChanger.i > 1) {
            imgSrcChanger.i = 0
        }
        if (iconHeartImg.src.slice(-24) == imgSrcChanger.images[imgSrcChanger.i].slice(2)){
            imgSrcChanger.images.reverse()
        }
        iconHeartImg.src = imgSrcChanger.images[imgSrcChanger.i]
    }
}

export function addFavoriteCity (city) {
    let newCity = document.createElement('div')
    newCity.classList.add('favorite-city')
    newCity.innerHTML = `<p class="favorite-city-item" id="${city.split(' ').join('')}">${city}</p>`
    favoriteLocationsList.append(newCity)
    localStorage.setItem(`city-${city}`, city)
}

export function removeFavoriteCity (city) {
    let favoriteCityItem = document.querySelectorAll('.favorite-city-item')
    favoriteCityItem.forEach(cityInList => {
        if (cityInList.innerHTML == city) {
            cityInList.parentNode.parentNode.removeChild(cityInList.parentNode)
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