import { convertTemp } from './convertTemp';
import { renderTemp } from './renderTemp';

const displayTemp = (temperature, targetElSelector, spanClass) => {
  // spanClass argument is optional
  const convertedTemp = convertTemp(temperature);
  renderTemp(targetElSelector, convertedTemp, spanClass);
};

export { displayTemp };
