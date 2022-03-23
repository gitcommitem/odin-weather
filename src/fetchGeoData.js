const fetchGeoData = async (place) => {
  try {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${place}`, { mode: 'cors' });
    const geoData = await response.json();

    // If API unable to find search result or does not have adequate geo data
    const isError = 'results' in geoData === false || 'timezone' in geoData.results[0] === false;
    if (isError) {
      const loaderH1El = document.querySelector('h1.loader');
      loaderH1El.classList.add('error');
      loaderH1El.classList.remove('loader');
      loaderH1El.textContent = `⚠️ No weather signal found for ${place} ⚠️`;
      const errorTipPEl = document.querySelector('div#loader-cont p');
      errorTipPEl.textContent = 'Try the zipcode instead or a different place.';
    }
    return geoData;
  } catch (err) {
    // If fetch fails completely
    alert('Something went wrong with the API.');
  }
};

export { fetchGeoData };
