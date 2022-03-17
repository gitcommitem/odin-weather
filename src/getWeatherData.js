const getWeatherData = async (latitude, longitude, timezone) => {
  await latitude;
  await longitude;
  await timezone;
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=${timezone}`, { mode: 'cors' });
  const weatherData = await response.json();
  return weatherData;
}
;
