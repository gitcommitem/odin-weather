const toggleLoading = () => {
  const loaderDiv = document.querySelector('div#loader-cont');
  loaderDiv.classList.toggle('loaded');

  const heroSection = document.querySelector('section#hero');
  heroSection.classList.toggle('loaded');

  const forecastSection = document.querySelector('section#week-forecast');
  forecastSection.classList.toggle('loaded');
};

export { toggleLoading };
