const createLocationData = async (fetchedGeoData) => {
  await fetchedGeoData;

  let city = '';
  let region = '';
  let latitude = '';
  let longitude = '';
  let timezone = '';

  const isOpenMeteoAPI = 'results' in fetchedGeoData === true;
  if (isOpenMeteoAPI) {
    const openMeteoGeoData = fetchedGeoData.results[0];
    city = openMeteoGeoData.name;
    region = openMeteoGeoData.admin1;
    if (city === region) {
      region = openMeteoGeoData.country;
    }
    latitude = openMeteoGeoData.latitude;
    longitude = openMeteoGeoData.longitude;
    timezone = openMeteoGeoData.timezone.replace('/', '%2F');
  } else {
  // If fetchedGeoData is from IP API do the following:
    city = fetchedGeoData.city;
    region = fetchedGeoData.region;
    latitude = fetchedGeoData.latitude;
    longitude = fetchedGeoData.longitude;
    timezone = fetchedGeoData.timezone.replace('/', '%2F');
  }

  return { city, region, latitude, longitude, timezone };
};

export { createLocationData };
