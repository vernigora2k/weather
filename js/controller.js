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

export function iconHeartClassChange() {
    if(!iconHeartImg.classList.contains('active')) {
        iconHeartImg.classList.add('active')
    } else {
        iconHeartImg.classList.remove('active')
    }
}

export function newFavoriteCityAdd (newCity) {
    let newCityItem = document.createElement('div')
    newCityItem.classList.add('favorite-city')
    newCityItem.innerHTML = `<p class="favorite-city-item-p" id="${newCity.split(' ').join('')}">${newCity}</p>`
    favoriteLocationsList.append(newCityItem)
    localStorage.setItem(`city-${newCity}`, newCity)
}

export function newFavoriteCityRemove (newCity) {
    let favoriteCityItemP = document.querySelectorAll('.favorite-city-item-p')
    favoriteCityItemP.forEach(city => {
        if (city.innerHTML == newCity) {
            city.parentNode.parentNode.removeChild(city.parentNode)
            localStorage.removeItem(`city-${newCity}`)
        }  
    }) 
}

export function checkfavoriteCityDublicate(city) {
    const favoriteCityItem = document.querySelector(`#${city.split(' ').join('')}`)
    if(favoriteCityItem) {
        return (city === favoriteCityItem.textContent)
    }
}