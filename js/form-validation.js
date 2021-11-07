const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
//const MAX_PRICE_IN_NIGHT = 1000000;
const MAX_ROOMS = 100;

const adForm = document.querySelector('.ad-form');
const formTitle = adForm.querySelector('#title');
//const formPrice = adForm.querySelector('#price');
const formRooms = adForm.querySelector('#room_number');
const formCapacity = adForm.querySelector('#capacity');

const onTitleInput = () => {
  const valueLength = formTitle.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    formTitle.setCustomValidity(`Ещё ${ MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    formTitle.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else if (valueLength === 0) {
    formTitle.setCustomValidity('Мин. длина заголовка - 30 символов.');
  } else {
    formTitle.setCustomValidity('');
  }
  formTitle.reportValidity();
};

const checkCapacity = () => {
  const rooms = Number(formRooms.value);
  const guests = Number(formCapacity.value);
  if (rooms < guests) {
    formCapacity.setCustomValidity('Неподходящий вариант, выберите другой.');
  } else if (rooms === MAX_ROOMS && guests !== 0) {
    formCapacity.setCustomValidity('Неподходящий вариант, выберите другой.');
  } else if (guests === 0 && rooms !== MAX_ROOMS) {
    formCapacity.setCustomValidity('Неподходящий вариант, выберите другой.');
  } else {
    formCapacity.setCustomValidity('');
  }
  formCapacity.reportValidity();
};
export const validateForm = () => {
  formTitle.addEventListener('input', onTitleInput);
  formCapacity.addEventListener('change', checkCapacity);
  formRooms.addEventListener('change', checkCapacity);
};
