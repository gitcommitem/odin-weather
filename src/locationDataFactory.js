const createLocationData = async (fetchedGeoData) => {
  await fetchedGeoData;
  const isOpenMeteoAPI = 'admin1' in fetchedGeoData === true;
  let city = '';
  let region = '';
  if (isOpenMeteoAPI) {
    city = fetchedGeoData.name;
    region = fetchedGeoData.admin1;
  } else {
  // If fetchedGeoData is from IP API do the following:
    city = fetchedGeoData.city;
    region = fetchedGeoData.region;
  }
  const latitude = fetchedGeoData.latitude;
  const longitude = fetchedGeoData.longitude;
  const timezone = fetchedGeoData.timezone.replace('/', '%2F');
  return { city, region, latitude, longitude, timezone };
};

export { createLocationData };
