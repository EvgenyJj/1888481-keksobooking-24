const adForm = document.querySelector('.ad-form');
const filters = document.querySelector('.map__filters');

const disableInput = (input, inputClass) => {
  input.classList.add(`${inputClass}--disabled`);
  Array.from(input.children).forEach((element) => element.disabled = true);
};

const enableInput  = (input, inputClass) => {
  input.classList.remove(`${inputClass}--disabled`);
  Array.from(input.children).forEach((element) => element.disabled = false);
};

export const makeInactive = () => {
  disableInput(adForm, 'ad-form');
  disableInput(filters, 'map__filters');
};

export const makeActive = () => {
  enableInput(adForm, 'ad-form');
  enableInput(filters, 'map__filters');
};
