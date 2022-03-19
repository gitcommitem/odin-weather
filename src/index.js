import './style.css';

import { fetchIpLocation } from './fetchIpData';
import { createLocationData } from './locationDataFactory';
import { fetchWeatherData } from './fetchWeatherData';
import { renderText } from './renderText';

(async () => {
  const fetchedIpData = await fetchIpLocation();
  const userLocation = await createLocationData(fetchedIpData);
  const weatherData = await fetchWeatherData(userLocation);
  renderText('h1#location', `${userLocation.city}, ${userLocation.region}`);
  console.log(userLocation);
})();
