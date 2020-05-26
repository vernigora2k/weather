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

    