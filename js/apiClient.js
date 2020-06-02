import { URLweather, URLtime, URLforecast} from "./config.js";
import { errorHandler } from "./controller.js";

export function apiRequest(url, config, forecast) {
    let URL;
    if(config) {
        URL = URLweather + url
    } else {
        URL = URLtime + url
    } 
    if(forecast) {
        URL = URLforecast + url
    }
   return fetch(URL, config)
    .then(response => {
        return response.json()
    })
    .catch(errorHandler)
}

    