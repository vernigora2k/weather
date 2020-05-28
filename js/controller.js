import {apiRequest} from './apiClient.js';
import { iconHeartImg, favoriteLocationsList } from './UiElements.js';

//currentWeather('Kyiv')

export function currentWeather(city) {
    const url = `units=M&city=${city}&key=8a42731f459a4057aef00d0a99c45c5a`
    const config = {"method": "GET"}
    return apiRequest(url, config)
        .then()
        .catch(alert)
}

export function currentLocalTime(region) {
    return apiRequest(region)
        .then()
        .catch(alert)
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

imgSrcChanger.i = 0;
imgSrcChanger.images = ['../src/img/heart-white.png', '../src/img/heart-black.png'];
export function imgSrcChanger(status='inactive') {
    if (status == 'active') {
        iconHeartImg.src = '../src/img/heart-black.png'
    } else {
        console.log('Atata2')
        imgSrcChanger.i++
        if (imgSrcChanger.i > 1) {
            imgSrcChanger.i = 0
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
    newCityItem.classList.add('favorite-city-item')
    newCityItem.innerHTML = `<p class="favorite-city-item-p" id="${newCity}">${newCity}</p>`
    favoriteLocationsList.append(newCityItem)
}

export function newFavoriteCityRemove (newCity) {
    let favoriteCityItemP = document.querySelectorAll('.favorite-city-item-p')
    favoriteCityItemP.forEach(city => {
        if (city.innerHTML == newCity) {
            city.parentNode.parentNode.removeChild(city.parentNode)
        }  
    }) 
}

export function favoriteCityDublicateChecker(newCity) {
    let favoriteCityItemP = document.querySelector(`#${newCity}`)
    if(favoriteCityItemP) {
        return (newCity == favoriteCityItemP.innerHTML)
    }
}