import './style.css';

import { fetchIpLocation } from './fetchIpData';
import { createLocationData } from './locationDataFactory';
import { fetchWeatherData } from './fetchWeatherData';
import { createWeatherReport } from './weatherDataFactory';
import { renderText } from './renderText';
import { renderTemp } from './renderTemp';

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
  console.log(weatherReport);
})();
