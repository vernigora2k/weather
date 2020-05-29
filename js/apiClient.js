import { URLweather, URLtime } from "./config.js";

export function apiRequest(url, config) {
    let URL;
    if(config) {
        URL = URLweather + url
    } else {
        URL = URLtime + url
    }
   return fetch(URL, config)
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
    });
}

    