const convertTemp = (temperature) => {
  const isFahrenheit = document.querySelector('div#degree-toggle input[type="checkbox"]').checked === true;
  if (isFahrenheit || temperature === '--') {
    // Temperatures fetched from API are already in F
    return temperature;
  } else {
    // Convert from F to C
    return Math.round((temperature - 32) / 1.8);
  }
};

export { convertTemp };
