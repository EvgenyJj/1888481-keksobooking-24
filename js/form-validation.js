const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
//const MAX_PRICE_IN_NIGHT = 1000000;


const adForm = document.querySelector('.ad-form');
const formTitle = adForm.querySelector('#title');
//const formPrice = adForm.querySelector('#price');
const formRooms = adForm.querySelector('#room_number');
const formCapacity = adForm.querySelector('#capacity');
const capacityElements = formCapacity.querySelectorAll('option');

formTitle.addEventListener('input', () => {
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
});

formRooms.addEventListener('change', () => {
  if (formRooms.value === '1') {
    formCapacity.value = '1';
    capacityElements.forEach((capacityElement) => {
      if (capacityElement.value !== '1') {
        capacityElement.disabled = true;
      } else {
        capacityElement.disabled = false;
      }
    });
  } else if (formRooms.value === '2') {
    formCapacity.value = '1';
    capacityElements.forEach((capacityElement) => {
      if (capacityElement.value === '0' || capacityElement.value === '3') {
        capacityElement.disabled = true;
      } else {
        capacityElement.disabled = false;
      }
    });
  } else if (formRooms.value === '3') {
    formCapacity.value = '1';
    capacityElements.forEach((capacityElement) => {
      if (capacityElement.value === '0') {
        capacityElement.disabled = true;
      } else {
        capacityElement.disabled = false;
      }
    });
  } else if (formRooms.value === '100') {
    capacityElements.forEach((capacityElement) => {
      capacityElement.value = '0';
      if (capacityElement.value !== '0') {
        capacityElement.disabled = true;
      } else {
        capacityElement.disabled = false;
      }
    });
  } else {
    capacityElements.forEach((capacityElement) => {
      capacityElement.disabled = false;
    });
  }
});
