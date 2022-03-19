const renderTemp = (elementSelector, temp, spanClass, degree) => {
  const targetEl = document.querySelector(elementSelector);
  targetEl.textContent = temp;
  const spanEl = document.createElement('span');
  spanEl.classList.add(spanClass);
  spanEl.textContent = degree;
  targetEl.appendChild(spanEl);
};

export { renderTemp };
