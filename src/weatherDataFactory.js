const createWeatherReport = async (fetchedWeatherData) => {
  await fetchedWeatherData;
  const fetchedCurrentWeather = fetchedWeatherData.current_weather;

  const roundTemp = (temp) => {
    return Math.round(temp);
  };

  const weatherCode = {
    0: 'clear skies',
    1: 'mainly clear',
    2: 'partly cloudy',
    3: 'overcast',
    45: 'fog',
    48: 'freezing fog',
    51: 'light drizzle',
    53: 'moderate drizzle',
    55: 'dense drizzle',
    56: 'light freezing drizzle',
    57: 'dense freezing drizzle',
    61: 'slight rain',
    63: 'moderate rain',
    65: 'heavy rain',
    66: 'light freezing rain',
    67: 'heavy freezing rain',
    71: 'slight snow',
    73: 'moderate snow',
    75: 'heavy snow',
    77: 'snow grains',
    80: 'slight rain shower',
    81: 'moderate rain shower',
    82: 'violent rain shower',
    85: 'slight snow shower',
    86: 'heavy snow shower',
    95: 'thunderstorm',
    96: 'thunderstorm with slight hail',
    99: 'thunderstorm with heavy hail'
  };

  const currentTemp = roundTemp(fetchedCurrentWeather.temperature);
  const currentWeatherIs = weatherCode[fetchedCurrentWeather.weathercode];

  const fetchedWeekForecast = fetchedWeatherData.daily;

  const pullDailyWeatherData = (index) => {
    const date = fetchedWeekForecast.time[index];
    const day = date.toLocaleString('default', { weekday: 'short' });
    const high = roundTemp(fetchedWeekForecast.temperature_2m_max[index]);
    const low = roundTemp(fetchedWeekForecast.temperature_2m_min[index]);
    const weatherIs = weatherCode[fetchedWeekForecast.weathercode[index]];
    return { date, day, high, low, weatherIs };
  };

  const day0 = pullDailyWeatherData(0);
  const day1 = pullDailyWeatherData(1);
  const day2 = pullDailyWeatherData(2);
  const day3 = pullDailyWeatherData(3);
  const day4 = pullDailyWeatherData(4);
  const day5 = pullDailyWeatherData(5);
  const day6 = pullDailyWeatherData(6);

  return { currentTemp, currentWeatherIs, day0, day1, day2, day3, day4, day5, day6 };
};

export { createWeatherReport };
