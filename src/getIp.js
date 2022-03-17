const getIpLocation = async () => {
  const response = await fetch('https://ipapi.co/json/', { mode: 'cors' });
  const userLocationData = await response.json();
  const city = userLocationData.city;
  const regionCode = userLocationData.region_code;
  const latitude = userLocationData.latitude;
  const longitude = userLocationData.longitude;
  const timezone = userLocationData.timezone.replace('/', '%2F');
  return { city, regionCode, latitude, longitude, timezone };
};
