const adForm = document.querySelector('.ad-form--disabled');
const filters = document.querySelector('.map__filters');

const inactiveForm = (form, formClass) => {
  form.classList.add(`${formClass}--disabled`);
  Array.from(form.children).forEach((element) => element.disabled = true);
};

const activeForm = (form, formClass) => {
  form.classList.remove(`${formClass}--disabled`);
  Array.from(form.children).forEach((element) => element.disabled = false);
};

export const inactive = () => {
  inactiveForm(adForm, 'ad-form');
  inactiveForm(filters, 'map__filters');
};

export const active = () => {
  activeForm(adForm, 'ad-form');
  activeForm(filters, 'map__filters');
};
