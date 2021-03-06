import {sendData} from './api.js';
import {setDefault} from './map.js';
import {minPriceChange, checkCapacity, checkRooms} from './form-validation.js';
import {clearAvatarPhoto} from './load-avatar-and-photo.js';

const adForm = document.querySelector('.ad-form');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const resetButton = adForm.querySelector('.ad-form__reset');
const mapFilters = document.querySelector('.map__filters');

const isEscKey = (evt) => evt.key === 'Escape';

const renderMessage = (node) => {
  const onClose = () => {
    node.remove();
    document.removeEventListener('keydown', onDocumentKeyDown);
  };

  function onDocumentKeyDown(evt) {
    if (isEscKey(evt)) {
      onClose();
    }
  }

  const onNodeClick = () => onClose();
  node.addEventListener('click', onNodeClick);
  document.addEventListener('keydown', onDocumentKeyDown);
};

export const onFormReset = () => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    adForm.reset();
    mapFilters.reset();
    clearAvatarPhoto();
    minPriceChange();
    setDefault();
  });
};

const showSuccessMessage = () => {
  const success = successMessageTemplate.cloneNode(true);
  document.body.appendChild(success);
  renderMessage(success);
};

const showErrorMessage = () => {
  const error = errorMessageTemplate.cloneNode(true);
  document.body.appendChild(error);
  renderMessage(error);
};

const onSendSuccess = () => {
  showSuccessMessage();
  adForm.reset();
  mapFilters.reset();
  minPriceChange();
  setDefault();
};

export const onFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    checkCapacity();
    checkRooms();
    evt.preventDefault();
    if (adForm.checkValidity()) {
      const formData = new FormData(evt.target);
      sendData(onSendSuccess, showErrorMessage, formData);
    }
  });
};
