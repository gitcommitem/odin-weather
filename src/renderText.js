const renderText = (elementSelector, string) => {
  const targetEl = document.querySelector(elementSelector);
  targetEl.textContent = string;
};
export { renderText };
