const fetchGeoData = async (place) => {
  try {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${place}`, { mode: 'cors' });
    const geoData = await response.json();
    return geoData;
  } catch (err) {
    // If throws error default to this
    alert(`Sorry we couldn't get the weather for ${place}.`);
  }
};

export { fetchGeoData };
