import './style.css';

import { fetchIpLocation } from './fetchIpData';
import { createLocationData } from './locationDataFactory';
import { fetchWeatherData } from './fetchWeatherData';
import { createWeatherReport } from './weatherDataFactory';
import { renderText } from './renderText';
import { renderForecast } from './renderforecast';
import { fetchGeoData } from './fetchGeoData';
import { displayTemp } from './displayTemp';

const tempToggleEl = document.querySelector('div#degree-toggle input[type="checkbox"]');
const storage = window.localStorage;
if (storage.getItem('degree')) {
  const degreePref = storage.getItem('degree');
  const parsedPref = JSON.parse(degreePref);
  tempToggleEl.checked = parsedPref;
} else {
  storage.setItem('degree', true);
}

(async () => {
  const fetchedIpData = await fetchIpLocation();
  const userLocation = await createLocationData(fetchedIpData);
  let fetchedWeatherData = await fetchWeatherData(userLocation);
  let weatherReport = await createWeatherReport(fetchedWeatherData);

  renderText('h1#location', `${userLocation.city}, ${userLocation.region}`);

  renderText('h2#current-weather', `Currently ${weatherReport.currentWeatherIs}`);

  displayTemp(weatherReport.currentTemp, 'h2#current-temp', 'hero-degree');
  displayTemp(weatherReport.day0.high, 'div.hero-range p.high', 'degree');
  displayTemp(weatherReport.day0.low, 'div.hero-range p.low', 'degree');

  const weeklyForecast = [
    weatherReport.day0,
    weatherReport.day1,
    weatherReport.day2,
    weatherReport.day3,
    weatherReport.day4,
    weatherReport.day5,
    weatherReport.day6
  ];

  weeklyForecast.forEach(day => {
    const index = weeklyForecast.indexOf(day);
    renderForecast(day, index);
  });

  const searchButtonEl = document.querySelector('button#search');
  searchButtonEl.addEventListener('click', async () => {
    const searchValue = document.querySelector('input#search').value;
    const fetchedSearchData = await fetchGeoData(searchValue);
    const locationData = await createLocationData(fetchedSearchData.results[0]);
    fetchedWeatherData = await fetchWeatherData(locationData);
    weatherReport = await createWeatherReport(fetchedWeatherData);

    weeklyForecast.length = 0;
    weeklyForecast.push(
      weatherReport.day0,
      weatherReport.day1,
      weatherReport.day2,
      weatherReport.day3,
      weatherReport.day4,
      weatherReport.day5,
      weatherReport.day6
    );

    renderText('h1#location', `${locationData.city}, ${locationData.region}`);

    renderText('h2#current-weather', `Currently ${weatherReport.currentWeatherIs}`);

    displayTemp(weatherReport.currentTemp, 'h2#current-temp', 'hero-degree');
    displayTemp(weatherReport.day0.high, 'div.hero-range p.high', 'degree');
    displayTemp(weatherReport.day0.low, 'div.hero-range p.low', 'degree');

    weeklyForecast.forEach(day => {
      console.log(day);
      const index = weeklyForecast.indexOf(day);
      renderText(`div.date h1[data-id="${index}"]`, `${day.day}`);
      renderText(`div.date p[data-id="${index}"]`, `${day.date}`);
      renderText(`div.weather h1[data-id="${index}"]`, `${day.weatherIs}`);
      displayTemp(day.high, `p.high[data-id="${index}"]`);
      displayTemp(day.low, `p.low[data-id="${index}"]`);
    });
  });

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

  console.log(weatherReport);
})();
