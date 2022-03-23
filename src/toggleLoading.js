const toggleLoading = () => {
  const prevSearchFail = document.querySelector('h1.error') !== null;
  if (prevSearchFail) {
    const loaderH1El = document.querySelector('h1.error');
    loaderH1El.classList.add('loader');
    const errorTipPEl = document.querySelector('div#loader-cont p');
    errorTipPEl.textContent = '';
    loaderH1El.textContent = '📡 Fetching weather signal 📡';
    loaderH1El.classList.remove('error');
  } else {
    const loaderDiv = document.querySelector('div#loader-cont');
    loaderDiv.classList.toggle('loaded');

    const heroSection = document.querySelector('section#hero');
    heroSection.classList.toggle('loaded');

    const forecastSection = document.querySelector('section#week-forecast');
    forecastSection.classList.toggle('loaded');
  }
};

export { toggleLoading };
