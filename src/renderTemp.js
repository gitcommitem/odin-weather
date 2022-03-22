const renderTemp = (elementSelector, temp, spanClass) => {
  const targetEl = document.querySelector(elementSelector);
  targetEl.textContent = temp;
  if (spanClass !== undefined) {
    const spanEl = document.createElement('span');
    spanEl.classList.add(spanClass);

    const isFahrenheit = document.querySelector('div#degree-toggle input[type="checkbox"]').checked === true;
    isFahrenheit ? spanEl.textContent = '°F' : spanEl.textContent = '°C';
    targetEl.appendChild(spanEl);
  }
};

export { renderTemp };
