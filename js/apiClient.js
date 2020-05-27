import { URLweather, URLtime } from "./config.js";

export function apiRequest(urlParam, config) {
    let url;
    config ?  url = URLweather + urlParam : 
              url = URLtime + urlParam
   
   return fetch(url, config)
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
    });
}

    