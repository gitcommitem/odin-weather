const renderText = async (elementSelector, string) => {
  await string;
  const targetEl = document.querySelector(elementSelector);
  targetEl.textContext = string;
};
export { renderText };
