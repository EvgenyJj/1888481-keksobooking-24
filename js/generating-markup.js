const cardTemplate = document.querySelector('#card').content;

const offerTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const makePopupFeatures = (popupElement, features) => {
  const popupFeatures = popupElement.querySelector('.popup__features');
  if (features.length === 0) {
    popupFeatures.remove();
    return;
  }
  const popupFeaturesList = popupFeatures.querySelectorAll('.popup__feature');
  const facilities = features.map((feature) => `popup__feature--${feature}`);
  popupFeaturesList.forEach((popupFeaturesItem) => {
    const facilitie = popupFeaturesItem.classList[1];
    if (!facilities.includes(facilitie)) {
      popupFeaturesItem.remove();
    }
  });
};

const getPhoto = (popupElement, photos) => {
  const popupPhotos = popupElement.querySelector('.popup__photos');
  if (photos.length === 0) {
    popupPhotos.remove();
    return;
  }
  const popupPhoto = popupPhotos.querySelector('.popup__photo');
  const popupPhotoClone = popupPhoto.cloneNode(true);
  popupPhoto.remove();
  photos.forEach((photoSrc) => {
    const photo = popupPhotoClone.cloneNode(true);
    photo.src = photoSrc;
    popupPhotos.appendChild(photo);
  });
};

export const createCard = ({author, offer}) => {
  const userCard = cardTemplate.querySelector('.popup').cloneNode(true);
  const titleElement = userCard.querySelector('.popup__title');
  if (!offer.title || !offer.title.length) {
    titleElement.remove();
  } else {
    titleElement.textContent = offer.title;
  }
  const addressElement = userCard.querySelector('.popup__text--address');
  if (!offer.address || !offer.address.length) {
    addressElement.remove();
  } else {
    addressElement.textContent = offer.address;
  }
  const priceElement = userCard.querySelector('.popup__text--price');
  if (!`${offer.price} ₽/ночь` || !`${offer.price} ₽/ночь`.length) {
    priceElement.remove();
  } else {
    priceElement.textContent = `${offer.price} ₽/ночь`;
  }
  const typeElement = userCard.querySelector('.popup__type');
  if (!offer.type || !offer.type.length) {
    typeElement.remove();
  } else {
    typeElement.textContent = offerTypes[offer.type];
  }
  const capacityElement = userCard.querySelector('.popup__text--capacity');
  if (!`${offer.rooms } комнаты для ${ offer.guests } гостей` || !`${offer.rooms } комнаты для ${ offer.guests } гостей`.length) {
    capacityElement.remove();
  } else {
    capacityElement.textContent = `${offer.rooms } комнаты для ${ offer.guests } гостей`;
  }
  const timeElement = userCard.querySelector('.popup__text--time');
  if (!offer.checkin || !offer.checkin.length || !offer.checkout || !offer.checkout.length) {
    timeElement.remove();
  } else {
    timeElement.textContent = `Заезд после ${offer.checkin}, выезд до ${ offer.checkout}`;
  }
  makePopupFeatures(userCard, offer.features);
  const descriptionElement = userCard.querySelector('.popup__description');
  if (!offer.description || !offer.description.length) {
    descriptionElement.remove();
  } else {
    descriptionElement.textContent = offer.description;
  }
  getPhoto(userCard, offer.photos);
  const avatarElement = userCard.querySelector('.popup__avatar');
  if (!author.avatar || !author.avatar.length) {
    avatarElement.remove();
  } else {
    avatarElement.src = author.avatar;
  }
  return userCard;
};
