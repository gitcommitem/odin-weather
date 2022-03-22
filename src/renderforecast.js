const renderForecast = (day) => {
  const forecastContEl = document.querySelector('section#week-forecast');

  const cardDivEl = document.createElement('div');
  cardDivEl.classList.add('hflex', 'forecast-card');
  forecastContEl.appendChild(cardDivEl);

  const dateDivEl = document.createElement('div');
  cardDivEl.appendChild(dateDivEl);

  const dateH1El = document.createElement('h1');
  dateH1El.textContent = day.day;
  dateDivEl.appendChild(dateH1El);

  const datePEl = document.createElement('p');
  datePEl.textContent = day.date;
  dateDivEl.appendChild(datePEl);

  const weatherDivEl = document.createElement('div');
  cardDivEl.appendChild(weatherDivEl);

  const weatherH1El = document.createElement('h1');
  weatherH1El.textContent = day.weatherIs;
  weatherDivEl.appendChild(weatherH1El);

  const tempDivEl = document.createElement('div');
  tempDivEl.classList.add('hflex', 'range');
  weatherDivEl.appendChild(tempDivEl);

  const highPEl = document.createElement('p');
  highPEl.classList.add('temp-range', 'high');
  highPEl.textContent = day.high;
  tempDivEl.appendChild(highPEl);

  const lowPEl = document.createElement('p');
  lowPEl.classList.add('temp-range', 'low');
  lowPEl.textContent = day.low;
  tempDivEl.appendChild(lowPEl);
};

export { renderForecast };
