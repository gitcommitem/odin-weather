import './style.css';

import { fetchIpLocation } from './fetchIpData';
import { fetchGeoData } from './fetchGeoData';
import { displayWeather } from './displayWeather';
import { displayTemp } from './displayTemp';
import { toggleLoading } from './toggleLoading';

const tempToggleEl = document.querySelector('div#degree-toggle input[type="checkbox"]');
const storage = window.localStorage;
// Check if user has preference for Celsius or Fahrenheit
if (storage.getItem('degree')) {
  const degreePref = storage.getItem('degree');
  const parsedPref = JSON.parse(degreePref);
  tempToggleEl.checked = parsedPref;
} else {
  // Default to Fahrenheit if no preference found
  storage.setItem('degree', true);
}

(async () => {
  // On load, display local weather based on IP address
  let [weatherReport, weeklyForecast] = await displayWeather(fetchIpLocation);

  if (weeklyForecast.length !== 0) {
    toggleLoading();
  }

  // Display weather for searched location
  const searchInputEl = document.querySelector('input#search');
  searchInputEl.addEventListener('keydown', async (key) => {
    if (key.key === 'Enter') {
      const searchValue = document.querySelector('input#search').value;

      if (searchValue === '' || searchValue.length === 1) {
        return;
      }

      toggleLoading();
      [weatherReport, weeklyForecast] = await displayWeather(fetchGeoData, searchValue);
      document.querySelector('input#search').value = '';
      if (weeklyForecast.length !== 0) {
        toggleLoading();
      }
    }
  });

  // Toggle temperature display between Celsius and Fahrenheit
  tempToggleEl.addEventListener('click', () => {
    // Store user preference for degree
    tempToggleEl.checked === false ? storage.setItem('degree', false) : storage.setItem('degree', true);

    // Convert and display the temperatures for current weather
    displayTemp(weatherReport.currentTemp, 'h2#current-temp', 'hero-degree');
    displayTemp(weatherReport.day0.high, 'div.hero-range p.high', 'degree');
    displayTemp(weatherReport.day0.low, 'div.hero-range p.low', 'degree');

    // Convert and display the temperature for weekly forecast
    weeklyForecast.forEach(day => {
      const index = weeklyForecast.indexOf(day);
      displayTemp(day.high, `p.high[data-id="${index}"]`);
      displayTemp(day.low, `p.low[data-id="${index}"]`);
    });
  });
})();
