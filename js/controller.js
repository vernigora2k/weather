import {apiRequest} from './apiClient.js';
import { iconHeartImg } from './UiElements.js';

//currentWeather('Kyiv')

export function currentWeather(city) {
    const url = `units=M&city=${city}&key=8a42731f459a4057aef00d0a99c45c5a`
    const config = {"method": "GET"}
    return apiRequest(url, config)
        .then(
            // responseObj => {
            // responseObj.data[0]
            // console.log(responseObj)
            // console.log(responseObj.data[0])
            // console.log(responseObj.data[0].temp)}
            )
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
export function imgSrcChanger() {
    imgSrcChanger.i++
    if (imgSrcChanger.i > 1) {
        imgSrcChanger.i = 0
    }
    iconHeartImg.src=imgSrcChanger.images[imgSrcChanger.i]
}