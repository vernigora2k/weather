import { currentWeather } from './controller.js';
import { mainScreenTemp } from './UiElements.js';

// button.addEventListener('click', () => {
//     currentWeather()
// }) 
console.log(currentWeather('New York'))
    
mainScreenTemp.innerHTML = '15' + '<sup>0</sup>';
