import { URL } from "./config.js";

export function apiRequest(url, config) {
   return fetch(URL + url, config)
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
    });
}

function currentWeather() {
    const url = 'units=M&city=Kyiv&key=8a42731f459a4057aef00d0a99c45c5a'
    const config = {"method": "GET"}
    apiRequest(url, config)
        .then(responseObj => {
            console.log(responseObj)
            console.log(responseObj.data[0])
            console.log(responseObj.data[0].temp)
        })
}

console.log(currentWeather())
    