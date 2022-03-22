import { convertTemp } from './convertTemp';

const renderForecast = (day, index) => {
  const forecastContEl = document.querySelector('section#week-forecast');

  const cardDivEl = document.createElement('div');
  cardDivEl.classList.add('hflex', 'forecast-card');
  forecastContEl.appendChild(cardDivEl);

  const dateDivEl = document.createElement('div');
  dateDivEl.classList.add('date');
  cardDivEl.appendChild(dateDivEl);

  const dateH1El = document.createElement('h1');
  dateH1El.textContent = day.day;
  dateH1El.dataset.id = index;
  dateDivEl.appendChild(dateH1El);

  const datePEl = document.createElement('p');
  datePEl.textContent = day.date;
  datePEl.dataset.id = index;
  dateDivEl.appendChild(datePEl);

  const weatherDivEl = document.createElement('div');
  weatherDivEl.classList.add('weather');
  cardDivEl.appendChild(weatherDivEl);

  const weatherH1El = document.createElement('h1');
  weatherH1El.textContent = day.weatherIs;
  weatherH1El.dataset.id = index;
  weatherDivEl.appendChild(weatherH1El);

  const tempDivEl = document.createElement('div');
  tempDivEl.classList.add('hflex', 'range');
  weatherDivEl.appendChild(tempDivEl);

  const highPEl = document.createElement('p');
  highPEl.classList.add('temp-range', 'high');
  highPEl.dataset.id = index;
  const highTemp = convertTemp(day.high);
  highPEl.textContent = highTemp;
  tempDivEl.appendChild(highPEl);

  const lowPEl = document.createElement('p');
  lowPEl.classList.add('temp-range', 'low');
  lowPEl.dataset.id = index;
  const lowTemp = convertTemp(day.low);
  lowPEl.textContent = lowTemp;
  tempDivEl.appendChild(lowPEl);
};

export { renderForecast };
