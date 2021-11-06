const adForm = document.querySelector('.ad-form');
const filters = document.querySelector('.map__filters');

const disableInput = (input, formClass) => {
  input.classList.add(`${formClass}--disabled`);
  Array.from(input.children).forEach((element) => element.disabled = true);
};

const enableInput  = (input, formClass) => {
  input.classList.remove(`${formClass}--disabled`);
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
