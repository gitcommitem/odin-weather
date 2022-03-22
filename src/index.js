import './style.css';

import { fetchIpLocation } from './fetchIpData';
import { createLocationData } from './locationDataFactory';
import { fetchWeatherData } from './fetchWeatherData';
import { createWeatherReport } from './weatherDataFactory';
import { renderText } from './renderText';
import { renderTemp } from './renderTemp';
import { renderForecast } from './renderforecast';
import { convertTemp } from './convertTemp';

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
  const fetchedWeatherData = await fetchWeatherData(userLocation);
  const weatherReport = await createWeatherReport(fetchedWeatherData);

  renderText('h1#location', `${userLocation.city}, ${userLocation.region}`);

  const convertedCurrentTemp = convertTemp(weatherReport.currentTemp);
  renderTemp('h2#current-temp', convertedCurrentTemp, 'hero-degree');

  renderText('h2#current-weather', `Currently ${weatherReport.currentWeatherIs}`);

  const convertedHighTemp = convertTemp(weatherReport.day0.high);
  renderTemp('div.hero-range p.high', convertedHighTemp, 'degree');

  const convertedLowTemp = convertTemp(weatherReport.day0.low);
  renderTemp('div.hero-range p.low', convertedLowTemp, 'degree');

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

  tempToggleEl.addEventListener('click', () => {
    // Store user preference for degree
    tempToggleEl.checked === false ? storage.setItem('degree', false) : storage.setItem('degree', true);
    console.log(storage);
    // Convert and display the temperatures for current weather
    const convertedCurrentTemp = convertTemp(weatherReport.currentTemp);
    renderTemp('h2#current-temp', convertedCurrentTemp, 'hero-degree');

    const convertedHighTemp = convertTemp(weatherReport.day0.high);
    renderTemp('div.hero-range p.high', convertedHighTemp, 'degree');

    const convertedLowTemp = convertTemp(weatherReport.day0.low);
    renderTemp('div.hero-range p.low', convertedLowTemp, 'degree');

    // Convert and display the temperature for weekly forecast
    weeklyForecast.forEach(day => {
      const index = weeklyForecast.indexOf(day);
      const convertedHighTemp = convertTemp(day.high);
      renderTemp(`p.high[data-id="${index}"]`, convertedHighTemp);
      const convertedLowTemp = convertTemp(day.low);
      renderTemp(`p.low[data-id="${index}"]`, convertedLowTemp);
    });
  });

  console.log(weatherReport);
})();
