import { createLocationData } from './locationDataFactory';
import { fetchWeatherData } from './fetchWeatherData';
import { createWeatherReport } from './weatherDataFactory';
import { renderText } from './renderText';
import { renderForecast } from './renderforecast';
import { displayTemp } from './displayTemp';

const displayWeather = async (geoIPFunc, searchValue) => {
  // searchValue can be left undefined if using IpApi function
  const fetchedLocationData = await geoIPFunc(searchValue);
  const locationData = await createLocationData(fetchedLocationData);
  const fetchedWeatherData = await fetchWeatherData(locationData);
  const weatherReport = await createWeatherReport(fetchedWeatherData);

  renderText('h1#location', `${locationData.city}, ${locationData.region}`);

  renderText('h2#current-weather', `Currently ${weatherReport.currentWeatherIs}`);

  displayTemp(weatherReport.currentTemp, 'h2#current-temp', 'hero-degree');
  displayTemp(weatherReport.day0.high, 'div.hero-range p.high', 'degree');
  displayTemp(weatherReport.day0.low, 'div.hero-range p.low', 'degree');

  const weeklyForecast = [];

  if (weeklyForecast.length !== 0) {
    weeklyForecast.length = 0;
  }

  weeklyForecast.push(
    weatherReport.day0,
    weatherReport.day1,
    weatherReport.day2,
    weatherReport.day3,
    weatherReport.day4,
    weatherReport.day5,
    weatherReport.day6
  );

  // IpApi is only used when site first loaded
  const isIpAPI = 'city' in fetchedLocationData === true;
  if (isIpAPI) {
    weeklyForecast.forEach(day => {
      const index = weeklyForecast.indexOf(day);
      renderForecast(day, index);
    });
  } else {
    weeklyForecast.forEach(day => {
      const index = weeklyForecast.indexOf(day);
      renderText(`div.date h1[data-id="${index}"]`, `${day.day}`);
      renderText(`div.date p[data-id="${index}"]`, `${day.date}`);
      renderText(`div.weather h1[data-id="${index}"]`, `${day.weatherIs}`);
      displayTemp(day.high, `p.high[data-id="${index}"]`);
      displayTemp(day.low, `p.low[data-id="${index}"]`);
    });
  }

  return [weatherReport, weeklyForecast];
};

export { displayWeather };
