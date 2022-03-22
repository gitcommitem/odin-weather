import './style.css';

import { fetchIpLocation } from './fetchIpData';
import { createLocationData } from './locationDataFactory';
import { fetchWeatherData } from './fetchWeatherData';
import { createWeatherReport } from './weatherDataFactory';
import { renderText } from './renderText';
import { renderTemp } from './renderTemp';
import { renderForecast } from './renderforecast';

(async () => {
  const fetchedIpData = await fetchIpLocation();
  const userLocation = await createLocationData(fetchedIpData);
  const fetchedWeatherData = await fetchWeatherData(userLocation);
  const weatherReport = await createWeatherReport(fetchedWeatherData);
  renderText('h1#location', `${userLocation.city}, ${userLocation.region}`);
  renderTemp('h2#current-temp', weatherReport.currentTemp, 'hero-degree', '°F');
  renderText('h2#current-weather', `Currently ${weatherReport.currentWeatherIs}`);
  renderTemp('div.hero-range p.high', weatherReport.day0.high, 'degree', '°F');
  renderTemp('div.hero-range p.low', weatherReport.day0.low, 'degree', '°F');

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
    renderForecast(day);
  });

  console.log(weatherReport);
})();
